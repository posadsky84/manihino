import "./rating.css";
import {connect} from "react-redux";
import React from 'react';
import {setRatingThunk} from "../../../redux/rating-reducer";



const mapStateToProps = (state) => {
  return {
    players: state.players.items,
    rating: state.rating,
  }
};

class Rating extends React.Component {

  componentDidMount() {

    if (this.props.rating.items.length === 0) {
      this.props.setRatingThunk();
    }

  }


  render ()  {
    return(

    <div className="rating">
        <div className="headrow">
          <div className="gamename" />
          {this.props.players.map((item) => <div className="playerheader">{item.name}</div>)}
        </div>
        {this.props.rating.items.map((i) => (
          <div className="tabrow ">
            <div className="gamename">
              {i.game_name}<span className="cnt-span">{i.cnt}</span>
            </div>
            {i.results.map(({wins}) => <div className="score">{+wins || ""}</div>)}
          </div>
          ))}
    </div>
  )};

}



export default connect(mapStateToProps,{
  setRatingThunk,
})(Rating);