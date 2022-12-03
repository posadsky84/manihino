import "./rating.css";
import {connect} from "react-redux";
import React from 'react';
import {setRatingThunk} from "../../../redux/rating-reducer";
import { API } from "../../../api";



const mapStateToProps = (state) => {
  return {
    playerList: state.playerList,
    rating: state.rating,
  }
};

// const mapDispatchToProps = (dispatch) => {
//   return {
//     setRating: (rating) => dispatch(setRatingAC(rating))
//   }
// }
//


class Rating extends React.Component {

  // tempGet = async () => {
  //   const response = await API.getRating();
  //   this.props.setRating(response.data);
  // }

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



export default connect(mapStateToProps,{
  setRatingThunk,
})(Rating);