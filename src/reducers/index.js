import con from 'constants'
import {jsonStringify, jsonParse, dateToStr} from 'utils';

const initialState = {
    open: false,
    flt_dt: new Date(jsonParse(localStorage.getItem('flt_dt')) || new Date()),
    inProgress: false,
    filter: [],
    currencies:[]
}

const reducer = (state = initialState, action = {}) => {
    switch (action.type) {
        case con.SHOW_FILTER_DLG:
            return Object.assign({}, state, {open: action.open });
            break;
        case con.LOADING:
            return Object.assign({}, state, {inProgress: action.inProgress });
            break;
        case con.LOAD_OK:
            localStorage.setItem('flt_dt', jsonStringify(action.flt_dt));
            return Object.assign({}, state, {currencies: action.currencies, flt_dt: action.flt_dt });
            break;
        default:
            return state;
    }
};

export default reducer