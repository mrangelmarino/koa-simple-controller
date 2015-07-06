# koa-simple-controller
> Create simple controllers for use with the [Koa.js](https://github.com/koajs/koa) framework on Node.js

* Router agnostic controller, allows you to integrate into multiple router modules such as koa-route or koa-router
* Attaches controllers/actions to Koa context, and to controller object

## Installation
Install using [npm](https://www.npmjs.org/):
```sh
npm install koa-simple-controller --save
```

## Usage

### server.js
```javascript

var app = require('koa')();
var router = require('koa-router')();
// Specify path to controller directory in option passed to koa-simple-controller
// Defaults to './controller' if none specified, e.g. require('koa-simple-controller')();
var controller = require('koa-simple-controller')('./app/controller/');

// Method initalizes the controller object and attached controllers to the Koa context and controller object
app.use(controller.initialize());

// koa-router routes as example
router.get('/example', function* (next){
    // Here's the Koa context
    var ctx = this;
    // Pass context to controller, i.e. this
    ctx.controllers.test.index(ctx);
    yield* next;
});

app.use(router.routes());

app.listen(3000);

```

### ./app/controller/test.js
Each controller is an exported object consisting of methods that serve as actions. File names are used as controller names.
```javascript

// Export each set of actions 
module.exports = {
    index : function (ctx) {
        ctx.body = 'Hello.';
    },
    test : function(ctx) {
        ctx.body = 'Testing';
    }
};

```