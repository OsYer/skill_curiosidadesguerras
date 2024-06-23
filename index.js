const Alexa = require('ask-sdk-core');

const warFacts = {
    'es-MX': [
        "Cher Ami, una paloma de la Primera Guerra Mundial, salvó casi 200 vidas al entregar un mensaje crucial.",
        "Napoleón fue atacado por conejos durante una cacería, ya que los conejos domésticos no huyeron como se esperaba.",
        "En 1976, EE.UU. desplegó una gran fuerza militar para cortar un solo árbol en Corea del Norte.",
        "Después de la Segunda Guerra Mundial, EE.UU. desmovilizó a más de 12 millones de soldados, el mayor número en su historia.",
        "El espía serbio Dusko Popov, que advirtió sobre Pearl Harbor, inspiró al personaje de James Bond.",
        "Durante la Guerra Fría, se usaron balones de fútbol llenos de propaganda para cruzar el Muro de Berlín.",
        "En 1859, EE.UU. y el Imperio Británico casi entran en guerra por el disparo a un cerdo.",
        "Aníbal cruzó los Alpes con elefantes de guerra para atacar a Roma en la Segunda Guerra Púnica.",
        "El Mar de Aral comenzó a secarse debido a proyectos de irrigación soviéticos durante la Guerra Fría.",
        "Los británicos usaron tanques inflables en la Segunda Guerra Mundial para engañar a los alemanes."
    ],
    'en-US': [
        "Cher Ami, a pigeon from World War I, saved nearly 200 lives by delivering a crucial message.",
        "Napoleon was attacked by rabbits during a hunt, as the domesticated rabbits did not flee as expected.",
        "In 1976, the U.S. deployed a large military force to cut down a single tree in North Korea.",
        "After World War II, the U.S. demobilized over 12 million soldiers, the largest number in its history.",
        "Serbian spy Dusko Popov, who warned about Pearl Harbor, inspired the character of James Bond.",
        "During the Cold War, footballs filled with propaganda were used to cross the Berlin Wall.",
        "In 1859, the U.S. and the British Empire nearly went to war over the shooting of a pig.",
        "Hannibal crossed the Alps with war elephants to attack Rome in the Second Punic War.",
        "The Aral Sea began to dry up due to Soviet irrigation projects during the Cold War.",
        "The British used inflatable tanks in World War II to deceive the Germans."
    ]
};

function getRandomFact(locale) {
    const facts = warFacts[locale];
    return facts[Math.floor(Math.random() * facts.length)];
}

const LaunchRequestHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'LaunchRequest';
    },
    handle(handlerInput) {
        const locale = handlerInput.requestEnvelope.request.locale;
        let speakOutput = '';

        if (locale === 'es-MX') {
            speakOutput = '¡Bienvenido! Puedes pedirme una curiosidad sobre las guerras diciendo "dame una curiosidad sobre las guerras". ¿Qué te gustaría saber?';
        } else {
            speakOutput = 'Welcome! You can ask me for a curiosity about wars by saying "tell me a curiosity about wars". What would you like to know?';
        }

        return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt(speakOutput)
            .getResponse();
    }
};

const GetWarCuriosityHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest' &&
            (Alexa.getIntentName(handlerInput.requestEnvelope) === 'ObtenerCuriosidadGuerra' || Alexa.getIntentName(handlerInput.requestEnvelope) === 'GetWarCuriosity');
    },
    handle(handlerInput) {
        const locale = handlerInput.requestEnvelope.request.locale;
        const randomFact = getRandomFact(locale);
        let speakOutput = '';

        if (locale === 'es-MX') {
            speakOutput = `${randomFact}. Si quieres otro dato curioso puedes decir "dame otro dato curioso" y si quieres salir dime "adiós".`;
        } else {
            speakOutput = `${randomFact}. If you want another curiosity you can say "give me another curiosity" and if you want to exit just say "goodbye".`;
        }

        return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt(locale === 'es-MX' ? 'Puedes decir "dame otro dato curioso" para otra curiosidad o "adiós" para salir.' : 'You can say "give me another curiosity" for another fact or "goodbye" to exit.')
            .getResponse();
    }
};

const HelpIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest' &&
            Alexa.getIntentName(handlerInput.requestEnvelope) === 'AMAZON.HelpIntent';
    },
    handle(handlerInput) {
        const locale = handlerInput.requestEnvelope.request.locale;
        let speakOutput = '';

        if (locale === 'es-MX') {
            speakOutput = 'Puedes pedirme una curiosidad sobre las guerras diciendo "dame una curiosidad sobre las guerras". ¿Cómo te puedo ayudar?';
        } else {
            speakOutput = 'You can ask me for a curiosity about wars by saying "tell me a curiosity about wars". How can I help?';
        }

        return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt(speakOutput)
            .getResponse();
    }
};

const CancelAndStopIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest' &&
            (Alexa.getIntentName(handlerInput.requestEnvelope) === 'AMAZON.CancelIntent' || Alexa.getIntentName(handlerInput.requestEnvelope) === 'AMAZON.StopIntent');
    },
    handle(handlerInput) {
        const locale = handlerInput.requestEnvelope.request.locale;
        let speakOutput = '';

        if (locale === 'es-MX') {
            speakOutput = '¡Adiós!';
        } else {
            speakOutput = 'Goodbye!';
        }

        return handlerInput.responseBuilder
            .speak(speakOutput)
            .getResponse();
    }
};

const FallbackIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest' &&
            Alexa.getIntentName(handlerInput.requestEnvelope) === 'AMAZON.FallbackIntent';
    },
    handle(handlerInput) {
        const locale = handlerInput.requestEnvelope.request.locale;
        let speakOutput = '';

        if (locale === 'es-MX') {
            speakOutput = 'Lo siento, no entiendo eso. Por favor intenta de nuevo.';
        } else {
            speakOutput = 'Sorry, I don\'t understand that. Please try again.';
        }

        return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt(speakOutput)
            .getResponse();
    }
};

const SessionEndedRequestHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'SessionEndedRequest';
    },
    handle(handlerInput) {
        console.log(`Session ended with reason: ${handlerInput.requestEnvelope.request.reason}`);
        return handlerInput.responseBuilder.getResponse();
    }
};

const IntentReflectorHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest';
    },
    handle(handlerInput) {
        const intentName = Alexa.getIntentName(handlerInput.requestEnvelope);
        const speakOutput = `You just triggered ${intentName}`;

        return handlerInput.responseBuilder
            .speak(speakOutput)
            .getResponse();
    }
};

const ErrorHandler = {
    canHandle() {
        return true;
    },
    handle(handlerInput, error) {
        console.error(`Error handled: ${error.message}`);

        const locale = handlerInput.requestEnvelope.request.locale;
        let speakOutput = '';

        if (locale === 'es-MX') {
            speakOutput = 'Lo siento, tuve problemas para hacer lo que pediste. Por favor intenta de nuevo.';
        } else {
            speakOutput = 'Sorry, I had trouble doing what you asked. Please try again.';
        }

        return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt(speakOutput)
            .getResponse();
    }
};

exports.handler = Alexa.SkillBuilders.custom()
    .addRequestHandlers(
        LaunchRequestHandler,
        GetWarCuriosityHandler,
        HelpIntentHandler,
        CancelAndStopIntentHandler,
        FallbackIntentHandler,
        SessionEndedRequestHandler,
        IntentReflectorHandler
    )
    .addErrorHandlers(ErrorHandler)
    .lambda();
