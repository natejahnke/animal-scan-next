const fetchAnimalInfo = async (animalName, prompt) => {
  try {
    const response = await fetch("/api/openai", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ messages: [{ role: "user", content: prompt }] }),
    });

    const result = await response.json();
    if (result && result.content) {
      // Access the assistant's response message
      const assistantMessage = result.content;

      // Remove the leading newlines
      const trimmedMessage = assistantMessage.trim();

      return trimmedMessage;
    } else {
      console.error("Unexpected response format:", result);
      return "";
    }
  } catch (error) {
    console.error("Error fetching animal info:", error);
    return null;
  }
};

export default fetchAnimalInfo;

// Path: animal-detector-react\src\components\utils\fetchAnimalInfo.js
