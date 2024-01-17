import { Sequelize } from 'sequelize'

// creating the auth url
const url = 'postgres://postgres:languagify@localhost:5432/languagify-db'

// creating the db instance
const languagifydb = new Sequelize(url, {
  logging: () => null,
  dialect: 'postgres',
  define: {
    underscored: true,
    freezeTableName: true,
    timestamps: true,
  },
})

export default languagifydb
require('./index')
