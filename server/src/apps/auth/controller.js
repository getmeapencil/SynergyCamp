import { OAuth2Client } from "google-auth-library";

const oauthClient = new OAuth2Client(process.env.GOOGLE_CLIENT_ID, process.env.GOOGLE_CLIENT_SECRET, "postmessage");
export const googleAuth = async (req, res) => {
  try {
    const { code } = req.body;

    if (!code) return res.status(400).json({ message: "Missing authorization code" });

    const { tokens } = await oauthClient.getToken(code);
    if (!tokens.id_token) {
      res.status(400).json({ message: "Missing ID token" });
      return;
    }

    const ticket = await oauthClient.verifyIdToken({
      idToken: tokens.id_token,
      audience: process.env.GOOGLE_CLIENT_ID,
    });
    const { email, name, picture } = ticket.getPayload();
    const user = await UserModel.findOneAndUpdate(
      { email: email.toLowerCase() },
      {
        email: email.toLowerCase(),
        name,
        picture,
        email_verified: true,
      },
      { new: true, upsert: true },
    );

    const { accessToken, refreshToken } = await generateToken(user, user?.roles?.includes("admin") || false);

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: true,
      maxAge: COOKIE_AGE,
      domain: DOMAIN,
      sameSite: "None",
    });

    return res.status(200).json({
      accessToken,
      user,
    });
  } catch (e) {
    console.error(e);
    res.status(500).json({ message: e.message });
  }
};
