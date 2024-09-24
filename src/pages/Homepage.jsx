import React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu"; // Import Menu Icon for mobile
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import DashboardIcon from "@mui/icons-material/Dashboard";
import VideoLibraryIcon from "@mui/icons-material/VideoLibrary";
import LibraryBooksIcon from "@mui/icons-material/LibraryBooks";
import TuneIcon from "@mui/icons-material/Tune";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import { Outlet, Link, useLocation } from "react-router-dom"; // Import useLocation

const drawerWidth = 280;

export default function Homepage({ window }) {
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const location = useLocation(); // Get the current location

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawer = (
    <div className="bg-[#101011] text-white h-full">
      <div className="p-2 flex items-center">
        <img
          src={`${process.env.PUBLIC_URL}/images/Cahero.png`}
          alt=""
          className="h-auto w-auto"
        />
      </div>
      <div className="mx-6">
        <List className="space-y-2">
          {[
            { text: "Dashboard", icon: <DashboardIcon />, link: "/" },
            { text: "Webinar", icon: <VideoLibraryIcon />, link: "/webinar" },
            { text: "Books", icon: <LibraryBooksIcon />, link: "/all-books" },
            { text: "Lectures", icon: <VideoLibraryIcon />, link: "/lectures" },
            {
              text: "Profile Settings",
              icon: <TuneIcon />,
              link: "/profile-settings",
            },
            {
              text: "Subscription Plans",
              icon: <CalendarTodayIcon />,
              link: "/subscription-plans",
            },
          ].map((item) => (
            <ListItem key={item.text} disablePadding>
              <Link to={item.link} className="w-full">
                <ListItemButton
                  sx={{
                    backgroundColor:
                      location.pathname === item.link
                        ? "#ffffff1a"
                        : "transparent",
                    borderRadius: "12px",
                    "&:hover": {
                      backgroundColor: "#ffffff33",
                    },
                  }}
                >
                  <ListItemIcon
                    sx={{
                      color: "white",
                      fontWeight:
                        location.pathname === item.link ? "bold" : "normal",
                    }}
                  >
                    {item.icon}
                  </ListItemIcon>
                  <ListItemText
                    primary={item.text}
                    primaryTypographyProps={{
                      fontSize: 18,
                      fontWeight:
                        location.pathname === item.link ? "bold" : "normal",
                      color: "white",
                    }}
                  />
                </ListItemButton>
              </Link>
            </ListItem>
          ))}
        </List>
      </div>
    </div>
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
          backgroundColor: "transparent", // Make AppBar transparent
          boxShadow: "none", // Remove shadow
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', padding: '0 16px' }}>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: "none" } }}
          >
            <MenuIcon />
          </IconButton>
        </Box>
      </AppBar>
      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        aria-label="mailbox folders"
      >
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle} // Close drawer on mobile when clicked outside
          ModalProps={{
            keepMounted: true, // Better open performance on mobile
          }}
          sx={{
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
              backgroundColor: "#131213",
            },
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: {
              xs: "none",
              sm: "block",
              md: "block",
              lg: "block",
              xl: "block",
            },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
              backgroundColor: "#131213",
            },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>
      <Outlet />
    </Box>
  );
}
