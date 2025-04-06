import React from "react";
import UploadFileOutlinedIcon from '@mui/icons-material/UploadFileOutlined';
import PendingActionsOutlinedIcon from '@mui/icons-material/PendingActionsOutlined';
import DescriptionOutlinedIcon from '@mui/icons-material/DescriptionOutlined';
import LocalShippingOutlinedIcon from '@mui/icons-material/LocalShippingOutlined';
import Cards from "./Cards";

const summaryData = [
  {
    title: "Total RFQs Created",
    icon: <UploadFileOutlinedIcon />
  },
  {
    title: "Pending PO Approvals",
    icon: <PendingActionsOutlinedIcon />
  },
  {
    title: "Active Orders",
    icon: <DescriptionOutlinedIcon />
  },
  {
    title: "Orders Delivered",
    icon: <LocalShippingOutlinedIcon />
  }
];

function SummaryCards() {
  return (
    <Cards summaryData={summaryData} />
  );
}

export default SummaryCards;
