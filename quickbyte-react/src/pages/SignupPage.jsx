import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../AuthContext.jsx";
import "./AuthPages.css";

export default function SignupPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [nameError, setNameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const navigate = useNavigate();
  const { register } = useAuth();

  const validateEmail = (emailValue) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(emailValue);
  };

  const validatePassword = (passwordValue) => {
    const minLength = 8;
    if (passwordValue.length < minLength) {
      return "Password must be at least 8 characters long";
    }
    return "";
  };

  const handleNameChange = (e) => {
    setName(e.target.value);
    if (nameError) setNameError("");
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    if (emailError) setEmailError("");
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    if (passwordError) setPasswordError("");
  };

  const handleSocialSignup = (provider) => {
    alert(`${provider} signup coming soon!`);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setNameError("");
    setEmailError("");
    setPasswordError("");

    const nameValue = name.trim();
    const emailValue = email.trim();
    const passwordValue = password;

    let isValid = true;

    if (!nameValue) {
      setNameError("Full name is required");
      isValid = false;
    }

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
    } else {
      const passwordValidationMsg = validatePassword(passwordValue);
      if (passwordValidationMsg) {
        setPasswordError(passwordValidationMsg);
        isValid = false;
      }
    }

    if (!isValid) {
      return;
    }

    const result = register({
      name: nameValue,
      email: emailValue,
      password: passwordValue,
    });
    if (!result.ok) {
      setEmailError(result.error);
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
            <h2>Create Account</h2>
            <p className="subtitle">Sign up to get started</p>

          <div className="social-btns">
            <button
              type="button"
              className="social-btn"
              onClick={() => handleSocialSignup("Facebook")}
            >
              🔵 Facebook
            </button>
            <button
              type="button"
              className="social-btn"
              onClick={() => handleSocialSignup("Google")}
            >
              🔴 Google
            </button>
          </div>

          <div className="divider">
            <span>or</span>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="signupName">Full Name</label>
              <input
                type="text"
                id="signupName"
                placeholder="Enter your full name"
                value={name}
                onChange={handleNameChange}
                required
                className={nameError ? "error" : ""}
              />
              {nameError && <span className="error-message">{nameError}</span>}
            </div>

            <div className="form-group">
              <label htmlFor="signupEmail">Email</label>
              <input
                type="email"
                id="signupEmail"
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
              <label htmlFor="signupPassword">Password</label>
              <input
                type="password"
                id="signupPassword"
                placeholder="Create a password"
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
              Sign Up
            </button>
          </form>

          <p className="toggle-text">
            Already have an account?{" "}
            <a
              className="toggle-link"
              href="#"
              onClick={(e) => {
                e.preventDefault();
                navigate("/login");
              }}
            >
              Login
            </a>
          </p>
          </div>
        </div>
      </div>
    </div>
  );
}
