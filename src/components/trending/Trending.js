import React, { useEffect } from "react";
import { connect } from "react-redux";
import { getTrendingGifs } from "../../redux/actions/gifsActions";
import { Button } from "@material-ui/core";
import PropTypes from "prop-types";
import Spinner from "../layout/spinner/Spinner";
import PerPage from "../layout/perPage/PerPage";
import SentimentVerySatisfiedIcon from "@material-ui/icons/SentimentVerySatisfied";

const Trending = ({ getTrendingGifs, gifs: { allTrendingGifs, loading, error } }) => {
  useEffect(() => {
    if (!allTrendingGifs || (allTrendingGifs && allTrendingGifs.length === 0)) {
      getTrendingGifs();
    }
  }, [getTrendingGifs, allTrendingGifs]);

  const openUrl = (url) => {
    window.open(url, "_blank");
  };

  return (
    <div className="gifs">
      {!loading && error && <p>{error}</p>}
      {loading && !error && <Spinner />}
      {!loading && !error && allTrendingGifs && allTrendingGifs.length > 0 && (
        <>
          <PerPage />
          {allTrendingGifs.map((gif) => (
            <div key={gif.id} className="gif" onClick={() => openUrl(gif.url)}>
              <img src={gif.images.fixed_height.url} alt={gif.title} />
            </div>
          ))}
          <div className="button-bottom">
            <Button onClick={() => getTrendingGifs()} variant="contained" color="primary">
              <SentimentVerySatisfiedIcon className="mr" /> Load more GIFs
            </Button>
          </div>
        </>
      )}
    </div>
  );
};

const mapStateToProps = (state) => ({
  gifs: state.gifs,
});

Trending.propTypes = {
  getTrendingGifs: PropTypes.func.isRequired,
  gifs: PropTypes.object,
};

export default connect(mapStateToProps, { getTrendingGifs })(Trending);
