import "./HomePage.css";

function HomePage() {
  return (
    <div>
      <div className="title-container">
        <h1 className="title">Productivity App</h1>
      </div>
      <div className="motto">
        <p>
          A productivity app that helps you organize and prioritize your tasks
        </p>
      </div>
      <div className="login-container">
        <div className="heading">Sign In</div>
        <form action="" className="login-form">
          <input
            required=""
            class="input"
            type="email"
            name="email"
            id="email"
            placeholder="E-mail"
          />
          <input
            required=""
            class="input"
            type="password"
            name="password"
            id="password"
            placeholder="Password"
          />
          <input className="login-button" type="submit" value="Sign In" />
        </form>
        <hr className="divider" />
        <div className="signup">
          <p className="signup-text">Don't have an account? Sign-up</p>
        </div>
      </div>
    </div>
  );
}

export default HomePage;
