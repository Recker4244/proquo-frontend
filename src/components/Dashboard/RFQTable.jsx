import React from "react";
import styles from "./InputDesign.module.css";

const rfqData = [
  {
    number: "RFQ-0012",
    project: "Office Renovation",
    dueDate: "Sep 28",
    status: "In Progress"
  },
  {
    number: "RFQ-0013",
    project: "New Laptop Purchase",
    dueDate: "Oct 5",
    status: "Approved"
  },
  {
    number: "RFQ-0014",
    project: "Employee Wellness Program",
    dueDate: "Oct 12",
    status: "Pending Approval"
  },
  {
    number: "RFQ-0015",
    project: "Customer Service Training",
    dueDate: "Oct 19",
    status: "Completed"
  },
  {
    number: "RFQ-0016",
    project: "Sustainability Initiative",
    dueDate: "Oct 26",
    status: "In Progress"
  }
];

function RFQTable() {
  return (
    <div className={styles.tableContainer}>
      <table className={styles.rfqTable}>
        <thead>
          <tr>
            <th>RFQ No.</th>
            <th>Project</th>
            <th>Due Date</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {rfqData.map((rfq) => (
            <tr key={rfq.number}>
              <td>{rfq.number}</td>
              <td>{rfq.project}</td>
              <td>{rfq.dueDate}</td>
              <td>
                <span className={styles.statusBadge}>{rfq.status}</span>
              </td>
              <td>
                <button type="button" className={styles.viewDetailsButton}>View Details</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default RFQTable;
