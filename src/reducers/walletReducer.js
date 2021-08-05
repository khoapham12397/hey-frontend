import { TOP_UP, 
    TRANSFER, 
    BALANCE,
    REGISTER,
    CHANGE_REQUEST,
    REGISTER_WALLET_POPUP_STATE,
    TOPUP_POPUP_STATE,
    PIN_POPUP_STATE,
    TRANSFER_POPUP_STATE,
} from "../actions/walletAction";

const initialState = {
    user: {},
    registerWalletPopup: false,
    topUpPopup: false,
    pinPopup: false,
    transferPopup: false,
}

export default function reduce(state = initialState, action) {
    switch (action.type) {
        case CHANGE_REQUEST:
            return {
                ...state,
                request: action.request
            }
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
        case TRANSFER:
            return {
                ...state,
                balance: state.balance - action.amount,
            }
        case REGISTER_WALLET_POPUP_STATE:
            return {
                ...state,
                registerWalletPopup: action.popupstate,
            }
        case TOPUP_POPUP_STATE:
            return {
                ...state,
                topUpPopup: action.popupstate,
            }
        case PIN_POPUP_STATE:
            return {
                ...state,
                pinPopup: action.popupstate,
            }
        case TRANSFER_POPUP_STATE:
            return {
                ...state,
                transferPopup: action.popupstate,
            }
        default:
            return state;
    }
}