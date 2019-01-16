'use strict';

// Import the Dialogflow module from the Actions on Google client library.
const {
	dialogflow, 
	Permission, 
	Suggestions,
} = require('actions-on-google');

const functions = require('firebase-functions');
const app = dialogflow({debug: true});

// handler for favorite color intent
app.intent('favorite color'(conv, {color})=> {
	const luckyNumber = color.length;
	if (conv.data.userName){
		conv.close(`${conv.data.userNamer}, your lucky number is ${luckyNumber}.`);
	}
	else {
		conv.close(`Your lucky number is ${luckyNumber}.`);
	}
	});

//to handle the EmergencyServicesSearch intent
app.intent ('EmergencyServicesSearch', (conv) => {
	conv.ask(new Permission({
		context: 'To address you by your name and pick up your location',
		permissions: 'NAME', 'DEVICE_PRECISE_LOCATION'

	}))
});


//to handle the actions_intent_PERMISSION intent and cont with conversation
app.intent('actions_intent_PERMISSION', (conv, params, permissionGranted) =>{
	if (!permissionGranted) {
		conv.ask(`Ok, no worries. What's your favourite colour`);
		conv.ask(new Suggestions('blue', 'red', 'green'));
	}

	else{
		conv.data.userName = conv.user.name.display;
		conv.ask(`Thanks, ${conv.data.userName}. What's your favourite colour?`);
		conv.ask(new Suggestions('blue', 'red', 'green'));

	}
});
// Set the DialogflowApp object to handle the HTTPS POST request.
exports.dialogflowFirebaseFulfillment = functions.https.onRequest(app);