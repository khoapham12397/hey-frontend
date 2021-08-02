import { TOP_UP, 
    TRANSFER, 
    BALANCE,
    REGISTER,
    REGISTER_WALLET_POPUP_STATE 
} from "../actions/walletAction";

const initialState = {
    user: {},
    registerWalletPopup: false,
}

export default function reduce(state = initialState, action) {
    switch (action.type) {
        case BALANCE:
            return {
                ...state,
                balance: action.balance,
            };
        case TOP_UP:
            return {
                ...state,
                balance: action.balance,
            }
        case REGISTER:
            return {
                ...state,
                balance: action.BALANCE
            }
        case REGISTER_WALLET_POPUP_STATE:
            return {
                ...state,
                registerWalletPopup: action.popupstate,
            }
        default:
            return state;
    }
}