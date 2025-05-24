import React from "react";
import UploadFileOutlinedIcon from "@mui/icons-material/UploadFileOutlined";
import PendingActionsOutlinedIcon from "@mui/icons-material/PendingActionsOutlined";
import DescriptionOutlinedIcon from "@mui/icons-material/DescriptionOutlined";
import LocalShippingOutlinedIcon from "@mui/icons-material/LocalShippingOutlined";
import Cards from "./Cards";

const summaryData = [
  {
    title: "Total RFQs Created",
    icon: <UploadFileOutlinedIcon />,
    value: 1
  },
  {
    title: "Pending PO Approvals",
    icon: <PendingActionsOutlinedIcon />,
    value: 2
  },
  {
    title: "Active Orders",
    icon: <DescriptionOutlinedIcon />,
    value: 3
  },
  {
    title: "Orders Delivered",
    icon: <LocalShippingOutlinedIcon />,
    value: 4
  }
];

function SummaryCards() {
  return (
    <Cards summaryData={summaryData} />
  );
}

export default SummaryCards;
