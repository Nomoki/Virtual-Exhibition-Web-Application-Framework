import { TRANS, TCREATE, TUPDATE } from '../constants/actionTypes';
import * as api from '../api/index.js';

export const getTransforms = () => async (dispatch) => {
  try {
    const { data } = await api.fetchTransform();

    dispatch({ type: TRANS, payload: data });
  } catch (error) {
    console.log(error);
  }
};

export const createTrans = (post) => async (dispatch) => {
  try {
    const { data } = await api.createPost(post);

    dispatch({ type: TCREATE, payload: data });
  } catch (error) {
    console.log(error);
  }
};

export const updateTrans = (id, post) => async (dispatch) => {
  try {
    const { data } = await api.updatePost(id, post);

    dispatch({ type: TUPDATE, payload: data });
  } catch (error) {
    console.log(error);
  }
};
