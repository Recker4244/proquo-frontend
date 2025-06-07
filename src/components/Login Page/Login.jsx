import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import VisibilityOffOutlinedIcon from "@mui/icons-material/VisibilityOffOutlined";
import { post } from "../../utils/makeRequest";
import styles from "./login.module.css";

function Login() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [fieldErrors, setFieldErrors] = useState({});

  const apiUrl = process.env.REACT_APP_API_URL;

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      togglePasswordVisibility();
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
    // Clear field-specific errors when user starts typing
    if (fieldErrors[name]) {
      setFieldErrors((prev) => ({
        ...prev,
        [name]: ""
      }));
    }
    // Clear general error message
    if (errorMessage) {
      setErrorMessage("");
    }
  };
  const validateForm = () => {
    const errors = {};
    if (!formData.email.trim()) {
      errors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = "Please enter a valid email address";
    }
    if (!formData.password.trim()) {
      errors.password = "Password is required";
    } else if (formData.password.length < 6) {
      errors.password = "Password must be at least 6 characters";
    }
    setFieldErrors(errors);
    return Object.keys(errors).length === 0;
  };
  const handleSignIn = async (e) => {
    e.preventDefault();
    if (!validateForm()) {
      return;
    }
    setErrorMessage("");
    setIsLoading(true);
    try {
      const response = await post(`${apiUrl}/user/login`, formData);
      localStorage.setItem("token", response.token);
      const decoded = jwtDecode(response.token);
      if (decoded.company_type === "Buyer") {
        navigate("/dashboard");
      } else if (decoded.company_type === "Supplier") {
        navigate("/supplierDashboard");
      } else {
        navigate("/");
      }
    } catch (err) {
      setErrorMessage(
        err.message || "Login failed. Please check your credentials."
      );
    } finally {
      setIsLoading(false);
    }
  };
  const handleFormSubmit = (e) => {
    e.preventDefault();
    handleSignIn(e);
  };
  return (
    <>
      <link
        href="https://fonts.googleapis.com/css2?family=Manrope:wght@300;400;500;600;700&display=swap"
        rel="stylesheet"
      />
      <div className={styles.content}>
        <div className={styles.section}>
          <div className={styles.logoContainer}>
            <div className={styles.logoWrapper}>
              <svg
                width="24"
                height="24"
                viewBox="0 0 16 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g clipPath="url(#clip0_114_6)">
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M14.6667 1.33333H10.2222V5.7778H5.7778V10.2222H1.33333V14.6667H14.6667V1.33333Z"
                    fill="#660DD4"
                  />
                </g>
                <defs>
                  <clipPath id="clip0_114_6">
                    <rect width="16" height="16" fill="white" />
                  </clipPath>
                </defs>
              </svg>
            </div>
            <h1 className={styles.logoText}>proquo.tech</h1>
          </div>
          <div className={styles.welcomeText}>
            <h2>Welcome Back</h2>
            <p>Please sign in to your account</p>
          </div>

          <form onSubmit={handleFormSubmit} className={styles.loginForm}>
            {errorMessage && (
              <div className={styles.error} role="alert">
                <span className={styles.errorIcon}>⚠</span>
                {errorMessage}
              </div>
            )}
            <div className={styles.inputGroup}>
              <label htmlFor="email" className={styles.label}>Email Address</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className={`${styles.input} ${fieldErrors.email ? styles.inputError : ""}`}
                placeholder="Enter your email"
                disabled={isLoading}
                autoComplete="email"
              />
              {fieldErrors.email && (
                <span className={styles.fieldError}>{fieldErrors.email}</span>
              )}
            </div>

            <div className={styles.inputGroup}>
              <label htmlFor="password" className={styles.label}>Password</label>
              <div className={styles.passwordContainer}>
                <input
                  type={passwordVisible ? "text" : "password"}
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className={`${styles.input} ${styles.passwordInput} ${fieldErrors.password ? styles.inputError : ""}`}
                  placeholder="Enter your password"
                  disabled={isLoading}
                  autoComplete="current-password"
                />
                <button
                  type="button"
                  className={styles.eyeIcon}
                  onClick={togglePasswordVisibility}
                  onKeyDown={handleKeyDown}
                  aria-label={passwordVisible ? "Hide password" : "Show password"}
                  disabled={isLoading}
                  tabIndex={0}
                >
                  {passwordVisible ? (
                    <VisibilityOffOutlinedIcon className={styles.icon} />
                  ) : (
                    <VisibilityOutlinedIcon className={styles.icon} />
                  )}
                </button>
              </div>
              {fieldErrors.password && (
                <span className={styles.fieldError}>{fieldErrors.password}</span>
              )}
              <Link to="/forgot" className={styles.forgotLink}>
                Forgot Password?
              </Link>
            </div>
            <button
              type="submit"
              className={`${styles.signInButton} ${isLoading ? styles.loading : ""}`}
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <div className={styles.spinner} />
                  Signing In...
                </>
              ) : (
                "Sign In"
              )}
            </button>
          </form>

          <div className={styles.signUpPrompt}>
            <span>Don&apos;t have an account? </span>
            <Link to="/userRegistration" className={styles.signUpLink}>
              Sign Up
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}

export default Login;
