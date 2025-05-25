import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  Drawer,
  IconButton,
  useMediaQuery,
  useTheme
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import GradingOutlinedIcon from "@mui/icons-material/GradingOutlined";
import LocalShippingOutlinedIcon from "@mui/icons-material/LocalShippingOutlined";
import GroupOutlinedIcon from "@mui/icons-material/GroupOutlined";
import CreditCardOutlinedIcon from "@mui/icons-material/CreditCardOutlined";
import ContentCutOutlinedIcon from "@mui/icons-material/ContentCutOutlined";
import PieChartOutlineOutlinedIcon from "@mui/icons-material/PieChartOutlineOutlined";
import AutoGraphOutlinedIcon from "@mui/icons-material/AutoGraphOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import HelpOutlineOutlinedIcon from "@mui/icons-material/HelpOutlineOutlined";
import FeedbackOutlinedIcon from "@mui/icons-material/FeedbackOutlined";
import styles from "./InputDesign.module.css";

const menuItems = [
  { icon: <GradingOutlinedIcon />, label: "Orders", path: "/orders" },
  { icon: <LocalShippingOutlinedIcon />, label: "Shipments", path: "/shipments" },
  { icon: <GroupOutlinedIcon />, label: "Suppliers", path: "/suppliers" },
  { icon: <CreditCardOutlinedIcon />, label: "Invoices", path: "/invoices" },
  { icon: <ContentCutOutlinedIcon />, label: "Reports", path: "/reports" },
  { icon: <PieChartOutlineOutlinedIcon />, label: "Spend", path: "/spend" },
  { icon: <AutoGraphOutlinedIcon />, label: "Performance", path: "/performance" },
  { icon: <SettingsOutlinedIcon />, label: "Settings", path: "/settings" }
];

const footerItems = [
  { icon: <HelpOutlineOutlinedIcon />, label: "Help Center", path: "/help" },
  { icon: <FeedbackOutlinedIcon />, label: "Feedback", path: "/feedback" }
];

function Sidebar() {
  const navigate = useNavigate();
  const location = useLocation();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const [open, setOpen] = useState(false);

  // Handle navigation and close sidebar on mobile if necessary
  const handleNavigation = (path) => {
    navigate(path);
    if (isMobile) setOpen(false);
  };

  // Determine active route
  const isActive = (path) => location.pathname === path;

  // Effect to close drawer when resizing from mobile to desktop
  useEffect(() => {
    if (!isMobile && open) {
      setOpen(false);
    }
  }, [isMobile, open]);

  const sidebarContent = (
    <div className={`${styles.sidebar} ${open ? styles.sidebarVisible : ""}`}>
      <div className={styles.searchContainer}>
        <div className={styles.searchWrapper}>
          <div className={styles.searchIconWrapper}>
            <SearchIcon className={styles.searchIcon} />
          </div>
          <input type="text" placeholder="Search" className={styles.searchInput} />
        </div>
      </div>

      <nav className={styles.sidebarNav}>
        {menuItems.map((item) => (
          <button
            type="button"
            key={item.label}
            className={`${styles.navItem} ${isActive(item.path) ? styles.activeNavItem : ""}`}
            onClick={() => handleNavigation(item.path)}
          >
            {item.icon}
            <span>{item.label}</span>
          </button>
        ))}
      </nav>

      <footer className={styles.sidebarFooter}>
        {footerItems.map((item) => (
          <button
            type="button"
            key={item.label}
            className={`${styles.footerItem} ${isActive(item.path) ? styles.activeNavItem : ""}`}
            onClick={() => handleNavigation(item.path)}
          >
            {item.icon}
            <span>{item.label}</span>
          </button>
        ))}
      </footer>
    </div>
  );

  return (
    <div>
      {isMobile ? (
        <>
          <IconButton
            onClick={() => setOpen(true)}
            sx={{
              position: "fixed", top: 16, left: 16, zIndex: 1100
            }}
          >
            {/* <GoSidebarCollapse /> */}
          </IconButton>
          <Drawer anchor="left" open={open} onClose={() => setOpen(false)}>
            {sidebarContent}
          </Drawer>
        </>
      ) : (
        sidebarContent
      )}
    </div>
  );
}

export default Sidebar;
