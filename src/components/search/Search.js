import { Button, TextField } from "@material-ui/core";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { connect } from "react-redux";
import { searchGifs } from "../../redux/actions/gifsActions";
import PropTypes from "prop-types";
import debounce from "lodash.debounce";
import Spinner from "../layout/spinner/Spinner";
import PerPage from "../layout/perPage/PerPage";
import SentimentVerySatisfiedIcon from "@material-ui/icons/SentimentVerySatisfied";
import styles from "./Search.module.scss";

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
      <div className={styles.searchContainer}>
        <form noValidate autoComplete="off" onSubmit={onSubmit}>
          <TextField id="standard-basic" label="Search for gifs" onChange={handleChange} value={searchValue} />
        </form>
      </div>
      {loading && !error && <Spinner />}
      {!loading && error && <p>{error}</p>}
      <div className={styles.lookingFor}>
        <iframe
          title="looking for?"
          src="https://giphy.com/embed/S854gpZGRutOVGHfLN"
          frameBorder="0"
          allowFullScreen
        ></iframe>
      </div>
      {!loading && !error && allFoundGifs && allFoundGifs.length > 0 && (
        <div className="gifs">
          <PerPage />
          {allFoundGifs.map((gif) => (
            <div key={gif.id} className="gif" onClick={() => openUrl(gif.url)}>
              <img src={gif.images.fixed_height.url} alt={gif.title} />
            </div>
          ))}
          <div className="button-bottom">
            <Button onClick={() => searchGifs(debouncedValue)} variant="contained" color="primary">
              <SentimentVerySatisfiedIcon className="mr" />
              Load more GIFs
            </Button>
          </div>
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
