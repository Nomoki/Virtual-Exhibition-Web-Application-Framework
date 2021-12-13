import { TRANS } from '../constants/actionTypes';
import * as api from '../api/index.js';

export const getTransforms = () => async (dispatch) => {
  try {
    const { data } = await api.fetchTransform();

    dispatch({ type: TRANS, payload: data });
  } catch (error) {
    console.log(error);
  }
};