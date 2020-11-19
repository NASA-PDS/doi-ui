const setIsSelecting = (payload) => dispatch => {
    dispatch({
        type: 'SET_IS_SELECTING',
        payload
    });
}

const setIsReleasing = (payload) => dispatch => {
    dispatch({
        type: 'SET_IS_RELEASING',
        payload
    });
}

const setIsReserving = (payload) => dispatch => {
    dispatch({
        type: 'SET_IS_RESERVING',
        payload
    });
}

const updateReserveExcel = (payload) => dispatch => {
    dispatch({
        type: 'UPDATE_RESERVE_EXCEL',
        payload
    });
}

const sendReserveRequest = (payload) => dispatch => {
    dispatch({
        type: 'SEND_RESERVE_REQUEST',
        payload
    });
}

const setReserveAction = (payload) => dispatch => {
    dispatch({
        type: 'SET_RESERVE_ACTION',
        payload
    });
}

const setReserveSubmitter = (payload) => dispatch => {
    dispatch({
        type: 'SET_RESERVE_SUBMITTER',
        payload
    });
}

const setReserveNode = (payload) => dispatch => {
    dispatch({
        type: 'SET_RESERVE_NODE',
        payload
    });
}

const setReserveUrl = (payload) => dispatch => {
    dispatch({
        type: 'SET_RESERVE_URL',
        payload
    });
}

export default{
    setIsSelecting,
    setIsReleasing,
    setIsReserving,
    updateReserveExcel,
    sendReserveRequest,
    setReserveAction,
    setReserveSubmitter,
    setReserveNode,
    setReserveUrl
}

