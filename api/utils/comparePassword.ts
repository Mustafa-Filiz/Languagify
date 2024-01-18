import bcrypt from 'bcrypt'

const comparePassword = (password: string, hash: string) =>
  bcrypt.compareSync(password, hash)

export default comparePassword
