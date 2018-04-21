// Absolute imports
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const getUserData = require('./getUserData');

// Primary function
module.exports = async (parent, { email, password }, ctx, info) => {

  // Check if user exists in datastore
  const user = await ctx.db.query.user({ where: { email } })
  if (!user) { throw new Error(`User doesn't exist.`) }

  // Make sure password matches that of user attempting to sign in
  const valid = await bcrypt.compare(password, user.password)
  if (!valid) { throw new Error('Invalid credentials. Email and password do not match.') }

  const token = jwt.sign({ email: user.email }, process.env.APP_SECRET);
  const userData = await getUserData(parent, { token }, ctx, info);

  return {
    data: userData.data || null
  }
}
