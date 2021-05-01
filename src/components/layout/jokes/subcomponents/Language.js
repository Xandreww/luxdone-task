import Button from "@material-ui/core/Button";
import ClickAwayListener from "@material-ui/core/ClickAwayListener";
import Grow from "@material-ui/core/Grow";
import Paper from "@material-ui/core/Paper";
import Popper from "@material-ui/core/Popper";
import MenuItem from "@material-ui/core/MenuItem";
import MenuList from "@material-ui/core/MenuList";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";
import { setJokesLanguage } from "../../../../redux/actions/jokesActions";
import { useEffect, useRef, useState } from "react";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  paper: {
    marginRight: theme.spacing(2),
  },
}));

const Language = ({ setJokesLanguage, jokes: { jokesParams } }) => {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const anchorRef = useRef(null);

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const onClick = (lang) => {
    setOpen(false);

    const languages = jokesParams.lang;

    for (let language in languages) {
      if (language === lang) {
        languages[language] = true;
      } else {
        languages[language] = false;
      }
    }

    setJokesLanguage(languages);
  };

  function handleListKeyDown(event) {
    if (event.key === "Tab") {
      event.preventDefault();
      setOpen(false);
    }
  }

  // return focus to the button when we transitioned from !open -> open
  const prevOpen = useRef(open);
  useEffect(() => {
    if (prevOpen.current === true && open === false) {
      anchorRef.current.focus();
    }

    prevOpen.current = open;
  }, [open]);

  return (
    <div className={classes.root}>
      <div>
        <Button
          ref={anchorRef}
          aria-controls={open ? "menu-list-grow" : undefined}
          aria-haspopup="true"
          onClick={handleToggle}
        >
          Language
        </Button>
        <Popper open={open} anchorEl={anchorRef.current} transition disablePortal placement="bottom-start">
          {({ TransitionProps }) => (
            <Grow {...TransitionProps}>
              <Paper>
                <ClickAwayListener onClickAway={() => setOpen(false)}>
                  <MenuList autoFocusItem={open} id="menu-list-grow" onKeyDown={handleListKeyDown}>
                    <MenuItem onClick={() => onClick("cs")}>cs - Czech</MenuItem>
                    <MenuItem onClick={() => onClick("de")}>de - German</MenuItem>
                    <MenuItem onClick={() => onClick("en")}>en - English</MenuItem>
                    <MenuItem onClick={() => onClick("es")}>es - Spanish</MenuItem>
                    <MenuItem onClick={() => onClick("fr")}>fr - French</MenuItem>
                    <MenuItem onClick={() => onClick("pt")}>pt - Portuguese</MenuItem>
                  </MenuList>
                </ClickAwayListener>
              </Paper>
            </Grow>
          )}
        </Popper>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  jokes: state.jokes,
});

Language.propTypes = {
  setJokesLanguage: PropTypes.func.isRequired,
  jokes: PropTypes.object,
};

export default connect(mapStateToProps, { setJokesLanguage })(Language);
