module.exports = {
  Query: {
    getUserData: require('./auth/getUserData'),
  },
  Mutation: {
    signin: require('./auth/signin'),
  },
}
