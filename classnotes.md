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



