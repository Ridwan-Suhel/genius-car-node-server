/**
 * 1- npm init -y
 * 2- index.js
 * 3- npm i express cors mongodb dotenv
 * 4- .env file create
 * ---------------------
 * steps of node server start
 * --------------------
 * 1- req express
 * 2- req cors
 * 3- port = process.env.PORT || 5000
 * 4- config dotenv --> require('dotenv').config()
 * 5- app = express()
 * 6- middleware 
 *      app.use(cors())
 *      app.use(express.json())
 * 7- packages.json script - add text
 *      "start" : "node node.js",
 *      "start-dev" : "nodemon node.js",
 * 8- app.get("/")
 * 9- app.listen(port, ()=> {})

*/
