const jwt = require('jsonwebtoken')

const getUserByToken = async (ctx, { token, q }) => {
  if (!token) { throw new Error('Token not provided.'); }
  const query = q || `{ id, email }`;
  const { email } = jwt.verify(token, process.env.APP_SECRET)
  const user = await ctx.db.query.user({ where: { email } }, query)
  if (!user) { throw new Error('User not found.'); }
  return user;
}

module.exports = {
  getUserByToken,
}