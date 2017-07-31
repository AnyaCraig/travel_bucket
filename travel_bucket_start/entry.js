// we need to grab React from the node modules
var React = require('react');

// we need ReactDOM, too, to render our app into the placeholder
var ReactDOM = require('react-dom');

// we need all this router stuff to manage our routes
import { Router, Route, IndexRoute, browserHistory } from 'react-router';

// we need to import our custom components
import App from './components/app';

// here, we render our app into the placeholder div in index.html
// TODO: Render your routes inside the router
ReactDOM.render(<App />, document.getElementById("placeholder"));
