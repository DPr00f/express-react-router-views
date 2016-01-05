#express-react-router-views

## What is it?
 - a react render engine for express js
 - renders both backend and frontend views using react-router

## Install
```npm install express-react-router-views react react-dom react-router history --save```

## Usage on the server side

	var express = require('express');
	var ExpressReactRouter = require('express-react-router-views');
    
    var routes = require('./routes'); // This are react-router routes, check the example of a routes file below

	var app = express();
    // Set the engine as .jsx or .js
    app.engine('.jsx', ExpressReactRouter.engine({
      routes: routes
    }));
	
    // Set the view engine as jsx or js
	app.set('view engine', 'jsx');

	// Set the custom view
    app.set('view', ExpressReactRouter.view);

#### Routes example

    var React = require('react');
    var ReactRouter = require('react-router');
    var Layout = require('./components/layout.jsx');
    var Index = require('./components/index.jsx');
    var About = require('./components/about.jsx');

    var Route = ReactRouter.Route;
    var IndexRoute = ReactRouter.IndexRoute;

    module.exports = (
      <Route path="/" component={Layout}>
        <IndexRoute component={Index}/>
        <Route path="/about" component={About}/>
      </Route>
    );

## Rendering views on server side

	app.get('/*', function(req, res) {
	  // You can replace req.url with the view path that you've set on the routes file
      res.render(req.url);
    });


## Usage On Client Side
	// assuming we use `browserify`
	var client = require('express-react-router-views').client;

	var routes = require('./routes'); // Same file used on the server side

	client.render({
      routes: routes
    });


### Layout example

    var React = require('react');
    var ReactRouter = require('react-router');
    var client = require('express-react-router-views').client;
    var Link = ReactRouter.Link;
    var IndexLink = ReactRouter.IndexLink;

    var ACTIVE = { color: 'red' };

    var Layout = React.createClass({
      render: function render() {
        return (
          <html lang="en">
          <head>
            <meta charSet="UTF-8" />
            <title>{ client.getProps().title }</title>
          </head>
          <body>
            <h1>APP!</h1>
            <ul>
              <li><Link      to="/"           activeStyle={ACTIVE}>/</Link></li>
              <li><IndexLink to="/"           activeStyle={ACTIVE}>/ IndexLink</IndexLink></li>

              <li><Link      to="/about"      activeStyle={ACTIVE}>/about</Link></li>
            </ul>

            { this.props.children && React.cloneElement(this.props.children, client.getProps())}
            <script src="/main.js"></script>
          </body>
          </html>
        );
      }
    });

    module.exports = Layout;

`client.getProps()` grabs the properties set from the server side, so when you do `{ this.props.children && React.cloneElement(this.props.children, client.getProps())}` you're passing them to the props of any children.

# Note

This package was built using the latest react react-dom and react-router.
I'll try to update it as fast as I can when new versions come out. That means that maybe some features will change in the future, but this Readme would update accordingly containing the changes between versions.
