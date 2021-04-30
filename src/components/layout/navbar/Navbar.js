import { AppBar, Container, Toolbar } from "@material-ui/core";
import { Link } from "react-router-dom";
import HomeIcon from "@material-ui/icons/Home";
import TrendingUpIcon from "@material-ui/icons/TrendingUp";
import SearchIcon from "@material-ui/icons/Search";
import SentimentVerySatisfiedIcon from "@material-ui/icons/SentimentVerySatisfied";
import giphy from "../../../assets/giphy.png";
import React from "react";
import styles from "./Navbar.module.scss";

const Navbar = () => {
  return (
    <AppBar position="static">
      <Container>
        <Toolbar className={styles.navbar} variant="dense">
          <div className={styles.left}>
            <Link className={styles.navItem} to="/">
              <HomeIcon />
              Home
            </Link>
            <Link className={styles.navItem} to="/trending">
              <TrendingUpIcon />
              Trending
            </Link>
            <Link className={styles.navItem} to="search">
              <SearchIcon />
              Search
            </Link>
            <Link className={styles.navItem} to="jokes">
              <SentimentVerySatisfiedIcon />
              Jokes
            </Link>
          </div>
          <div className={styles.right}>
            <span>Powered by: </span>
            <img src={giphy} alt="Giphy's Logo" />
          </div>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Navbar;
