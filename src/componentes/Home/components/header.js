import ManageAccounts from "@mui/icons-material/ManageAccounts";
import { Box, IconButton } from "@mui/material";
import React from "react";

class Header extends React.Component{
    render(){
        return(
            <Box>
                <img src=""/>
                <IconButton startIcon={<ManageAccounts/>}>

                </IconButton>
            </Box>
        )
    }
}
export default Header;