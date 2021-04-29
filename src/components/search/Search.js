import { TextField } from "@material-ui/core";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { connect } from "react-redux";
import { searchGifs } from "../../redux/actions/gifsActions";
import PropTypes from "prop-types";
import debounce from "lodash.debounce";
import Spinner from "../layout/spinner/Spinner";

const Search = ({ searchGifs, gifs: { allFoundGifs, loading, error } }) => {
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

  const openUrl = (url) => {
    window.open(url, "_blank");
  };

  const onSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <>
      <form noValidate autoComplete="off" onSubmit={onSubmit}>
        <TextField id="standard-basic" label="Search for gifs" onChange={handleChange} value={searchValue} />
      </form>
      {loading && !error && <Spinner />}
      {!loading && error && <p>{error}</p>}
      {!loading && !error && (!allFoundGifs || (allFoundGifs && allFoundGifs.length === 0)) && (
        <>
          <h2>Search for gif's</h2>
        </>
      )}
      {!loading && !error && allFoundGifs && allFoundGifs.length > 0 && (
        <div className="gifs">
          {allFoundGifs.map((gif) => (
            <div key={gif.id} className="gif" onClick={openUrl}>
              <img src={gif.images.fixed_height.url} alt={gif.title} />
            </div>
          ))}
          <button onClick={() => searchGifs(debouncedValue)}>Load more GIFs</button>
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
