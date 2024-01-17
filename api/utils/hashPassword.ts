import bcrypt from 'bcrypt'

const hashPassword = (password: string) => bcrypt.hashSync(password, 10)

export default hashPassword
