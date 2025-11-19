import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../AuthContext.jsx";
import "./AuthPages.css";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const navigate = useNavigate();
  const { login } = useAuth();

  const validateEmail = (emailValue) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(emailValue);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    if (emailError) {
      setEmailError("");
    }
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    if (passwordError) {
      setPasswordError("");
    }
  };

  const handleSocialLogin = (provider) => {
    alert(`${provider} login coming soon!`);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setEmailError("");
    setPasswordError("");

    const emailValue = email.trim();
    const passwordValue = password;

    let isValid = true;

    if (!emailValue) {
      setEmailError("Email is required");
      isValid = false;
    } else if (!validateEmail(emailValue)) {
      setEmailError("Please enter a valid email address");
      isValid = false;
    }

    if (!passwordValue) {
      setPasswordError("Password is required");
      isValid = false;
    }

    if (!isValid) {
      return;
    }

    const result = login(emailValue, passwordValue);
    if (!result.ok) {
      setPasswordError(result.error);
      return;
    }

    // Success - redirect to home
    navigate("/");
  };

  return (
    <div className="auth-page-container">
      <div className="auth-container">
        <div className="side-panel">
          <div className="food-icon">🍔</div>
          <h1>QuickByte</h1>
          <p>
            Delicious food delivered to your doorstep in minutes. Join thousands
            of food lovers today!
          </p>
        </div>

        <div className="form-panel">
          <div className="form-container active">
            <h2>Welcome Back!</h2>
            <p className="subtitle">Login to your account</p>

            <div className="social-btns">
              <button
                type="button"
                className="social-btn"
                onClick={() => handleSocialLogin("Facebook")}
              >
                🔵 Facebook
              </button>
              <button
                type="button"
                className="social-btn"
                onClick={() => handleSocialLogin("Google")}
              >
                🔴 Google
              </button>
            </div>

            <div className="divider">
              <span>or</span>
            </div>

            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="loginEmail">Email</label>
                <input
                  type="email"
                  id="loginEmail"
                  placeholder="Enter your email"
                  value={email}
                  onChange={handleEmailChange}
                  required
                  className={emailError ? "error" : ""}
                />
                {emailError && (
                  <span className="error-message">{emailError}</span>
                )}
              </div>

              <div className="form-group">
                <label htmlFor="loginPassword">Password</label>
                <input
                  type="password"
                  id="loginPassword"
                  placeholder="Enter your password"
                  value={password}
                  onChange={handlePasswordChange}
                  required
                  className={passwordError ? "error" : ""}
                />
                {passwordError && (
                  <span className="error-message">{passwordError}</span>
                )}
              </div>

              <button type="submit" className="btn">
                Login
              </button>
            </form>

            <p className="toggle-text">
              Don't have an account?{" "}
              <a
                className="toggle-link"
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  navigate("/signup");
                }}
              >
                Sign Up
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
