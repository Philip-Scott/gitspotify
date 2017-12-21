var SpotifyWebApi = require('spotify-web-api-node');

var client_id = ''; // Your client id
var client_secret = ''; // Your secret
var redirect_uri = 'http://www.example.com/callback'; // Your redirect uri
var scopes = 'user-read-private user-read-email';

// credentials are optional
var spotifyApi = new SpotifyWebApi({
  clientId : client_id,
  clientSecret : client_secret,
  redirectUri : redirect_uri
});

var code = "";

spotifyApi.authorizationCodeGrant(code)
.then(function(data) {
  console.log('The token expires in ' + data.body['expires_in']);
  console.log('The access token is ' + data.body['access_token']);
  console.log('The refresh token is ' + data.body['refresh_token']);

  // Set the access token on the API object to use it in later calls
  spotifyApi.setAccessToken(data.body['access_token']);
  spotifyApi.setRefreshToken(data.body['refresh_token']);
}, function(err) {
  console.log('Something went wrong!', err);
});

spotifyApi.setAccessToken('');

// Get Elvis' albums
spotifyApi.getArtistAlbums('43ZHCT0cAZBISjO8DG9PnE', { limit: 10, offset: 20 }, function(err, data) {
    if (err) {
      console.error('Something went wrong!', err);
    } else {
      console.log(data.body);
    }
  });