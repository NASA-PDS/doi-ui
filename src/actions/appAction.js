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

export default{
    setIsSelecting,
    setIsReleasing,
    setIsReserving,
    updateReserveExcel
}

