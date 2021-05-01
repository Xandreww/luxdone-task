import React, { useEffect, useState } from "react";
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { setJokesBlacklistFlags } from "../../../../redux/actions/jokesActions";

const BlacklistCategory = ({ setJokesBlacklistFlags, jokes: { jokesParams } }) => {
  const [state, setState] = useState({
    nsfw: false,
    religious: false,
    political: false,
    racist: false,
    sexist: false,
    explicit: false,
  });

  const handleChange = (event) => {
    setState({ ...state, [event.target.name]: event.target.checked });
  };

  useEffect(() => {
    setJokesBlacklistFlags(state);
  }, [state, setJokesBlacklistFlags]);

  useEffect(() => {
    setState(jokesParams.blacklistFlags);
  }, [jokesParams.blacklistFlags]);

  return (
    <>
      {state && jokesParams && (
        <>
          <h2>Select flags to blacklist: </h2>

          <FormGroup row>
            <FormControlLabel
              control={<Checkbox checked={state.nsfw} onChange={handleChange} name="nsfw" color="primary" />}
              label="nsfw"
            />
            <FormControlLabel
              control={<Checkbox checked={state.religious} onChange={handleChange} name="religious" color="primary" />}
              label="religious"
            />
            <FormControlLabel
              control={<Checkbox checked={state.political} onChange={handleChange} name="political" color="primary" />}
              label="political"
            />
            <FormControlLabel
              control={<Checkbox checked={state.racist} onChange={handleChange} name="racist" color="primary" />}
              label="racist"
            />
            <FormControlLabel
              control={<Checkbox checked={state.sexist} onChange={handleChange} name="sexist" color="primary" />}
              label="sexist"
            />
            <FormControlLabel
              control={<Checkbox checked={state.explicit} onChange={handleChange} name="explicit" color="primary" />}
              label="explicit"
            />
          </FormGroup>
        </>
      )}
    </>
  );
};

const mapStateToProps = (state) => ({
  jokes: state.jokes,
});

BlacklistCategory.propTypes = {
  setJokesBlacklistFlags: PropTypes.func.isRequired,
  jokes: PropTypes.object,
};

export default connect(mapStateToProps, { setJokesBlacklistFlags })(BlacklistCategory);
