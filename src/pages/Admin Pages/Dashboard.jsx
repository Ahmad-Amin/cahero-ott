import React from "react";
import {
  AppBar,
  Box,
  CssBaseline,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import DashboardIcon from "@mui/icons-material/Dashboard";
import VideoLibraryIcon from "@mui/icons-material/VideoLibrary";
import LibraryBooksIcon from "@mui/icons-material/LibraryBooks";
import TuneIcon from "@mui/icons-material/Tune";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import { Link, Outlet, useLocation } from "react-router-dom";
import { PiChalkboardTeacherBold } from "react-icons/pi";
import AdminNavbar from "../../components/Admin Components/Navbar";

const drawerWidth = 280;

export default function AdminPanelLayout() {
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const location = useLocation();

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  // Updated getPageTitle function
  const getPageTitle = (path) => {
    // Split the path by "/" and filter out any empty strings
    const segments = path.split("/").filter(Boolean);

    // Check if there are at least two segments in the path
    if (segments.length < 2) return "Dashboard"; // Default title if no second segment

    // Get the second segment to decide the title
    const secondSegment = segments[1];

    switch (secondSegment) {
      case "webinars":
        return "Webinars";
      case "video-lecture":
        return "Video Lectures";
      case "recordings":
        return "Recordings";
      case "subscription":
        return "Subscription";
      case "users":
        return "Users";
      case "book-creation":
        return "Book Creation";
      case "profile":
        return "Profile";
      case "notifications":
        return "Notifications";
      default:
        return "Dashboard"; // Fallback title
    }
  };

  const menuItems = [
    { text: "Dashboard", icon: <DashboardIcon />, link: "/dashboard" },
    { text: "Webinar", icon: <PiChalkboardTeacherBold />, link: "/dashboard/webinars" },
    { text: "Video Lectures", icon: <LibraryBooksIcon />, link: "/dashboard/video-lecture" },
    { text: "Recording", icon: <VideoLibraryIcon />, link: "/dashboard/recordings" },
    { text: "Subscription", icon: <TuneIcon />, link: "/dashboard/subscription" },
    { text: "Users", icon: <CalendarTodayIcon />, link: "/dashboard/users" },
    { text: "Book Creation", icon: <CalendarTodayIcon />, link: "/dashboard/book-creation" },
    { text: "Profile", icon: <CalendarTodayIcon />, link: "/dashboard/profile" },
    { text: "Notifications", icon: <CalendarTodayIcon />, link: "/dashboard/notifications" },
  ];

  const drawer = (
    <div className="bg-[#000000] text-white h-full">
      <div className="p-2 flex items-center">
        <img
          src={`${process.env.PUBLIC_URL}/images/Cahero.png`}
          alt="Logo"
          className="h-auto w-auto"
        />
      </div>
      <List className="mx-6 space-y-2">
        {menuItems.map((item) => {
          const isActive =
            (location.pathname === "/dashboard" && item.link === "/dashboard") ||
            (location.pathname.startsWith(item.link) && item.link !== "/dashboard");

          return (
            <ListItem key={item.text} disablePadding>
              <Link to={item.link} className="w-full mx-5">
                <ListItemButton
                  sx={{
                    backgroundColor: isActive ? "#6a55ea" : "transparent",
                    borderRadius: "12px",
                    paddingLeft: "16px",
                    marginBottom: "12px",
                    "&:hover": { backgroundColor: "#3b2f83" },
                  }}
                >
                  <ListItemIcon
                    sx={{
                      color: "white",
                      minWidth: "30px",
                    }}
                  >
                    {item.icon}
                  </ListItemIcon>
                  <ListItemText
                    primary={item.text}
                    primaryTypographyProps={{
                      fontSize: 16,
                      fontWeight: isActive ? "bold" : "normal",
                      color: "white",
                      marginLeft: "8px",
                    }}
                  />
                </ListItemButton>
              </Link>
            </ListItem>
          );
        })}
      </List>
    </div>
  );

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
          zIndex: 1100,
          backgroundColor: "transparent",
          boxShadow: "none",
        }}
      >
        <AdminNavbar pageTitle={getPageTitle(location.pathname)} />
      </AppBar>

      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        aria-label="menu navigation"
      >
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{ keepMounted: true }}
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
            display: { xs: "none", sm: "block" },
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


      <Box
        component="main"
        sx={{
          flexGrow: 1,
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          mt: 15, 
          p: 2,
          backgroundColor: "#101011",
          minHeight: "100vh",
          overflow: "hidden", 
        }}
      >
        <Outlet />
      </Box>
    </Box>
  );
}
