import user from "../../models/user.js";

export const getUsers = async (req, res) => {
  try {
    const { query } = req.query; // Get the search query from the request
    const userEmail = req.email; // Assuming req.email contains the email of the user making the request

    if (!query) {
      return res.status(400).send({ error: "Query is required" });
    }

    // Use the Mongoose 'find' method with regex for case-insensitive matching, excluding the current user
    const users = await user
      .find({
        name: new RegExp(query, "i"), // Case-insensitive partial match on name
        email: { $ne: userEmail }, // Exclude the current user by email
      })
      .select("id email name picture") // Only select id, email, name, and picture
      .limit(10); // Limit the result to 10 users

    // Return the filtered users
    res.json({ data: users, status: 200 });
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).send({ error: "Internal Server Error" });
  }
};
