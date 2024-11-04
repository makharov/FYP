
let userInput = "";
let isMicInput = false; //  to check if input was from the microphone
let isListening = false; //  to check if mic is currently active


const textInput = document.getElementById("textInput");

// Speech-to-Text 
let recognition; 

function startListening() {
    // Check if the browser supports the Web Speech API
    if (!("webkitSpeechRecognition" in window)) {
        alert("Speech recognition not supported in this browser.");
        return;
    }

    // Initialize the speech recognition only if it hasn't been initialized
    if (!recognition) {
        recognition = new webkitSpeechRecognition();
        recognition.lang = "en-US"; // Set language
        recognition.interimResults = false; // Do not show interim results
        recognition.maxAlternatives = 1;

        // Process the result
        recognition.onresult = (event) => {
            const transcript = event.results[0][0].transcript;
            textInput.value = transcript;
            userInput = transcript;
            isMicInput = true; // Mark input as microphone-based
        };

        // Handle errors
        recognition.onerror = (event) => {
            console.error("Error occurred in recognition:", event.error);
        };

        // Reset isListening when recognition ends
        recognition.onend = () => {
            isListening = false;
        };
    }


    if (isListening) {
        recognition.stop();
        isListening = false;
    } else {
        recognition.start();
        isListening = true;
    }
}

function handleSubmit() {
    userInput = textInput.value;
    console.log("Submitted input:", userInput);

    textInput.value = "";

    isMicInput = false;
}
