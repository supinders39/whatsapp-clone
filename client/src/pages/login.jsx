import { useStateProvider } from "@/context/StateContext";
import { reducerCases } from "@/context/constants";
import { CHECK_USER_ROUTE } from "@/utils/ApiRoutes";
import { firebaseAuth } from "@/utils/FirebaseConfig";
import axios from "axios";
import { GoogleAuthProvider, getRedirectResult, signInWithPopup, signInWithRedirect } from "firebase/auth";
import Image from "next/image";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import {FcGoogle} from "react-icons/fc"

function login() {
  const router = useRouter();

  const [{ userInfo, newUser}, dispatch] = useStateProvider();

  useEffect(() => { 
    if (userInfo?.id && !newUser) {
      router.push("/")
    }
  }, [userInfo, newUser]);

  useEffect(() => {
    getRedirectResult(firebaseAuth).then(async (response) => {
      if (!response) return
      const { user: { displayName: name, email, photoURL: profileImage } } = response;
      try {
        if (email) {
          const { data } = await axios.post(CHECK_USER_ROUTE, { email });
          console.log(data);

          if (!data.status) {
            dispatch({ type: reducerCases.SET_NEW_USER, newUser: true })
            dispatch({
              type: reducerCases.SET_USER_INFO,
              userInfo: {
                name, email, profileImage, status: ""
              }
            })

            router.push("/onboarding")
          } else {
            const { id, email, name, profilePicture: profileImage, status
            } = data.data;
            dispatch({
              type: reducerCases.SET_USER_INFO,
              userInfo: {
                id,
                name, email, profileImage, status,
              }
            })
            router.push("/")

          }

        }
      } catch (error) {
        console.log("🚀 ~ file: login.jsx:17 ~ handleLogin ~ error:", error)

      }
    }).catch(error => {
      console.error(error);
    })
  }, []);



  const handleLogin = async () => {
    const provider = new GoogleAuthProvider();
    const { user: { displayName: name, email, photoURL: profileImage } } = await signInWithRedirect(firebaseAuth, provider);
    // try {
    //   if (email) {
    //     const { data } = await axios.post(CHECK_USER_ROUTE, { email });
    //     console.log(data);

    //     if (!data.status) {
    //       dispatch({ type: reducerCases.SET_NEW_USER, newUser: true })
    //       dispatch({
    //         type: reducerCases.SET_USER_INFO,
    //         userInfo: {
    //           name, email, profileImage, status: ""
    //         }
    //       })
          
    //       router.push("/onboarding")
    //     } else {
    //       const {id, email, name, profilePicture: profileImage, status
    //     } = data.data;
    //       dispatch({
    //         type: reducerCases.SET_USER_INFO,
    //         userInfo: {
    //           id,
    //           name, email, profileImage, status,
    //         }
    //       })
    //       router.push("/")

    //     }

    //   }
    // } catch (error) {
    //   console.log("🚀 ~ file: login.jsx:17 ~ handleLogin ~ error:", error)
      
    // }
  }
  return <div className="flex justify-center items-center bg-panel-header-background h-screen w-screen flex-col gap-6">
    <div className="flex items-center justify-center gap-2 text-white ">
      <Image src="/whatsapp.gif" alt="whatsapp" width={300} height={300} />
      <span className="text-7xl ">Whatapp</span>

    </div>
    <button
      onClick={handleLogin}
      className="flex items-center justify-center gap-7 bg-search-input-container-background p-5 rounded-lg ">
      <FcGoogle className="text-4xl " />
      <span className="text-white text-2xl ">Login with Google</span>
    </button>
  </div>;
}

export default login;
