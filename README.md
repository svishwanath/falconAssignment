Falcon Social - Test:
=============
 ### Angularjs - Expresss - Socket.io - NodeJs ####

The aim of this project is explained on the following points:

- Setup up a webapp with nodejs and angularjs.  (http://nodejs.org/, https://angularjs.org/ )
- Use Less for all css rules ( http://lesscss.org/)
- Create  CRUD REST endpoints for providing json blobs above 
- Render the publishing item and enable the ui to create, update and delete items (no validation)
- Make a websocket impl. and when a new publication is created it pushes the data to the ui in real time. 
- Make a graph page with a graph rendering the data in the reach graph (using d3.js)
- Make a websocket impl. and add data points to the reach graph in real time
- Enable the project to be runned from “node app.js” on localhost:3000


In order to create a webapp with nodejs, I implemented a CRUD REST solution with the framework Express version 4.0 without any database attached. The information in the backend has been handled by a simple Javascrip Object.

The client side of the website is divided in three partials pages:
  - Home 
  - Publish -> Perform the action GET/PUT/UPDATE/DELETE, the use of websocket is included (socket.io) to update the information in real time.
  - Graph -> Generates a chart using the library D3.js with the json provided in this exercise.

Installation:
=============
Two dependencies files have been included, bower.json and package.json. Therefore, it will be necessary to have installed node and bower. 
- To install node and bower dependencies run the command "npm install" and "bower install" in the root of the folder

Run the app
=============

Use the command "node app.js" to start the server in http:/localhost:3000

