import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
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

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter" || event.key === " ") {
      togglePasswordVisibility();
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSignIn = async (e) => {
    e.preventDefault();
    setErrorMessage("");
    try {
      const response = await post("user/login", formData);
      localStorage.setItem("token", response.token);
      navigate("/dashboard");
    } catch (err) {
      setErrorMessage(
        err.message || "Login failed. Please check your credentials."
      );
    }
  };

  return (
    <>
      <link
        href="https://fonts.googleapis.com/css2?family=Manrope:wght@400;500;700&display=swap"
        rel="stylesheet"
      />
      <div className={styles.content}>
        <div className={styles.section}>
          <div className={styles.logoContainer}>
            <div className={styles.logoWrapper}>
              <svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g clipPath="url(#clip0_114_6)">
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M14.6667 1.33333H10.2222V5.7778H5.7778V10.2222H1.33333V14.6667H14.6667V1.33333Z"
                    fill="#120D1C"
                  />
                </g>
                <defs>
                  <clipPath id="clip0_114_6">
                    <rect width="16" height="16" fill="white" />
                  </clipPath>
                </defs>
              </svg>
            </div>
            <h3 className={styles.logoText}>proquo.tech</h3>
          </div>
          <div className={styles.loginDetails}>
            {errorMessage && <div className={styles.error}>{errorMessage}</div>}
            <div className={styles.emailInput}>
              <label htmlFor="email" className={styles.label}>
                Email
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className={styles.input}
                />
              </label>
            </div>
            <div className={styles.passwordInput}>
              <label htmlFor="password" className={styles.label}>
                Password
                <div className={styles.passwordContainer}>
                  <input
                    type={passwordVisible ? "text" : "password"}
                    id="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    className={`${styles.input} ${styles.password}`}
                  />
                  <span
                    className={styles.eye_icon}
                    onClick={togglePasswordVisibility}
                    onKeyDown={handleKeyDown}
                    role="button"
                    tabIndex="0"
                  >
                    {passwordVisible ? (
                      <VisibilityOffOutlinedIcon className={styles.icon} />
                    ) : (
                      <VisibilityOutlinedIcon className={styles.icon} />
                    )}
                  </span>
                </div>
              </label>
              <a className={styles.forgot} href="/forgot">
                Forgot Password?
              </a>
            </div>
            <div className={styles.signIn}>
              <button
                type="submit"
                className={styles.signInButton}
                onClick={handleSignIn}
              >
                Sign In
              </button>
            </div>
            <div className={styles.account}>
              <a href="/userRegistration">Don&apos;t have an account?</a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
export default Login;
