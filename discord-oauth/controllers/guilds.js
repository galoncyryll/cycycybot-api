const { BOT_TOKEN } = process.env;

const getGuilds = (req, res, fetch) => {
  const { token } = req.body;

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

  return Promise.all([fetchUserGuilds, fetchBotGuilds])
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
    .then(guilds => res.status(200).json(guilds));
};

module.exports = {
  getGuilds,
};