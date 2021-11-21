import express from 'express'
import config from "config"
import log from './utils/logger'
import connect  from './utils/connect';
import routes from './routes';
const port = config.get("port") as number;
const host = config.get("host") as string
import deserializeUser from './middleware/deserializeUser'
const app = express()


app.use(express.json())
//app.use(express.urlencoded({extended: false}))
app.use(deserializeUser)

app.listen(port, host, async()=>{
    log.info(`Server listening at http://${host}:${port}`)
    await connect();
    routes(app)
})
