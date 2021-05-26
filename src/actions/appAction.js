const setIsSelecting = (payload) => dispatch => {
    dispatch({
        type: 'SET_IS_SELECTING',
        payload
    });
}

const setIsCreating = (payload) => dispatch => {
    dispatch({
        type: 'SET_IS_CREATING',
        payload
    });
}

const setIsReleasing = (payload) => dispatch => {
    dispatch({
        type: 'SET_IS_RELEASING',
        payload
    });
}

// const setIsReserving = (payload) => dispatch => {
//     dispatch({
//         type: 'SET_IS_RESERVING',
//         payload
//     });
// }

const setIsSearching = (payload) => dispatch => {
    dispatch({
        type: 'SET_IS_SEARCHING',
        payload
    });
}

const setIsFaq = (payload) => dispatch => {
    dispatch({
        type: 'SET_IS_FAQ',
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

const retryReserve = () => dispatch => {
    dispatch({
        type: 'RETRY_RESERVE'
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


const sendSearchRequest = (payload) => dispatch => {
    dispatch({
        type: "SEND_SEARCH_REQUEST",
        payload
    })
}

const resetSearch = (payload) => dispatch => {
    dispatch({
        type: 'RESET_SEARCH',
        payload
    });
}

const setSubmitter = (payload) => dispatch => {
    dispatch({
        type: 'SET_SUBMITTER',
        payload
    })
}

const setNode = (payload) => dispatch => {
    dispatch({
        type: 'SET_NODE',
        payload
    })
}

const resetStoredData = (payload) => dispatch => {
    dispatch({
        type: 'RESET_STORED_DATA',
        payload
    })
}

export default{
    setIsSelecting,
    setIsCreating,
    setIsReleasing,
    // setIsReserving,
    setIsSearching,
    setIsFaq,
    updateReserveExcel,
    sendReserveRequest,
    retryReserve,
    retryRelease,
    sendLidvidSearchRequest,
    sendDoiSearchRequest,
    sendPds4LabelSearchRequest,
    sendSaveReleaseRequest,
    sendReleaseRequest,
    resetRelease,
    updateReleaseXml,
    updateReleaseKeywords,
    sendSearchRequest,
    resetSearch,
    setSubmitter,
    setNode,
    resetStoredData
}

