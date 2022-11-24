import "./rating.css";
import {connect} from "react-redux";
import React from 'react';
import {setRatingAC} from "../../../redux/rating-reducer";
import axios from "axios";

const mapStateToProps = (state) => {
  return {
    playerList: state.playerList,
    rating: state.rating,
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    setRating: (rating) => dispatch(setRatingAC(rating))
  }
}

class Rating extends React.Component {

  componentDidMount() {

    if (this.props.rating.items.length === 0) {
        axios.get("http://localhost:4000/rating").then(response => this.props.setRating(response.data));
    }

  }


  render ()  {
    return(

    <div className="rating">

      <div className="ВсяТабла">
        <div className="headrow">
          <div className="boxik" />
          <div className="cntheader boxik">Кол-во</div>
          {this.props.playerList.items.map(({name}) => <div className="playerheader boxik">{name}</div>)}
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



export default connect(mapStateToProps,mapDispatchToProps)(Rating);