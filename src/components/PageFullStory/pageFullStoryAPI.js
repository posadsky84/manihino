import { connect } from "react-redux";
import { getFullStoryThunk } from "../../redux/fullStory-reducer";
import PageFullStory from "./pageFullStory";
import React from "react";


const mapStateToProps = (state) => {
  return {
    fullStory: state.fullStory,
    ui: state.ui,
    players: state.players.items,
  }
}


class PageFullStoryAPI extends React.Component {


componentDidMount() {
  this.props.getFullStoryThunk(this.props.ui.season);
}


  render () {
  return <PageFullStory fullStory={this.props.fullStory} players={this.props.players}/>;

}



}

export default connect(mapStateToProps,{getFullStoryThunk})(PageFullStoryAPI);

