import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import LogoGaiia from "../assets/images/logoGaiia.svg";
import PersonIcon from "@mui/icons-material/Person";
import LogoutIcon from "@mui/icons-material/Logout";
import HomeIcon from "@mui/icons-material/Home";

interface Props {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window?: () => Window;
}

const drawerWidth = 240;
const navItems = [
  { name: "Home", icon: <HomeIcon /> },
  { name: "Profile", icon: <PersonIcon /> },
  { name: "Logout", icon: <LogoutIcon /> },
];

export default function DrawerAppBar(props: Props) {
  const navigate = useNavigate();
  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };

  const onLogOutClick = () => {
    localStorage.clear();
    navigate("/sign-in");
  };

  const onProfileClick = () => {
    navigate("/profile");
  };

  const onHomeClick = () => {
    navigate("/dashboard");
  };

  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar component="nav">
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: "none" } }}
          >
            <MenuIcon />
          </IconButton>

          <Box
            component="div"
            sx={{ flexGrow: 1, display: { xs: "none", sm: "block" } }}
          >
            <Box sx={{ maxHeight: "25px" }} className="logo">
              <Box
                component="img"
                sx={{
                  maxHeight: "25px",
                }}
                alt="logo"
                src={LogoGaiia}
                onClick={onHomeClick}
              />
            </Box>
          </Box>
          <Box sx={{ display: { xs: "none", sm: "block" } }}>
            {navItems.map((item) => (
              <Button
                key={item?.name}
                sx={{ color: "#fff" }}
                onClick={() => {
                  if (item?.name === "Logout") {
                    onLogOutClick();
                  }
                  if (item?.name === "Profile") {
                    onProfileClick();
                  }
                  if (item?.name === "Home") {
                    onHomeClick();
                  }
                }}
              >
                {item?.icon}
              </Button>
            ))}
          </Box>
        </Toolbar>
      </AppBar>
      <Box component="nav">
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true,
          }}
          sx={{
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
        >
          <Box onClick={handleDrawerToggle} sx={{ textAlign: "center" }}>
            {/* <Typography variant="h6" sx={{ my: 2 }}>
              MUI
            </Typography> */}
            <Box sx={{ maxHeight: "25px" }} className="logo">
              <Box
                component="img"
                sx={{
                  maxHeight: "25px",
                }}
                alt="logo"
                src={LogoGaiia}
              />
            </Box>

            <Divider />
            <List>
              {navItems.map((item) => (
                <ListItem key={item?.name} disablePadding>
                  <ListItemButton
                    onClick={() => {
                      if (item?.name === "Logout") {
                        onLogOutClick();
                      } else if (item?.name === "Profile") {
                        onProfileClick();
                      } else if (item?.name === "Home") {
                        onHomeClick();
                      } else {
                        return;
                      }
                    }}
                  >
                    {item?.icon} {item?.name}
                  </ListItemButton>
                </ListItem>
              ))}
            </List>
          </Box>
        </Drawer>
      </Box>
    </Box>
  );
}
