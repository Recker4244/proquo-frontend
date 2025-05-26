"use client";

import React, { useState } from "react";
import { FiPlus, FiTrash2, FiFileText } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import ClipLoader from "react-spinners/ClipLoader";
import styles from "./RFQPage.module.css";

function RFQForm() {
  const [projects, setProjects] = useState([]);
  const [selectedProjectId, setSelectedProjectId] = useState("");
  const [items, setItems] = useState([
    { type: "", quantity: "", unit: "" }
  ]);
  const [title, setTitle] = useState("");
  const [deliveryLocation, setDeliveryLocation] = useState("");
  const [preferredDeliveryDate, setPreferredDeliveryDate] = useState("");
  const [notes, setNotes] = useState("");
  const [errors, setErrors] = useState({});
  const [errorMessage, setErrorMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const navigate = useNavigate();
  const apiUrl = process.env.REACT_APP_API_URL;

  React.useEffect(() => {
    fetch(`${apiUrl}/project`)
      .then((res) => res.json())
      .then((data) => setProjects(data))
      .catch((err) => console.error("Error fetching projects:", err));
  }, [apiUrl]);

  const handleItemChange = (index, field, value) => {
    const updatedItems = [...items];
    updatedItems[index][field] = value;
    setItems(updatedItems);
    // Clear errors for this field
    const errorKey = `${field}_${index}`;
    if (errors[errorKey]) {
      setErrors((prev) => ({ ...prev, [errorKey]: undefined }));
    }
  };

  const addItem = () => {
    setItems([...items, { type: "", quantity: "", unit: "" }]);
  };

  const removeItem = (index) => {
    const updatedItems = items.filter((_, i) => i !== index);
    setItems(updatedItems);
    // Clear errors for removed item
    const newErrors = { ...errors };
    ["type", "quantity", "unit"].forEach((field) => {
      delete newErrors[`${field}_${index}`];
    });
    setErrors(newErrors);
  };

  const handleInputChange = (setter, field) => (e) => {
    const { value } = e.target || {};
    setter(value || "");
    setter(value);
    // Clear errors when user starts typing
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
    if (errorMessage) {
      setErrorMessage("");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMessage("");
    const validationErrors = {};

    if (!title.trim()) validationErrors.title = "Title is required.";
    if (!selectedProjectId) validationErrors.selectedProjectId = "Project selection is required.";
    items.forEach((item, index) => {
      if (!item.type) validationErrors[`type_${index}`] = "Item type is required.";
      if (!item.quantity) validationErrors[`quantity_${index}`] = "Quantity is required.";
      if (!item.unit) validationErrors[`unit_${index}`] = "Unit is required.";
    });
    if (!deliveryLocation.trim()) validationErrors.deliveryLocation = "Delivery location is required.";
    if (!preferredDeliveryDate) validationErrors.preferredDeliveryDate = "Preferred delivery date is required.";

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      setIsSubmitting(false);
      return;
    }

    const rfqData = {
      projectId: selectedProjectId,
      title,
      deliveryLocation,
      preferredDeliveryDate,
      notes,
      items
    };

    try {
      const response = await fetch(`${apiUrl}/rfq`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(rfqData)
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to create RFQ");
      }

      // Small delay to show success
      setTimeout(() => {
        navigate("/dashboard");
      }, 500);
    } catch (error) {
      setErrorMessage(error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className={styles.rfqSection}>
      <h2 className={styles.rfqTitle}>Request for Quotation (RFQ)</h2>
      <p className={styles.rfqDescription}>
        Create a detailed request for quotation to get the best prices from suppliers
      </p>
      <form onSubmit={handleSubmit}>
        {errorMessage && (
          <div className={styles.serverError} role="alert">
            <span>⚠</span>
            {errorMessage}
          </div>
        )}

        {/* Basic Information */}
        <div className={styles.formSection}>
          <div className={styles.sectionTitle}>Basic Information</div>
          <div className={styles.formGroup}>
            <label htmlFor="title" className={styles.label}>
              RFQ Title
            </label>
            <input
              id="title"
              type="text"
              value={title}
              onChange={handleInputChange(setTitle, "title")}
              className={`${styles.input} ${errors.title ? styles.inputError : ""}`}
              placeholder="Enter RFQ title"
              disabled={isSubmitting}
            />
            {errors.title && <p className={styles.error}>{errors.title}</p>}
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="project" className={styles.label}>
              Select Project
            </label>
            <select
              id="project"
              value={selectedProjectId}
              onChange={handleInputChange(setSelectedProjectId, "selectedProjectId")}
              className={`${styles.input} ${errors.selectedProjectId ? styles.inputError : ""}`}
              disabled={isSubmitting}
            >
              <option value="">Select Project</option>
              {projects.map((project) => (
                <option key={project.id} value={project.id}>
                  {project.project_name}
                </option>
              ))}
            </select>
            {errors.selectedProjectId && <p className={styles.error}>{errors.selectedProjectId}</p>}
          </div>
        </div>

        {/* Items Section */}
        <div className={styles.formSection}>
          <div className={styles.sectionTitle}>Items Required</div>
          {items.map((item, index) => (
            <div className={styles.formRow} key={item}>
              <div className={styles.formGroupHalf}>
                <label htmlFor={`item-${index}`} className={styles.label}>
                  Item Type
                </label>
                <select
                  id={`item-${index}`}
                  value={item.type}
                  onChange={(e) => handleItemChange(index, "type", e.target.value)}
                  className={`${styles.input} ${errors[`type_${index}`] ? styles.inputError : ""}`}
                  disabled={isSubmitting}
                >
                  <option value="">Select Item Type</option>
                  <option value="Cement">Cement</option>
                  <option value="Steel">Steel</option>
                  <option value="Iron">Iron</option>
                  <option value="Sand">Sand</option>
                  <option value="Gravel">Gravel</option>
                  <option value="Bricks">Bricks</option>
                </select>
                {errors[`type_${index}`] && <p className={styles.error}>{errors[`type_${index}`]}</p>}
              </div>

              <div className={styles.formGroupHalf}>
                <label htmlFor={`quantity-${index}`} className={styles.label}>
                  Quantity
                </label>
                <input
                  id={`quantity-${index}`}
                  type="number"
                  value={item.quantity}
                  onChange={(e) => handleItemChange(index, "quantity", e.target.value)}
                  className={`${styles.input} ${errors[`quantity_${index}`] ? styles.inputError : ""}`}
                  placeholder="Enter quantity"
                  disabled={isSubmitting}
                  min="1"
                />
                {errors[`quantity_${index}`] && <p className={styles.error}>{errors[`quantity_${index}`]}</p>}
              </div>

              <div className={styles.formGroupHalf}>
                <label htmlFor={`unit-${index}`} className={styles.label}>
                  Unit
                </label>
                <select
                  id={`unit-${index}`}
                  value={item.unit}
                  onChange={(e) => handleItemChange(index, "unit", e.target.value)}
                  className={`${styles.input} ${errors[`unit_${index}`] ? styles.inputError : ""}`}
                  disabled={isSubmitting}
                >
                  <option value="">Select Unit</option>
                  <option value="Metric Tons">Metric Tons</option>
                  <option value="Bags">Bags</option>
                  <option value="Cubic Meters">Cubic Meters</option>
                  <option value="Pieces">Pieces</option>
                  <option value="Kilograms">Kilograms</option>
                </select>
                {errors[`unit_${index}`] && <p className={styles.error}>{errors[`unit_${index}`]}</p>}
              </div>

              {items.length > 1 && (
                <button
                  type="button"
                  onClick={() => removeItem(index)}
                  className={styles.removeButton}
                  disabled={isSubmitting}
                  aria-label="Remove item"
                >
                  <FiTrash2 size={16} />
                  Remove
                </button>
              )}
            </div>
          ))}

          <button
            type="button"
            onClick={addItem}
            className={styles.secondaryButton}
            disabled={isSubmitting}
          >
            <FiPlus size={16} />
            Add Another Item
          </button>
        </div>

        {/* Delivery Details */}
        <div className={styles.formSection}>
          <div className={styles.sectionTitle}>Delivery Details</div>
          <div className={styles.formGroup}>
            <label htmlFor="deliveryLocation" className={styles.label}>
              Delivery Location
            </label>
            <textarea
              id="deliveryLocation"
              value={deliveryLocation}
              onChange={handleInputChange(setDeliveryLocation, "deliveryLocation")}
              className={`${styles.formTextarea} ${errors.deliveryLocation ? styles.inputError : ""}`}
              placeholder="Enter complete delivery address"
              disabled={isSubmitting}
              rows={3}
            />
            {errors.deliveryLocation && <p className={styles.error}>{errors.deliveryLocation}</p>}
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="preferredDeliveryDate" className={styles.label}>
              Preferred Delivery Date
            </label>
            <input
              id="preferredDeliveryDate"
              type="date"
              value={preferredDeliveryDate}
              onChange={handleInputChange(setPreferredDeliveryDate, "preferredDeliveryDate")}
              className={`${styles.input} ${errors.preferredDeliveryDate ? styles.inputError : ""}`}
              disabled={isSubmitting}
              min={new Date().toISOString().split("T")[0]}
            />
            {errors.preferredDeliveryDate
            && <p className={styles.error}>{errors.preferredDeliveryDate}</p>}
          </div>
        </div>

        {/* Additional Information */}
        <div className={styles.formSection}>
          <div className={styles.sectionTitle}>Additional Information</div>
          <div className={styles.formGroup}>
            <label htmlFor="notes" className={styles.label}>
              Additional Notes/Requirements (Optional)
            </label>
            <textarea
              id="notes"
              value={notes}
              onChange={handleInputChange(setNotes, "notes")}
              className={styles.formTextarea}
              placeholder="Any special requirements, quality specifications, or additional notes..."
              disabled={isSubmitting}
              rows={4}
            />
          </div>
        </div>

        <div className={styles.formAction}>
          <button
            type="submit"
            className={`${styles.primaryButton} ${isSubmitting ? styles.loading : ""}`}
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <>
                <ClipLoader size={20} color="#ffffff" />
                Creating RFQ...
              </>
            ) : (
              <>
                <FiFileText size={20} />
                Submit RFQ
              </>
            )}
          </button>
        </div>
      </form>
    </section>
  );
}

export default RFQForm;
