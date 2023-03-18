const { Configuration, OpenAIApi } = require("openai");
const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

module.exports = async (req, res) => {
  const { messages } = req.body;

  try {
    const completion = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages,
    });

    res.json(completion.data.choices[0].message);
  } catch (error) {
    console.error("Error in OpenAI API call:", error);
    res.status(500).send("Error in OpenAI API call");
  }
};