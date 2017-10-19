
var iconv = require('iconv-lite');

export function status(response) {
    if (response.status >= 200 && response.status < 300) {
        return Promise.resolve(response)
    } else {
        console.log(response);
        return Promise.reject(new Error(response.statusText))
    }
}

export function json(response) {

    try {
        return response.json()
    } catch (e) {
        console.log(e);
    }

    return null;
}

export function dateToStr(dt) {
    let d = dt.getDate();
    let m = dt.getMonth() + 1;
    let y = dt.getFullYear();
    return '' + (d <= 9 ? '0' + d : d) + '/' + (m<=9 ? '0' + m : m) + '/' + y;
}


function _xml2json(xml) {
    try {
        // Create the return object
        let obj = {};

        if (xml.nodeType === 1) { // element
            // do attributes
            if (xml.attributes.length > 0) {
                for (let j = 0; j < xml.attributes.length; j++) {
                    let attribute = xml.attributes.item(j);
                    obj[attribute.nodeName] = attribute.nodeValue;
                }
            }
        } else if (xml.nodeType === 3) { // text
            obj = xml.nodeValue;
        }

        // do children
        if (xml.hasChildNodes()) {

            if (xml.childNodes.length === 1 && xml.childNodes.item(0).nodeType === 3) {
                return xml.childNodes.item(0).nodeValue;
            } else {

                for(let i = 0; i < xml.childNodes.length; i++) {
                    let item = xml.childNodes.item(i);
                    let nodeName = item.nodeName;
                    let val;
                    if (item.nodeType ===3) {
                        val = item.nodeValue;
                    } else {
                        val = _xml2json(item);
                    }

                    if (obj[nodeName] === undefined) {
                        obj[nodeName] = val;
                    } else {
                        if (obj[nodeName].push === undefined) {
                            let old = obj[nodeName];
                            obj[nodeName] = [];
                            obj[nodeName].push(old);
                        }
                        obj[nodeName].push(val);
                    }
                }
            }
        }
        return obj;
    } catch (e) {
        console.log(e.message);
    }
    return null;
}

export function xml2json(txt) {

    let xml = new DOMParser().parseFromString(txt, 'text/xml');
    return _xml2json(xml);
}

export function text(response) {

    try {
        return Promise.resolve(response.text());
    } catch (e) {
        console.log(e);
        return Promise.reject(new Error(response.statusText))
    }

    return null;
}

export function jsonStringify( v ) {
    return JSON.stringify( v );
}

export function jsonParse(v) {

    try {
        return JSON.parse(v);
    } catch (e) {
        console.log(e);
    }

    return null;
}