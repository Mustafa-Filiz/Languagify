import { Sequelize } from 'sequelize'

// creating the auth url
const url = 'postgres://postgres:languagify@localhost:5432/langify-db'

// creating the db instance
const langify = new Sequelize(url, {
  logging: () => null,
  dialect: 'postgres',
  define: {
    underscored: true,
    freezeTableName: true,
    timestamps: true,
  },
})

export default langify
require('./index')
