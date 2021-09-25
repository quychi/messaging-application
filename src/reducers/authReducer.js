import { authConstants } from '../constants/auth.constants';

const initialState = {
    authUser: {
        user: {},
        isFetching: false
    }
};

const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case authConstants.GET_AUTH_REQUEST:
            return {
                ...state,
                authUser: {
                    ...state.authUser,
                    isFetching: true
                }
            };
        case authConstants.GET_AUTH_SUCCESS:
            return {
                ...state,
                authUser: {
                    ...state.authUser,
                    isFetching: false,
                    user: action.payload
                }
            };
        case authConstants.GET_AUTH_FAILURE:
            return {
                ...state,
                authUser: {
                    ...state.authUser,
                    isFetching: false
                }
            };
        default:
            return state;
    }
};

export default authReducer;
