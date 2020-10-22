const initialState = {
  isSelecting: true,
  isReleasing: false,
  isReserving: false,
  reserveExcel: null
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
    default:
      return state;
  }
}