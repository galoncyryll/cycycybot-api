const handleLogin = (req, res) => {
  res.redirect('https://discordapp.com/api/oauth2/authorize?client_id=530305194131456000&redirect_uri=http%3A%2F%2Flocalhost%3A5000%2Fapi%2Fdiscord%2Fcallback&response_type=code&scope=identify%20email%20guilds');
};

module.exports = {
  handleLogin,
};
