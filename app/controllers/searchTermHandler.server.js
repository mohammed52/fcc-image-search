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
    searchTerms.find({
      // searchTerm: "karachi"
    }, {
      _id: 0
    })
      .sort({
        createdAt: 1
      })
      .toArray(function(err, result) {

        if (err) {
          throw new Error(err)
        } else {
          console.log("result", result);
          callback(result)
        }
      })
  }

}

module.exports = searchTermHandler;