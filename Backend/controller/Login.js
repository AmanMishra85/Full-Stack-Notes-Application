import UserModel from "../model/UserModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import "dotenv/config";

const formatDataToSend = ({ _id, email, username, userImg, google_auth,quotes }) => {
  const token = jwt.sign({ id: _id }, process.env.JWT_SECRET_KEY);

  const data = {
    Name: username,
    Email: email,
    Token: token,
    img: userImg,
    auth: google_auth,
    quotes:quotes
  };
  return data;
};

const Login = async (req, res) => {
  try {
    const { fEmail, fPass } = req.body;

    const quoteResponse = await fetch('https://favqs.com/api/qotd');
    const data = await quoteResponse.json();
    const quote = data.quote.body;
    // console.log(quote)

    const response = await UserModel.findOne({ email: fEmail });
    if (response) {
      if (!response.google_auth) {
        const { _id, email, password } = response;

        await bcrypt.compare(fPass, password, (error, result) => {
          if (result) {
            // console.log(data)
            response.quotes = quote;
            console.log(formatDataToSend(response));
            return res.status(200).json(formatDataToSend(response));
          } else {
            return res
              .status(402)
              .json({ Error: "Email or Password is incorrect!" });
          }
        });
      } else {
        res.status(504).json({ Error: "This User is signed-in by google" });
      }
    } else {
      return res
        .status(402)
        .json({ Error: "User not found! Please register first" });
    }
  } catch (err) {
    res.status(401).json({ Error: err.message });
  }
};

export default Login;
