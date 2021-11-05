import React, { useState } from "react";
import { Link } from "react-router-dom";

import MainHeader from "./MainHeader";
import "./MainNavigation.css";
import NavLinks from "./NavLinks";
import SideDrawer from "./SideDrawer";
import BackDrop from "../../UIElements/Backdoor";

const MainNavigation = (props) => {
  const [drawerIsOpen, setDrawer] = useState(false);

  const handleOpenDrawer = () => {
    setDrawer(true);
  };

  const handlerCloseDrawer = () => {
    setDrawer(false);
  };
  return (
    <React.Fragment>
      {drawerIsOpen && <BackDrop onClick={handlerCloseDrawer} />}
        
        <SideDrawer show = {drawerIsOpen} onClick = {handlerCloseDrawer}>
          <nav className="main-navigation__drawer-nav">
            <NavLinks />
          </nav>
        </SideDrawer>
      
      <MainHeader>
        <button
          className="main-navigation__menu-btn"
          onClick={handleOpenDrawer}
        >
          <span />
          <span />
          <span />
        </button>
        <h1 className="main-navigation__title">
          <Link to="/">YourPlaces</Link>
        </h1>

        <nav className="main-navigation__header-nav">
          <NavLinks />
        </nav>
      </MainHeader>
    </React.Fragment>
  );
};

export default MainNavigation;
