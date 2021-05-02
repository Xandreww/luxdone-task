import { AppBar, Container, Toolbar } from "@material-ui/core";
import { Link } from "react-router-dom";
import HomeIcon from "@material-ui/icons/Home";
import TrendingUpIcon from "@material-ui/icons/TrendingUp";
import SearchIcon from "@material-ui/icons/Search";
import SentimentVerySatisfiedIcon from "@material-ui/icons/SentimentVerySatisfied";
import giphy from "../../../assets/giphy.png";
import React from "react";
import styles from "./Navbar.module.scss";

const goToGiphy = () => {
  window.open("https://giphy.com/", "_blank");
};

const Navbar = () => {
  return (
    <AppBar className={styles.appBar} position="static">
      <Container>
        <Toolbar className={styles.navbar} variant="dense">
          <div className={styles.left}>
            <Link className={styles.navItem} to="/">
              <HomeIcon className={styles.navIcon} />
              <span className="rainbowText">Home</span>
            </Link>
            <Link className={styles.navItem} to="/trending">
              <TrendingUpIcon className={styles.navIcon} />
              <span className="rainbowText">Trending</span>
            </Link>
            <Link className={styles.navItem} to="search">
              <SearchIcon className={styles.navIcon} />
              <span className="rainbowText">Search</span>
            </Link>
            <Link className={styles.navItem} to="jokes">
              <SentimentVerySatisfiedIcon className={styles.navIcon} />
              <span className="rainbowText">Jokes</span>
            </Link>
          </div>
          <div className={styles.right}>
            <span>Powered by: </span>
            <img src={giphy} alt="Giphy's Logo" onClick={goToGiphy} />
          </div>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Navbar;
