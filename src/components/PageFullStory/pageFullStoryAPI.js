import React from 'react';
import { connect } from 'react-redux';
import { getFullStoryThunk } from '../../redux/fullStory-reducer';
import PageFullStory from './pageFullStory';

const mapStateToProps = state => ({
  fullStory: state.fullStory,
  ui: state.ui,
  players: state.players.items,
});

class PageFullStoryAPI extends React.Component {
  componentDidMount() {
    this.props.getFullStoryThunk(this.props.ui.season);
  }

  componentDidUpdate(prevProps) {
    if (+prevProps.ui.season !== +this.props.ui.season) {
      this.props.getFullStoryThunk(this.props.ui.season);
    }
  }

  render() {
    return (
      <PageFullStory fullStory={this.props.fullStory} players={this.props.players} />
    );
  }
}

export default connect(mapStateToProps, { getFullStoryThunk })(PageFullStoryAPI);
