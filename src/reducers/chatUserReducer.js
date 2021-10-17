import { chatUserConstants } from '../constants/chatUser.constants';

const initialState = {
    chatUser: {
        member0Uid: '',
        member1Uid: '',
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
                    member0Uid: action.payload.member0Uid,
                    member1Uid: action.payload.member1Uid,
                    isSave: true
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

        case chatUserConstants.CLEAR_CHATUSER_REQUEST:
            return {
                ...state,
                chatUser: {
                    ...state.chatUser,
                    isSave: true
                }
            };
        case chatUserConstants.CLEAR_CHATUSER_SUCCESS:
            return {
                ...state,
                chatUser: {
                    ...state.chatUser,
                    member0Uid: action.payload.member0Uid,
                    member1Uid: action.payload.member1Uid,
                    isSave: false //clear data
                }
            };
        case chatUserConstants.CLEAR_CHATUSER_FAILURE:
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
