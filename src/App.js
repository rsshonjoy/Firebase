import firebase from "firebase/app";
import "firebase/auth";
import { useState } from "react";
import { useForm } from "react-hook-form";
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

  const provider = new firebase.auth.GoogleAuthProvider();
  
  const { handleSubmit } = useForm();
  const onSubmit = data => console.log(data);

  const handleSignIn = () => {
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
  return (
    <div>
      <h3>Welcome, {user.name}</h3>
      <p>Your email: {user.email}</p>
      <img src={user.photo} alt=""/>
      <form className="box" action="index.html" method="post" onSubmit={handleSubmit(onSubmit)}>
      <h1>Login</h1>
      <input type="text" name="" placeholder="Username" />
      <input type="password" name="" placeholder="Password" />
      <input type="submit" name="" value="Login" />
      <p className="social-text">Or Sign up with social platforms</p>
      <div className="social-media">
        <button className="social-icon" onClick={handleSignIn}>
          <i className="fab fa-google"></i>
        </button>
        <button className="social-icon" onClick={handleSignIn}>
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
