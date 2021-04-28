import React, { useEffect } from "react";
import { connect } from "react-redux";
import { getTrendingGifs } from "../../redux/actions/gifsActions";
import PropTypes from "prop-types";
import Spinner from "../layout/spinner/Spinner";

const Trending = ({ getTrendingGifs, gifs: { trendingGifs, allTrendingGifs, loading, error } }) => {
  useEffect(() => {
    if (!allTrendingGifs || (allTrendingGifs && allTrendingGifs.length === 0)) {
      getTrendingGifs();
    }
  }, [getTrendingGifs, allTrendingGifs]);

  const getMoreGifs = () => {
    const offset = trendingGifs.pagination.offset;
    const count = trendingGifs.pagination.count;

    getTrendingGifs(offset + count);
  };

  return (
    <div className="gifs">
      {!loading && error && <p>{error}</p>}
      {loading && !error && <Spinner />}
      {!loading && !error && allTrendingGifs && allTrendingGifs.length > 0 && (
        <>
          {allTrendingGifs.map((gif) => (
            <div key={gif.id} className="gif">
              <img src={gif.images.fixed_height.url} alt={gif.title} />
            </div>
          ))}
          <button onClick={getMoreGifs}>Refresh trending GIFs</button>
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
