import React, { useState } from "react";
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";

const JokeCategory = () => {
  const [any, setAny] = useState(true);
  const [state, setState] = useState({
    Programming: false,
    Miscellaneous: false,
    Dark: false,
    Pun: false,
    Spooky: false,
    Christmas: false,
  });

  const handleChange = (event) => {
    setState({ ...state, [event.target.name]: event.target.checked });
    console.log(state);
  };

  const handleAnyChange = () => {
    if (!any) {
      setState({
        Programming: false,
        Miscellaneous: false,
        Dark: false,
        Pun: false,
        Spooky: false,
        Christmas: false,
      });
    }
    setAny(!any);
  };

  return (
    <>
      <h2>Select category: </h2>

      <FormGroup row>
        <FormControlLabel
          control={<Checkbox checked={any} onChange={handleAnyChange} name="Any" color="primary" />}
          label="Any"
        />
        <FormControlLabel
          control={
            <Checkbox
              checked={state.Programming}
              disabled={any}
              onChange={handleChange}
              name="Programming"
              color="primary"
            />
          }
          label="Programming"
        />
        <FormControlLabel
          control={
            <Checkbox
              checked={state.Miscellaneous}
              disabled={any}
              onChange={handleChange}
              name="Miscellaneous"
              color="primary"
            />
          }
          label="Miscellaneous"
        />
        <FormControlLabel
          control={<Checkbox checked={state.Dark} disabled={any} onChange={handleChange} name="Dark" color="primary" />}
          label="Dark"
        />
        <FormControlLabel
          control={<Checkbox checked={state.Pun} disabled={any} onChange={handleChange} name="Pun" color="primary" />}
          label="Pun"
        />
        <FormControlLabel
          control={
            <Checkbox checked={state.Spooky} disabled={any} onChange={handleChange} name="Spooky" color="primary" />
          }
          label="Spooky"
        />
        <FormControlLabel
          control={
            <Checkbox
              checked={state.Christmas}
              disabled={any}
              onChange={handleChange}
              name="Christmas"
              color="primary"
            />
          }
          label="Christmas"
        />
      </FormGroup>
    </>
  );
};

export default JokeCategory;
