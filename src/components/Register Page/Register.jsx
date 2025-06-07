import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import VisibilityOffOutlinedIcon from "@mui/icons-material/VisibilityOffOutlined";
import styles from "./register.module.css";

function Register() {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
    designation: "",
    companyId: ""
  });
  const [errors, setErrors] = useState({});
  const [serverError, setServerError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" });
    setServerError("");
  };

  const handlePhoneChange = (phone) => {
    setForm({ ...form, phone });
    setErrors({ ...errors, phone: "" });
    setServerError("");
  };

  const togglePasswordVisibility = () => setPasswordVisible((v) => !v);

  const handleKeyDown = (event) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      togglePasswordVisibility();
    }
  };

  const validate = () => {
    const newErrors = {};
    if (!form.name.trim()) newErrors.name = "Name is required.";
    if (!form.email.trim()) {
      newErrors.email = "Email is required.";
    } else if (!/\S+@\S+\.\S+/.test(form.email)) {
      newErrors.email = "Please enter a valid email address.";
    }
    if (!form.phone.trim()) newErrors.phone = "Phone is required.";
    if (!form.designation.trim()) newErrors.designation = "Designation is required.";
    if (!form.companyId.trim()) newErrors.companyId = "Company ID is required.";
    if (!form.password) {
      newErrors.password = "Password is required.";
    } else {
      const pwRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{8,16}$/;
      if (!pwRegex.test(form.password)) {
        newErrors.password = "8-16 chars, upper, lower, number, special char.";
      }
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    setIsLoading(true);
    setServerError("");
    const apiUrl = process.env.REACT_APP_API_URL;
    try {
      const res = await fetch(`${apiUrl}/user`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          password: form.password,
          phone: form.phone.startsWith("+") ? form.phone : `+91${form.phone}`,
          designation: form.designation,
          company_id: form.companyId
        })
      });
      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.message || "Registration failed");
      }
      const data = await res.json();
      localStorage.setItem("token", data.token);
      const decoded = jwtDecode(data.token);
      if (decoded.company_type === "Buyer") {
        navigate("/createProject");
      } else if (decoded.company_type === "Supplier") {
        navigate("/createQuotation");
      } else {
        navigate("/");
      }
    } catch (err) {
      setServerError(err.message);
    } finally {
      setIsLoading(false);
    }
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
              <svg width="24" height="24" viewBox="0 0 16 16" fill="none">
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
          <h2 className={styles.title}>Create your account</h2>
          <form onSubmit={handleSubmit} className={isLoading ? styles.formLoading : ""}>
            {serverError && (
              <div className={styles.serverError} role="alert">
                <span>⚠</span>
                {serverError}
              </div>
            )}

            {/* Personal Info */}
            <div className={styles.formSection}>
              <div className={styles.sectionTitle}>Personal Info</div>
              <div className={styles.inputGroup}>
                <label htmlFor="name" className={styles.label}>Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  className={`${styles.input} ${errors.name ? styles.inputError : ""}`}
                  value={form.name}
                  onChange={handleChange}
                  placeholder="Enter your name"
                  disabled={isLoading}
                  autoComplete="name"
                />
                {errors.name && <div className={styles.error}>{errors.name}</div>}
              </div>
              <div className={styles.inputGroup}>
                <label htmlFor="email" className={styles.label}>Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  className={`${styles.input} ${errors.email ? styles.inputError : ""}`}
                  value={form.email}
                  onChange={handleChange}
                  placeholder="Enter your email"
                  disabled={isLoading}
                  autoComplete="email"
                />
                {errors.email && <div className={styles.error}>{errors.email}</div>}
              </div>
              <div className={styles.inputGroup}>
                <label htmlFor="phone" className={styles.label}>Phone Number</label>
                <PhoneInput
                  country="in"
                  value={form.phone}
                  onChange={handlePhoneChange}
                  disabled={isLoading}
                  inputProps={{
                    name: "phone",
                    id: "phone",
                    required: true,
                    autoFocus: false,
                    autoComplete: "tel"
                  }}
                />
                {errors.phone && <div className={styles.error}>{errors.phone}</div>}
              </div>
            </div>

            {/* Company Info */}
            <div className={styles.formSection}>
              <div className={styles.sectionTitle}>Company Info</div>
              <div className={styles.inputGroup}>
                <label htmlFor="designation" className={styles.label}>Designation</label>
                <input
                  type="text"
                  id="designation"
                  name="designation"
                  className={`${styles.input} ${errors.designation ? styles.inputError : ""}`}
                  value={form.designation}
                  onChange={handleChange}
                  placeholder="Enter your designation"
                  disabled={isLoading}
                  autoComplete="organization-title"
                />
                {errors.designation && <div className={styles.error}>{errors.designation}</div>}
              </div>
              <div className={styles.inputGroup}>
                <label htmlFor="companyId" className={styles.label}>Company ID</label>
                <input
                  type="text"
                  id="companyId"
                  name="companyId"
                  className={`${styles.input} ${errors.companyId ? styles.inputError : ""}`}
                  value={form.companyId}
                  onChange={handleChange}
                  placeholder="Enter your company ID"
                  disabled={isLoading}
                  autoComplete="organization"
                />
                {errors.companyId && <div className={styles.error}>{errors.companyId}</div>}
              </div>
            </div>

            {/* Security */}
            <div className={styles.formSection}>
              <div className={styles.sectionTitle}>Security</div>
              <div className={styles.inputGroup}>
                <label htmlFor="password" className={styles.label}>Password</label>
                <div className={styles.passwordContainer}>
                  <input
                    type={passwordVisible ? "text" : "password"}
                    id="password"
                    name="password"
                    className={`${styles.input} ${styles.passwordInput} ${errors.password ? styles.inputError : ""}`}
                    value={form.password}
                    onChange={handleChange}
                    placeholder="Create a password"
                    disabled={isLoading}
                    autoComplete="new-password"
                  />
                  <button
                    type="button"
                    className={styles.eye_icon}
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
                {errors.password && <div className={styles.error}>{errors.password}</div>}
              </div>
            </div>

            <button
              type="submit"
              className={`${styles.signInButton} ${isLoading ? styles.loading : ""}`}
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <div className={styles.spinner} />
                  Creating Account...
                </>
              ) : (
                "Register"
              )}
            </button>
          </form>
          <div className={styles.account}>
            <span>Already have an account? </span>
            <Link to="/login">Sign In</Link>
          </div>
        </div>
      </div>
    </>
  );
}

export default Register;
