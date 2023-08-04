# gpt-4-less

## Description
gpt-4-less is a project that utilizes the OpenAI GPT-3.5 Turbo model to create a chatbot and provide various functionalities. The project includes an Express.js server that handles API endpoints for different tasks such as chat, and playground for experiementing with different prompts.

## Usage
To run the project, follow these steps:

1. Clone the repository: `git clone https://github.com/erikroche/gpt-4-less.git`
2. Navigate to the project directory: `cd gpt-4-less`
3. Install the dependencies: `npm install`
4. Set up the environment variables by creating a `.env` file and adding your OpenAI API key: `OPENAI_KEY=your_api_key`
5. Start the server: `npm start`
6. Navigate to `localhost:3000/chat` in your browser to start using! Note: the default model is gpt-3.5-turbo. This is a cheap model which is the default for chat gpt online. to use gpt-4, modify the respective /api/chat endpoint in server.js and change the model to GPT-4. For more information on setting the model, visit the Open AI API docs.

You also have access to `localhost:3000/playground`. This chat does not hold context (each promt will start a fresh chat). Use this area to experiment with prompts.

## Technologies Used
This project utilizes the following technologies:

- Node.js
- Express.js
- OpenAI API: The OpenAI GPT-3.5 Turbo model for natural language processing

## Disclaimer
This README is generated with the assistance of OpenAI using the [readme-generator](https://github.com/erikroche/readme-generator) repository.