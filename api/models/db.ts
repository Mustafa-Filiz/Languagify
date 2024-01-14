import { Sequelize } from 'sequelize'

// creating the auth url
const url = process.env.DB_URL

if (!url) {
    throw new Error(
        'Please define the DB_URL environment variable inside .env.local'
    )
}

// creating the db instance
const ecommercedb = new Sequelize(url, {
    logging: () => null,
    dialect: 'postgres',
    define: {
        underscored: true,
        freezeTableName: true,
        timestamps: true,
    },
})

export default ecommercedb
