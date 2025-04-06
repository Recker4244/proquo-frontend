"use client";

import React from "react";
import styles from "./RegistrationPage.module.css";
import ProgressBar from "./ProgressBar";
import FormSection from "./FormSection";
import FileUploadSection from "./FileUploadSection";
import SubmitButton from "./SubmitButton";

const RegistrationPage = () => {
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
              <form className={styles.form}>
                <ProgressBar currentStep={1} totalSteps={5} />

                <h1 className={styles.title}>Company Details</h1>

                <div className={styles.formGrid}>
                  <FormSection label="Company Name" />
                  <FormSection label="DBA (if different)" />
                  <FormSection label="Street Address" tag="textarea" />

                  <div className={styles.cityStateGroup}>
                    <FormSection label="City" />
                    <FormSection label="State" />
                  </div>

                  <FormSection label="Country" />

                  <div className={styles.postalGroup}>
                    <FormSection label="Zip Code" />
                    <FormSection label="Postal Code" />
                  </div>

                  <FormSection label="Phone Number" />
                  <FormSection label="Email Address" />
                  <FormSection label="Website" />
                </div>

                <div className={styles.uploadSection}>
                  <FileUploadSection iconUrl="https://cdn.builder.io/api/v1/image/assets/TEMP/0ed1dc7ac4b6c59e05ef2e80e047abf2feb504fa0448afcd02be5d474630e06a?placeholderIfAbsent=true&apiKey=36e100f144574c0fa902b4dd3a0d8678" />
                  <FileUploadSection iconUrl="https://cdn.builder.io/api/v1/image/assets/TEMP/d327934bf61aa7b609a3df12315d739f4a8b84609645854b4a12a3f7b60276ab?placeholderIfAbsent=true&apiKey=36e100f144574c0fa902b4dd3a0d8678" />
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
};

export default RegistrationPage;
