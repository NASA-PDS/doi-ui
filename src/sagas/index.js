import { all, call, put, takeLatest } from 'redux-saga/effects';

function* sendReserveContent(action){
    const reserveAction = action.payload.action;
    const submitter = action.payload.submitter;
    const node = action.payload.node;
    const url = action.payload.url;

    let json = action.payload.excelContent;
    json = JSON.stringify(json);

    let endpoint = 'http://localhost:8085/PDS_APIs/pds_doi_api/0.1/dois';

    if(reserveAction || submitter || node || url){
        endpoint += '?';

        if(reserveAction){
            endpoint += 'action=' + reserveAction;
        }
        if(submitter){
            endpoint += '&submitter=' + submitter;
        }
        if(node){
            endpoint += '&node=' + node;
        }
        if(url){
            endpoint += '&url=' + url;
        }
    }

    endpoint = encodeURI(endpoint);

    const response = yield fetch(endpoint, {
        method: 'POST',
        headers: {
            "Accept": "application/json"
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