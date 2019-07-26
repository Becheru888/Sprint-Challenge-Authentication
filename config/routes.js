const axios = require('axios');
const bcrypt = require('bcryptjs')
const token = require('../auth/token')

const Users = require('./routes-model')

const { authenticate } = require('../auth/authenticate');

module.exports = server => {
  server.post('/api/register', register);
  server.post('/api/login', login);
  server.get('/api/jokes', authenticate, getJokes);
};

function register(req, res) {
  const user = req.body;
  const hash = bcrypt.hashSync(user.password, 5);
  user.password = hash;
  Users.add(user)
    .then(saved => {
      const newToken = token.generateToken(user);
      res.status(201).json({ saved, message: `registered, ${newToken}` })
    }).catch(error => {
      res.status(500).json(error)
    })

}

function login(req, res) {
  let { username, password } = req.body;
  Users.findBy({ username })
    .first()
    .then(user => {
      if (user && bcrypt.compareSync(password, user.password)) {
        const newToken = token.generateToken(user);
        res.status(200).json(
          {
            message: `Welcome ${user.username}! This is you token`,
            newToken,
            roles: newToken.roles
          });
      }else {
        res.status(401).json({message:"Invalid Credentials"});
      }
    }).catch(error =>{
      res.status(500).json(error)
    })
}

function getJokes(_, res) {
  const requestOptions = {
    headers: { accept: 'application/json' },
  };

  axios
    .get('https://icanhazdadjoke.com/search', requestOptions)
    .then(response => {
      res.status(200).json(response.data.results);
    })
    .catch(err => {
      res.status(500).json({ message: 'Error Fetching Jokes', error: err });
    });
}
