import { React, useContext, useState } from "react";
// import { ProSidebar, Menu, MenuItem } from "react-pro-sidebar";
import { Sidebar, Menu, MenuItem, SubMenu } from "react-pro-sidebar";
import { Box, useTheme, typography, IconButton } from "@mui/material";
import { Link } from "react-router-dom";
import { ColorModeContext, tokens } from "../theme";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import PeopleOutlinedIcon from "@mui/icons-material/PeopleOutlined";
import ContactsOutlinedIcon from "@mui/icons-material/ContactsOutlined";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import ReceiptOutlinedIcon from "@mui/icons-material/ReceiptOutlined";
import CalendarTodayOutlinedIcon from "@mui/icons-material/CalendarTodayOutlined";
import HelpOutlinedIcon from "@mui/icons-material/HelpOutlined";
import BarChartOutlinedIcon from "@mui/icons-material/BarChartOutlined";
import PieChartOutlinedIcon from "@mui/icons-material/PieChartOutlined";
import TimelineOutlinedIcon from "@mui/icons-material/TimelineOutlined";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import MapOutlinedIcon from "@mui/icons-material/MapOutlined";

export default function SideBar() {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [isCollapsed, setIscollapsed] = useState(false);
  const [selected, setSelected] = useState("Dashboard");
  // const colourmode =useContext(ColorModeContext);

  return (
    <Box sx={{ backgroundColor: colors.primary[400] }}>
      <Sidebar>
        <Box
          display="flex"
          sx={{
            backgroundColor: colors.primary[400],
            justifyContent: "space-between",
            pr: "10px",
            pl: "10px",
            alignItems: "center",
          }}
        >
          <img src="logo192.png" width="50" />
          <MenuOutlinedIcon />
        </Box>

        <Menu
          menuItemStyles={{
            button: {
              backgroundColor: colors.primary[400],
              ":hover": {
                backgroundColor: "blue",
              },
            },
          }}
        >
          <Box
            sx={
              {
                // backgroundColor: colors.primary[400],
              }
            }
          >
            <MenuItem>
              <HomeOutlinedIcon />
            </MenuItem>
          </Box>
        </Menu>
      </Sidebar>
    </Box>
    // <Box
    //   display="flex"
    //   height={1000}
    //   width={250}
    //   alignItems="start"
    //   sx={{ backgroundColor: colors.primary[400] }}
    // >
    //   <div>
    //     <IconButton>
    //       <HomeOutlinedIcon />
    //     </IconButton>
    //   </div>
    // </Box>
  );
}
