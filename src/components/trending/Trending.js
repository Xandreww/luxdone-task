import React, { useEffect } from "react";
import { connect } from "react-redux";
import { getTrendingGifs } from "../../redux/actions/gifsActions";
import PropTypes from "prop-types";
import Spinner from "../layout/spinner/Spinner";

const Trending = ({ getTrendingGifs, gifs: { gifs, loading, error } }) => {
  useEffect(() => {
    if (!gifs || (gifs && gifs.data.length === 0)) {
      getTrendingGifs();
    }
  }, [getTrendingGifs, gifs]);

  return (
    <div className="gifs">
      {!loading && error && <p>{error}</p>}
      {loading && !error && <Spinner />}
      {!loading && !error && (
        <>
          <h1>Trending</h1>
          {gifs.data.map((gif) => (
            <div key={gif.id} className="gif">
              <img src={gif.images.fixed_height.url} alt={gif.title} />
            </div>
          ))}
          <button onClick={() => getTrendingGifs()}>Gimme another joke!</button>
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
