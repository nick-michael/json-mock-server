# JSON Mock Server
![GitHub license](https://img.shields.io/badge/license-MIT-green.svg) 

A lightweight tool to spin up a simple mock server using JSON syntax - perfect for mocked development, offline development or unit testing.

## Installation
Prerequisites:
This module creates a Koa server. As a result it will require node v7.6.0 or higher.

Install with npm:
`npm install --save-dev json-mock-server` 

Install with yarn:
 `yarn add json-mock-server --dev`


## Usage
You will need to create a .json/.js file containing the routes and responses for the server. A simple example will look like this:
```
{
    "/user": {
        "use": "GET",
        "responses": [
            {
                "status": 200,
                "query": {
                    "id": "10"
                },
                "response": {
                    "id": 10,
                    "name": "John",
                    "email": "john@my-mail.uk"
                }
            },
            {
                "status": 204,
                "response": "User Not Found"
            }
        ]
    }
}
```

`use` - Defines the http method to use to accept the request (e.g. get, post)
`responses` - An array of responses

Inside each response you can define:
`status` - Http status code
`query` - Query parameters that have to be matched in order for the request to match
`response` - Data to be sent back in the response

The above example will return a users data from the '/user' endpoint if the query parameter of `id` is equal to `10`. If the `id` is not `10`, the server will fallback to a `204 - User Not Found` response. If any other endpoint is hit, the server will respond with a `404 - Not Found`.

**Note:** The fallback must be placed **after** the previous responses, otherwise the request with `id === 10` will be caught by the 204 response criteria.

It is possible to provide the server with a **".js"** file instead of a **".json"** - you just need to make sure the default export is the server config object.
<br>

**CLI**
`json-mock-server --config path-to-config-file --port 3434`

`--config || -c` - Defines the path to the config file relative to the current directory. By default, the command will look for a `mock-server.config.js` file in the current directory.

`--port || -p` - The port that the server will run on. Defaults to `3001`.
<br>

**Node**
```
const { start } =  require('./app');
const config = require('./server-config');

start(config, 3434);    // Port will default to 3001 if undefined
```

The module exposes four functions for the mock-server:

**`start(config, port)`**
Starts the JSON server with the provided config and port number. If no port number is provided, default to 3001.

**`add(routes)`**
Updates the JSON server with the provided routes. These should be in the same structure as the initial config. New routes with the same key as any existing ones will overwrite the old ones.

**`restore()`**
Any changes to the server routes since initialization (by using the `add` function) will be reset. The server will use the routes provided during `start(...)`.

**`stop()`**
Terminates the server. All routes are cleared and the server will need to be re-initialized with a new config using the `start` function.

## Examples
A number of example cases can be found in the github repository [HERE](https://github.com/nick-michael/json-mock-server)
These include a basic JSON example, `.js` example and unit test example.

To run these examples, run `nmp i` or `yarn` inside the examples folder.