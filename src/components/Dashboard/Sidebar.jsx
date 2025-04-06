import React from "react";
import SearchIcon from '@mui/icons-material/Search';
import GradingOutlinedIcon from '@mui/icons-material/GradingOutlined';
import LocalShippingOutlinedIcon from '@mui/icons-material/LocalShippingOutlined';
import GroupOutlinedIcon from '@mui/icons-material/GroupOutlined';
import CreditCardOutlinedIcon from '@mui/icons-material/CreditCardOutlined';
import ContentCutOutlinedIcon from '@mui/icons-material/ContentCutOutlined';
import PieChartOutlineOutlinedIcon from '@mui/icons-material/PieChartOutlineOutlined';
import AutoGraphOutlinedIcon from '@mui/icons-material/AutoGraphOutlined';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import styles from "./InputDesign.module.css";

const menuItems = [
  { icon: <GradingOutlinedIcon />, label: "Orders" },
  { icon: <LocalShippingOutlinedIcon />, label: "Shipments" },
  { icon: <GroupOutlinedIcon />, label: "Suppliers" },
  { icon: <CreditCardOutlinedIcon />, label: "Invoices" },
  { icon: <ContentCutOutlinedIcon />, label: "Reports" },
  { icon: <PieChartOutlineOutlinedIcon />, label: "Spend" },
  { icon: <AutoGraphOutlinedIcon />, label: "Performance" },
  { icon: <SettingsOutlinedIcon />, label: "Settings" }
];

const footerItems = [
  { icon: "URL_HELP_ICON", label: "Help Center" },
  { icon: "URL_FEEDBACK_ICON", label: "Feedback" }
];

function Sidebar() {
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
          <button type="button" key={item} className={styles.navItem}>
            {item.icon}
            <span>{item.label}</span>
          </button>
        ))}
      </nav>

      <footer className={styles.sidebarFooter}>
        {footerItems.map((item) => (
          <button type="button" key={item} className={styles.footerItem}>
            <div dangerouslySetInnerHTML={{ __html: item.icon }} />
            <span>{item.label}</span>
          </button>
        ))}
      </footer>
    </aside>
  );
}

export default Sidebar;
