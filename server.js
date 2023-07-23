const express = require('express');
const cors = require('cors');
const app = express();

require("dotenv").config();
const OPENAI_KEY = process.env.OPEN_AI_API_KEY;

const path = require('path');

app.use(express.json()); // parse JSON requests
app.use(cors());
app.use(express.static(path.join(__dirname, 'public')));


// Enable CORS and JSON parsing middleware
app.use(cors());
app.use(express.json());

// Create an API endpoint for OpenAI API call
app.post('/api/chat', async (req, res) => {
  const body = req.body;
  const data = {
    model: "gpt-3.5-turbo",
    temperature: 0,
    messages: [
      { role: "system", content: "You are a helpful assistant." },
      { role: "user", content: body.prompt },
    ],
  };

  try {
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${OPENAI_KEY}`,
      },
      body: JSON.stringify(data),
    });

    const json = await response.json();
    res.json({ message: json.choices[0].message.content });
  } catch (error) {
    console.error("Error calling OpenAI API:", error);
    res.status(500).json({ error: "Failed to fetch response from OpenAI." });
  }
});


const { Configuration, OpenAIApi } = require("openai");

const configuration = new Configuration({
  apiKey: OPENAI_KEY,
});
const openai = new OpenAIApi(configuration);


app.post('/api/general', async (req, res) => {
  const body = req.body;

  const completion = await openai.createChatCompletion({
    model: "gpt-3.5-turbo",
    messages: [{role: "user", content: body.prompt}],
  });
  res.json(completion.data.choices[0].message.content);
});

app.post('/api/image', async (req, res) => {
  const body = req.body;

  const response = await openai.createImage({
    prompt: body.prompt,
    n: 1,
    size: "512x512",
  });
  image_url = response.data.data[0].url;  
  res.json({"url": image_url});
})

app.post('/api/recipe', async (req, res) => {
  const body = req.body;

  const prompt = `Give me a recipe with the list of ingredientes defined in the markup
  <ingredients>${body.ingredients}</ingredients>
  You can take for granted other basic ingredients, such as salt, pepper and other condiments we usually find in a kitchen.  
  
  If the input is empty of you can't find a list of ingredients for a recipe, just answer with the lowercase string "false" with no other characters.

If you've found a recipe for the ingredients, send the output in JSON format as the sample enclosed in ***.

If one step's description has a time declaration like 'for 30 minutes', add the timer property with the value in minutes as in '"timer": 30'.

***
    {
        "slug": "fish-tacos",
        "image": "",
        "name": "Fish Tacos with Pickled Onion",
        "type": "Main Meal",
        "duration": 32,
        "description": "Fish Tacos made with flaky and juicy breaded cod, cilantro, and incredible pickled onions wrapped in a soft flour tortilla.",
        "ingredients": {
            "Red onion": "1",
            "Water": "1 cup",
            "Vinegar": "1 cup"
        },
        "steps": [
            {
                "name": "Pickle Onions",
                "description": "Cut the onions"
            },
            {
                "name": "Cook in the saucepan",
                "description": "In a small saucepan, combine the water, vinegar and cook until it reaches a simmer. Set aside for 25 minutes.",
                "timer": 25
            },
            {
              "name": "Wait",
              "description": "Wait 5 minutes.",
              "timer": 5
          }
           
        ]
    }
***
`

  const completion = await openai.createChatCompletion({
    model: "gpt-3.5-turbo",
    messages: [
      {
        role: "system",
        content: "You are a professional chef who recommends recipes bases on ingredients"
      },
      {
        role: "user",
        content: prompt
      }
    ],
    temperature: 0.7,
    max_tokens: 1000,
    model: 'gpt-3.5-turbo',
    stream: false
  });

  res.json({content: completion.data.choices[0].message.content});
});

app.listen(3000, () => {
  console.log('Server started on port 3000');
});