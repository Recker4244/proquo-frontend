"use client";

import React, { useState } from "react";
import {
  FiMapPin, FiUser, FiBriefcase
} from "react-icons/fi";
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
    workTypeSpecific: ""
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
    if (errorMessage) {
      setErrorMessage("");
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
    if (errorMessage) {
      setErrorMessage("");
    }
  };

  const validatePhoneNumber = () => {
    if (!formData.siteInchargeNumber) {
      return "Phone number is required.";
    }

    const country = formData.countryData;
    if (!country) {
      return "Invalid country selection.";
    }

    const digits = formData.siteInchargeNumber.replace(/\D/g, "");
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
      workTypeSpecific: "This field is required."
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
      const submissionData = {
        ...formData,
        siteInchargeNumber: `+${formData.siteInchargeNumber}`
      };
      const token = localStorage.getItem("token");
      const apiUrl = process.env.REACT_APP_API_URL;
      const response = await fetch(`${apiUrl}/project`, {
        method: "POST",
        headers: {
          "x-auth-token": token,
          "Content-Type": "application/json"
        },
        body: JSON.stringify(submissionData)
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Submission failed");
      }

      // Small delay to show success
      setTimeout(() => {
        navigate("/dashboard");
      }, 500);
    } catch (err) {
      setErrorMessage(err.message || "An error occurred during submission");
    } finally {
      setIsSubmitting(false);
    }
  };

  const workTypeSpecificLabel = (() => {
    if (formData.workType === "Government") return "Government Department Name";
    if (formData.workType === "Private") return "Private Client";
    return "Work Type Specific";
  })();

  return (
    <main className={styles.container}>
      <link
        href="https://fonts.googleapis.com/css2?family=Manrope:wght@300;400;500;600;700&display=swap"
        rel="stylesheet"
      />
      <h1 className={styles.title}>Create New Project</h1>
      <form className={styles.formContainer} onSubmit={handleSubmit}>
        {errorMessage && (
          <div className={styles.serverError} role="alert">
            <span>⚠</span>
            {errorMessage}
          </div>
        )}

        {/* Project Information */}
        <div className={styles.formSection}>
          <div className={styles.sectionTitle}>Project Information</div>
          <FormInputGroup
            label="Project Name"
            value={formData.project_name}
            onChange={handleChange("project_name")}
            error={errors.project_name}
            disabled={isSubmitting}
          />

          <FormInputGroup
            label="Project Location"
            value={formData.project_location}
            onChange={handleChange("project_location")}
            iconName={<FiMapPin size={20} />}
            error={errors.project_location}
            disabled={isSubmitting}
          />

          <div className={styles.inputGroup}>
            <label htmlFor="project_type" className={styles.inputLabel}>
              <span className={styles.labelText}>Project Type</span>
            </label>
            <div className={styles.inputWrapperSelect}>
              <select
                id="project_type"
                value={formData.project_type}
                onChange={handleChange("project_type")}
                className={`${styles.input} ${errors.project_type ? styles.inputError : ""}`}
                disabled={isSubmitting}
              >
                <option value="">Select Project Type</option>
                <option value="Bridge">Bridge</option>
                <option value="Road">Road</option>
                <option value="Building">Building</option>
              </select>
            </div>
            {errors.project_type && <p className={styles.error}>{errors.project_type}</p>}
          </div>
        </div>

        {/* Site Management */}
        <div className={styles.formSection}>
          <div className={styles.sectionTitle}>Site Management</div>
          <FormInputGroup
            label="Site Incharge Name"
            value={formData.siteInchargeName}
            onChange={handleChange("siteInchargeName")}
            iconName={<FiUser size={20} />}
            error={errors.siteInchargeName}
            disabled={isSubmitting}
          />

          <div className={styles.inputGroup}>
            <label htmlFor="siteInchargeNumber" className={styles.inputLabel}>
              Site Incharge Number
            </label>
            <PhoneInput
              country="in"
              value={formData.siteInchargeNumber}
              onChange={handlePhoneChange}
              disabled={isSubmitting}
              inputProps={{
                name: "siteInchargeNumber",
                required: true,
                id: "siteInchargeNumber"
              }}
              enableSearch
              disableDropdown={false}
              countryCodeEditable={false}
            />
            {errors.siteInchargeNumber && (
              <p className={styles.error}>{errors.siteInchargeNumber}</p>
            )}
          </div>
        </div>

        {/* Work Details */}
        <div className={styles.formSection}>
          <div className={styles.sectionTitle}>Work Details</div>
          <div className={styles.inputGroup}>
            <label htmlFor="workType" className={styles.inputLabel}>
              <span className={styles.labelText}>Work Type</span>
            </label>
            <div className={styles.inputWrapperSelect}>
              <select
                id="workType"
                value={formData.workType}
                onChange={handleChange("workType")}
                className={`${styles.input} ${errors.workType ? styles.inputError : ""}`}
                disabled={isSubmitting}
              >
                <option value="">Select Work Type</option>
                <option value="Government">Government</option>
                <option value="Private">Private</option>
              </select>
            </div>
            {errors.workType && <p className={styles.error}>{errors.workType}</p>}
          </div>

          <FormInputGroup
            label={workTypeSpecificLabel}
            value={formData.workTypeSpecific}
            onChange={handleChange("workTypeSpecific")}
            iconName={<FiBriefcase size={20} />}
            error={errors.workTypeSpecific}
            disabled={isSubmitting}
          />

          <FormInputGroup
            label="Approved Brands (If Any)"
            value={formData.approvedBrands}
            onChange={handleChange("approvedBrands")}
            error={errors.approvedBrands}
            disabled={isSubmitting}
          />
        </div>
        <button
          type="submit"
          className={`${styles.submitButton} ${isSubmitting ? styles.loading : ""}`}
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            <>
              <ClipLoader size={20} color="#ffffff" />
              Creating Project...
            </>
          ) : (
            "Create Project"
          )}
        </button>
      </form>
    </main>
  );
}

export default NewProjectForm;
