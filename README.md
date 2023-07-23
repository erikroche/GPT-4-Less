# gpt-4-less
Use an Open AI API key to access gpt-3.5-turbo and gpt-4 for a few cents a month!

# Usage
1. Clone the git repository onto your local machine.

2. Rename the existing ".env.example" folder to ".env" and insert your own Open AI API key from your account. Note: do not use any characters like "" to wrap the key, just simple input it after the =
3. Open a terminal inside the project and run ```npm install``` to install dependencies.
4. Run the ```npm start``` command in your terminal to start the server. Your self-hosted gpt is now available to use.
5. Navigate to localhost:3000/chat in your browser to start using! Note: the default model is gpt-3.5-turbo. This is a cheap model which is the default for chat gpt online. to use gpt-4, modify the respective /api/chat endpoint in server.js and change the model to GPT-4. For more information on setting the model, visit the Open AI API docs.
6. You also have access to localhost:3000/playground. This chat does not hold context (each promt will start a fresh chat). Use this area to experiment with prompts.
