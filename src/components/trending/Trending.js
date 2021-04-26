import React, { useEffect } from "react";
import { connect } from "react-redux";
import { getTrendingGifs } from "../../redux/actions/gifsActions";
import PropTypes from "prop-types";
import Spinner from "../layout/spinner/Spinner";

const Trending = ({ getTrendingGifs, gifs: { trendingGifs, loading, error } }) => {
  useEffect(() => {
    if (!trendingGifs || (trendingGifs && trendingGifs.data.length === 0)) {
      getTrendingGifs();
    }
  }, [getTrendingGifs, trendingGifs]);

  return (
    <div className="gifs">
      {!loading && error && <p>{error}</p>}
      {loading && !error && <Spinner />}
      {!loading && !error && (
        <>
          <h1>Trending</h1>
          {trendingGifs.data.map((gif) => (
            <div key={gif.id} className="gif">
              <img src={gif.images.fixed_height.url} alt={gif.title} />
            </div>
          ))}
          <button onClick={() => getTrendingGifs()}>Refresh trending GIFs</button>
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
