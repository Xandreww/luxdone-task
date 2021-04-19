import { AppBar, Toolbar, Typography } from "@material-ui/core";
import "./Navbar.scss";
import React from "react";

const Navbar = () => {
  return (
    <AppBar position="static">
      <Toolbar variant="dense">
        <h6 className="nav-item">Test 2</h6>
        <h6 className="nav-item">Asdasd</h6>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
