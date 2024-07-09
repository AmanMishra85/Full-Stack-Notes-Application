import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { KeyRound, Mail, UserRound, Eye, EyeOff, MoveLeft } from "lucide-react";
import toast, { Toaster } from "react-hot-toast";
import axios from "axios";
import { UserContext } from "../context/Context";
import AnimationWrapper from "../AnimationWrapper";
import logo from "../Images/google.png";
import { authenticateWithGoogle } from "../firebase/Firebase";
import AuthImg from "../Images/Secure register-amico.png";
import { motion } from "framer-motion";

function SignUp() {
  const { setUserData, loginUser } = useContext(UserContext);

  const [formData, setFormdata] = useState({
    fName: "",
    fEmail: "",
    fPass: "",
  });
  const navigate = useNavigate();

  const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
  const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{5,}$/;

  const [showP, setShowP] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormdata({
      ...formData,
      [name]: value,
    });
  };

  const sendRequest = async () => {
    var toastIda = toast.loading("Wait...");
    try {
      const response = await axios.post(
        import.meta.env.VITE_API_AUTH_PATH + "/signup",
        formData
      );
      await loginUser(response.data);
      toast.success("Welcome " + response.data.Name, {
        id: toastIda,
      });
      console.log(response.data);
      navigate("/");
    } catch (err) {
      toast.dismiss(toastIda);
      toast.error(err.response?.data?.Error || "An error occurred");
    }
  };

  const validateForm = ({ fName, fEmail, fPass }) => {
    if (fName == "" || fEmail == "" || fPass == "") {
      return toast.error(
        "Oops! Looks like you missed a few fields. Please fill them out."
      );
    } else {
      if (fName.length < 3 && fName.length > 25) {
        return toast.error("Please fill valid name !");
      }
      if (!emailRegex.test(fEmail)) {
        return toast.error("Invalid Email!");
      }
      if (!passwordRegex.test(fPass)) {
        return toast.error(
          "Password must be contain one-letter, one-digit and total length must be in between 4-20"
        );
      }
      sendRequest();
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    validateForm(formData);
  };

  const handleSignInWithGoogle = async (e) => {
    try {
      e.preventDefault();
      const { accessToken, ...other } = await authenticateWithGoogle();
      // console.log(accessToken)
      var id = toast.loading("Wait...");
      const response = await axios.post(
        import.meta.env.VITE_API_AUTH_PATH + "/google-auth",
        { token: accessToken }
      );
      console.log(response);
      await loginUser(response.data);
      toast.success("Hi " + response.data.Name, {
        id: id,
      });
      navigate("/allnotes");
    } catch (err) {
      toast.dismiss(id);
      toast.error(err.response.data.Error);
    }
  };

  return (
    <div>
      <div className="flex justify-center items-center h-screen sm:h-[85vh] lg:justify-around">
        <motion.div
          initial={{ x: "-100%" }}
          animate={{ x: "0%" }}
          transition={{ duration: 0.8 }}
          className="border-[2px] border-blue-500 p-4 rounded-lg w-[300px] sm:w-[350px] sm:h-[580px] sm:shadow-2xl mb-32 sm:mb-0 lg:relative left-[10vw]"
        >
          <section className="flex justify-center">
            <p className="text-blue-600 font-semibold sm:text-4xl text-3xl">
              Lets Get Started!
            </p>
          </section>
          <section className="flex justify-center sm:mt-12 mt-10">
            <form onSubmit={handleSubmit}>
              <div className="flex flex-col gap-12 justify-center items-center">
                <section className="flex items-center ">
                  <UserRound
                    size={22}
                    className="absolute ml-4 text-gray-500"
                  />
                  <input
                    type="text"
                    className="border-b-2 rounded-lg text-md sm:text-lg pl-14 border-blue-500 sm:w-[300px] w-[265px] p-1 focus:outline-none"
                    placeholder="Enter Your Name"
                    name="fName"
                    value={formData.fName}
                    onChange={handleChange}
                    maxLength={25}
                  />
                </section>

                <section className="flex items-center">
                  <Mail size={22} className="absolute ml-4 text-gray-500" />
                  <input
                    type="email"
                    className="border-b-2 rounded-lg text-md sm:text-lg pl-14 border-blue-500 sm:w-[300px] w-[265px] p-1 focus:outline-none"
                    placeholder="Enter Email"
                    name="fEmail"
                    value={formData.fEmail}
                    onChange={handleChange}
                  />
                </section>

                <section className="flex items-center ml-4 sm:ml-4">
                  <KeyRound className="absolute ml-[20px] sm:ml-[20px] text-gray-500" />
                  <input
                    type={`${showP ? "text" : "password"}`}
                    className="border-b-2 text-md sm:text-lg rounded-lg pl-14 w-[275px] sm:w-[305px] border-blue-500 p-1 focus:outline-none"
                    placeholder="Enter Password"
                    name="fPass"
                    value={formData.fPass}
                    maxLength={20}
                    onChange={handleChange}
                  />
                  <Link onClick={() => setShowP(!showP)}>
                    {showP ? (
                      <EyeOff
                        size={22}
                        className="relative right-10 text-gray-500"
                      />
                    ) : (
                      <Eye
                        size={22}
                        className="relative right-10 text-gray-500"
                      />
                    )}
                  </Link>
                </section>

                <section className="flex flex-col justify-center items-center">
                  <button
                    type="submit"
                    className="bg-blue-600 rounded-lg px-4 py-2 text-lg md:text-xl text-white hover:bg-white hover:text-black border-2 border-blue-500 hover:shadow-lg"
                  >
                    Sign-Up
                  </button>
                  <p className="">
                    Already have account ?{" "}
                    <Link to="/signin" className="text-blue-600">
                      Sign-In
                    </Link>
                  </p>
                </section>
                <section className="relative bottom-6">
                  <p className="text-gray-600 text-center">OR</p>
                  <div
                    className="border-2 w-full font-semibold rounded-md text-center p-2 border-blue-500 hover:border-black my-2 hover:text-white hover:bg-black flex justify-center items-center cursor-pointer"
                    onClick={handleSignInWithGoogle}
                  >
                    <img src={logo} className="w-10" />
                    <p>Continue With Google</p>
                  </div>
                </section>
              </div>
            </form>
          </section>
        </motion.div>
        <motion.div
          initial={{ x: "100%" }}
          animate={{ x: "0%" }}
          transition={{ duration: 0.8 }}
          className="hidden md:flex w-1/2 relative left-[5vw]"
        >
          <section>
            <img src={AuthImg} width={550} />
          </section>
        </motion.div>
        <Toaster />
      </div>
    </div>
  );
}

export default SignUp;
