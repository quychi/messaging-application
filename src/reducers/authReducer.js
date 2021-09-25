import { authConstants } from '../constants/auth.constants';

const initialState = {
    authUser: {
        user: {},
        isFetching: false,
        isClear: false
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

        case authConstants.CLEAR_AUTH_REQUEST:
            return {
                ...state,
                authUser: {
                    ...state.authUser,
                    isClear: true
                }
            };
        case authConstants.CLEAR_AUTH_SUCCESS:
            return {
                ...state,
                authUser: {
                    ...state.authUser,
                    isClear: false,
                    user: action.payload
                }
            };
        case authConstants.CLEAR_AUTH_FAILURE:
            return {
                ...state,
                authUser: {
                    ...state.authUser,
                    isClear: false
                }
            };

        default:
            return state;
    }
};

export default authReducer;
