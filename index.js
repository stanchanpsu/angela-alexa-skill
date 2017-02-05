/**
 * App ID for the skill
 */
var APP_ID = undefined; //OPTIONAL: replace with "amzn1.echo-sdk-ams.app.[your-unique-value-here]";

/**
 * The AlexaSkill prototype and helper functions
 */
var AlexaSkill = require('./AlexaSkill');

/**
 * Angela is a child of AlexaSkill.
 * To read more about inheritance in JavaScript, see the link below.
 *
 * @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Introduction_to_Object-Oriented_JavaScript#Inheritance
 */
var Angela = function () {
    AlexaSkill.call(this, APP_ID);
};

// Extend AlexaSkill
Angela.prototype = Object.create(AlexaSkill.prototype);
Angela.prototype.constructor = Angela;

Angela.prototype.eventHandlers.onSessionStarted = function (sessionStartedRequest, session) {
    //console.log("onSessionStarted requestId: " + sessionStartedRequest.requestId + ", sessionId: " + session.sessionId);
    // any initialization logic goes here
};

Angela.prototype.eventHandlers.onLaunch = function (launchRequest, session, response) {
    //console.log("onLaunch requestId: " + launchRequest.requestId + ", sessionId: " + session.sessionId);
    handleComplimentRequest(response);
};

/**
 * Overridden to show that a subclass can override this function to teardown session state.
 */
Angela.prototype.eventHandlers.onSessionEnded = function (sessionEndedRequest, session) {
    //console.log("onSessionEnded requestId: " + sessionEndedRequest.requestId + ", sessionId: " + session.sessionId);
    // any cleanup logic goes here
};

Angela.prototype.intentHandlers = {
    "TellRandomComplimentIntent": function (intent, session, response) {
        handleRandomComplimentRequest(response);
    },

    "TellNotPregnantIntent": function(intent, session, response) {
        handleNotPregnantRequest(response);
    },

    "TellNotFatIntent": function(intent, session, response) {
        handleNotFatRequest(response);
    },

    "AMAZON.HelpIntent": function (intent, session, response) {
        response.ask("You can ask me to tell Angela she isn't pregnant or she isn't fat.", "You can also ask me to tell Angela a random compliment.");
    },

    "AMAZON.StopIntent": function (intent, session, response) {
        var speechOutput = "Bye";
        response.tell(speechOutput);
    },

    "AMAZON.CancelIntent": function (intent, session, response) {
        var speechOutput = "Bye";
        response.tell(speechOutput);
    }
};

var COMPLIMENTS = ["is the best roommate ever.", "has really long eyelashes.", "is a sass muffin.", "Stan loves you.", "I love you.", "you are the best roommate ever.", "Silvia says your hair makes you look like a mermaid.", "Silvia says your need to unfluff defluff is irresistable.", "Silvia says the way you work that snapchat story is just unbelievable."]

/**
 * Gets a random compliment from the list and returns to the user.
 */
function handleRandomComplimentRequest(response) {
    var complimentsLength = COMPLIMENTS.length;
    var complimentsIndex = Math.floor(Math.random() * complimentsLength);
    var compliment = COMPLIMENTS[complimentsIndex];

    // Create speech output
    var speechOutput = "Angela " + compliment;
    var cardTitle = "Angela's compliment";
    response.tellWithCard(speechOutput, cardTitle, speechOutput);
}

function handleNotPregnantRequest(response) {

    // Create speech output
    var speechOutput = "Angela you are not pregant.";
    var cardTitle = "Angela is not pregnant";
    response.tellWithCard(speechOutput, cardTitle, speechOutput);
}

function handleNotFatRequest(response) {

    // Create speech output
    var speechOutput = "Angela you are not fat.";
    var cardTitle = "Angela is not fat";
    response.tellWithCard(speechOutput, cardTitle, speechOutput);
}

// Create the handler that responds to the Alexa Request.
exports.handler = function (event, context) {
    // Create an instance of the SpaceGeek skill.
    var angela = new Angela();
    angela.execute(event, context);
};
