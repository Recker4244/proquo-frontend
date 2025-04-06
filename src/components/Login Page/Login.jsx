import React from "react";
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import VisibilityOffOutlinedIcon from '@mui/icons-material/VisibilityOffOutlined';
import styles from "./login.module.css";

function Login() {
  const [passwordVisible, setPasswordVisible] = React.useState(false);
  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };
  const handleKeyDown = (event) => {
    if (event.key === "Enter" || event.key === " ") {
      togglePasswordVisibility();
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
            <div className={styles.emailInput}>
              <label htmlFor="email" className={styles.label}>
                Email
                <input type="email" id="email" className={styles.input} />
              </label>
            </div>
            <div className={styles.passwordInput}>
              <label htmlFor="password" className={styles.label}>
                Password
                <div className={styles.passwordContainer}>
                  <input type={passwordVisible ? 'text' : 'password'} id="password" className={`${styles.input} ${styles.password}`} />
                  <span
                    className={styles.eye_icon}
                    onClick={togglePasswordVisibility}
                    onKeyDown={handleKeyDown}
                    role="button"
                    tabIndex="0"
                  >
                    {passwordVisible
                      ? <VisibilityOffOutlinedIcon className={styles.icon} />
                      : <VisibilityOutlinedIcon className={styles.icon} />}
                  </span>
                </div>
              </label>
              <a className={styles.forgot} href="/forgot">Forgot Password?</a>
            </div>
            <div className={styles.signIn}>
              <button type="submit" className={styles.signInButton}>Sign In</button>
            </div>
            <div className={styles.account}>
              <a href="/register">Don&apos;t have an account?</a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
export default Login;
