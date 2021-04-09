import firebase from "firebase/app";
import "firebase/auth";
import { useState } from "react";
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
    password: '',
    photo: ''
  })

  const [newUser, setNewUser] = useState(false);

  // email and password auth
  const handleBlur = (e) => {
    let isFormValid = true;
    if (e.target.name === 'email') {
      isFormValid = /\S+@\S+\.\S+/.test(e.target.value)
    }
    if (e.target.name === 'password') {
      const isPasswordValid = e.target.value.length > 5;
      const passwordHasValid = /\d{1}/.test(e.target.value);
      isFormValid= isPasswordValid && passwordHasValid
    }
    if (isFormValid) {
      const newUserInfo = {...user};
      newUserInfo[e.target.name] = e.target.value;
      setUser(newUserInfo)
    }
  }

  const handleSubmit = (e) => {
    if (user.email && user.password) {
      firebase.auth().createUserWithEmailAndPassword(user.email, user.password)
      .then((res) => {
        const newUserInfo = {...user}
        newUserInfo.error = '';
        newUserInfo.success = true;
        setUser(newUserInfo)
        updateUserName(res.name)
      })
      .catch((error) => {
        const newUserInfo = {...user}
        newUserInfo.error = error.message;
        newUserInfo.success = false;
        setUser(newUserInfo);
      });
    }
    if (!newUser && user.email && user.password) {
      firebase.auth().signInWithEmailAndPassword(user.email, user.password)
      .then((res) => {
        const newUserInfo = {...user}
        newUserInfo.error = '';
        newUserInfo.success = true;
        setUser(newUserInfo)
        console.log('sign in user info', res.user);
      })
      .catch((error) => {
        const newUserInfo = {...user}
        newUserInfo.error = error.message;
        newUserInfo.success = false;
        setUser(newUserInfo);
      });
    }
    e.preventDefault();
  }

  const updateUserName = name => {
    var user = firebase.auth().currentUser;

    user.updateProfile({
      displayName: name
    }).then(function() {
      console.log('sign in user successfully');
      
    }).catch(function(error) {
      console.log(error);
      
    });
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
        photo: '',
        error: '',
        success: false
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
      <h3>Welcome, {user.name}</h3>
      <p>Your email: {user.email}</p>
      <p>Your password: {user.password}</p>
      <form className="box" action="index.html" method="post" onSubmit={handleSubmit}>
          <h1>Login</h1>
          { newUser && <input type="text" name="name" onBlur={handleBlur} placeholder="Name" required />}
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
            <a href="#">Forgot password?</a> or <input type="checkbox" name="newUser" onChange={() => setNewUser(!newUser)} id=""/>
            <label htmlFor="newUser">{ newUser ? 'Sign In' : 'Sign Up'}</label>
          </div>
          <p style={{color: 'red'}}>{user.error}</p>
          { user.success && <p style={{color: 'green'}}>User { newUser ? 'created' : 'Logged In'} Successfully</p> }
        </form>
    </div>
  );
}

export default App;
