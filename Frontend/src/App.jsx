import React, { useContext, useEffect } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import Navbar from "./components/Navbar";
// import Footer from "./components/Footer";
import Home from "./pages/Home";
import { UserContext } from "./context/Context";
import { Navigate } from "react-router-dom";
import {lazy,Suspense} from 'react';
import MyLoader from "./components/MyLoader";
const LazyAllNotes = lazy(()=>import("./pages/AllNotes"));
const LazyOneNote = lazy(()=>import( "./pages/OneNote"));
const LazyCreateNote = lazy(()=>import("./pages/CreateNotes"));
const LazyProfile = lazy(()=>import("./pages/Profile"));

function App() {
  const { isAuthenticated } = useContext(UserContext);

  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={isAuthenticated ? <Suspense fallback={<MyLoader/>}><LazyAllNotes/></Suspense>:<Home/>} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route
          path="/profile"
          element={
            isAuthenticated && <Suspense fallback={<MyLoader/>}><LazyProfile/></Suspense> 
          }
        />
        <Route
          path="/allnotes"
          element={
            isAuthenticated ? <Suspense fallback={<MyLoader/>}><LazyAllNotes/></Suspense>:<Navigate to="/signin"/> 
          }
        />
        <Route
          path="/create"
          element={
            isAuthenticated && <Suspense fallback={<MyLoader/>}><LazyCreateNote/></Suspense> 
          }
        />
        <Route
          path="/oneNote"
          element={
            isAuthenticated && <Suspense fallback={<MyLoader/>}><LazyOneNote/></Suspense> 
          }
        />
      </Routes>
      {/* <Footer /> */}
    </BrowserRouter>
  );
}

export default App;
