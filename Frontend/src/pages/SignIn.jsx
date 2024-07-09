import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { KeyRound, Mail, Eye, EyeOff, Drum } from "lucide-react";
import toast, { Toaster } from "react-hot-toast";
import axios from "axios";
import { UserContext } from "../context/Context";
import AnimationWrapper from "../AnimationWrapper";
import logo from "../Images/google.png";
import { authenticateWithGoogle } from "../firebase/Firebase";
import AuthImg from "../Images/Secure login-brr.png";
import { motion } from "framer-motion";

function SignIn() {
  const { setUserData, loginUser } = useContext(UserContext);

  const [formData, setFormdata] = useState({
    fEmail: "",
    fPass: "",
  });
  const navigate = useNavigate();

  const [showP, setShowP] = useState(false);

  const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
  const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{5,}$/;

  const sendRequest = async () => {
    var toastIda = toast.loading("Wait...");
    try {
      const response = await axios.post(
        import.meta.env.VITE_API_AUTH_PATH + "/signin",
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

  const validateForm = ({ fEmail, fPass }) => {
    if (fEmail == "" || fPass == "") {
      return toast.error(
        "Oops! Looks like you missed a few fields. Please fill them out."
      );
    } else {
      if (!emailRegex.test(fEmail)) {
        return toast.error("Invalid Email!");
      }
      if (!passwordRegex.test(fPass)) {
        return toast.error(
          "Password must be contain one-letter, one-digit and total length must be atleast 4"
        );
      }
      sendRequest();
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormdata({
      ...formData,
      [name]: value,
    });
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
      toast.success("Welcome " + response.data.Name, {
        id: id,
      });
      navigate("/");
    } catch (err) {
      toast.dismiss(id);
      toast.error(err.response.data.Error);
    }
  };

  return (
      <div className="flex justify-center items-center lg:justify-around h-screen sm:h-[85vh]">
        <motion.div
          initial={{ x: "-100%" }}
          animate={{ x: "0%" }}
          transition={{ duration: 0.8 }}
          className="hidden md:flex w-1/2 relative left-[1vw]"
        >
          <section>
            <img src={AuthImg} width={550} />
          </section>
        </motion.div>
        {/* <AnimationWrapper> */}
        <motion.div
          initial={{ x: "100%" }}
          animate={{ x: 0 }}
          transition={{ duration: 0.8 }}
          className="border-[3px] border-blue-500  p-4 rounded-lg w-[300px] sm:w-[350px] h-[490px] sm:shadow-2xl mb-44 sm:mb-0 lg:relative lg:right-[10vw]"
        >
          <section className="flex justify-center">
            <p className="text-blue-600 font-semibold text-3xl sm:text-4xl pt-2">
              Welcome back!
            </p>
          </section>
          <section className="flex justify-center mt-12">
            <form onSubmit={handleSubmit}>
              <div className="flex flex-col gap-12 sm:w-[300px] w-[265px]">
                <section className="flex items-center justify-centers">
                  <Mail className="absolute ml-4 text-gray-500" />
                  <input
                    type="email"
                    className="border-b-2 rounded-xl text-lg pl-14 pr-10 border-blue-500 p-1 w-[265px] sm:w-[300px]  focus:outline-none"
                    placeholder="Enter Email"
                    maxLength={30}
                    name="fEmail"
                    value={formData.fEmail}
                    onChange={handleChange}
                  />
                </section>

                <section className="flex items-center">
                  <KeyRound className="absolute ml-4 text-gray-500" />
                  <input
                    type={`${showP ? "text" : "password"}`}
                    className="border-b-2 text-lg rounded-xl pl-14 pr-12 border-blue-500 p-1 w-[265px] sm:w-[300px] focus:outline-none"
                    placeholder="Enter Password"
                    maxLength={30}
                    name="fPass"
                    value={formData.fPass}
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
                    Login
                  </button>
                  <p className="">
                    Don't have an account?{" "}
                    <Link to="/signup" className="text-blue-600">
                      Sign-Up
                    </Link>
                  </p>
                </section>
                <section className="relative bottom-6">
                  <p className="text-gray-600 text-center">OR</p>
                  <div
                    className="border-2 w-full font-semibold rounded-md text-center text-black p-2 border-blue-500 my-2 hover:text-white hover:bg-black hover:border-black flex justify-center items-center cursor-pointer"
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
        {/* </AnimationWrapper> */}
        <Toaster />
      </div>
  );
}

export default SignIn;
