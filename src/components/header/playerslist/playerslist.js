import "./playerslist.css";
import {connect} from "react-redux";


const mapStateToProps = (state) => {
  return {
    players: state.players.items
  }
};

const PlayersList = ({players}) => {
  return (
    <div className="playerslist">
      {players.map(({name}) => <div>{name}</div>)}
    </div>
  );

}

export default connect(mapStateToProps)(PlayersList);