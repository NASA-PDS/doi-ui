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

const retryReserve = () => dispatch => {
    dispatch({
        type: 'RETRY_RESERVE'
    })
}

const setReleaseSubmitter = (payload) => dispatch => {
    dispatch({
        type: 'SET_RELEASE_SUBMITTER',
        payload
    })
}

const setReleaseNode = (payload) => dispatch => {
    dispatch({
        type: 'SET_RELEASE_NODE',
        payload
    })
}

const sendLidvidSearchRequest = (payload) => dispatch => {
    dispatch({
        type: "SEND_LIDVID_SEARCH_REQUEST",
        payload
    })
}

const sendPds4LabelSearchRequest = (payload) => dispatch => {
    dispatch({
        type: "SEND_PDS4_LABEL_SEARCH_REQUEST",
        payload
    })
}

const sendReleaseRequest = (payload) => dispatch => {
    dispatch({
        type: "SEND_RELEASE_REQUEST",
        payload
    })
}

const retryRelease = () => dispatch => {
    dispatch({
        type: 'RETRY_RELEASE'
    })
}

const resetRelease = (payload) => dispatch => {
    dispatch({
        type: 'RESET_RELEASE'
    })
}

const updateReleaseXml = (payload) => dispatch => {
    dispatch({
        type: 'UPDATE_RELEASE_XML',
        payload
    })
}

const updateReleaseKeywords = (payload) => dispatch => {
    dispatch({
        type: 'UPDATE_RELEASE_KEYWORDS',
        payload
    })
}

export default{
    setIsSelecting,
    setIsReleasing,
    setIsReserving,
    updateReserveExcel,
    sendReserveRequest,
    setReserveSubmitter,
    setReserveNode,
    retryReserve,
    retryRelease,
    setReleaseSubmitter,
    setReleaseNode,
    sendLidvidSearchRequest,
    sendPds4LabelSearchRequest,
    sendReleaseRequest,
    resetRelease,
    updateReleaseXml,
    updateReleaseKeywords
}

