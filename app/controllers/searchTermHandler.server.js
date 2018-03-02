'use strict';

function searchTermHandler(db) {
  var searchTerms = db.collection('searchTerms');
  var hostname = "https://fcc-image-search1.herokuapp.com/";

  this.addSearchTerm = function(req, res, callback) {
    searchTerms.insertOne({
      searchTerm: req.params.query
    }, function(err, data) {
      if (err) {
        throw err;
      }
      callback(data);
    })
  }

}

module.exports = searchTermHandler;