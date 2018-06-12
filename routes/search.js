const express = require("express");
const router = express.Router();
const SearchService = require("../service/search");
const Search = new SearchService();
// const _ = require('lodash')
const { Episode } = require("../models");
const { Podcast } = require("../models");

router.get("/", async (req, res) => {
  try {
    // ^ Specifies that the anonymous (req, res) function will be asynchronous.
    const term = req.query;
    //     ^ terms are passed as query parameters to the request.
    const podcastResponse = await Search.fetchPodcasts(term); // <- term passes the query parameters to the function.
    //      ^ podcastResponse is equal to the result of the fetchPodcasts search function.
    const results = podcastResponse.data.results;
    // const results = _.get(podcastResponse, 'data.results', [])

    // console.log(results);

    // Attempting to grab all the feedUrls from the search result.
    // 	for (var i = 0; i < podcastResponse.data.results.length; i++){
    // 		if (podcastResponse.data.results[i].feedUrl) {
    // 			const feedUrl = podcastResponse.data.results[i].feedUrl;
    // 			// console.log(podcastResponse.data.results[i].feedUrl);
    // 			console.log(feedUrl);
    // 	}
    // }

    const feedUrl = results[0].feedUrl;

    if (results.length > 0) {
      // for(let i = 0; i < results.length; i++) {
      Podcast.create({
        imageUrl: results[0].artworkUrl600,
        feedUrl: results[0].feedUrl,
        title: results[0].collectionName,
        creator: results[0].artistName
      })

        .then(thePodcast => {
          // console.log(Search.fetchFeed(results[0].feedUrl));

          Search.fetchFeed(feedUrl)
            .then(res => {
              console.log(feedUrl);
              const xmlParser = require("xml2js").parseString;

              xmlParser(res.data, function(error, feedResult) {
                feedResult.rss.channel[0].item.forEach(function(
                  episode,
                  index
                ) {
                  if (index < 15) {
                    Episode.create({
                      imageUrl: episode["itunes:image"][0]["$"]["href"],
                      title: episode.title.toString(),
                      publishedDate: episode.pubDate.toString(),
                      description: episode.description.toString(),
                      podcastID: thePodcast._id,
                      episodeScore: 0
                    });

                    // console.log(episode); // ALL INFO
                    // console.log("---------------------------");
                    // console.log("Title: ", episode.title.toString());
                    // console.log("Image URL: ", JSON.stringify(episode['itunes:image'][0]['$']['href']));
                    // console.log("Published: ", episode.pubDate.toString());
                    // console.log("Description: ", episode.description.toString());
                    // console.log("Episode ID: ",episode.guid[0]._.toString());
                    // console.log("---------------------------");
                    // res.json(theEpisode)
                  }
                });
              });
            })
            .catch(error => {
              res.send(error);
            });
          res.json(thePodcast);
        })
        .catch(error => {
          console.log(error);
          res.status("400").send(error.message);
        });
    } else {
      return res
        .status("404")
        .json({ error: `No results for search: ${req.query.term}` });
    } // END PODCAST IF/ELSE
  } catch (error) {
    console.log(error);
    res.status("400").send(error.message);
  }
}); // END OF GET

module.exports = router;

// var errorResponse = res.status('400')

// try {
//  const term = req.query
//  Search.fetchPodcasts(term)
//  .then(response => {
//   const feedUrl = response.data.results[0].feedUrl;

//   Search.fetchFeed(feedUrl)
//    .then(response => {
//     xmlParser(response.data, {trim: true}, (err, result) => {
//       res.json(result)
//     })
//     .catch(error => {
//      errorResponse.send()
//     })

//    })
//  })
//  .catch(error => {
//   console.log(error)
//   errorResponse.send()
//  })

// } catch(error) {
//  console.log(error);
//  errorResponse.send()
// }

// const feedResponse = await Search.fetchFeed(feedUrl);

// xmlParser(feedResponse.data, {trim: true}, (err, result) => {
//  if (err) errorResponse.send()
//  res.json(result)
// })
