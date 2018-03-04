'use strict';

function searchTermHandler(db) {

  let searchTerms = db.collection('searchTerms');
  let hostname = "https://fcc-image-search1.herokuapp.com/";

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

      .sort({
        createdAt: -1
      })
      .project({
        _id: 0,
      })
      .limit(10)
      .toArray(function(err, result) {
        if (err)
          throw new Error(err);

        console.log("result", result);
        callback(result)
      });
  }

}

module.exports = searchTermHandler;