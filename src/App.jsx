import React, {useState,useEffect} from 'react';
import SignInUp from './pages/SignUp-SignIn';
import Routing from './routers/Routing';
import { ToastContainer }from 'react-toastify';
import {AuthCtx} from './utils/contexts';
import {isUserLogAPI} from './api/auth';


export default function App() {

  // This Constant Will Prevent To Users Not Logged In Or No Account To Only Stay In The SignUp/Login Page And The Users That Are alredy Logged In, To Dont See The SignUp/Login Page
  const [user,setUser] = useState(null);
  const [load,setLoad] = useState(false);
  const [refresh,setRefresh] = useState(false);

  useEffect (() => {
    setUser(isUserLogAPI());
    setRefresh(false)
    setLoad(true);
  }, [refresh])

  if(!load) return null;

  return (
    <AuthCtx.Provider value={user}>
      {user ? 
      (<Routing setRefresh={setRefresh}/>) :
      (<div><SignInUp setRefresh={setRefresh}/></div>)}

      <ToastContainer 
        position="top-right"
        autoClose={5000}
        hideProgressBar
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnVisibilityChange
        draggable
        pauseOnHover
      />
    </AuthCtx.Provider>
  );
}


