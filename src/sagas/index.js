import { useScrollTrigger } from '@material-ui/core';
import { all, call, put, takeLatest } from 'redux-saga/effects';
import Config from '../Config';
import { printXML, findXmlTag } from '../utils/xmlUtil';

function* sendReserveContent(action){
    const submitter = action.payload.submitter;
    const node = action.payload.node;

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
    const url = action.payload;

    let endpoint = Config.api.getDoiUrl;
    endpoint += encodeURI(url);

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

function* sendRelease(action){
    const releaseData = action.payload;
    const json = JSON.stringify(releaseData);
    
    let endpoint = Config.api.getDoiUrl + releaseData.lidvid + "/release";
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

    yield put({type: 'RENDER_RELEASE_RESPONSE', payload: data});
}

function* sendReleaseRequest(){
    yield takeLatest('SEND_RELEASE_REQUEST', sendRelease);
}

export default function* rootSaga(){
    yield all([
        sendReserveRequest(),
        sendLidvidSearchRequest(),
        sendReleaseRequest()
    ])
}