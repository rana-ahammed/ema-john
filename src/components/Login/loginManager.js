import { getApps, initializeApp } from "firebase/app";
import firebaseConfig from "./firebase.config";
import {
  createUserWithEmailAndPassword,
  FacebookAuthProvider,
  getAuth,
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from "firebase/auth";

export const initializeLoginFramework = () => {
  if (getApps().length === 0) {
    initializeApp(firebaseConfig);
  }
};

export const handleGoogleSignIn = () => {
  const googleProvider = new GoogleAuthProvider();
  const auth = getAuth();
  return signInWithPopup(auth, googleProvider)
    .then((res) => {
      const { displayName, photoURL, email } = res.user;
      const signedInUser = {
        isSignedIn: true,
        name: displayName,
        email: email,
        photo: photoURL,
        success: true
      };
      return signedInUser;
    })
    .catch((err) => {
      console.log(err);
      console.log(err.message);
    });
};


export const handleFbSignIn = () => {
  const fbProvider = new FacebookAuthProvider();
  const auth = getAuth();
 return signInWithPopup(auth, fbProvider)
.then((result) => {
  // The signed-in user info.
  const user = result.user;
  user.success = true;
  return user; 

  const credential = FacebookAuthProvider.credentialFromResult(result);
  const accessToken = credential.accessToken;

  // ...
})
.catch((error) => {
  // Handle Errors here.
  const errorCode = error.code;
  const errorMessage = error.message;
  // The email of the user's account used.
  const email = error.email;
  // The AuthCredential type that was used.
  const credential = FacebookAuthProvider.credentialFromError(error);

  // ...
});

};

export const handleSignOut = () => {
  const auth = getAuth();
  return signOut(auth)
    .then((res) => {
      const signedOutUser = {
        isSignedIn: false,
        name: "",
        email: "",
        photo: "",
        error: "",
        success: false,
      };
      return signedOutUser;
    })
    .catch((err) => {});
};

export const creatUserWithEmailAndPassword = (name, email, password) => {
      const auth = getAuth();
       return createUserWithEmailAndPassword(auth, email, password)
        .then((res) => {
          const newUserInfo = res.user ;
          newUserInfo.error = "";
          newUserInfo.success = true;
          updateUserName(name);
          return newUserInfo;
        })
        .catch((error) => {
          const newUserInfo = {};
          newUserInfo.error = error.message;
          newUserInfo.success = false;
          return newUserInfo;
        });
}


export const sigInWithEmailAndPassword = (email, password) => {
  const auth = getAuth();
      return signInWithEmailAndPassword(auth, email, password)
        .then((res) => {
          const newUserInfo = res.user;
          newUserInfo.error = "";
          newUserInfo.success = true;
          return newUserInfo;
        })
        .catch((error) => {
          const newUserInfo = {};
          newUserInfo.error = error.message;
          newUserInfo.success = false;
          return newUserInfo;
        });
}


const updateUserName = (name) => {
  const auth = getAuth();
  updateProfile(auth.currentUser, { displayName: name })
    .then(() => {
      console.log("user name updated successfully");
    })

    .catch((error) => {
      console.log(error);
    });
};
