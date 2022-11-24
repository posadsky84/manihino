import "./playerslist.css";
import {connect} from "react-redux";


const mapStateToProps = (state) => {
  return {
    playerList: state.playerList
  }

};

const mapDispatchToProps = (dispatch) => {

  return {};

}



const PlayersList = ({playerList}) => {
  //setTimeout(() => {playerList.players.push({name: "Вася епт"})}, 5000);
  return (
    <div className="playerslist">
      {playerList.items.map(({name}) => <div>{name}</div>)}
    </div>
  );

}

export default connect(mapStateToProps,mapDispatchToProps)(PlayersList);