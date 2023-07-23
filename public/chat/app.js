// set the role of the assistant. For example: You are a drunken sailor assistant. This will give you some interesting answers.
const messages = [
    {"role": "system", "content": "You are a helpful assistant."},
];
let totalTokens = 0;

async function sendChat() {
    const prompt = document.querySelector("#prompt").value;
    document.querySelector("#prompt").value = "";

    // Show the user's prompt in the list
    document.querySelector("ul").innerHTML += `<li><b>${prompt}</b></li>`;
  
    const data = { prompt };
  
    try {
      const response = await fetch("http://localhost:3000/api/chat", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
  
      const json = await response.json();
      const message = json.message;
  
      document.querySelector("ul").innerHTML += `<li>${message}</li>`;
      document.querySelector("#prompt").value = "";
      document.querySelector("input").focus();
    } catch (error) {
      console.error("Error calling server API:", error);
      // Handle the error, show an error message to the user, etc.
    }
}