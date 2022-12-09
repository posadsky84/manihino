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

      <div className="ВсяТабла">
        <div className="headrow">
          <div className="boxik" />
          <div className="cntheader boxik">Кол-во</div>
          {this.props.players.map(({name}) => <div className="playerheader boxik">{name}</div>)}
        </div>
        {this.props.rating.items.map((i) => (
          <div className="tabrow">
            <div className="boxik gamename">{i.game_name}</div>
            <div className="cntitem boxik">{i.cnt}</div>
            {i.results.map(({wins}) => <div className="score boxik">{+wins || ""}</div>)}
          </div>
          ))}

      </div>


    </div>
  )};

}



export default connect(mapStateToProps,{
  setRatingThunk,
})(Rating);