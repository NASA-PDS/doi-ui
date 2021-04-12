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

const setIsViewing = (payload) => dispatch => {
    dispatch({
        type: 'SET_IS_VIEWING',
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

const sendDoiSearchRequest = (payload) => dispatch => {
    dispatch({
        type: "SEND_DOI_SEARCH_REQUEST",
        payload
    })
}

const sendPds4LabelSearchRequest = (payload) => dispatch => {
    dispatch({
        type: "SEND_PDS4_LABEL_SEARCH_REQUEST",
        payload
    })
}

const sendSaveReleaseRequest = (payload) => dispatch => {
    dispatch({
        type: "SEND_SAVE_RELEASE_REQUEST",
        payload
    });
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

const exactViewToRelease = (payload) => dispatch => {
    dispatch({
        type: 'EXACT_VIEW_TO_RELEASE',
        payload
    });
}

const relatedViewToRelease = (payload) => dispatch => {
    dispatch({
        type: 'RELATED_VIEW_TO_RELEASE',
        payload
    });
}

export default{
    setIsSelecting,
    setIsReleasing,
    setIsReserving,
    setIsViewing,
    updateReserveExcel,
    sendReserveRequest,
    setReserveSubmitter,
    setReserveNode,
    retryReserve,
    retryRelease,
    setReleaseSubmitter,
    setReleaseNode,
    sendLidvidSearchRequest,
    sendDoiSearchRequest,
    sendPds4LabelSearchRequest,
    sendSaveReleaseRequest,
    sendReleaseRequest,
    resetRelease,
    updateReleaseXml,
    updateReleaseKeywords,
    exactViewToRelease,
    relatedViewToRelease
}

