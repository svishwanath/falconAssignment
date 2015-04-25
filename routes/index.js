var express = require('express');
var router = express.Router();

/* GET home page. */


router.get('/', function(req, res) {
    res.sendfile('./views/index.html');
});

router.get('/partials/:name', function (req, res) {
  var name = req.params.name;
  res.sendfile('./views/partials/' + name +'.html');
});

/*
exports.partials = function (req, res) {
  var name = req.params.name;
  res.render('partials/' + name);
};
*/
module.exports = router;

