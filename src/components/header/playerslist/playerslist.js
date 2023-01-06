import './playerslist.css';
import { connect } from 'react-redux';

const mapStateToProps = state => ({
  players: state.players.items,
});

const PlayersList = ({ players }) => (
  <div className="playerslist">
    {players.map(({ name }) => <div>{name}</div>)}
  </div>
);

export default connect(mapStateToProps)(PlayersList);
