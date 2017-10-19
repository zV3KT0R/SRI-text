import con from 'constants';
import {status, xml2json, text, dateToStr} from 'utils';


export const showFilterDlg = (open) => {
    return dispatch => {
        dispatch({
            type: con.SHOW_FILTER_DLG,
            open: open
        });
    };
};

export const load = (dt) => {

    let d = dateToStr(dt);

    return dispatch => {
        dispatch({type: con.LOADING, inProgress: true});

        fetch(`https://cors-anywhere.herokuapp.com/http://www.cbr.ru/scripts/XML_daily_eng.asp?date_req=${d}`, {
            method:         "GET",
            mode:           'cors'
        })
            .then(status)
            .then(text)
            .then(xml => {
                let res = xml2json(xml);
                dispatch({type: con.LOADING, inProgress: false});
                dispatch({type: con.LOAD_OK, flt_dt: dt, currencies: res.ValCurs.Valute});
                dispatch(showFilterDlg(false));
            })
            .catch((error) => {
                dispatch({type: con.LOADING, inProgress: false});
                console.log(error);
            });
    };
};