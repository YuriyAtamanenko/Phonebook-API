const User = require("../../models/user");

const updateSubscription = async (req, res) => {
  const { id } = req.user;

  try {
    const updatedContact = await User.findByIdAndUpdate(id, req.body, {
      new: true,
    });

    if (!updatedContact) {
      return res.status(404).json({ message: "Not found" });
    }

    const { email, subscription } = updatedContact;
    return res.json({ email, subscription });
  } catch {
    return res.status(404).json({ message: "Not found" });
  }
};
module.exports = updateSubscription;
