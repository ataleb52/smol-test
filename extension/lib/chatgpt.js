```javascript
import { OpenAI } from 'openai';

// Initialize OpenAI with your API key
const openai = new OpenAI('YOUR_OPENAI_API_KEY');

// Exported variable
let chatGPT;

// Function to generate service estimate
async function generateEstimate(userComment) {
  const prompt = `The user needs the following home service: ${userComment}. What would be an AI estimate for this service?`;

  const gptResponse = await openai.complete({
    engine: 'text-davinci-002',
    prompt: prompt,
    max_tokens: 60
  });

  const serviceEstimate = gptResponse.choices[0].text.trim();

  // Send message with new estimate
  chrome.runtime.sendMessage({ type: 'newEstimate', data: serviceEstimate });

  return serviceEstimate;
}

// Initialize chatGPT
async function initChatGPT() {
  chatGPT = await openai.createChatModel({
    model: 'text-davinci-002',
    user: 'user',
    assistant: 'assistant',
  });
}

initChatGPT();

export { chatGPT, generateEstimate };
```