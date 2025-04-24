import React from "react";
import { useNavigate } from "react-router-dom";
import SearchIcon from "@mui/icons-material/Search";
import GradingOutlinedIcon from "@mui/icons-material/GradingOutlined";
import LocalShippingOutlinedIcon from "@mui/icons-material/LocalShippingOutlined";
import GroupOutlinedIcon from "@mui/icons-material/GroupOutlined";
import CreditCardOutlinedIcon from "@mui/icons-material/CreditCardOutlined";
import ContentCutOutlinedIcon from "@mui/icons-material/ContentCutOutlined";
import PieChartOutlineOutlinedIcon from "@mui/icons-material/PieChartOutlineOutlined";
import AutoGraphOutlinedIcon from "@mui/icons-material/AutoGraphOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
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
  { icon: "URL_HELP_ICON", label: "Help Center", path: "/help" },
  { icon: "URL_FEEDBACK_ICON", label: "Feedback", path: "/feedback" }
];

function Sidebar() {
  const navigate = useNavigate();

  const handleNavigation = (path) => {
    navigate(path);
  };

  return (
    <aside className={styles.sidebar}>
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
            className={styles.navItem}
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
            className={styles.footerItem}
            onClick={() => handleNavigation(item.path)}
          >
            <div dangerouslySetInnerHTML={{ __html: item.icon }} />
            <span>{item.label}</span>
          </button>
        ))}
      </footer>
    </aside>
  );
}

export default Sidebar;
