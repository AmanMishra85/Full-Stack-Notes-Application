import axios from "axios";
import React,{createContext,useState,useEffect} from "react";
import toast, { Toaster } from "react-hot-toast";

export const UserContext = createContext();

export const UserProvider = ({children}) =>{

    const [userData,setUserData] = useState(null);
    let logoutTimer = null;
    const [isAuthenticated,setIsAuthenticated] = useState(false);

    useEffect(()=>{
        const storedUserData = localStorage.getItem("userData");
        if(storedUserData){
            setUserData(JSON.parse(storedUserData));
            setIsAuthenticated(true)
            startLogoutTimer();
        }
    },[]);

    const loginUser = (data)=>{
        localStorage.setItem("userData",JSON.stringify(data));
        setUserData(data);
        setIsAuthenticated(true);
        startLogoutTimer();
    }

    const logoutUser = ()=>{
        localStorage.removeItem("userData");
        setUserData(null);
        setIsAuthenticated(false)
    }

    const startLogoutTimer = ()=>{
        if(logoutTimer){
            clearTimeout(logoutTimer);
        }
        logoutTimer = setTimeout(()=>{
            alert("You have been logged out.")
            logoutUser();
        },3600000);
    }

    const changeUserPic = async(Token)=>{
        try{
            toast.remove();
            const toastId = toast.loading('Changing...');
            const response = await axios.get(import.meta.env.VITE_API_USER_PATH+"/changePics",{
                headers:{
                    Authorization:`Bearer ${Token}`
                }
            })
            let Image = response.data.userImg;
            const updatedUser = {
                ...userData,
                img:Image
            }
            setUserData(updatedUser)
            toast.success('Changed',{
                id:toastId
            })
            localStorage.setItem('userData',JSON.stringify(updatedUser));
        }
        catch(err){
            console.log("Error Occured : " + err.message);
        }
    }

    return (
        <UserContext.Provider value={{userData,isAuthenticated,setIsAuthenticated,setUserData,loginUser,logoutUser,changeUserPic}}>
            {children}
            <Toaster/>
        </UserContext.Provider>
    )
}
