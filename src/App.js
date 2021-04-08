import './App.css';
import './Style.css';

function App() {
  return (
    // <div className="App">
    <form class="box" action="index.html" method="post">
      <h1>Login</h1>
      <input type="text" name="" placeholder="Username" />
      <input type="password" name="" placeholder="Password" />
      <input type="submit" name="" value="Login" />
      <p class="social-text">Or Sign up with social platforms</p>
      <div class="social-media">
        <button class="social-icon">
          <i class="fab fa-google"></i>
        </button>
        <button class="social-icon">
          <i class="fab fa-facebook-f"></i>
        </button>
        <button class="social-icon">
          <i class="fab fa-twitter"></i>
        </button>
        <button class="social-icon">
          <i class="fab fa-linkedin-in"></i>
        </button>
      </div>
      <div class="link">
        <a href="#">Forgot password?</a> or <a href="#">Sign Up</a>
      </div>
    </form>
    // </div>
  );
}

export default App;
