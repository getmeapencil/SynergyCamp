import {OAuth2Client} from "google-auth-library";

export const googleAuth = async (req, res) => {
  res.header("Access-Control-Allow-Origin", process.env.FRONTEND_URL);
  res.header("Referrer-Policy", "no-referrer-when-downgrade");

  const redirectUrl = "http://localhost:3000/auth/google";
  const oauth= new OAuth2Client({
    clientId: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    redirectUri: redirectUrl,
  });
  const authorizeUrl = oauth.generateAuthUrl({
    access_type: "offline",
    scope:"https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/userinfo.profile",
    prompt: "consent",
  });


  res.status(200).json({ url: authorizeUrl });
  
};


async function getUserData(access_token){
  const response = await fetch(`https://www.googleapis.com/oauth2/v3/userinfo?alt=json&access_token=${access_token}`);
  const data = await response.json();
  return data;
}

