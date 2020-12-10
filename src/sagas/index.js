import { all, call, put, takeLatest } from 'redux-saga/effects';
import Config from '../Config';

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
    data = JSON.stringify(data);

    yield put({type: 'RENDER_RESERVE_RESPONSE', payload: data});
}

function* sendReserveRequest(){
    yield takeLatest('SEND_RESERVE_REQUEST', sendReserveContent);
}

export default function* rootSaga(){
    yield all([
        sendReserveRequest()
    ])
}