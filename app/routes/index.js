'use strict';

var request = require('request')

const API_KEY = process.env.GOOGLE_SEARCH_API_KEY;
const SE_ID = process.env.GOOGLE_SEARCH_ENGINE_ID;
const urlBase = 'https://www.googleapis.com/customsearch/v1?key=' + API_KEY + '&cx=' + SE_ID + '&q='

module.exports = function(app, db) {

  app.route('/_api/package.json')
    .get(function(req, res, next) {
      console.log('requested');
      fs.readFile(__dirname + '/package.json', function(err, data) {
        if (err) return next(err);
        res.type('txt').send(data.toString());
      });
    });

  // https://cryptic-ridge-9197.herokuapp.com/api/imagesearch/lolcats%20funny?offset=10
  app.route('/api/imagesearch/:query')
    .get(function(req, res) {
      var start = 0;
      var count = 10;
      console.log("req.query", req.query);

      if (req.params.query) {

        if (req.query.start) {
          start = req.query.start
        }

        if (req.query.count) {
          count = req.query.count
        }


        const url = urlBase + req.params.query + '&start=' + start + '&num=' + count;

        request.get(url, function(err, response, body) {
          if (err) {
            throw new Error(err);
          }
          console.log((JSON.parse(response.body)).items);
          res.send({
            params: req.params,
            query: req.query,
            results: (JSON.parse(response.body)).items
          })
        })
      } else {
        res.send({
          error: 'no search word specified'
        })
      }
    })

  app.route('/')
    .get(function(req, res) {
      if (req.path == '/') {
        res.sendFile(process.cwd() + '/views/index.html');
      } else {
        res.send({
          name: "hello world"
        });
      }
    });

  // Respond not found to all the wrong routes
  app.use(function(req, res, next) {
    res.status(404);
    res.type('txt').send('Not found');
  });

  // Error Middleware
  app.use(function(err, req, res, next) {
    if (err) {
      res.status(err.status || 500)
        .type('txt')
        .send(err.message || 'SERVER ERROR');
    }
  })
};