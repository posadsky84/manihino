const initState = {
  season: new Date().getFullYear() - 1
};

const uiReducer = (state = initState, action) => {
  return state;
}

export default uiReducer;