import { TRANS } from '../constants/actionTypes';

export default (transforms = [], action) => {
  switch (action.type) {
    case TRANS:
      return action.payload;
    default:
      return transforms;
  }
};