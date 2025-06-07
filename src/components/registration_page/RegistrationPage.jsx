import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./RegistrationPage.module.css";
import FormSection from "./FormSection";

function RegistrationPage() {
  const [companyName, setCompanyName] = useState("");
  const [streetAddress, setStreetAddress] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [zipCode, setZipCode] = useState("");
  const [gst, setgstNumber] = useState("");
  const [companyType, setCompanyType] = useState("");
  const [errors, setErrors] = useState({});
  const [serverError, setServerError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isRegistered, setIsRegistered] = useState(false);
  const [companyId, setCompanyId] = useState("");
  const [showId, setShowId] = useState(false);
  const [isCopied, setIsCopied] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({});
    setServerError("");
    setIsSubmitting(true);

    const validationErrors = {};

    if (!companyName) validationErrors.companyName = "Company Name is required.";
    if (!streetAddress) validationErrors.streetAddress = "Street Address is required.";
    if (!city) validationErrors.city = "City is required.";
    if (!state) validationErrors.state = "State is required.";
    if (!zipCode) validationErrors.zipCode = "Zip code is required.";
    if (!gst) validationErrors.gst = "GST Number is required.";
    if (!companyType) validationErrors.companyType = "Company Type is required.";

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      setIsSubmitting(false);
      return;
    }

    const companyData = {
      name: companyName,
      address: `${streetAddress}, ${city}, ${state}, ${zipCode}`,
      gst,
      company_type: companyType
    };

    const apiUrl = process.env.REACT_APP_API_URL;

    try {
      const response = await fetch(`${apiUrl}/company`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(companyData)
      });
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Something went wrong");
      }
      const result = await response.json();
      setCompanyId(result.id || result.company?.id);
      setIsRegistered(true);
    } catch (error) {
      setServerError(error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(companyId);
      setIsCopied(true);
      // Reset the tick back to copy icon after 2 seconds
      setTimeout(() => {
        setIsCopied(false);
      }, 2000);
    } catch (err) {
      console.error("Failed to copy: ", err);
      // Fallback for older browsers
      const textArea = document.createElement("textarea");
      textArea.value = companyId;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand("copy");
      document.body.removeChild(textArea);
      setIsCopied(true);
      setTimeout(() => {
        setIsCopied(false);
      }, 2000);
    }
  };

  const handleCreateUser = () => {
    navigate("/userRegistration");
  };

  if (isRegistered) {
    return (
      <main className={styles.registrationPage}>
        <div className={styles.successContainer}>
          <div className={styles.successCard}>
            <div className={styles.successIcon}>🎉</div>
            <h1 className={styles.successTitle}>Registration Successful!</h1>
            <p className={styles.successSubtitle}>
              Your company has been successfully registered.
              {" "}
              Please save your Company ID for future reference.
            </p>
            <div className={styles.idSection}>
              <label htmlFor="company_id" className={styles.idLabel}>Your Company ID</label>
              <div className={styles.idContainer}>
                <input
                  id="company_id"
                  type={showId ? "text" : "password"}
                  value={companyId}
                  readOnly
                  className={styles.idInput}
                />
                <button
                  type="button"
                  onClick={() => setShowId(!showId)}
                  className={styles.eyeButton}
                  title={showId ? "Hide ID" : "Show ID"}
                >
                  {showId ? "🙈" : "👁️"}
                </button>
                <button
                  type="button"
                  onClick={copyToClipboard}
                  className={`${styles.copyButton} ${isCopied ? styles.copied : ""}`}
                  title={isCopied ? "Copied!" : "Copy ID"}
                >
                  {isCopied ? "✓" : "📋"}
                </button>
              </div>
            </div>
            <div className={styles.actionButtons}>
              <button
                type="submit"
                onClick={handleCreateUser}
                className={styles.primaryButton}
              >
                Continue to Create User Account
              </button>
            </div>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className={styles.registrationPage}>
      <div className={styles.container}>
        <div className={styles.contentWrapper}>
          <div className={styles.formContainer}>
            <form className={styles.form} onSubmit={handleSubmit}>
              <div className={styles.header}>
                <h1 className={styles.title}>Company Registration</h1>
                <p className={styles.subtitle}>
                  Please provide your company details to get started
                </p>
              </div>

              <div className={styles.formGrid}>
                {serverError && (
                  <div className={styles.errorBanner}>
                    <span className={styles.errorIcon}>⚠️</span>
                    {serverError}
                  </div>
                )}

                <div className={styles.inputGroup}>
                  <FormSection
                    label="Company Name"
                    value={companyName}
                    onChange={(e) => setCompanyName(e.target.value)}
                    placeholder="e.g., ABC Technologies Pvt Ltd"
                    error={errors.companyName}
                    required
                  />
                </div>

                <div className={styles.inputGroup}>
                  <FormSection
                    label="Street Address"
                    value={streetAddress}
                    onChange={(e) => setStreetAddress(e.target.value)}
                    tag="textarea"
                    placeholder="Enter your complete street address including building number, street name, and area"
                    error={errors.streetAddress}
                    required
                  />
                </div>

                <div className={styles.rowGroup}>
                  <div className={styles.inputGroup}>
                    <FormSection
                      label="City"
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      placeholder="e.g., Mumbai"
                      error={errors.city}
                      required
                    />
                  </div>
                  <div className={styles.inputGroup}>
                    <FormSection
                      label="State"
                      value={state}
                      onChange={(e) => setState(e.target.value)}
                      placeholder="e.g., Maharashtra"
                      error={errors.state}
                      required
                    />
                  </div>
                </div>

                <div className={styles.inputGroup}>
                  <FormSection
                    label="Zip Code"
                    value={zipCode}
                    onChange={(e) => setZipCode(e.target.value)}
                    placeholder="e.g., 400001"
                    error={errors.zipCode}
                    required
                  />
                </div>

                <div className={styles.inputGroup}>
                  <FormSection
                    label="GST Number"
                    value={gst}
                    onChange={(e) => setgstNumber(e.target.value)}
                    placeholder="e.g., 22AAAAA0000A1Z5"
                    error={errors.gst}
                    required
                  />
                </div>

                <div className={styles.inputGroup}>
                  <label className={styles.label}>
                    <span className={styles.labelText}>
                      Company Type
                      <span className={styles.required}>*</span>
                    </span>
                    <select
                      value={companyType}
                      onChange={(e) => setCompanyType(e.target.value)}
                      className={`${styles.select} ${errors.companyType ? styles.inputError : ""}`}
                    >
                      <option value="">Select your company type</option>
                      <option value="Supplier">Supplier</option>
                      <option value="Buyer">Buyer</option>
                    </select>
                    {errors.companyType && (
                      <span className={styles.errorText}>{errors.companyType}</span>
                    )}
                  </label>
                </div>
              </div>
              <div className={styles.submitSection}>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`${styles.submitButton} ${isSubmitting ? styles.submitting : ""}`}
                >
                  {isSubmitting ? (
                    <>
                      <div className={styles.loader} />
                      <span>Registering...</span>
                    </>
                  ) : (
                    "Register Company"
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </main>
  );
}

export default RegistrationPage;
