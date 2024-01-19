import * as bcrypt from 'bcrypt'

class PasswordUtil {
  static hash(password: string) {
    return bcrypt.hashSync(password, 10)
  }

  static compare(password: string, hashedPassword: string) {
    return bcrypt.compareSync(password, hashedPassword)
  }
}

export default PasswordUtil
