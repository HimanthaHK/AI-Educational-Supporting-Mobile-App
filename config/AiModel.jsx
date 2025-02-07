const {
    GoogleGenerativeAI,
    HarmCategory,
    HarmBlockThreshold,
  } = require("@google/generative-ai");
  
  const apiKey = process.env.EXPO_PUBLIC_GEMINI_API_KEY;
  const genAI = new GoogleGenerativeAI(apiKey);
  
  const model = genAI.getGenerativeModel({
    model: "gemini-2.0-flash",
  });
  
  const generationConfig = {
    temperature: 1,
    topP: 0.95,
    topK: 40,
    maxOutputTokens: 8192,
    responseMimeType: "application/json",
  };
  
 
    export const GenerateTopicsAIModel = model.startChat({
      generationConfig,
      history: [
        {
          role: "user",
          parts: [
            {text: "Learn Python :: As your are coaching teacher\n\n   - User want to learn about the topic\n\n  -  Generate 5-7 Course title for study (Short)\n\n  -  Make sure it is related to description\n\n  -  Output will be ARRAY of String in JSON FORMAT only\n\n   - Do not add any plain text in output,\n\n"},
          ],
        },
        {
          role: "model",
          parts: [
            {text: "```json\n[\n  \"Python Basics Bootcamp\",\n  \"Data Science with Python\",\n  \"Python Web Development: Flask\",\n  \"Automate with Python\",\n  \"Python for Machine Learning\",\n  \"Object-Oriented Python\",\n  \"Python Game Development\"\n]\n```\n"},
          ],
        },
      ],
    });
    export const GenerateCourseAIModel = model.startChat({
      generationConfig,
      history: [
        
      ],
    });
  
   // const result = await chatSession.sendMessage("INSERT_INPUT_HERE");
   //  console.log(result.response.text());
