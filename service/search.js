const axios = require("axios");

class SearchService {
  // baseURL = https://itunes.apple.com/search?'
  constructor(entity = "podcast") {
    this.baseURL = process.env.ITUNES_API;
    this.defaultParam = {
      // Always sets entity as a default parameter.
      entity
    };
  }

  // Uses a get request to ask for a list of podcasts depending on the terms passed as a paramter.
  fetchPodcasts(term = {}) {
    return axios.get(this.baseURL, {
      params: Object.assign(this.defaultParam, term)
    });
  } //  ^ Merges the baseURL, default param(entity=podcast) & terms.

  fetchFeed(url) {
    if (url) {
      return axios.get(url)
        .then(function(response) {
          return(response);
        })
        .catch(function(error) {
          console.log(error);
        });
    }
  }
}

module.exports = SearchService;
