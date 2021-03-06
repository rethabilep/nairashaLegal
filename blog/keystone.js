// Simulate config options from your production environment by
// customising the .env file in your project's root folder.
require('dotenv').config();

// Require keystone
const keystone = require('keystone');
const handlebars = require('express-handlebars');
const path = require('path');


// Initialise Keystone with your project's configuration.
// See http://keystonejs.com/guide/config for available options
// and documentation.

keystone.init({
	'name': 'Blog | Nairasha Legal Support',
	'brand': 'Blog | Nairasha Legal Support',
	'static': 'public',
	'favicon': 'public/favicon.ico',
	'views': 'templates/views',
	'view engine': '.hbs',
	'cookie secret': 'b186959559cced82904d2b4c9efe18f6db26f03ff31b787a0ee6d98675abd2e40991ba5d062e09bd6d4f66bf4fa3e5ba316d7daa6ac17f581bbb780a47893770',
	'mongo':process.env.MONGO_URI,
	'custom engine': handlebars.create({
		layoutsDir: path.join(__dirname,'templates/views/layouts'),
		partialsDir: path.join(__dirname,'templates/views/partials'),
		defaultLayout: 'default',
		helpers: new require(path.join(__dirname,'./templates/views/helpers'))(),
		extname: '.hbs',
	}).engine,

	'auto update': true,
	'session': true,
	'auth': true,
	'user model': 'User',
	'store': 'new RedisStore()',
});

// Load your project's Models
keystone.import('models');

// Setup common locals for your templates. The following are required for the
// bundled templates and layouts. Any runtime locals (that should be set uniquely
// for each request) should be added to ./routes/middleware.js
keystone.set('locals', {
	_: require('lodash'),
	env: keystone.get('.env'),
	utils: keystone.utils,
	editable: keystone.content.editable,
});

// Load your project's Routes
keystone.set('routes', require('./routes'));


// Configure the navigation bar in Keystone's Admin UI
keystone.set('nav', {
	posts: ['posts', 'post-categories'],
	users: 'users',
});

//Set a production grade session store
keystone.set('session store', 'mongo');

// Start Keystone to connect to your database and initialise the web server


keystone.start();
