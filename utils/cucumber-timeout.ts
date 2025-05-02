import { setDefaultTimeout } from "@cucumber/cucumber";

//If too low this will affect playwright timeouts
//Example exception: 'Error: function timed out, ensure the promise resolves within 20000 milliseconds'
setDefaultTimeout(100000); //60 seconds