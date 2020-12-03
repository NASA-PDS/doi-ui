const initialState = {
  isSelecting: true,
  isReleasing: false,
  isReserving: false,
  reserveExcel: null,
  reserveSubmitter: null,
  reserveNode: null
}
  
export default (state = initialState, action) => {
  switch (action.type) {
    case 'SET_IS_SELECTING':
      return {
        ...state,
        isSelecting: action.payload,
        isReleasing: false,
        isReserving: false
      }
    case 'SET_IS_RELEASING':
      return {
        ...state,
        isSelecting: false,
        isReleasing: action.payload,
        isReserving: false
      }
    case 'SET_IS_RESERVING':
      return {
        ...state,
        isSelecting: false,
        isReleasing: false,
        isReserving: action.payload
      }
    case 'UPDATE_RESERVE_EXCEL':
      return {
        ...state,
        reserveExcel: action.payload
      }
    case 'SET_RESERVE_SUBMITTER':
      return {
        ...state,
        reserveSubmitter: action.payload
      }
    case 'SET_RESERVE_NODE':
      return {
        ...state,
        reserveNode: action.payload
      }
    case 'RENDER_RESERVE_RESPONSE':
      return {
        ...state,
        reserveResponse: action.payload
      }
    default:
      return state;
  }
}