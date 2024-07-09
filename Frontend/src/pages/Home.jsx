import React, { useContext } from "react";
import { Link } from "react-router-dom";
import Img1 from "../Images/first_img.jpg";
import Img2 from "../Images/last_img.jpg";
import Img3 from "../Images/third_img.jpg";
import { UserContext } from "../context/Context";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import About from "../components/About";
import Footer from "../components/Footer";

function Home() {
  const { isAuthenticated } = useContext(UserContext);
  return (
    <div>
      <div>
        {/* First-Section */}
        <section>
          <div className="relative z-0">
            <LazyLoadImage
              src={Img1}
              alt="Your Alt Text"
              className="w-full h-[90vh] sm:h-[740px] object-cover lg:w-[100vw]"
              effect="blur"
            />
            <section className="absolute top-[15%] sm:top-[20%] left-[10%] lg:left-[15%] lg:top-[15%]">
              <p className="font-semibold text-5xl">
                Save Your{" "}
                <span className="text-blue-600 shadow-2xl rounded-xl p-2 pt-4">
                  thoughts
                </span>
              </p>
              <p className="mt-32 sm:mt-36 text-2xl ml-8 sm:ml-32 md:ml-64 lg:ml-[55%] lg:text-4xl lg:-rotate-6 text-[25px]">
                By Creating Notes...
              </p>
              <div className="mt-20 lg:mt-36 ml-[25%] sm:ml-[50%] md:ml-[30vw] text-xl bg-blue-600 text-white w-36 rounded-md p-2 text-center hover:animate-pulse md:w-64 md:text-2xl md:py-[12px] lg:text-3xl">
                <Link to={isAuthenticated ? "/create" : "/signin"}>
                  Take a Note
                </Link>
              </div>
            </section>
          </div>
        </section>

        {/* Second-Section */}
        <section>
          <div><About/></div>
        </section>
        <section>
          <div><Footer/></div>
        </section>
      </div>
    </div>
  );
}

export default Home;
