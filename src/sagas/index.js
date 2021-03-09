import { useScrollTrigger } from '@material-ui/core';
import { all, call, put, takeLatest } from 'redux-saga/effects';
import Config from '../Config';
import { printXML, findXmlTag } from '../utils/xmlUtil';
import doiNotFound from '../sagas/error';

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

    let endpoint = Config.api.getDoiByLidvidUrl;
    endpoint += encodeURIComponent(lidvid);

    const response = yield call(fetch, endpoint);
    let data = yield response.json();

    if(!data.errors){
        data = {
            data,
            xml: printXML(data.record),
            keywords: findXmlTag(data.record, "keywords")
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
                keywords: findXmlTag(lidvidData.record, "keywords")
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
    const labelUrl = action.payload;

    let endpoint = Config.api.getDoiByPds4LabelUrl;
    endpoint += '?action=draft';
    endpoint += '&submitter=';
    endpoint += '&node=atm';
    endpoint += '&url=' + encodeURI(labelUrl);

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
            data = {data: doiNotFound};
        }
        else{
            data = data[0];
            data = {
                data: data,
                xml: printXML(data.record),
                keywords: findXmlTag(data.record, "keywords")
            }
        }
    }
    else{
        data = {
            data: data
        }
    }

    yield put({ type: 'RENDER_DOI_SEARCH_RESULTS', payload: data});
}

function* sendPdsLabelUrlSearchRequest(){
    yield takeLatest('SEND_PDS4_LABEL_SEARCH_REQUEST', sendPds4LabelUrlSearch);
}

function* sendRelease(action){
    const {submitter, node, lidvid, force } = action.payload;

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

    const saveResponse = yield fetch(endpoint, {
        method: 'POST',
        headers: {
            "Accept": "application/json",
            'Content-Type': 'application/json'
        },
        body: action.payload.record
    });

    let data = yield saveResponse.json();

    if(!data.errors){
        let endpoint = Config.api.releaseDoiUrl + encodeURI(lidvid) + "/submit";
        if(force){
            endpoint += '?force=' + force;
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
    const {submitter, node, force} = action.payload;

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

    const response = yield fetch(endpoint, {
        method: 'POST',
        headers: {
            "Accept": "application/json",
            'Content-Type': 'application/json'
        },
        body: action.payload.record
    });

    let data = yield response.json();

    yield put({type: 'RENDER_SAVE_RELEASE_RESPONSE', payload: data});
}

function* sendSaveReleaseRequest(){
    yield takeLatest('SEND_SAVE_RELEASE_REQUEST', sendSaveRelease);
}

export default function* rootSaga(){
    yield all([
        sendReserveRequest(),
        sendLidvidSearchRequest(),
        sendDoiSearchRequest(),
        sendPdsLabelUrlSearchRequest(),
        sendReleaseRequest(),
        sendSaveReleaseRequest()
    ])
}