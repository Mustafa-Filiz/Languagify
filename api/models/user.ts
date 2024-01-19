import { DataTypes, Model } from 'sequelize'
import langify from './db'
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
  public token!: string | null
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
    token: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    sequelize: langify,
    tableName: 'users',
    defaultScope: {
      attributes: { exclude: ['password'] },
    },
  }
)

export default User
