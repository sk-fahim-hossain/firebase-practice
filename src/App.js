import initializeAuthentication from "./Firebase/firebase.initialize";
import { getAuth, signInWithPopup, GoogleAuthProvider, GithubAuthProvider, signOut  } from "firebase/auth";
import { useState } from "react";
import "./App.css";

initializeAuthentication()

const googleProvider = new GoogleAuthProvider();
const githubProvider = new GithubAuthProvider();

function App() {

  const[user,setUser]= useState({});
  

  const auth = getAuth();

  const handleGoogleSignIn = ()=>{
    signInWithPopup(auth, googleProvider)
    .then(result =>{
      const {displayName, email,photoURL} = result.user;

      const loggedUser ={
        name: displayName,
        email:email,
        photo:photoURL
      }
      setUser(loggedUser)
    })
  }

  const handleGithubSignIn = () => {
    signInWithPopup(auth, githubProvider)
    .then(result=>{
      const {displayName,photoURL,email} = result.user;
      const loggedUser ={
        name: displayName,
        email:email,
        photo:photoURL
      }
      setUser(loggedUser)
      console.log(result.user)
    })
  }

  const handleSignOut = () => {
    signOut(auth)
    .then(() => {
      setUser({})
    })
  }

  return (
    <div className="App">
    {! user.name?
     <div>
        <button onClick={handleGoogleSignIn}>Google sign in</button>
        <button onClick={handleGithubSignIn}>Github sign in</button>
      </div> :
      <button onClick={handleSignOut}>Sign out</button>}

      <br />
      {
        user.name && <div>
          <h2>Welcome {user.name}</h2>
          <h5>I know your email address:{user.email}</h5>
          <img src={user.photo} alt="" />
        </div>
      }
    </div>
  );
}

export default App;
