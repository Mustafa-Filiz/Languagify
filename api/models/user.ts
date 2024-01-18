import { DataTypes, Model } from 'sequelize'
import languagifydb from './db'
import { z } from 'zod'

export const UserSingUpSchema = z.object({
  firstName: z.string(),
  lastName: z.string(),
  email: z.string().email(),
  password: z.string(),
  confirmPassword: z.string(),
})

export const UserLoginSchema = z.object({
  email: z.string().email(),
  password: z.string(),
})

class User extends Model {
  public firstName!: string
  public lastName!: string
  public email!: string
  public password!: string
}

User.init(
  {
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize: languagifydb,
    tableName: 'users',
  }
)

export default User
