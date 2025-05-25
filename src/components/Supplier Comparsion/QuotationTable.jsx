import React, { useState, useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import {
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper,
  FormControl, InputLabel, Select, MenuItem
} from "@mui/material";
import styles from "./SupplierComparison.module.css";

function QuotationTable({ rfqId }) {
  const [summary, setSummary] = useState({});
  const [selectedMaterial, setSelectedMaterial] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const apiUrl = process.env.REACT_APP_API_URL;

  useEffect(() => {
    const fetchSummary = async () => {
      try {
        const response = await fetch(`${apiUrl}/rfq/rfq/${rfqId}`);
        if (!response.ok) {
          throw new Error("Failed to fetch RFQ summary");
        }
        const data = await response.json();
        setSummary(data);

        // Set initial selected material to first item if exists
        if (data.items && data.items.length > 0) {
          setSelectedMaterial(data.items[0].type);
        }
      } catch (err) {
        console.error(err);
        setError("Could not load quotation details.");
      } finally {
        setLoading(false);
      }
    };

    fetchSummary();
  }, [rfqId]);
  
  // Group quotationItems by supplier
  const supplierCoverage = useMemo(() => {
    const map = {};
    summary.items?.forEach((item) => {
      item.quotationItems?.forEach((qi) => {
        const supplierKey = qi.quotation?.supplierName || "Unknown Supplier";
        if (!map[supplierKey]) map[supplierKey] = { items: [], supplier: qi.quotation };
        map[supplierKey].items.push({
          rfqItemId: item.id,
          type: item.type,
          price: qi.price,
          totalCost: qi.totalCost,
          quotationItemId: qi.id,
          deliveryTimeWeeks: qi.quotation?.deliveryTimeWeeks,
          paymentTerms: qi.quotation?.paymentTerms,
        });
      });
    });
    return map;
  }, [summary]);

  // Suppliers who quoted for all items
  const suppliersWithFullOffer = Object.entries(supplierCoverage)
    .filter(([_, data]) => data.items.length
    === (summary.items?.length || 0) && data.items.length > 1)
    .map(([supplierName, data]) => ({ supplierName, ...data }));

  const suppliersWithPartialOffer = Object.entries(supplierCoverage)
    .filter(([_, data]) => data.items.length < (summary.items?.length || 0)
    && data.items.length > 1)
    .map(([supplierName, data]) => ({ supplierName, ...data }));

  // Handler for accepting full offer
  const handleAcceptFullOffer = (supplierData) => {
    const itemsWithDetails = supplierData.items.map((poItem) => {
      const rfqItem = summary.items.find((item) => item.id === poItem.rfqItemId);
      const quotationItem = rfqItem.quotationItems.find((qi) => qi.id === poItem.quotationItemId);
      return {
        ...poItem,
        quantity: rfqItem?.quantity,
        unit: rfqItem?.unit,
        rfqItemId: rfqItem?.id,
        quotationItemId: quotationItem?.id,
        quotationId: quotationItem?.quotationId,
      };
    });
    navigate("/purchaseOrder", {
      state: {
        rfqId,
        deliveryLocation: summary.deliveryLocation,
        supplier: supplierData.supplier,
        items: itemsWithDetails,
        isFullOffer: true,
      },
    });
  };

  // Handler for accepting partial offer
  const handleAcceptPartialOffer = (supplierData) => {
    const itemsWithDetails = supplierData.items.map((poItem) => {
      const rfqItem = summary.items.find((item) => item.id === poItem.rfqItemId);
      const quotationItem = rfqItem.quotationItems.find((qi) => qi.id === poItem.quotationItemId);
      return {
        ...poItem,
        quantity: rfqItem?.quantity,
        unit: rfqItem?.unit,
        rfqItemId: rfqItem?.id,
        quotationItemId: quotationItem?.id,
        quotationId: quotationItem?.quotationId,
      };
    });

    navigate("/purchaseOrder", {
      state: {
        rfqId,
        deliveryLocation: summary.deliveryLocation,
        supplier: supplierData.supplier,
        items: itemsWithDetails,
        isFullOffer: false,
      },
    });
  };

  // Prepare material map for dropdown/table
  const materialMap = useMemo(() => {
    const map = {};
    summary.items?.forEach((item) => {
      if (!map[item.type]) map[item.type] = [];
      item.quotationItems?.forEach((qi) => {
        map[item.type].push({
          ...qi,
          ...qi.quotation,
          rfqItemId: item.id,
        });
      });
    });
    return map;
  }, [summary]);

  const suppliers = materialMap[selectedMaterial] || [];

  // Sort and rank suppliers for the table
  const rankedSuppliers = useMemo(() => {
    const arr = [...suppliers];
    arr.sort((a, b) => {
      const aCost = a.totalCost ?? a.price ?? Infinity;
      const bCost = b.totalCost ?? b.price ?? Infinity;
      return aCost - bCost;
    });
    return arr.map((supplier, idx) => ({
      ...supplier,
      ranking: `L${idx + 1}`,
    }));
  }, [suppliers]);

  // Color map for rankings
  const colorMap = {
    L1: "#d4edda", // green
    L2: "#fff3cd", // yellow
    L3: "#f8d7da", // red
  };

  const handleMaterialChange = (event) => {
    setSelectedMaterial(event.target.value);
  };

  if (loading) return <p>Loading quotations...</p>;
  if (error) return <p>{error}</p>;

  const handleSendPO = (supplier) => {
    const itemPurchased = summary.items.find((item) => item.id === supplier.rfqItemId);
    const quotationItem = itemPurchased.quotationItems.find(
      (qi) => qi.id === supplier.quotationItemId
    );

    navigate("/purchaseOrder", {
      state: {
        rfqId,
        deliveryLocation: summary.deliveryLocation,
        supplier,
        quantity: itemPurchased?.quantity,
        unit: itemPurchased?.unit,
        itemType: itemPurchased?.type,
        rfqItemId: itemPurchased?.id,
        quotationItemId: quotationItem?.id,
        quotationId: quotationItem?.quotationId,
        price: quotationItem?.price,
        totalCost: quotationItem?.totalCost,
        deliveryTimeWeeks: quotationItem?.quotation?.deliveryTimeWeeks,
        paymentTerms: quotationItem?.quotation?.paymentTerms,
      },
    });
  };

  return (
    <div className={styles.tableWrapper}>
      {/* Material Selector */}
      <FormControl className={styles.materialSelector} sx={{ minWidth: 200, marginBottom: 3 }}>
        <InputLabel id="material-select-label">Material</InputLabel>
        <Select
          labelId="material-select-label"
          id="material-select"
          value={selectedMaterial}
          label="Material"
          onChange={handleMaterialChange}
        >
          {Object.keys(materialMap).map((materialType) => (
            <MenuItem key={materialType} value={materialType}>
              {materialType}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      {/* Supplier Quotations Table */}
      <TableContainer component={Paper} className={styles.tableContainer}>
        <Table stickyHeader>
          <TableHead className={styles.tableHeader}>
            <TableRow>
              <TableCell className={styles.headerCell}>Supplier</TableCell>
              <TableCell className={styles.headerCell}>Price</TableCell>
              <TableCell className={styles.headerCell}>Total Cost</TableCell>
              <TableCell className={styles.headerCell}>Delivery Time</TableCell>
              <TableCell className={styles.headerCell}>Payment Terms</TableCell>
              <TableCell className={styles.headerCell}>Ranking</TableCell>
              <TableCell className={styles.headerCell}>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody className={styles.tableBody}>
            {rankedSuppliers.map((supplier, index) => (
              <TableRow
                key={`${selectedMaterial}-${supplier.quotationId || index}`}
                className={styles.tableRow}
              >
                <TableCell className={`${styles.supplierName} ${styles.cell}`}>
                  {supplier.supplierName || "N/A"}
                </TableCell>
                <TableCell className={styles.cell}>
                  Rs.
                  {supplier.price?.toLocaleString()}
                </TableCell>
                <TableCell className={styles.cell}>
                  Rs.
                  {supplier.totalCost?.toLocaleString()}
                </TableCell>
                <TableCell className={styles.cell}>
                  {supplier.deliveryTimeWeeks}
                  {" "}
                  weeks
                </TableCell>
                <TableCell className={styles.cell}>{supplier.paymentTerms}</TableCell>
                <TableCell className={styles.cell}>
                  <span
                    className={styles.ranking}
                    style={{
                      backgroundColor: colorMap[supplier.ranking] || "#f8d7da"
                    }}
                  >
                    {supplier.ranking}
                  </span>
                </TableCell>
                <TableCell className={styles.cell}>
                  <button
                    type="button"
                    className={styles.sendButton}
                    onClick={() => handleSendPO(supplier)}
                  >
                    Send PO
                  </button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* --- Supplier Offer Summary BELOW Table --- */}
      <div className={styles.offerSummary}>
        <h3 className={styles.offerTitle}>Supplier Offers</h3>
        {suppliersWithFullOffer.length > 0 && (
          <div className={styles.offerSection}>
            <h4 className={styles.offerSubTitle}>Suppliers quoting for all items:</h4>
            {suppliersWithFullOffer.map((data) => (
              <div key={data.supplierName} className={styles.fullOfferBox}>
                <span className={styles.supplierFullName}>{data.supplierName}</span>
                <span className={styles.fullOfferItems}>
                  (
                  {data.items.length}
                  {" "}
                  items:
                  {data.items.map((i) => i.type).join(", ")}
                  )
                </span>
                <button
                  type="button"
                  className={styles.acceptFullOfferButton}
                  onClick={() => handleAcceptFullOffer(data)}
                >
                  Accept Full Offer
                </button>
              </div>
            ))}
          </div>
        )}
        {suppliersWithPartialOffer.length > 0 && (
          <div className={styles.offerSection}>
            <h4 className={styles.offerSubTitle}>Suppliers quoting for some items:</h4>
            {suppliersWithPartialOffer.map((data) => (
              <div key={data.supplierName} className={styles.partialOfferBox}>
                <span className={styles.supplierPartialName}>{data.supplierName}</span>
                <span className={styles.partialOfferItems}>
                  (quoted for:
                  {data.items.map((i) => i.type).join(", ")}
                  )
                </span>
                <button
                  type="button"
                  className={styles.acceptPartialOfferButton}
                  onClick={() => handleAcceptPartialOffer(data)}
                >
                  Accept These Items
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

QuotationTable.propTypes = {
  rfqId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
};

export default QuotationTable;
