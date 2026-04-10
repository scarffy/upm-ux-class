import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "../../context/UserContext";
import { useNotification } from "../../context/NotificationContext";
import { Eye, EyeOff, Lock, Shield, Loader2 } from "lucide-react";
import UPMLogo from "../common/UPMLogo";
import "./Login.css";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const { login, user } = useUser();
  const { showNotification } = useNotification();
  const navigate = useNavigate();

  // Refs for focus management
  const usernameRef = React.useRef<HTMLInputElement>(null);
  const passwordRef = React.useRef<HTMLInputElement>(null);

  // Redirect if already logged in
  if (user) {
    if (user.role === "student") navigate("/student");
    else if (user.role === "admin") navigate("/admin");
    else if (user.role === "supervisor") navigate("/supervisor");
    return null;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage("");

    if (!username || !password) {
      const error = "Please enter both username and password";
      setErrorMessage(error);
      showNotification(error, "error");
      // Focus the first empty field
      if (!username) {
        usernameRef.current?.focus();
      } else {
        passwordRef.current?.focus();
      }
      return;
    }

    setIsLoading(true);

    try {
      await login(username, password);
      showNotification(`Welcome back!`, "success");

      // Navigate based on role (default to student for demo)
      const role = username.toLowerCase();
      if (role === "admin") navigate("/admin");
      else if (role === "supervisor") navigate("/supervisor");
      else navigate("/student");
    } catch (error) {
      const errorMsg = "Login failed. Please try again.";
      setErrorMessage(errorMsg);
      showNotification(errorMsg, "error");
      usernameRef.current?.focus();
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="login-page">
      {/* Top Navigation Bar */}
      <nav className="upm-top-nav">
        <div className="upm-nav-links">
          <a href="#" className="upm-nav-link active">
            Login
          </a>
          <a href="#" className="upm-nav-link">
            First Time Login
          </a>
        </div>
      </nav>

      <div className="login-container">
        {/* Login Card with split design */}
        <div className="login-card">
          {/* Left side - Random UPM Photo */}
          <div className="login-card-left">
            <img
              src="https://putravid.upm.edu.my/img-random/"
              alt="UPM Campus"
              className="university-photo"
            />
          </div>

          {/* Right side - Login Form */}
          <div className="login-card-right">
            {/* Logo Row - Jata Negara and UPM Logo side by side */}
            <div className="logo-row-header">
              <img
                src="https://upm-id-portal.upm.edu.my/sso/images/jatanegara.png"
                alt="Jata Negara Malaysia"
                className="crest-logo-small"
                width={65}
                height={65}
              />
              <UPMLogo size={90} className="upm-logo-large" />
            </div>

            {/* Header */}
            <div className="login-header">
              <h1 id="login-heading">Sign in</h1>
              <p className="login-subtitle">to continue to UPM Portal</p>
            </div>

            {/* Live region for error announcements */}
            <div
              role="status"
              aria-live="polite"
              aria-atomic="true"
              className="sr-only"
            >
              {errorMessage}
            </div>

            {/* Form */}
            <form
              onSubmit={handleSubmit}
              className="login-form"
              aria-labelledby="login-heading"
            >
              <div className="form-group">
                <label htmlFor="username">Student/Staff ID</label>
                <input
                  ref={usernameRef}
                  type="text"
                  id="username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="Enter your ID (try: student, admin, or supervisor)"
                  disabled={isLoading}
                  autoComplete="username"
                  aria-required="true"
                  aria-invalid={errorMessage && !username ? "true" : "false"}
                  aria-describedby="username-help"
                />
                <span id="username-help" className="sr-only">
                  Enter your student or staff ID. For demo, use: student, admin,
                  or supervisor
                </span>
              </div>

              <div className="form-group">
                <label htmlFor="password">Password</label>
                <div className="password-input">
                  <input
                    ref={passwordRef}
                    type={showPassword ? "text" : "password"}
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter your password"
                    disabled={isLoading}
                    autoComplete="current-password"
                    aria-required="true"
                    aria-invalid={errorMessage && !password ? "true" : "false"}
                    aria-describedby="password-help"
                  />
                  <button
                    type="button"
                    className="toggle-password"
                    onClick={() => setShowPassword(!showPassword)}
                    aria-label={
                      showPassword ? "Hide password" : "Show password"
                    }
                    aria-pressed={showPassword}
                  >
                    {showPassword ? (
                      <EyeOff size={18} aria-hidden="true" />
                    ) : (
                      <Eye size={18} aria-hidden="true" />
                    )}
                  </button>
                </div>
                <span id="password-help" className="sr-only">
                  Enter your password. Any password will work for the demo.
                </span>
              </div>

              <div className="form-options">
                <label className="checkbox-label">
                  <input
                    type="checkbox"
                    id="remember-me"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    aria-checked={rememberMe}
                  />
                  <span>Remember me</span>
                </label>
                <a
                  href="#"
                  className="forgot-link"
                  aria-label="Reset your password"
                >
                  Forgot password?
                </a>
              </div>

              <button
                type="submit"
                className="btn btn-primary btn-large"
                disabled={isLoading}
                aria-busy={isLoading}
                aria-label={
                  isLoading ? "Signing in, please wait" : "Sign in securely"
                }
              >
                {isLoading ? (
                  <>
                    <Loader2 size={20} className="spinner" aria-hidden="true" />
                    <span>Signing in...</span>
                  </>
                ) : (
                  "Sign In Securely"
                )}
              </button>
            </form>

            {/* Putra Pura Logo - Right Aligned */}
            <div className="putra-pura-right">
              <img
                src="https://upm-id-portal.upm.edu.my/sso/images/putra_pur.png"
                alt="Putra Pura"
                className="putra-pura-logo"
              />
            </div>

            {/* Help Links */}
            <div className="login-help-links">
              <a href="#" className="help-link">
                Forgot Password?
              </a>
              <span className="divider">|</span>
              <a href="#" className="help-link">
                Support & Contact Us
              </a>
            </div>
          </div>
        </div>

        {/* Help Links */}
        <div className="login-help-links">
          <a href="#" className="help-link">
            Forgot Password?
          </a>
          <span className="divider">|</span>
          <a href="#" className="help-link">
            Support & Contact Us
          </a>
        </div>

        <div className="demo-hint" role="note" aria-label="Demo credentials">
          <p>
            <strong>Demo:</strong> Use usernames: <code>student</code>,{" "}
            <code>admin</code>, or <code>supervisor</code>
          </p>
        </div>
      </div>
    </div>
  );
}
