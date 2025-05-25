"use client";

import React, { useState } from "react";
import { FiMapPin, FiUser } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import ClipLoader from "react-spinners/ClipLoader";
import styles from "./NewProjectForm.module.css";
import FormInputGroup from "./FormInputGroup";

function NewProjectForm() {
  const [formData, setFormData] = useState({
    project_name: "",
    project_location: "",
    siteInchargeName: "",
    siteInchargeNumber: "",
    approvedBrands: "",
    project_type: "",
    workType: "",
    workTypeSpecific: "",
    company_id: ""
  });

  const [errors, setErrors] = useState({});
  const [errorMessage, setErrorMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  // Generic handler for standard inputs
  const handleChange = (field) => (e) => {
    const { value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [field]: value
    }));
    if (errors[field] && value.trim() !== "") {
      setErrors((prevErrors) => ({
        ...prevErrors,
        [field]: undefined
      }));
    }
  };

  // Phone input handler
  const handlePhoneChange = (value, country) => {
    setFormData((prev) => ({
      ...prev,
      siteInchargeNumber: value,
      countryData: country
    }));

    if (errors.siteInchargeNumber) {
      setErrors((prev) => ({ ...prev, siteInchargeNumber: undefined }));
    }
  };

  const validatePhoneNumber = () => {
    if (!formData.siteInchargeNumber) {
      return "Phone number is required.";
    }

    // Get country data from form state
    const country = formData.countryData;

    if (!country) {
      return "Invalid country selection.";
    }

    // Remove non-digit characters
    const digits = formData.siteInchargeNumber.replace(/\D/g, "");

    // Check against country-specific format
    const requiredLength = country.format.replace(/[^.]/g, "").length;

    if (digits.length < requiredLength) {
      return `Invalid ${country.name} phone number`;
    }

    return null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMessage("");

    // Basic required field validation
    const requiredFields = {
      project_name: "Project Name is required.",
      project_location: "Project Location is required.",
      siteInchargeName: "Site Incharge Name is required.",
      project_type: "Project Type is required.",
      workType: "Work Type is required.",
      workTypeSpecific: "This field is required.",
      company_id: "Company ID is required."
    };

    const validationErrors = {};

    // Check required fields
    Object.entries(requiredFields).forEach(([field, message]) => {
      if (!formData[field]) validationErrors[field] = message;
    });

    // Validate phone number
    const phoneError = validatePhoneNumber();
    if (phoneError) validationErrors.siteInchargeNumber = phoneError;

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      setIsSubmitting(false);
      return;
    }

    try {
      // Format phone number for backend
      const submissionData = {
        ...formData,
        siteInchargeNumber: `+${formData.siteInchargeNumber}`
      };
      const apiUrl = process.env.REACT_APP_API_URL;
      const response = await fetch(`${apiUrl}/project`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(submissionData)
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Submission failed");
      }

      navigate("/dashboard");
    } catch (err) {
      setErrorMessage(err.message || "An error occurred during submission");
    } finally {
      setIsSubmitting(false);
    }
  };

  const workTypeSpecificLabel = (() => {
    if (formData.workType === "Government") return "Government Department Name";
    if (formData.workType === "Private") return "Private Department Client";
    return "Work Type Specific";
  })();

  return (
    <main className={styles.container}>
      <link
        href="https://fonts.googleapis.com/css2?family=Manrope:wght@400;500;700&display=swap"
        rel="stylesheet"
      />
      <h1 className={styles.title}>New Project</h1>
      <form className={styles.formContainer} onSubmit={handleSubmit}>
        {errorMessage && (
          <p className={styles.serverError}>{errorMessage}</p>
        )}

        {/* Project Name */}
        <FormInputGroup
          label="Project Name"
          value={formData.project_name}
          onChange={handleChange("project_name")}
          error={errors.project_name}
        />

        {/* Project Location */}
        <FormInputGroup
          id="project_location"
          label="Project Location"
          value={formData.project_location}
          onChange={handleChange("project_location")}
          iconName={<FiMapPin size={20} />}
          error={errors.project_location}
        />

        {/* Site Incharge Name */}
        <FormInputGroup
          id="siteInchargeName"
          label="Site Incharge Name"
          value={formData.siteInchargeName}
          onChange={handleChange("siteInchargeName")}
          iconName={<FiUser size={20} />}
          error={errors.siteInchargeName}
        />

        {/* Phone Input */}
        <div className={styles.inputGroup}>
          {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
          <label htmlFor="siteInchargeNumber" className={styles.inputLabel}>
            Site Incharge Number
            <PhoneInput
              country="in" // Default country
              value={formData.siteInchargeNumber}
              onChange={handlePhoneChange}
              inputProps={{
                name: "siteInchargeNumber",
                required: true,
                id: "siteInchargeNumber"
              }}
              inputClass={styles.input}
              enableSearch
              disableDropdown={false}
              countryCodeEditable={false}
            />
          </label>
          {errors.siteInchargeNumber && (
            <p className={styles.error}>{errors.siteInchargeNumber}</p>
          )}
        </div>

        {/* Approved Brands */}
        <FormInputGroup
          id="approvedBrands"
          label="Approved Brands (If Any)"
          value={formData.approvedBrands}
          onChange={handleChange("approvedBrands")}
        />

        {/* Project Type Dropdown */}
        <div className={styles.inputGroup}>
          <label htmlFor="Project Type" className={styles.inputLabel}>
            <span className={styles.labelText}>Project Type</span>
            <div className={styles.inputWrapperSelect}>
              <select
                id="Project Type"
                value={formData.project_type}
                onChange={handleChange("project_type")}
                className={styles.input}
              >
                <option value="">Select Project Type</option>
                <option value="Bridge">Bridge</option>
                <option value="Road">Road</option>
                <option value="Building">Building</option>
              </select>
            </div>
          </label>
          {errors.project_type && <p className={styles.error}>{errors.project_type}</p>}
        </div>

        {/* Work Type Dropdown */}
        <div className={styles.inputGroup}>
          <label htmlFor="Work Type" className={styles.inputLabel}>
            <span className={styles.labelText}>Work Type</span>
            <div className={styles.inputWrapperSelect}>
              <select
                id="Work Type"
                value={formData.workType}
                onChange={handleChange("workType")}
                className={styles.input}
              >
                <option value="">Select Work Type</option>
                <option value="Government">Government</option>
                <option value="Private">Private</option>
              </select>
            </div>
          </label>
          {errors.workType && <p className={styles.error}>{errors.workType}</p>}
        </div>

        {/* Work Type Specific */}
        <FormInputGroup
          label={workTypeSpecificLabel}
          value={formData.workTypeSpecific}
          onChange={handleChange("workTypeSpecific")}
          error={errors.workTypeSpecific}
        />

        {/* Company ID */}
        <FormInputGroup
          label="Company ID"
          value={formData.company_id}
          onChange={handleChange("company_id")}
          error={errors.company_id}
        />

        {/* Submit Button */}
        <button
          type="submit"
          className={styles.submitButton}
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            <ClipLoader size={20} color="#ffffff" />
          ) : (
            "Submit"
          )}
        </button>
      </form>
    </main>
  );
}

export default NewProjectForm;
