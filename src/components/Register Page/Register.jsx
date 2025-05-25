import React from "react";
import { useNavigate, Link } from "react-router-dom";
import 'react-phone-input-2/lib/style.css';
import PhoneInput from 'react-phone-input-2';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import VisibilityOffOutlinedIcon from '@mui/icons-material/VisibilityOffOutlined';
import styles from "./register.module.css";

function Register() {
  const [passwordVisible, setPasswordVisible] = React.useState(false);
  const [phoneNumber, setPhoneNumber] = React.useState("");
  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [designation, setDesignation] = React.useState("");
  const [companyId, setCompanyId] = React.useState("");
  const [errors, setErrors] = React.useState({});
  const [serverError, setServerError] = React.useState("");

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const navigate = useNavigate();

  const handleKeyDown = (event) => {
    if (event.key === "Enter" || event.key === " ") {
      togglePasswordVisibility();
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setErrors({});

    // Basic validation to check if required fields are filled
    const validationErrors = {};

    const password = e.target.password.value;

    if (!name) validationErrors.name = "Name is required.";
    if (!email) validationErrors.email = "Email is required.";
    if (!phoneNumber) validationErrors.phoneNumber = "Phone number is required.";
    if (!designation) validationErrors.designation = "Designation is required.";
    if (!companyId) validationErrors.companyId = "Company ID is required.";
    if (!password) {
      validationErrors.password = "Password is required.";
    } else {
      // Password Validation
      const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,16}$/;
      if (!passwordRegex.test(password)) {
        validationErrors.password = "Password must be 8-16 characters, with at least one uppercase letter, one lowercase letter, one number, and one special character.";
      }
    }
    let formattedPhone = phoneNumber;
    if (!formattedPhone.startsWith("+")) {
      formattedPhone = `+91${phoneNumber}`;
    }

    // If there are validation errors, set the error state and return early
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    const userData = {
      name,
      email,
      phone: formattedPhone,
      password: e.target.password.value,
      designation,
      company_id: companyId
    };

    const apiUrl = process.env.REACT_APP_API_URL;

    try {
      // Sending POST request to the backend
      const response = await fetch(`${apiUrl}/user`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(userData)
      });
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Something went wrong");
      }
      navigate("/createProject"); 
    } catch (error) {
      console.error("Error:", error);
      setServerError(error.message);
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
          <form onSubmit={handleSubmit}>
            {serverError && (
              <p className={styles.serverError}>{serverError}</p>
            )}
            <div className={styles.loginDetails}>
              <div className={styles.emailInput}>
                <label htmlFor="name" className={styles.label}>
                  Name
                  <input
                    type="text"
                    id="name"
                    className={styles.input}
                    value={name}
                    onChange={(e) => setName(e.target.value)} // Capture input
                  />
                </label>
                {errors.name && <p className={styles.error}>{errors.name}</p>}
                <label htmlFor="email" className={styles.label}>
                  Email
                  <input
                    type="email"
                    id="email"
                    className={styles.input}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)} // Capture input
                  />
                </label>
                {errors.email && <p className={styles.error}>{errors.email}</p>}
              </div>
              <div className={styles.passwordInput}>
                <label htmlFor="password" className={styles.label}>
                  Password
                  <div className={styles.passwordContainer}>
                    <input
                      type={passwordVisible ? "text" : "password"}
                      id="password"
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
                {errors.password && <p className={styles.error}>{errors.password}</p>}
              </div>
              <div className={styles.emailInput}>
                {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
                <label htmlFor="phone" className={styles.label}>
                  Phone Number
                  <PhoneInput
                    country="in"
                    value={phoneNumber}
                    onChange={setPhoneNumber}
                    inputClass={styles.input}
                  />
                </label>
                {errors.phoneNumber && <p className={styles.error}>{errors.phoneNumber}</p>}
                <label htmlFor="designation" className={styles.label}>
                  Designation
                  <input
                    type="text"
                    id="designation"
                    className={styles.input}
                    value={designation}
                    onChange={(e) => setDesignation(e.target.value)} // Capture input
                  />
                </label>
                {errors.designation && <p className={styles.error}>{errors.designation}</p>}
                <label htmlFor="company_id" className={styles.label}>
                  Company ID
                  <input
                    type="text"
                    id="company_id"
                    className={styles.input}
                    value={companyId}
                    onChange={(e) => setCompanyId(e.target.value)} // Capture input
                  />
                </label>
                {errors.companyId && <p className={styles.error}>{errors.companyId}</p>}
              </div>
              <div className={styles.signIn}>
                <button type="submit" className={styles.signInButton}>
                  Register
                </button>
              </div>
            </div>
          </form>
          <div className={styles.account}>
            <Link to="/login">Already have an account?</Link>
          </div>
        </div>
      </div>
    </>
  );
}

export default Register;
