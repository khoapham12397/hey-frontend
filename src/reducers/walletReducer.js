import { TOP_UP, 
    TRANSFER, 
    BALANCE,
    REGISTER,
    REGISTER_WALLET_POPUP_STATE,
    TOPUP_WALLET_POPUP_STATE,
} from "../actions/walletAction";

const initialState = {
    user: {},
    registerWalletPopup: false,
    topUpPopup: false,
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
                balance: state.balance + action.amount,
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
        case TOPUP_WALLET_POPUP_STATE:
            return {
                ...state,
                topUpPopup: action.popupstate,
            }
        default:
            return state;
    }
}