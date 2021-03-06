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
# Basic authentication
- HTTP basic, user & passwd
- the user and passwd gets sent in the headers
# Cookies and express sessions
- cookie parser is already included by express generator, we supply a string key
- the cookie is sent by the server and stored by the client, no need to authenticate in every request
- **Express sessions:**
    - manages the sessions for the user and cookies
# Passport
- nodejs middleware to implement auhtentication 
- different strategies (local, OpenID, Oauth)
- npm install passport --save, passport-local //implements local auth, passport-local-mongoose (plugin to simplyfy use when using mongoose), encripted data with hash etc.
# Token based authentication
- Session authentication is a problem with stateless servers and scalability
- Mobile apps have problems with cookies
- process: 
    - User requests access with usr and pass
    - server validates
    - server creates signed token and sends it to client (nothing stored in server)
    - All requests should include the token
    - Server verifies token and answers
- **JSON web token:**: standards RFC 7519, self contained, shareable between apps
    - 3 parts: header, payload and signature
    - npm install jsonwebtoken --save
        - sign() verifiy()
    - npm install passport-jwt: using json web token in passport auth
# Mongoose population
- helps to stablish relations between documents
- ObjetcId is stored in the parent document then mongoose population replace OId with documents
- model.find({}).populate('field')
# HTTPS and Secure communication
- SSL (secure sockets layer) / TLS (transport layer security)
- generating openssl key and self signed certificate
```shell
openssl genrsa 1024 > private.key
openssl req -new -key private.key -out cert.csr
openssl x509 -req -in cert.csr -signkey private.key -out certificate.pem
```
# Uploading files
- multipart/form data
- **Multer:** node middleware to handle multipart/data, parses the form data and adds body object and file object to the request
# Cross-Origin Resource Sharing
- Same-Origin Policy: security model restricts a document or script frome one origin can interact with a resource grom another origin
- origin (protocol, host, port)
- Cross-origin request: accesing a resource from different prot, host or port
- CORS: inform the browser that the resources are safe
- CORS node module: enable cors for specific routes with diffrent configurations. 
# OAuth and User Authentication
- Authorization framework to login in third party webs/apps
- **OAuth 2 roles:**
    - resource owner: the user, authorizes a client app to access their account
    - client application: ants to access to the resource server to obtain information about the user
    - resource server: server hosting the protected data (profile of the user)
    - authorization server: issues an access token to the client application, to request the data from resource server.
- **OAuth Tokens:** limited lifetime, need to keep confidential, Scope -> limit the rights of access token.
-  **Client App Registration:** client app id, client secret, redirect URL
- **Passport-facebook-token module:** initializes a passport strategy to use OAuth 2 using facebook
# Backend as a Service
- Storage and APIs exposed from the cloud
- Provides an SDK
- storage, rest and other features
# Firebase
- Authentication with email and other oauth providers
- Storage: upload files and define rules
- Database: Realtime database and Cloud firestore
    - Cloud firestore allows to add collections and documents
- Firebase node module




     









