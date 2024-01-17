import dotenv from 'dotenv'
import path from 'path'
import app from './app'
import languagifydb from './models/db'

dotenv.config({ path: path.join(__dirname, './.env') })

const port = process.env.API_PORT || 3000

// connect and sync db
languagifydb
  .sync({ force: true })
  .then(() => console.log('synced languagifydb successfully!'))
  .catch((err) => console.log('unable to sync languagifydb!', err))

languagifydb
  .authenticate()
  .then(() => console.log('connected languagifydb successfully!'))
  .catch((err) => console.log('unable to connect languagifydb!', err))

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
