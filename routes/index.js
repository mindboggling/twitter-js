const EXPRESS = require('express');
const ROUTER = EXPRESS.Router();
// could use one line instead: const router = require('express').Router();
const TWEET_BANK = require('../tweetBank');

ROUTER.get('/', function (req, res) {
  let tweets = TWEET_BANK.list();
  res.render( 'index', { tweets: tweets, showForm: true } );
});

ROUTER.get('/tweets', function(req, res) {
  let tweets = TWEET_BANK.list();
  res.render('index', {tweets: tweets, showForm: true})
})

ROUTER.get('/users/:name', function(req, res) {
  var name = req.params.name;
  var list = TWEET_BANK.find( {name: name} );
  res.render( 'index', { tweets: list, showForm: true, username: req.params.name } );
});

ROUTER.get('/tweets/:id', function(req, res) {
  var tweetsid = Number(req.params.id);
  var list = TWEET_BANK.find( {id: tweetsid});
  res.render('index', {tweets: list});
})

ROUTER.post('/tweets', function(req, res) {
  var name = req.body.name;
  var text = req.body.text;
  TWEET_BANK.add(name, text);
  res.redirect('/');
});

module.exports = ROUTER;

