const getCurrentUser = async (req, res) => {
  const { email, name, avatarURL } = req.user;

  return res.json({
    name,
    email,
    avatar: avatarURL,
  });
};
module.exports = getCurrentUser;
