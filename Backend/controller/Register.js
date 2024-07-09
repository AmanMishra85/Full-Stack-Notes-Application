import UserModel from "../model/UserModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import 'dotenv/config'

const formatDataToSend = (user) => {
  var token = jwt.sign({ id: user._id }, process.env.JWT_SECRET_KEY);
  const data = {
    Name: user.username,
    Email: user.email,
    Token: token,
    img:user.userImg,
    auth:user.google_auth,
    quotes:user.quotes
  };
  return data;
};


const Register = async (req, res) => {
  try {
    const { fName, fEmail, fPass } = req.body;

    const quoteResponse = await fetch('https://favqs.com/api/qotd');
    const data = await quoteResponse.json();
    const quote = data.quote.body;

    const saltRounds = 10;
    const salt = await bcrypt.genSalt(saltRounds);
    const hashPassword = await bcrypt.hash(fPass, salt);

    const user = new UserModel({
      username: fName,
      email: fEmail,
      password: hashPassword,
    });
    await user.save();
    user.quotes = quote;
    console.log(formatDataToSend(user));
    res.status(200).json(formatDataToSend(user));
  } catch (err) {
    if (err.code == 11000) {
      res
        .status(401)
        .json({Error:"This Email already Registered!, Please SignUp with another Email"});
    }
    else{
        res.status(402).json({Error:err.message});
    }
  }
};

export default Register;
