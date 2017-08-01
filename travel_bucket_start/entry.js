// we need to grab React from the node modules
var React = require('react');

// we need ReactDOM, too, to render our app into the placeholder
var ReactDOM = require('react-dom');

// we will need all this router stuff to manage our routes
// if our app grows larger - for example, if we add a map page
import { Router, Route, IndexRoute, browserHistory } from 'react-router';

// we need to import our custom component
import App from './components/app';

// here, we render our app into the placeholder div in index.html
ReactDOM.render(<App />, document.getElementById("placeholder"));
