const initialState = {
  isSelecting: true,
  isCreating: false,
  isReleasing: false,
  isSearching: false,
  isFaq: false,
  reserveExcel: null,
  reserveResponse: null,
  doiSearchResponse: null,
  saveResponse: null,
  releaseXml: null,
  releaseKeywords: null,
  releaseResponse: null,
  releaseIdentifier: null,  // always lidvid
  searchClear: true,
  searchIdentifier: null,   // doi, lidvid, or partial
  searchResponse: null,
  submitter: null,
  node: null,
}
  
export default (state = initialState, action) => {
  switch (action.type) {
    case 'SET_IS_SELECTING':
      return {
        ...state,
        isSelecting: action.payload,
        isCreating: false,
        isReleasing: false,
        isSearching: false,
        isFaq: false
      }
    case 'SET_IS_CREATING':
      return {
        ...state,
        isSelecting: false,
        isCreating: action.payload,
        isReleasing: false,
        isSearching: false,
        isFaq: false
      }
    case 'SET_IS_RELEASING':
      return {
        ...state,
        isSelecting: false,
        isCreating: false,
        isReleasing: action.payload.page,
        isSearching: false,
        isFaq: false,
        releaseIdentifier: action.payload.identifier
      }
    case 'SET_IS_SEARCHING':
      return {
        ...state,
        isSelecting: false,
        isCreating: false,
        isReleasing: false,
        isSearching: action.payload,
        isFaq: false
      }
    case 'SET_IS_FAQ':
      return {
        ...state,
        isSelecting: false,
        isCreating: false,
        isReleasing: false,
        isSearching: false,
        isFaq: action.payload
      }
    case 'UPDATE_RESERVE_EXCEL':
      return {
        ...state,
        reserveExcel: action.payload
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
    case 'RENDER_DOI_SEARCH_RESULTS':
      return {
        ...state,
        doiSearchResponse: action.payload.data,
        releaseKeywords: action.payload.keywords,
        releaseXml: action.payload.xml,
        submitter: action.payload.data.submitter ? action.payload.data.submitter : action.payload.submitter,
        node: action.payload.data.node ? action.payload.data.node : action.payload.node
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
        saveResponse: action.payload
      }
    case 'RENDER_SEARCH_RESULTS':
      return {
        ...state,
        searchClear: false,
        searchIdentifier: action.payload.identifier,
        searchResponse: action.payload.data
      }
    case 'RESET_SEARCH':
      return {
        ...state,
        searchClear: true,
        searchIdentifier: null,
        searchResponse: null
      }
    case 'SET_SUBMITTER':
      return {
        ...state,
        submitter: action.payload
      }
    case 'SET_NODE':
      return {
        ...state,
        node: action.payload
      }
    case 'RESET_STORED_DATA':
      return {
        ...state,
        reserveResponse: null,
        doiSearchResponse: null,
        releaseResponse: null,
        releaseXml: null,
        releaseKeywords: null,
        releaseIdentifier: null,
        submitter: null,
        node: null
      }
    default:
      return state;
  }
}