const doiNotFound = {
    "errors": [
      {
        "message": "No record(s) could be found for the entered DOI",
        "name": "No Results Found"
      }
    ]
  }

const recordNotFound = {
  "errors": [
    {
      "message": "No record(s) could be found for the entered search term.",
      "name": "UnknownIdentifierException"
    }
  ]
}

export default {
  doiNotFound,
  recordNotFound
};