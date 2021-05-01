import React from "react";
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
import { setJokesAmount } from "../../../../redux/actions/jokesActions";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  paper: {
    marginRight: theme.spacing(2),
  },
}));

const AmountOfJokes = ({ setJokesAmount }) => {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const anchorRef = React.useRef(null);

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const onClick = (e) => {
    setJokesAmount(+e.target.textContent);
    setOpen(false);
  };

  function handleListKeyDown(event) {
    if (event.key === "Tab") {
      event.preventDefault();
      setOpen(false);
    }
  }

  // return focus to the button when we transitioned from !open -> open
  const prevOpen = React.useRef(open);
  React.useEffect(() => {
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
          Amount of jokes
        </Button>
        <Popper open={open} anchorEl={anchorRef.current} transition disablePortal placement="bottom-start">
          {({ TransitionProps }) => (
            <Grow {...TransitionProps}>
              <Paper>
                <ClickAwayListener onClickAway={() => setOpen(false)}>
                  <MenuList autoFocusItem={open} id="menu-list-grow" onKeyDown={handleListKeyDown}>
                    <MenuItem onClick={onClick}>1</MenuItem>
                    <MenuItem onClick={onClick}>2</MenuItem>
                    <MenuItem onClick={onClick}>3</MenuItem>
                    <MenuItem onClick={onClick}>4</MenuItem>
                    <MenuItem onClick={onClick}>5</MenuItem>
                    <MenuItem onClick={onClick}>6</MenuItem>
                    <MenuItem onClick={onClick}>7</MenuItem>
                    <MenuItem onClick={onClick}>8</MenuItem>
                    <MenuItem onClick={onClick}>9</MenuItem>
                    <MenuItem onClick={onClick}>10</MenuItem>
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

AmountOfJokes.propTypes = {
  setJokesAmount: PropTypes.func.isRequired,
};

export default connect(null, { setJokesAmount })(AmountOfJokes);
