import React from "react";
import FormSection from "../registration_page/FormSection";
import styles from "./RFQPage.module.css";

function RFQForm() {
  const [projects, setProjects] = React.useState([]);
  const [selectedProjectId, setSelectedProjectId] = React.useState("");
  const [items, setItems] = React.useState([
    { type: "", quantity: "", unit: "" }
  ]);
  const [title, setTitle] = React.useState("");
  const [deliveryLocation, setDeliveryLocation] = React.useState("");
  const [preferredDeliveryDate, setPreferredDeliveryDate] = React.useState("");
  const [notes, setNotes] = React.useState("");
  const [errors, setErrors] = React.useState({});
  const [errorMessage, setErrorMessage] = React.useState("");

  const apiUrl = process.env.REACT_APP_API_URL;

  React.useEffect(() => {
    fetch(`${apiUrl}/project`)
      .then((res) => res.json())
      .then((data) => setProjects(data))
      .catch((err) => console.error("Error fetching projects:", err));
  }, []);

  const handleItemChange = (index, field, value) => {
    const updatedItems = [...items];
    updatedItems[index][field] = value;
    setItems(updatedItems);
  };

  const addItem = () => {
    setItems([...items, { type: "", quantity: "", unit: "" }]);
  };

  const removeItem = (index) => {
    const updatedItems = items.filter((_, i) => i !== index);
    setItems(updatedItems);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
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

      const data = await response.json();
      console.log("RFQ created successfully:", data);
    } catch (error) {
      setErrorMessage(error.message);
    }
  };

  return (
    <section className={styles.rfqSection}>
      <h2 className={styles.rfqTitle}>Request for Quotation (RFQ)</h2>
      <form onSubmit={handleSubmit}>
        {errorMessage && (
          <p className={styles.serverError}>{errorMessage}</p>
        )}
        <div className={styles.formGroup}>
          <FormSection
            label="Title"
            type="text"
            tag="input"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            error={errors.title}
          />
          {errors.title && <p className={styles.error}>{errors.title}</p>}
          <label htmlFor="project" className={styles.label}>
            <span className={styles.labelText}>Select Project</span>
            <select
              id="project"
              value={selectedProjectId}
              onChange={(e) => setSelectedProjectId(e.target.value)}
              className={styles.input}
              required
            >
              <option value="">Select Project</option>
              {projects.map((project) => (
                <option key={project.id} value={project.id}>
                  {project.project_name}
                </option>
              ))}
            </select>
          </label>
          {errors.selectedProjectId && <p className={styles.error}>{errors.selectedProjectId}</p>}
        </div>

        {items.map((item, index) => (
          <div className={styles.formRow} key={item}>
            <div className={styles.formGroupHalf}>
              <label htmlFor="item" className={styles.label}>
                <span className={styles.labelText}>Item Type</span>
                <select
                  id="item"
                  value={item.type}
                  onChange={(e) => handleItemChange(index, "type", e.target.value)}
                  className={styles.input}
                  required
                >
                  <option value="">Select Item Type</option>
                  <option value="Cement">Cement</option>
                  <option value="Steel">Steel</option>
                  <option value="Iron">Iron</option>
                </select>
              </label>
              {errors[`type_${index}`] && <p className={styles.error}>{errors[`type_${index}`]}</p>}
            </div>

            <div className={styles.formGroupHalf}>
              <FormSection
                label="Quantity"
                type="text"
                tag="input"
                value={item.quantity}
                onChange={(e) => handleItemChange(index, "quantity", e.target.value)}
              />
              {errors[`quantity_${index}`] && <p className={styles.error}>{errors[`quantity_${index}`]}</p>}
            </div>

            <div className={styles.formGroupHalf}>
              <label htmlFor="unit" className={styles.label}>
                <span className={styles.labelText}>Unit</span>
                <select
                  id="unit"
                  value={item.unit}
                  onChange={(e) => handleItemChange(index, "unit", e.target.value)}
                  className={styles.input}
                  required
                >
                  <option value="">Unit</option>
                  <option value="Metric Tons">Metric Tons</option>
                  <option value="Bags">Bags</option>
                </select>
              </label>
              {errors[`unit_${index}`] && <p className={styles.error}>{errors[`unit_${index}`]}</p>}
            </div>

            {items.length > 1 && (
              <button
                type="button"
                onClick={() => removeItem(index)}
                className={styles.removeButton}
              >
                Remove
              </button>
            )}
          </div>
        ))}

        {/* Add Item Button */}
        <div className={styles.formGroup}>
          <button
            type="button"
            onClick={addItem}
            className={styles.secondaryButton}
          >
            + Add Item
          </button>
        </div>

        {/* Other Fields */}
        <div className={styles.formGroup}>
          <FormSection
            label="Delivery Location"
            type="text"
            tag="textarea"
            value={deliveryLocation}
            onChange={(e) => setDeliveryLocation(e.target.value)}
          />
        </div>

        <div className={styles.formGroup}>
          <FormSection
            label="Preferred delivery date"
            type="date"
            tag="input"
            value={preferredDeliveryDate}
            onChange={(e) => setPreferredDeliveryDate(e.target.value)}
          />
        </div>

        <div className={styles.formGroup}>
          <FormSection
            label="Additional notes/requirements"
            type="text"
            tag="textarea"
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
          />
        </div>

        <div className={styles.formAction}>
          <button type="submit" className={styles.primaryButton}>
            Submit RFQ
          </button>
        </div>
      </form>
    </section>
  );
}
export default RFQForm;
