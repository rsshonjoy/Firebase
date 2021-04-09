import firebase from "firebase/app";
import "firebase/auth";
import { useState } from "react";
import { useForm } from "react-hook-form";
import './App.css';
import firebaseConfig from "./firebaseConfig";
import './Style.css';

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig)
}else {
  firebase.app();
}

function App() {

  const [user, setUser] = useState({
    isSignIn: false,
    name: '',
    email: '',
    photo: ''
  })
  
  const { handleSubmit } = useForm();
  const onSubmit = data => console.log(data);


  // email and password auth
  const handleBlur = (e) => {
    console.log(e.target.value);
    if (e.target.name === 'email') {
      const isEmailValid = /\S+@\S+\.\S+/.test(e.target.value)
      console.log("🚀 ~ file: App.js ~ line 30 ~ handleBlur ~ isEmailValid", isEmailValid)
    }
    if (e.target.name === 'password') {
      const isPasswordValid = e.target.value.length > 5;
      const passwordHasValid = /\d{1}/.test(e.target.value);
      console.log("🚀 ~ file: App.js ~ line 35 ~ handleBlur ~ isPasswordValid", isPasswordValid && passwordHasValid)
    }
  }

  
  // google auth
  const provider = new firebase.auth.GoogleAuthProvider();
  const handleGoogleSignIn = () => {
    firebase.auth()
    .signInWithPopup(provider)
    .then((result) => {
      const {displayName, email, photoURL} = result.user;
      console.log(result);
      const signInUser = {
        isSignIn: true,
        name: displayName,
        email: email,
        photo: photoURL
      }
      setUser(signInUser)
    }).catch((error) => {
      console.log(error);
    });
  }

  const handleSignOut = () => {
    firebase.auth().signOut().then(() => {
      const signOutUer = {
        isSignIn: false,
        name: '',
        email: '',
        photo: ''
      }
      setUser(signOutUer)
    }).catch((error) => {
      // An error happened.
    });
  }
  return (
    <div className="App">

      {
        user.isSignIn ? <button onClick={handleSignOut}>Sign Out</button> : <button onClick={handleGoogleSignIn}>Sign In</button>
      }

      {
        user.isSignIn && 
        <div>
          <h3>Welcome, {user.name}</h3>
          <p>Your email: {user.email}</p>
          <img src={user.photo} alt=""/>
        </div>
      }
      <br/><br/>

      {/* Login form */}
      <form className="box" action="index.html" method="post" onSubmit={handleSubmit(onSubmit)}>
          <h1>Login</h1>
          <input type="text" name="email" onBlur={handleBlur} placeholder="Username" required />
          <input type="password" name="password" onBlur={handleBlur} placeholder="Password" required />
          <input type="submit" name="" value="Login" />
          <p className="social-text">Or Sign up with social platforms</p>
          <div className="social-media">
            <button className="social-icon" onClick={handleGoogleSignIn}>
              <i className="fab fa-google"></i>
            </button>
            <button className="social-icon">
              <i className="fab fa-facebook-f"></i>
            </button>
            <button className="social-icon">
              <i className="fab fa-twitter"></i>
            </button>
            <button className="social-icon">
              <i className="fab fa-linkedin-in"></i>
            </button>
          </div>
          <div className="link">
            <a href="#">Forgot password?</a> or <a href="#">Sign Up</a>
          </div>
        </form>
    </div>
  );
}

export default App;
