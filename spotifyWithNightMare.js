const Nightmare = require('nightmare');
const nightmare = Nightmare({ show: true });
const PLAYLIST = 'https://open.spotify.com/playlist/37i9dQZF1DX50QitC6Oqtn';
const SPOTIFY_USERNAME = "Antsa@tsenagasy.com";
const SPOTIFY_PASSWORD = "Antsa456123";
const LOGIN_PAGE = 'https://accounts.spotify.com';

nightmare
  .goto(LOGIN_PAGE)
  .wait('input#login-username')
  .type('input#login-username', SPOTIFY_USERNAME)
  .type('input#login-password', SPOTIFY_PASSWORD)
  .click('button#login-button')
  .wait(2000)
  .goto(PLAYLIST)
  .click('button.btn-green')
  .catch(error => {
    console.error('Play failed:', error)
  });
