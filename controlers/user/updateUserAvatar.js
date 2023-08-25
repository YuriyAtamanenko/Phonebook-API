const User = require("../../models/user");
const fs = require("fs/promises");
const path = require("path");
const Jimp = require("jimp");

const updateUserAvatar = async (req, res) => {
  console.log("req.file", req.file);
  if (!req.file) {
    return res.status(400).json({
      message: "File not found",
    });
  }

  const { filename } = req.file;

  const tmpPath = path.join(__dirname, "../../tmp", filename);
  const publicPath = path.join(__dirname, "../../public/avatars", filename);

  const JimpingAvatar = await Jimp.read(tmpPath);
  await JimpingAvatar.autocrop()
    .cover(250, 250, Jimp.HORIZONTAL_ALIGN_CENTER | Jimp.VERTICAL_ALIGN_MIDDLE)
    .writeAsync(tmpPath);

  try {
    await fs.rename(tmpPath, publicPath);
  } catch (error) {
    await fs.unlink(tmpPath);
    return error;
  }

  const userID = req.user.id;
  const avatarURL = path.join("avatars", filename);

  const user = await User.findByIdAndUpdate(
    userID,
    {
      avatarURL,
    },
    { new: true }
  );

  return res.json({ avatarURL: user.avatarURL });
};
module.exports = updateUserAvatar;
