# Exercise (Video): Understanding Node Modules
- npm init : initializes and creates the package.json file
- add "start": "node index" to package.json to start from index.js file with npm start command
- exports.property_name allows a property from a file(module) to be exported
- var rect = require('./rectangle'); to import in the main file
# Node Modules: Callbacks and Error Handling
# Introduction to Express.js
# REST (Representational State Transfer)
- interoperability between systems on the network
- Use web standars
- Exchange data using XML or JSON
- Simpler compared with SOAP or WSDL etc
- Use HTTP methods, Be stateless, Expose directory structured like URIs
- **Nouns**: naming resources with URIs goin from genral to specific **/** 
- **Verbs**: 
    - GET -> READ    
    - post ->create 
    - put-> update 
    - delete-> delete
- Stateless: the server doesn't track the client side state, its a resposibility from the client to track its own state
# Express Router
- app.all, app.get app.post app.put app.delete methods
- **Body parser** require('body-parser')
- Express Router creates a mini Express application:
```js 
var router = express.Router();
router.use(bodyParser.json();)

router.route('/')
.all(...)
.get(...)
....
```
# Express Generator
- scaffolding tool to generate an express app skeleton
- npm install express-generator -g
- express '<'App Name'>'
- move to folder and mpm install
# Intro to MongoDB
- Document based
- BSON: JSON wyth adicional types as UTC date, raw binary and ObjectId
- to run a local instance: create a folder, ex mongodb with data subfolder inside, then:
```shell
mongod --dbpath=data --bind_ip 127.0.0.1
```
- to access the bd via terminal and interact with basic commands just type
```shell
    mongo # start
    db  # show current db
    use conFusion # change db
    db
    db.help() 
    db.dishes.insert({ name: "Uthappizza", description: "Test" }); # insert to a new or existen collection
    db.dishes.find().pretty();# print objects in collection
    var id = new ObjectId();
    id.getTimestamp(); # get iSO date
    exit
```
# Node and MongoDB
- Node mongo driver: high level api to interact with db server
- npm install mongodb --save
- supports callback and promise based interactions
# Mongoose ODM
- Defines and enforces an structure over documents, they don't have any structure in mongo
- the schema defines the fields of the document
- schemas can be nested





