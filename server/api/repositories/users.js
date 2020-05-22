const sql = require('../../db')

module.exports = {
  getUserByAddress: async (publicAddress) => {
    const [user] = await sql`
      select * from users 
      where public_address=${publicAddress}
    `
    return user
  },
  getPendingFromAddress: async (publicAddress) => {
    const [code] = await sql`
      select entity_id, verification_code from pending_users
      where public_address=${publicAddress}
    `
    return code
  },
  addPending: (verificationCode, publicAddress, entityId) => {
    const body = {
      verification_code: verificationCode,
      public_address: publicAddress,
      entity_id: entityId
    }
    return sql`
      insert into pending_users ${sql(body)}
    `
  },
  removePending: (publicAddress) => {
    return sql`
      delete from pending_users
      where public_address=${publicAddress}
    `
  },
  createUser: async (
    firstName,
    lastName,
    publicAddress,
    role,
    entityId = ''
  ) => {
    const body = {
      firstName,
      lastName,
      public_address: publicAddress,
      role,
      entity_id: entityId
    }
    return await sql`
      insert into users ${sql(body)}
    `
  }
}
