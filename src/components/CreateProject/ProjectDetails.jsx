import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import styles from "./ProjectDetails.module.css";

function ProjectDetails() {
  const { projectId } = useParams();
  const navigate = useNavigate();
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const apiUrl = process.env.REACT_APP_API_URL;
  console.log(projectId);
  useEffect(() => {
    setLoading(true);
    fetch(`${apiUrl}/project/${projectId}`, {
      headers: {
        "x-auth-token": localStorage.getItem("token"),
        "Content-Type": "application/json"
      }
    })
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch project");
        return res.json();
      })
      .then((data) => {
        setProject(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, [apiUrl, projectId]);
  console.log(project);
  if (loading) {
    return <div className={styles.loading}>Loading project...</div>;
  }
  if (error) {
    return <div className={styles.error}>{error}</div>;
  }
  if (!project) {
    return <div className={styles.error}>Project not found.</div>;
  }

  return (
    <div className={styles.projectDetailsPage}>
      <button
        className={styles.dashboardBtn}
        onClick={() => navigate("/dashboard")}
        type="button"
      >
        ← Go to Dashboard
      </button>

      <div className={styles.projectCard}>
        <h2 className={styles.projectTitle}>
          {project.project_name}
        </h2>
        <div className={styles.projectInfo}>
          <div>
            <strong>Location:</strong>
            <br />
            {project.project_location}
          </div>
          <div>
            <strong>Type:</strong>
            <br />
            {project.project_type}
          </div>
          <div>
            <strong>Work Type:</strong>
            <br />
            {project.workType}
          </div>
          <div>
            <strong>Site Incharge:</strong>
            <br />
            {project.siteInchargeName}
            {" "}
            (
            {project.siteInchargeNumber}
            )
          </div>
          <div>
            <strong>Client:</strong>
            <br />
            {project.privateDepartmentClient || project.governmentDepartmentName || "-"}
          </div>
          <div>
            <strong>Approved Brands:</strong>
            <br />
            {project.approvedBrands || "-"}
          </div>
          <div>
            <strong>Created At:</strong>
            <br />
            {new Date(project.createdAt).toLocaleDateString()}
          </div>
        </div>
      </div>

      <div className={styles.rfqSection}>
        <h3>
          RFQs Created
          <br />
          (
          {project.rfqs?.length || 0}
          )
        </h3>
        {project.rfqs && project.rfqs.length > 0 ? (
          <div className={styles.rfqList}>
            {project.rfqs.map((rfq) => (
              <div key={rfq.id} className={styles.rfqCard}>
                <div>
                  <strong>{rfq.title}</strong>
                </div>
                <div>
                  <span
                    className={
                      `${styles.rfqStatus} ${
                        rfq.status === "Submitted"
                          ? styles.rfqStatusSubmitted
                          : styles.rfqStatusOther
                      }`
                    }
                  >
                    {rfq.status}
                  </span>
                </div>
                <div>
                  <small>
                    Created:
                    {" "}
                    {new Date(rfq.createdAt).toLocaleDateString()}
                    {" | "}
                    Preferred Delivery:
                    {" "}
                    {new Date(rfq.preferredDeliveryDate).toLocaleDateString()}
                  </small>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className={styles.noRfqs}>No RFQs have been created for this project yet.</div>
        )}
      </div>
    </div>
  );
}

export default ProjectDetails;
