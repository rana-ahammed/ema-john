import React from 'react';
import { useContext, useState } from "react";
import { userContext } from "../../App";
import { useLocation, useNavigate } from "react-router-dom";
import { creatUserWithEmailAndPassword, handleFbSignIn, handleGoogleSignIn, handleSignOut, initializeLoginFramework, sigInWithEmailAndPassword } from './loginManager';
import { getAuth } from 'firebase/auth';
import { initializeApp } from 'firebase/app';
import firebaseConfig from './firebase.config';


export const auth = getAuth(initializeApp(firebaseConfig));

function Login() {
  const [newUser, setNewUser] = useState(false);

  const [user, setUser] = useState({
    isSignedIn: false,
    name: "",
    email: "",
    password: "",
    photo: "",
  });

  initializeLoginFramework();

  const [loggedInUser, setLoggedInUser] = useContext(userContext);
  const navigate = useNavigate();
  const location = useLocation();
  let {from} = location.state || {from: {pathname: "/"} };

  const googleSignIn = () => {
    handleGoogleSignIn()
    .then(res => {
        handleResponse(res, true);
    })
  }


  const fbSignIn = () => {
   handleFbSignIn()
   .then(res => {
      handleResponse(res, true);
    }) 
  }


  const signOut = () => {
    handleSignOut()
    .then(res => {
        handleResponse(res, false);
    })
  }


  const handleResponse = (res, redirect) => {
    setUser(res);
    setLoggedInUser(res);
    if (redirect) {
      navigate(from);
    }
  }


  

 
  const handleBlur = (e) => {
    let isFieldValid = true;
    if (e.target.name === "email") {
      isFieldValid = /\S+@\S+\.\S+/.test(e.target.value);
    }
    if (e.target.name === "password") {
      const isPasswordValid = e.target.value.length > 7;
      const passwordHasNumber = /\d{1}/.test(e.target.value);
      isFieldValid = isPasswordValid && passwordHasNumber;
    }
    if (isFieldValid) {
      const newUserInfo = { ...user };
      newUserInfo[e.target.name] = e.target.value;
      setUser(newUserInfo);
    }
  };

  const handleSubmit = (e) => {

    if (newUser && user.email && user.password) {
      creatUserWithEmailAndPassword(user.name, user.email, user.password)
      .then(res => {
         handleResponse(res, true);
      })
    }



    if (!newUser && user.email && user.password) {
      sigInWithEmailAndPassword(user.email, user.password)
      .then(res => {
        handleResponse(res, true);
      })
    }

    e.preventDefault();
  };

 

  return (
    <div style={{textAlign: 'center'}}>
      {user.isSignedIn ? (<button onClick={signOut}>Sign Out</button>) : (<button onClick={googleSignIn}>Sign In</button>)}
      <br />
      <button onClick={fbSignIn}>Sign IN using Facebook</button>

      {user.isSignedIn && (
        <div>
          <p>Welcome, {user.name}</p>
          <p>Your Email: {user.email}</p>
          <img src={user.photo} alt="" />
        </div>
      )}

      <h1>Our Own Authentication</h1>
      <input
        type="checkbox"
        onChange={() => setNewUser(!newUser)}
        name="newUser"
      />
      <label htmlFor="newUser">New User Sign Up</label>
      <form onSubmit={handleSubmit}>
        {newUser && (
          <input
            name="name"
            type="text"
            onBlur={handleBlur}
            placeholder="Your Name"
          />
        )}
        <br />
        <input
          type="text"
          onBlur={handleBlur}
          name="email"
          placeholder="Your Email Address"
          required
        />
        <br />
        <input type="password"
          onBlur={handleBlur}
          name="password"
          placeholder="Your Password"
          autoComplete="on"
          required/>
        <br />
        <input type="submit" value={newUser ? 'Sign Up' : 'Sign In'} />
      </form>
      <p style={{ color: "red" }}>{user.error}</p>
      {user.success && (
        <p style={{ color: "green" }}>
          User has been {newUser ? "created" : "logged in"} successfully
        </p>
      )}
    </div>
  );
}

export default Login;
