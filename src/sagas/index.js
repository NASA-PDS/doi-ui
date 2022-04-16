import { all, call, put, takeLatest } from 'redux-saga/effects';
import Config from '../Config';
import {findXmlTag, printXML} from '../utils/xmlUtil';
import { doiNotFound, recordNotFound } from '../sagas/error';
import { LidvidUtil } from './LidvidUtil';
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

const normalizeRecord = (obj, searchKey, parent, parentKey) => {
    Object.keys(obj).forEach(key => {
        const value = obj[key];
        if(key === searchKey && typeof value !== 'object'){
            parent[parentKey] = String(value);
        }else if(typeof value === 'object'){
            normalizeRecord(value, searchKey, obj, key);
        }
    });
}; 

const prepareJsonRecord = function(record) {
    if(record && record.data){
        if(record.data.attributes){
            normalizeRecord(record, '_text');

            if(record.data.attributes.contributors){
                record.data.attributes.contributors = convertToArray(record.data.attributes.contributors);
            }
            if(record.data.attributes.creators){
                record.data.attributes.creators = convertToArray(record.data.attributes.creators);
            }
            if(record.data.attributes.identifiers){
                record.data.attributes.identifiers = convertToArray(record.data.attributes.identifiers);
            }
            if(record.data.attributes.relatedIdentifiers){
                record.data.attributes.relatedIdentifiers = convertToArray(record.data.attributes.relatedIdentifiers);
            }
            if(record.data.attributes.subjects){
                record.data.attributes.subjects = convertToArray(record.data.attributes.subjects);
            }
            if(record.data.attributes.titles){
                record.data.attributes.titles = convertToArray(record.data.attributes.titles);
            }
            if(record.data.attributes.descriptions){
                record.data.attributes.descriptions = convertToArray(record.data.attributes.descriptions);
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

    let endpoint = Config.api + 'dois';
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

    try{
        const response = yield fetch(endpoint, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: json
        });

        let data = yield response.json();

        yield put({type: 'RENDER_RESERVE_RESPONSE', payload: data});
    }
    catch(error){
        yield put({type: 'RENDER_API_TEST_RESULT', payload: false});
    }
}

function* sendReserveRequest(){
    yield takeLatest('SEND_RESERVE_REQUEST', sendReserveContent);
}

function* sendLidvidSearch(action){
    const lidvid = action.payload;

    let endpoint = Config.api + 'doi';
    endpoint += '?identifier=' + encodeURIComponent(lidvid);

    try{
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
                    keywords: findXmlTag(data.record, 'subjects')
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
    catch(error){
        yield put({type: 'RENDER_API_TEST_RESULT', payload: false});
    }
}

function* sendLidvidSearchRequest(){
    yield takeLatest('SEND_LIDVID_SEARCH_REQUEST', sendLidvidSearch);
}


function* sendPds4LabelUrlSearch(action){
    const {labelUrl, submitter, node, force} = action.payload;

    let endpoint = Config.api + 'dois';
    endpoint += '?action=draft';
    endpoint += '&submitter=' + submitter;
    endpoint += '&node=' + node;
    endpoint += '&url=' + encodeURI(labelUrl);
    if (force) endpoint += '&force=' + force;
    
    
    try{
        const response = yield fetch(endpoint, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
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
                    keywords: findXmlTag(data.record, 'subjects')
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
    catch(error){
        yield put({type: 'RENDER_API_TEST_RESULT', payload: false});
    }
}

function* sendPdsLabelUrlSearchRequest(){
    yield takeLatest('SEND_PDS4_LABEL_SEARCH_REQUEST', sendPds4LabelUrlSearch);
}

function* sendRelease(action){
    const {submitter, node, identifier, force} = action.payload;

    let endpoint = Config.api + 'dois';
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
    prepareJsonRecord(sendRecord);
    
    sendRecord = JSON.stringify(sendRecord);

    try{
        const saveResponse = yield fetch(endpoint, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: sendRecord
        });

        let data = yield saveResponse.json();

        if(!data.errors){
            let endpoint = Config.api + 'doi/submit?identifier=' + encodeURI(identifier);
            if(force){
                endpoint += '&force=' + force;
            }

            const submitResponse = yield fetch(endpoint, {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            });
        
            data = yield submitResponse.json();
        }


        yield put({type: 'RENDER_RELEASE_RESPONSE', payload: data});
    }
    catch(error){
        yield put({type: 'RENDER_API_TEST_RESULT', payload: false});
    }
}

function* sendReleaseRequest(){
    yield takeLatest('SEND_RELEASE_REQUEST', sendRelease);
}

function* sendSaveRelease(action){
    const {submitter, node, status, force} = action.payload;

    let endpoint = Config.api + 'dois';
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
    prepareJsonRecord(sendRecord);
    sendRecord = JSON.stringify(sendRecord);

    try{
        const response = yield fetch(endpoint, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: sendRecord
        });

        let data = yield response.json();

        yield put({type: 'RENDER_SAVE_RELEASE_RESPONSE', payload: data});
    }
    catch(error){
        yield put({type: 'RENDER_API_TEST_RESULT', payload: false});
    }
}

function* sendSaveReleaseRequest(){
    yield takeLatest('SEND_SAVE_RELEASE_REQUEST', sendSaveRelease);
}

function* sendSearch(action){
    let identifier = action.payload ? action.payload : '*';
    let endpoint = Config.api + 'dois';
    let isSingleResult = false;

    if (identifier.startsWith('10.')) {
        endpoint += '?doi=' + encodeURIComponent(identifier);
    }
    else{
        let searchIdentifier = identifier.replace(/\//g, '-') + '*';
        identifier = '*' + searchIdentifier;
        endpoint += '?ids=' + encodeURIComponent(identifier);
    }

    try{
        const response = yield call(fetch, endpoint);
        let data = yield response.json();
        let parentData;

        if(isSingleResult){
            data = [data];
        }
        
        if (data.length === 0) {
            data = recordNotFound;

            let parentIdentifier = action.payload;
            if(LidvidUtil.isLidOrLidvid(parentIdentifier)){
                if(LidvidUtil.isProductLidvid(parentIdentifier)){
                    let collectionLid = LidvidUtil.trimProductLidvidToCollectionLid(parentIdentifier);

                    let parentEndpoint = Config.api + 'dois';

                    parentIdentifier = collectionLid.replace(/\//g, '-') + '*';
                    parentIdentifier = '*' + parentIdentifier;
                    parentEndpoint += '?ids=' + encodeURIComponent(parentIdentifier);

                    const parentResponse = yield call(fetch, parentEndpoint);
                
                    parentData = yield parentResponse.json();

                    if(parentData.length === 0){
                        parentIdentifier = LidvidUtil.removeDoubleColon(parentIdentifier);
                        if(LidvidUtil.isCollectionLid(parentIdentifier)){
                            let bundle = LidvidUtil.trimCollectionLidToBundle(parentIdentifier);
            
                            let parentEndpoint = Config.api + 'dois';
            
                            parentIdentifier = bundle.replace(/\//g, '-') + '*';
                            parentIdentifier = '*' + parentIdentifier;
                            parentEndpoint += '?ids=' + encodeURIComponent(parentIdentifier);
            
                            const parentResponse = yield call(fetch, parentEndpoint);
                        
                            parentData = yield parentResponse.json();
                        }
                    }
                }
                else if(LidvidUtil.isCollectionLid(parentIdentifier)){
                    let bundle = LidvidUtil.trimCollectionLidToBundle(parentIdentifier);

                    let parentEndpoint = Config.api + 'dois';

                    parentIdentifier = bundle.replace(/\//g, '-') + '*';
                    parentIdentifier = '*' + parentIdentifier;
                    parentEndpoint += '?ids=' + encodeURIComponent(parentIdentifier);

                    const parentResponse = yield call(fetch, parentEndpoint);
                
                    parentData = yield parentResponse.json();
                }
            }
        }

        yield put({type: 'RENDER_SEARCH_RESULTS', payload: {identifier, data, parentData}});
    }
    catch(error){
        yield put({type: 'RENDER_API_TEST_RESULT', payload: false});
    }
}

function* sendSearchRequest(){
    yield takeLatest('SEND_SEARCH_REQUEST', sendSearch);
}

function* sendApiTest(action){
    let endpoint = Config.api + 'dois?ids=*';

    try{
        const response = yield call(fetch, endpoint);
        let data = yield response.json();
        yield put({type: 'RENDER_API_TEST_RESULT', payload: true});
    }
    catch(error){
        yield put({type: 'RENDER_API_TEST_RESULT', payload: false});
    }
}

function* sendApiTestRequest(){
    yield takeLatest('SEND_API_TEST_REQUEST', sendApiTest);
}


export default function* rootSaga(){
    yield all([
        sendReserveRequest(),
        sendLidvidSearchRequest(),
        sendPdsLabelUrlSearchRequest(),
        sendReleaseRequest(),
        sendSaveReleaseRequest(),
        sendSearchRequest(),
        sendApiTestRequest()
    ])
}