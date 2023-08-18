const getCurrentUser = async (req, res) => {
  const { email, subscription } = req.user;

  return res.json({ email, subscription });
};
module.exports = getCurrentUser;
