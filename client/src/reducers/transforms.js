import { TRANS } from '../constants/actionTypes';

export default (tranforms = [], action) => {
  switch (action.type) {
    case TRANS:
      return action.payload;
    default:
      return tranforms;
  }
};