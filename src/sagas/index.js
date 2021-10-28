import { all, call, put, takeLatest } from 'redux-saga/effects';
import Config from '../Config';
import {findXmlTag, printXML} from '../utils/xmlUtil';
import { doiNotFound, recordNotFound } from '../sagas/error';
var convert = require('xml-js');

const removeJsonTextAttribute = function(value, parentElement) {
    try {
        const parentOfParent = parentElement._parent;
        const pOpKeys = Object.keys(parentElement._parent);
        const keyNo = pOpKeys.length;
        const keyName = pOpKeys[keyNo - 1];
        const arrOfKey = parentElement._parent[keyName];
        const arrOfKeyLen = arrOfKey.length;
        if (arrOfKeyLen > 0) {
        const arr = arrOfKey;
        const arrIndex = arrOfKey.length - 1;
        arr[arrIndex] = value;
        } else {
        parentElement._parent[keyName] = value;
        }
    } catch (e) {}
};

const changeRecordSinglesToArrays = function(record) {
    if(record && record.data){
        if(record.data.attributes){
            if(record.data.attributes.contributors){
                record.data.attributes.contributors = convertToArray(record.data.attributes.contributors)
            }
            if(record.data.attributes.creators){
                record.data.attributes.creators = convertToArray(record.data.attributes.creators)
            }
            if(record.data.attributes.identifiers){
                record.data.attributes.identifiers = convertToArray(record.data.attributes.identifiers)
            }
            if(record.data.attributes.relatedIdentifiers){
                record.data.attributes.relatedIdentifiers = convertToArray(record.data.attributes.relatedIdentifiers)
            }
            if(record.data.attributes.subjects){
                record.data.attributes.subjects = convertToArray(record.data.attributes.subjects)
            }
            if(record.data.attributes.titles){
                record.data.attributes.titles = convertToArray(record.data.attributes.titles)
            }
            if(record.data.attributes.descriptions){
                record.data.attributes.descriptions = convertToArray(record.data.attributes.descriptions)
            }
            if(record.data.attributes.publicationYear){
                record.data.attributes.publicationYear = String(record.data.attributes.publicationYear._text);
            }
            if(record.data.attributes.prefix){
                record.data.attributes.prefix = String(record.data.attributes.prefix._text);
            }
        }
    }
};

const convertToArray = function(value){
    if(value.constructor === Array){
        return value;
    }
    else{
        return [value];
    }
}

function* sendReserveContent(action){
    const {submitter, node, force} = action.payload;

    let json = action.payload.excelContent;
    json = JSON.stringify(json);

    let endpoint = Config.api.reserveUrl;
    endpoint += '?action=reserve';

    if(submitter){
        endpoint += '&submitter=' + submitter;
    }
    if(node){
        endpoint += '&node=' + node;
    }
    if(force){
        endpoint += '&force=' + force;
    }

    endpoint = encodeURI(endpoint);

    const response = yield fetch(endpoint, {
        method: 'POST',
        headers: {
            "Accept": "application/json",
            'Content-Type': 'application/json'
        },
        body: json
    });

    let data = yield response.json();

    yield put({type: 'RENDER_RESERVE_RESPONSE', payload: data});
}

function* sendReserveRequest(){
    yield takeLatest('SEND_RESERVE_REQUEST', sendReserveContent);
}

function* sendLidvidSearch(action){
    const lidvid = action.payload;

    let endpoint = Config.api.getDoiByIdentifier;
    endpoint += "?identifier=" + encodeURIComponent(lidvid);

    const response = yield call(fetch, endpoint);
    let data = yield response.json();

    if(!data.errors){
        if(data.record){
            let options = {compact: true, ignoreComment: true, spaces: 4};
            let result = convert.json2xml(data.record, options);
            
            data.record = result;

            data = {
                data,
                xml: printXML(data.record),
                keywords: findXmlTag(data.record, "subjects")
            }
        }
    }
    else{
        data = {
            data
        }
    }

    yield put({ type: 'RENDER_DOI_SEARCH_RESULTS', payload: data});
}

function* sendLidvidSearchRequest(){
    yield takeLatest('SEND_LIDVID_SEARCH_REQUEST', sendLidvidSearch);
}

function* sendDoiSearch(action){
    const doi = action.payload;
    
    let doiEndpoint = Config.api.getDoiByDoiUrl + '?doi=';
    doiEndpoint += encodeURIComponent(doi);

    const doiResponse = yield call(fetch, doiEndpoint);
    let doiData = yield doiResponse.json();
    let data;

    let hasErrors = false;
    let lidvid;
    if(!doiData.errors){
        if(doiData.length < 1){
            hasErrors = true;
            data = {data: doiNotFound};
        }
        else{
            lidvid = doiData[0].lidvid;
        }
    }
    else{
        hasErrors = true;
        data = {
            doiData
        }
    }

    if(!hasErrors){
        let lidvidEndpoint = Config.api.getDoiByLidvidUrl;
        lidvidEndpoint += encodeURIComponent(lidvid);

        const responseLidvid = yield call(fetch, lidvidEndpoint);
        let lidvidData = yield responseLidvid.json();

        if(!lidvidData.errors){
            data = {
                data: lidvidData,
                xml: printXML(lidvidData.record),
                keywords: findXmlTag(lidvidData.record, "subjects"),
                recordJson: lidvidData.record
            }
        }
        else{
            data = {
                lidvidData
            }
        }
    }

    yield put({ type: 'RENDER_DOI_SEARCH_RESULTS', payload: data});
}

function* sendDoiSearchRequest(){
    yield takeLatest('SEND_DOI_SEARCH_REQUEST', sendDoiSearch);
}

function* sendPds4LabelUrlSearch(action){
    const {labelUrl, submitter, node, force} = action.payload;

    let endpoint = Config.api.getDoiByPds4LabelUrl;
    endpoint += '?action=draft';
    endpoint += '&submitter=' + submitter;
    endpoint += '&node=' + node;
    endpoint += '&url=' + encodeURI(labelUrl);
    if (force) endpoint += '&force=' + force;
    
    
    const response = yield fetch(endpoint, {
        method: 'POST',
        headers: {
            "Accept": "application/json",
            'Content-Type': 'application/json'
        }
    });

    let data = yield response.json();

    if(!data.errors){
        if(data.length < 1){
            data = {
                data: doiNotFound
            };
        }
        else{
            data = data[0];

            let options = {compact: true, ignoreComment: true, spaces: 4};
            let result = convert.json2xml(data.record, options);
            
            data.record = result;

            data = {
                data: data,
                xml: printXML(data.record),
                keywords: findXmlTag(data.record, "subjects")
            }
        }
    }
    else{
        data = {
            data
        }
    }

    yield put({ type: 'RENDER_URL_SEARCH_RESULTS', payload: data});
}

function* sendPdsLabelUrlSearchRequest(){
    yield takeLatest('SEND_PDS4_LABEL_SEARCH_REQUEST', sendPds4LabelUrlSearch);
}

function* sendRelease(action){
    const {submitter, node, identifier, force} = action.payload;

    let endpoint = Config.api.reserveUrl;
    endpoint += '?action=draft';

    if(submitter){
        endpoint += '&submitter=' + submitter;
    }
    if(node){
        endpoint += '&node=' + node;
    }
    if(force){
        endpoint += '&force=' + force;
    }

    endpoint = encodeURI(endpoint);

    let sendRecord = action.payload.record;

    sendRecord = convert.xml2json(
        sendRecord,
        {
            compact: true,
            trim: true,
            nativeType: true,
            ignoreDeclaration: true,
            ignoreInstruction: true,
            ignoreAttributes: true,
            ignoreComment: true,
            ignoreCdata: true,
            ignoreDoctype: true,
            textFn: removeJsonTextAttribute
        }
    );

    sendRecord = JSON.parse(sendRecord);
    changeRecordSinglesToArrays(sendRecord);
    
    sendRecord = JSON.stringify(sendRecord);

    const saveResponse = yield fetch(endpoint, {
        method: 'POST',
        headers: {
            "Accept": "application/json",
            'Content-Type': 'application/json'
        },
        body: sendRecord
    });

    let data = yield saveResponse.json();

    if(!data.errors){
        let endpoint = Config.api.releaseDoiUrl + "submit?identifer=" + encodeURI(identifier);
        if(force){
            endpoint += '&force=' + force;
        }

        const submitResponse = yield fetch(endpoint, {
            method: 'POST',
            headers: {
                "Accept": "application/json",
                'Content-Type': 'application/json'
            }
        });
    
        data = yield submitResponse.json();
    }


    yield put({type: 'RENDER_RELEASE_RESPONSE', payload: data});
}

function* sendReleaseRequest(){
    yield takeLatest('SEND_RELEASE_REQUEST', sendRelease);
}

function* sendSaveRelease(action){
    const {submitter, node, status, force} = action.payload;

    let endpoint = Config.api.reserveUrl;
    endpoint += '?action=' + status;

    if(submitter){
        endpoint += '&submitter=' + submitter;
    }
    if(node){
        endpoint += '&node=' + node;
    }
    if(force){
        endpoint += '&force=' + force;
    }

    endpoint = encodeURI(endpoint);
    
   let sendRecord = action.payload.record;

   sendRecord = convert.xml2json(
        sendRecord, 
        {
            compact: true,
            trim: true,
            nativeType: true,
            ignoreDeclaration: true,
            ignoreInstruction: true,
            ignoreAttributes: true,
            ignoreComment: true,
            ignoreCdata: true,
            ignoreDoctype: true,
            textFn: removeJsonTextAttribute
        }
    );

    sendRecord = JSON.parse(sendRecord);
    changeRecordSinglesToArrays(sendRecord);
    sendRecord = JSON.stringify(sendRecord);

    const response = yield fetch(endpoint, {
        method: 'POST',
        headers: {
            "Accept": "application/json",
            'Content-Type': 'application/json'
        },
        body: sendRecord
    });

    let data = yield response.json();

    yield put({type: 'RENDER_SAVE_RELEASE_RESPONSE', payload: data});
}

function* sendSaveReleaseRequest(){
    yield takeLatest('SEND_SAVE_RELEASE_REQUEST', sendSaveRelease);
}

function* sendSearch(action){
    let identifier = action.payload ? action.payload : '*';
    let endpoint = Config.api.searchUrl;
    let isSingleResult = false;

    if (identifier.startsWith('10.')) {
        endpoint += '?doi=' + encodeURIComponent(identifier);
    }
    else{
        if(!identifier.startsWith('urn:nasa:pds:')) {
            let searchIdentifier = identifier.replace(/\//g, '-') + '*';
            identifier = '*' + searchIdentifier;
            endpoint += '?ids=' + encodeURIComponent(identifier);
        }
        else{
            isSingleResult = true;
            endpoint = Config.api.getDoiByIdentifier;
            endpoint += '?identifier=' + encodeURIComponent(identifier);
        }
    }

    const response = yield call(fetch, endpoint);
    let data = yield response.json();

    if(isSingleResult){
        data = [data];
    }
    
    if (data.length === 0) {
        data = recordNotFound;
    }

    yield put({type: 'RENDER_SEARCH_RESULTS', payload: {identifier, data}});
}

function* sendSearchRequest(){
    yield takeLatest('SEND_SEARCH_REQUEST', sendSearch);
}

export default function* rootSaga(){
    yield all([
        sendReserveRequest(),
        sendLidvidSearchRequest(),
        sendDoiSearchRequest(),
        sendPdsLabelUrlSearchRequest(),
        sendReleaseRequest(),
        sendSaveReleaseRequest(),
        sendSearchRequest()
    ])
}