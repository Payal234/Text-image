// import { createContext, useEffect, useState } from "react";
// import { toast } from "react-toastify";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";

// export const AppContext = createContext();

// const AppContextProvider = (props) => {
//   const [user, setUser] = useState(null);
//   const [showLogin, setShowLogin] = useState(false);
//   const [token, setToken] = useState(localStorage.getItem("token"));
//   const [credit, setCredit] = useState(false);
// //  const [imageHistory, setImageHistory] = useState([])

//   const backendUrl = import.meta.env.VITE_BACKEND_URL;

//   const navigate = useNavigate();

//   const loadCreditsData = async () => {
//     try {
//       const { data } = await axios.get(`${backendUrl}/api/user/credits`, {
//         headers: { token },
//       });

//       if (data.success) {
//         setCredit(data.credits);
//         setUser(data.user);
//       }
//     } catch (error) {
//       console.log(error);
//       toast.error(error.message);
//     }
//   };

//   const generateImage = async (prompt) => {
//     try {
//       const { data } = await axios.post(
//         `${backendUrl}/api/image/generate-image`,
//         { prompt },
//         { headers: { token } }
//       );

//       if (data.success) {
//         loadCreditsData();
//         return data.resultImage;
//       } else {
//         toast.error(data.message);
//         loadCreditsData();
//         if (data.creditBalance === 0) {
//           navigate("/buy");
//         }
//       }
//     } catch (error) {
//       toast.error(error.message);
//     }
//   };


//    // Fetch image history for logged-in user
  
  


//   const logout = () => {
//     localStorage.removeItem("token");
//     setToken("");
//     setUser(null);

//     setCredit(0);
//     setImageHistory([]);
//     navigate("/");
//   };

//   useEffect(() => {
//     if (token) {
//       loadCreditsData();
//     }
//      else {
//       setUser(null);
//       setCredit(0);
//       setImageHistory([]);
//     }
//   }, [token]);

//   const value = {
//     user,
//     setUser,
//     showLogin,
//     setShowLogin,
//     backendUrl,
//     token,
//     setToken,
//     credit,
//     setCredit,
//     loadCreditsData,
//     logout,
//     generateImage,
//   };

//   return (
//     <AppContext.Provider value={value}>{props.children}</AppContext.Provider>
//   );
// };

// export default AppContextProvider;
// Copyright 2025 PREM
// 
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
// 
//     https://www.apache.org/licenses/LICENSE-2.0
// 
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

import { createContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import axios from 'axios'
import { useNavigate } from "react-router-dom";

export const AppContext = createContext()

const AppContextProvider = (props) => {
    const [user, setUser] = useState(null);
    const [showLogin, setShowLogin] = useState(false);
    const [token, setToken] = useState(localStorage.getItem('token'))
    const [credit, setCredit] = useState(false)

    const backendUrl = import.meta.env.VITE_BACKEND_URL

    const navigate = useNavigate()

    const loadCreditsData = async () => {
        try {
            const {data} = await axios.get(backendUrl + '/api/user/credits', {headers: {token}})

            if (data.success) {
                setCredit(data.credits)
                setUser(data.user)
            }
        } catch (error) {
            console.log(error)
            toast.error(error.message)
        }
    }

    const generateImage = async (prompt) => {
        try {
            const {data} = await axios.post(backendUrl + '/api/image/generate-image', {prompt}, {headers: {token}})

            if (data.success) {
                loadCreditsData()
                return data.resultImage 
            }else{
                toast.error(data.message)
                loadCreditsData()
                if (data.creditBalance === 0) {
                    navigate('/buy')
                }
            }
        } catch (error) {
            toast.error(error.message)
        }
    }

    const logout = () => {
        localStorage.removeItem('token');
        setToken('')
        setUser(null)
    }

    useEffect(()=> {
        if (token) {
            loadCreditsData()
        }
    },[token])

    const value = {
        user, setUser, showLogin, setShowLogin, backendUrl, token, setToken, credit, setCredit, loadCreditsData, logout, generateImage
    }

    return (
        <AppContext.Provider value={value}>
            {props.children}
        </AppContext.Provider>
    )
}

export default AppContextProvider