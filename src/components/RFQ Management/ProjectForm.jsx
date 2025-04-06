import React from "react";
import FormSection from "../registration_page/FormSection";
import styles from "./RFQPage.module.css";

function ProjectForm() {
  return (
    <section className={styles.formSection}>
      <h2 className={styles.formTitle}>Create a project</h2>
      <form>
        <div className={styles.formGroup}>
          <FormSection label="Project Name" />
        </div>
        <div className={styles.formGroup}>
          <FormSection label="Project Description" tag="textarea" />
        </div>
        <div className={styles.formAction}>
          <button type="submit" className={styles.primaryButton}>
            Create Project
          </button>
        </div>
      </form>
    </section>
  );
}
export default ProjectForm;
