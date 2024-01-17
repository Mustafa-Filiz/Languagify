import { DataTypes, Model } from 'sequelize'
import languagifydb from './db'
import { z } from 'zod'

export const userSchema = z.object({
  first_name: z.string(),
  last_name: z.string(),
  email: z.string().email(),
  password: z.string(),
})

class User extends Model {
  public first_name!: string
  public last_name!: string
  public email!: string
  public password!: string
}

User.init(
  {
    first_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    last_name: {
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
