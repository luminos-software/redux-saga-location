import Geolocation from "@react-native-community/geolocation";
import {
  REDUX_SAGA_LOCATION_ACTION_REQUEST,
  REDUX_SAGA_LOCATION_ACTION_SET_ERROR,
  REDUX_SAGA_LOCATION_ACTION_SET_POSITION,
  REDUX_SAGA_LOCATION_CLEAR_REQUEST,
  REDUX_SAGA_LOCATION_STOP_REQUEST,
} from "../actions";

export const clearWatchThunk = (watchId) => (dispatch) => {
  dispatch({ type: REDUX_SAGA_LOCATION_CLEAR_REQUEST });
  Geolocation.clearWatch(watchId);
};

export const getCurrentPositionThunk = (options) => (dispatch) => {
  dispatch({ type: REDUX_SAGA_LOCATION_ACTION_REQUEST });
  Geolocation.getCurrentPosition(
    (position) => {
      dispatch({ type: REDUX_SAGA_LOCATION_ACTION_SET_POSITION, position });
    },
    (error) => dispatch({ type: REDUX_SAGA_LOCATION_ACTION_SET_ERROR, error }),
    options
  );
};

export const stopObservingThunk = () => (dispatch) => {
  // Stop observing is deprecated in react-native-community/geolocation
  // switch to clearWatch as soon as possible
  dispatch({ type: REDUX_SAGA_LOCATION_STOP_REQUEST });
  Geolocation.stopObserving();
};

export const watchCurrentPositionThunk = (options) => (dispatch) => {
  dispatch({ type: REDUX_SAGA_LOCATION_ACTION_REQUEST });
  return Geolocation.watchPosition(
    (position) => {
      dispatch({ type: REDUX_SAGA_LOCATION_ACTION_SET_POSITION, position });
    },
    (error) => dispatch({ type: REDUX_SAGA_LOCATION_ACTION_SET_ERROR, error }),
    options
  );
};
