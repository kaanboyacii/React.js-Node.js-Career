import React, { useState } from "react";
import { Link } from "react-router-dom";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import MenuIcon from "@mui/icons-material/Menu";
import AccountCircle from "@mui/icons-material/AccountCircle";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import AppsIcon from "@mui/icons-material/Apps";
import EventIcon from "@mui/icons-material/Event";
import LogoutIcon from "@mui/icons-material/Logout";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { companyLogout } from "../../redux/companySlice";
import "./panel.scss";
import Logo from "../../img/logo-back.png";
import { Avatar } from "@mui/material";

const CustomAppBar = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = useState(null);
  const dispatch = useDispatch();

  const handleLogout = async (e) => {
    window.location.href = "/company-login";
    e.preventDefault();
    dispatch(companyLogout());
    const res = await axios.post("/auth/company-logout");
  };

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const menuId = "primary-search-account-menu";
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      id={menuId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem component={Link} to="/company-panel/profile">
        <AccountCircle /> Profilim
      </MenuItem>
      <MenuItem onClick={handleLogout}>
        <LogoutIcon /> Çıkış yap
      </MenuItem>
    </Menu>
  );

  const mobileMenuId = "primary-search-account-menu-mobile";
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem onClick={handleProfileMenuOpen}>
        <IconButton
          size="large"
          aria-label="account of current user"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          color="inherit"
        >
          <AccountCircle />
        </IconButton>
        <p>Profil</p>
      </MenuItem>
    </Menu>
  );
  const handleDrawerToggleLocal = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };

  const { currentCompany } = useSelector((state) => state.company);
  const sidebarContent = (
    <List>
      <ListItem>
        <img src={Logo} alt="Logo" style={{ width: "200px", height: "auto" }} />
      </ListItem>
      <ListItem button component={Link} to="/company-panel/jobs">
        <ListItemIcon>
          <AppsIcon />
        </ListItemIcon>
        <ListItemText primary="İş İlanlarım" />
      </ListItem>
      <ListItem button component={Link} to="/company-panel/events">
        <ListItemIcon>
          <EventIcon />
        </ListItemIcon>
        <ListItemText primary="Etkinliklerim" />
      </ListItem>
      <ListItem button component={Link} to="/company-panel/profile">
        <ListItemIcon>
          <AccountCircleIcon />
        </ListItemIcon>
        <ListItemText primary="Profil" />
      </ListItem>
      <ListItem button onClick={handleLogout}>
        <ListItemIcon>
          <LogoutIcon />
        </ListItemIcon>
        <ListItemText primary="Çıkış Yap" />
      </ListItem>
    </List>
  );

  return (
    <React.Fragment>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="open drawer"
            sx={{ mr: 2 }}
            onClick={handleDrawerToggleLocal}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div">
            {currentCompany.name}
          </Typography>
          <div style={{ flexGrow: 1 }} />
          <div style={{ display: { xs: "none", md: "flex" } }}>
            <IconButton
              size="small"
              edge="end"
              aria-label="account of current user"
              aria-controls={menuId}
              aria-haspopup="true"
              onClick={handleProfileMenuOpen}
              color="inherit"
            >
              <Avatar
                alt="Company Logo"
                sx={{ width: 25, height: 25 }}
                src={currentCompany.img}
                onClick={handleProfileMenuOpen}
              />
            </IconButton>
          </div>
        </Toolbar>
      </AppBar>
      <Drawer
        anchor="left"
        open={isDrawerOpen}
        onClose={handleDrawerToggleLocal}
      >
        {sidebarContent}
      </Drawer>
      {renderMobileMenu}
      {renderMenu}
    </React.Fragment>
  );
};

export default CustomAppBar;
