import { TextField } from "@material-ui/core";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { connect } from "react-redux";
import { searchGifs } from "../../redux/actions/gifsActions";
import PropTypes from "prop-types";
import debounce from "lodash.debounce";
import Spinner from "../layout/spinner/Spinner";

const Search = ({ searchGifs, gifs: { foundGifs, loading, error } }) => {
  const [searchValue, setSearchValue] = useState("");
  const [debouncedValue, setDebouncedValue] = useState("");

  const debouncedSearch = useMemo(
    () =>
      debounce((inputValue) => {
        setDebouncedValue(inputValue);
      }, 1000),
    [setDebouncedValue]
  );

  const handleChange = useCallback(
    (e) => {
      setSearchValue(e.target.value);
      debouncedSearch(e.target.value);
    },
    [debouncedSearch]
  );

  useEffect(() => {
    debouncedValue && searchGifs(debouncedValue);
  }, [debouncedValue, searchGifs]);

  return (
    <>
      <form noValidate autoComplete="off">
        <TextField id="standard-basic" label="Search for gifs" onChange={handleChange} value={searchValue} />
      </form>
      <p>{debouncedValue}</p>
      {loading && !error && <Spinner />}
      {!loading && error && <p>{error}</p>}
      {!loading && !error && (!foundGifs || (foundGifs && foundGifs.data.length === 0)) && (
        <>
          <h2>Search for gif's</h2>
        </>
      )}
      {!loading && !error && foundGifs && foundGifs.data.length > 0 && (
        <div className="gifs">
          {foundGifs.data.map((gif) => (
            <div key={gif.id} className="gif">
              <img src={gif.images.fixed_height.url} alt={gif.title} />
            </div>
          ))}
        </div>
      )}
    </>
  );
};

const mapStateToProps = (state) => ({
  gifs: state.gifs,
});

Search.propTypes = {
  searchGifs: PropTypes.func.isRequired,
  gifs: PropTypes.object,
};

export default connect(mapStateToProps, { searchGifs })(Search);
