const { getUserByToken } = require('../../utils/user');
const jwt = require('jsonwebtoken');

// Primary function
module.exports = async (parent, { token }, ctx, info) => {

  const q = `{
    id
    name
    email
  }`

  const user = await getUserByToken(ctx, { token, q })
  user.token = jwt.sign({ email: user.email }, process.env.APP_SECRET)

  return {
    data: user
  }
}
