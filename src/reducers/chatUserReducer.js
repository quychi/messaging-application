import { chatUserConstants } from '../constants/chatUser.constants';

const initialState = {
    chatUser: {
        fromUid: '',
        toUid: '',
        isSave: false
    }
};

const chatUserReducer = (state = initialState, action) => {
    switch (action.type) {
        case chatUserConstants.SAVE_CHATUSER_REQUEST:
            return {
                ...state,
                chatUser: {
                    ...state.chatUser,
                    isSave: true
                }
            };
        case chatUserConstants.SAVE_CHATUSER_SUCCESS:
            return {
                ...state,
                chatUser: {
                    ...state.chatUser,
                    fromUid: action.payload.fromUid,
                    toUid: action.payload.toUid,
                    isSave: false
                }
            };
        case chatUserConstants.SAVE_CHATUSER_FAILURE:
            return {
                ...state,
                chatUser: {
                    ...state.chatUser,
                    isSave: false
                }
            };

        default:
            return state;
    }
};

export default chatUserReducer;
