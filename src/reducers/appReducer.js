const initialState = {
  isSelecting: false,
  isReleasing: false,
  isReserving: false,
  isViewing: true,
  reserveExcel: null,
  reserveSubmitter: null,
  reserveNode: null,
  reserveResponse: null,
  doiSearchResponse: null,
  releaseXml: null,
  releaseKeywords: null,
  releaseResponse: null,
  releaseSubmitter: null,
  releaseNode: null,
  releaseIdentifier: null,  // always lidvid
  searchClear: true,
  searchIdentifier: null,   // doi, lidvid, or partial
  searchResponse: null
}
  
export default (state = initialState, action) => {
  switch (action.type) {
    case 'SET_IS_SELECTING':
      return {
        ...state,
        isSelecting: action.payload,
        isReleasing: false,
        isReserving: false,
        isViewing: false
      }
    case 'SET_IS_RELEASING':
      return {
        ...state,
        isSelecting: false,
        isReleasing: action.payload.page,
        isReserving: false,
        isViewing: false,
        releaseIdentifier: action.payload.identifier
        // searchResponse: null
      }
    case 'SET_IS_RESERVING':
      return {
        ...state,
        isSelecting: false,
        isReleasing: false,
        isReserving: action.payload,
        isViewing: false
      }
    case 'SET_IS_VIEWING':
      return {
        ...state,
        isSelecting: false,
        isReleasing: false,
        isReserving: false,
        isViewing: action.payload,
        releaseIdentifier: null
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
    case 'RETRY_RESERVE':
      return {
        ...state,
        reserveResponse: null
      }
    case 'RETRY_RELEASE':
      return {
        ...state,
        releaseResponse: null
      }
    case 'SET_RELEASE_SUBMITTER':
      return {
        ...state,
        releaseSubmitter: action.payload
      }
    case 'SET_RELEASE_NODE':
      return {
        ...state,
        releaseNode: action.payload
      }
    case 'RENDER_DOI_SEARCH_RESULTS':
      return {
        ...state,
        doiSearchResponse: action.payload.data,
        releaseKeywords: action.payload.keywords,
        releaseXml: action.payload.xml,
        releaseSubmitter: action.payload.data.submitter,
        releaseNode: action.payload.data.node
      }
    case 'RESET_RELEASE':
      return {
        ...state
      }
    case 'UPDATE_RELEASE_XML':
      return {
        ...state,
        releaseXml: action.payload
      }
    case 'UPDATE_RELEASE_KEYWORDS':
      return {
        ...state,
        releaseKeywords: action.payload
      }
    case 'RENDER_RELEASE_RESPONSE':
      return {
        ...state,
        releaseResponse: action.payload
      }
    case 'RENDER_SAVE_RELEASE_RESPONSE':
      return {
        ...state,
        doiSearchResponse: action.payload
      }
    case 'SET_SEARCH_CLEAR':
      return {
        ...state,
        searchClear: true,
        searchIdentifier: null,
        searchResponse: null
      }
    case 'RENDER_SEARCH_RESULTS':
      return {
        ...state,
        searchClear: false,
        searchIdentifier: action.payload.identifier,
        searchResponse: action.payload.data
      }
    default:
      return state;
  }
}