import React, { useState } from "react";
import styles from "./RegistrationPage.module.css";
import ProgressBar from "./ProgressBar";
import FormSection from "./FormSection";
import SubmitButton from "./SubmitButton";

function RegistrationPage() {
  const [companyName, setCompanyName] = useState("");
  const [streetAddress, setStreetAddress] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [zipCode, setZipCode] = useState("");
  const [gst, setgstNumber] = useState("");
  const [companyType, setCompanyType] = useState("");
  const [errors, setErrors] = React.useState({});
  const [serverError, setServerError] = React.useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({});

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
      return;
    }

    const companyData = {
      name: companyName,
      address: `${streetAddress}, ${city}, ${state}, ${zipCode}`,
      gst,
      company_type: companyType
    };
    try {
      // Sending POST request to the backend
      const response = await fetch("http://localhost:3000/company", {
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
      window.location.href = "/dashboard";
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
      <main className={styles.registrationPage}>
        <div className={styles.container}>
          <div className={styles.contentWrapper}>
            <div className={styles.formContainer}>
              <form className={styles.form} onSubmit={handleSubmit}>
                <ProgressBar currentStep={1} totalSteps={5} />

                <h1 className={styles.title}>Company Details</h1>

                <div className={styles.formGrid}>
                  {serverError && (
                    <div className={styles.errorMessage}>
                      {serverError}
                    </div>
                  )}
                  <FormSection
                    label="Company Name"
                    value={companyName}
                    onChange={(e) => setCompanyName(e.target.value)}
                  />
                  {errors.companyName && (
                    <p className={styles.errorMessage}>
                      {errors.companyName}
                    </p>
                  )}
                  <FormSection
                    label="Street Address"
                    value={streetAddress}
                    onChange={(e) => setStreetAddress(e.target.value)}
                    tag="textarea"
                  />
                  {errors.streetAddress && (
                    <p className={styles.errorMessage}>
                      {errors.streetAddress}
                    </p>
                  )}
                  <div className={styles.cityStateGroup}>
                    <FormSection
                      label="City"
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                    />
                    {errors.city && (
                    <p className={styles.errorMessage}>
                      {errors.city}
                    </p>
                    )}
                    <FormSection
                      label="State"
                      value={state}
                      onChange={(e) => setState(e.target.value)}
                    />
                    {errors.state && (
                      <p className={styles.errorMessage}>
                        {errors.state}
                      </p>
                    )}
                  </div>

                  <FormSection
                    label="Zip Code"
                    value={zipCode}
                    onChange={(e) => setZipCode(e.target.value)}
                  />
                  {errors.zipCode && (
                    <p className={styles.errorMessage}>
                      {errors.zipCode}
                    </p>
                  )}
                  <FormSection
                    label="GST Number"
                    value={gst}
                    onChange={(e) => setgstNumber(e.target.value)}
                  />
                  {errors.gst && (
                    <p className={styles.errorMessage}>
                      {errors.gst}
                    </p>
                  )}
                  <label htmlFor="company_type" className={styles.label}>
                    <span className={styles.labelText}>Company Type:</span>
                    <select
                      id="company_type"
                      value={companyType}
                      onChange={(e) => setCompanyType(e.target.value)}
                      className={styles.input}
                    >
                      <option value="">Select Company Type</option>
                      <option value="Supplier">Supplier</option>
                      <option value="Buyer">Buyer</option>
                    </select>
                  </label>
                  {errors.companyType && (
                    <p className={styles.errorMessage}>
                      {errors.companyType}
                    </p>
                  )}
                </div>

                <div className={styles.submitSection}>
                  <SubmitButton>Register & Proceed</SubmitButton>
                </div>
              </form>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}

export default RegistrationPage;
