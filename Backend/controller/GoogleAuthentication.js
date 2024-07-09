import admin from "../FirebaseAdmin.js";
import jwt from "jsonwebtoken";
import UserModel from "../model/UserModel.js";

const formatDataToSend = ({
  _id,
  email,
  username,
  userImg,
  google_auth,
  quotes,
}) => {
  const token = jwt.sign({ id: _id }, process.env.JWT_SECRET_KEY);
  const data = {
    Name: username,
    Email: email,
    Token: token,
    img: userImg,
    auth: google_auth,
    quotes: quotes,
  };

  return data;
};

const GoogleAuthentication = async (req, res) => {
  try {
    const { token } = req.body;
    const quoteResponse = await fetch("https://favqs.com/api/qotd");
    const data = await quoteResponse.json();
    const quote = data.quote.body;

    admin
      .auth()
      .verifyIdToken(token)
      .then(async (user) => {
        const { name, picture, email, uid } = user;
        const u = await UserModel.findOne({ email: email });

        if (u !== null) {
          // Login

          if (u.google_auth) {
            u.quotes = quote;
            console.log(formatDataToSend(u));
            res.status(200).json(formatDataToSend(u));
          } else {
            res.status(401).json({
              Error: "User is already registered via Email and Password",
            });
          }
        } else {
          // Registration
          console.log("New User");
          const user = new UserModel({
            username: name,
            email: email,
            password: uid,
            google_auth: true,
          });
          const data = await user.save();
          data.quotes = quote;
          console.log(formatDataToSend(data));
          res.status(200).json(formatDataToSend(data));
        }
      })
      .catch((err) => {
        console.log(err);
        res.status(502).json({ error: "Invalid Token" });
      });
  } catch (err) {
    console.error("Error in google-auth-controller:", error);
    if (error.code === "auth/argument-error") {
      return res.status(400).json({ error: "Invalid Token" });
    }
    return res.status(500).json({ error: "Internal server error" });
  }
};

export default GoogleAuthentication;
