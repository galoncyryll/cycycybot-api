const express = require('express');

const router = express.Router();

const { CLIENT_ID } = process.env;
const { CLIENT_SECRET } = process.env;
const { BOT_TOKEN } = process.env;
const redirect = encodeURIComponent('http://localhost:5000/api/discord/callback');

const fetch = require('node-fetch');
const btoa = require('btoa');
const { catchAsync } = require('../utils');

router.get('/login', (req, res) => {
  res.redirect('https://discordapp.com/api/oauth2/authorize?client_id=530305194131456000&redirect_uri=http%3A%2F%2Flocalhost%3A5000%2Fapi%2Fdiscord%2Fcallback&response_type=code&scope=identify%20email%20guilds');
});

router.post('/getguilds', (req, res) => {
  const { token } = req.body;
  const myGuilds = [];
  const fetchUserGuilds = fetch('https://discordapp.com/api/users/@me/guilds', {
    method: 'get',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  })
    .then(apiRes => apiRes.json())
    .then((guilds) => {
      const adminGuilds = guilds.filter(g => g.permissions === 2146959359);
      return adminGuilds;
    });

  const fetchBotGuilds = fetch('https://discordapp.com/api/users/@me/guilds', {
    method: 'get',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bot ${BOT_TOKEN}`,
    },
  })
    .then(apiRes => apiRes.json());

  Promise.all([fetchUserGuilds, fetchBotGuilds])
    .then(([user, bot]) => {
      user.map((userGuilds) => {
        bot.map((botGuilds) => {
          if (userGuilds.id === botGuilds.id) {
            userGuilds.bot = true;
          }
        });
      });
      return user;
    })
    .then((guilds) => {
      res.status(200).json(guilds);
    });
});

router.get('/callback', catchAsync(async (req, res) => {
  if (!req.query.code) throw new Error('NoCodeProvided');
  const { code } = req.query;
  const creds = btoa(`${CLIENT_ID}:${CLIENT_SECRET}`);
  const response = await fetch(`https://discordapp.com/api/oauth2/token?grant_type=authorization_code&code=${code}&redirect_uri=${redirect}`,
    {
      method: 'POST',
      headers: {
        Authorization: `Basic ${creds}`,
      },
    });
  const json = await response.json();
  res.cookie('token', json.access_token);
  res.redirect('http://localhost:3000/dashboard');
}));

module.exports = router;
