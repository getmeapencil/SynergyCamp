export const getUser = async (req, res) => {
  if (req.isAuthenticated()) {
    res.json(req.user);
    return;
  }
  res.json({ message: "Unauthorized" });
};

export const logout = async (req, res) => {
  req.logout((err) => {
    if (err) {
      console.error("Logout error:", err);
      return res.status(500).send("Error logging out");
    }
    res.send("Logged out");
  });
};
