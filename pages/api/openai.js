// Import the necessary classes from the OpenAI library
const { Configuration, OpenAIApi } = require("openai");

// Configure the OpenAI API client with the provided API key
const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

// Create an instance of the OpenAIApi class with the given configuration
const openai = new OpenAIApi(configuration);

// Export the default async function to handle API requests
export default async (req, res) => {
  // Extract the 'messages' object from the request body
  const { messages } = req.body;

  // Call the OpenAI API to create a chat completion using the provided messages and the "gpt-3.5-turbo" model
  try {
    const completion = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages,
    });

    // Send the first choice message as the response in JSON format
    res.json(completion.data.choices[0].message);
  } catch (error) {
    // Log any error encountered during the OpenAI API call
    console.error("Error in OpenAI API call:", error);

    // Send an error status and message to the client
    res.status(500).send("Error in OpenAI API call");
  }
};

// Path: pages\api\openai.js

// This file contains the API route for handling OpenAI requests. It imports the necessary classes from the OpenAI library, configures the API client with the provided API key, and exports a default async function to handle the API requests. The function extracts the 'messages' object from the request body, calls the OpenAI API to create a chat completion using the provided messages, and sends the first choice message as the response in JSON format. In case of errors, it logs the error and sends an error status and message to the client.