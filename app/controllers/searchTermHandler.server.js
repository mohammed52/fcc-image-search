'use strict';

function searchTermHandler(db) {
  var searchTerms = db.collection('searchTerms');
  var hostname = "https://fcc-image-search1.herokuapp.com/";

  this.addSearchTerm = function(req, res, callback) {
    searchTerms.insertOne({
      searchTerm: req.params.query,
      createdAt: new Date()
    }, function(err, data) {
      if (err) {
        throw err;
      }
      callback(data);
    })
  };

  this.getSearchHistory = function(req, res, callback) {
    searchTerms.find({})
      .project({
        searchTerm: 1
      })
      .toArray(function(err, result) {

        if (err)
          throw new Error(err);

        console.log("result", result);
        callback(result)
      });
  }

}

module.exports = searchTermHandler;