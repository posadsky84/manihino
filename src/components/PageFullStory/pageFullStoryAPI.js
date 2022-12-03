import { connect } from "react-redux";
import { getFullStoryThunk } from "../../redux/fullStory-reducer";
import PageFullStory from "./pageFullStory";
import React from "react";


const mapStateToProps = (state) => {
  return {
    fullStory: state.fullStory
  }
}


class PageFullStoryAPI extends React.Component {


componentDidMount() {
  this.props.getFullStoryThunk();
}


  render () {
  return <PageFullStory fullStory={this.props.fullStory}/>;

}



}

export default connect(mapStateToProps,{getFullStoryThunk})(PageFullStoryAPI);

