const API_KEY = "AIzaSyB7ceeEpfGkKeAgGZvpfripWh3DOv1YiW8"; // 🔑 Replace with your API key

async function sendMessage() {
  const input = document.getElementById("user-input");
  const chatBox = document.getElementById("chat-box");

  const userText = input.value;
  if (!userText) return;

  appendMessage("user", userText);
  input.value = "";

  const response = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${API_KEY}`
    },
    body: JSON.stringify({
      model: "gpt-4o-mini",
      messages: [
        { role: "user", content: userText }
      ]
    })
  });

  const data = await response.json();
  const botReply = data.choices[0].message.content;

  appendMessage("bot", botReply);
}

function appendMessage(sender, text) {
  const chatBox = document.getElementById("chat-box");
  const div = document.createElement("div");

  div.classList.add("message", sender);
  div.innerText = text;

  chatBox.appendChild(div);
  chatBox.scrollTop = chatBox.scrollHeight;
}
