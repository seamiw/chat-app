const sendBtn = document.getElementById(`sendBtn`);
const userInput = document.getElementById(`userInput`);
const chatContainer = document.getElementById(`chat-container`);

sendBtn.addEventListener(`click`, async () => {
  const text = userInput.value.trim();
  if (text !== ``) {
    addMessage(text, `user`);
    userInput.value = ``;
    //「考え中・・・」を仮で表示
    const thinkingDiv = document.createElement(`div`);
    thinkingDiv.classList.add(`message`, `bot-message`);
    thinkingDiv.textContent = `考え中・・・`;
    chatContainer.appendChild(thinkingDiv);
    chatContainer.scrollTop = chatContainer.scrollHeight;
    //botの返答を非同期で取得
    const reply = await fakeApiRequest(text);
    //仮メッセージを書き換え
    thinkingDiv.textContent = reply;
  }
});

userInput.addEventListener(`keydown`, async (e) => {
  if (e.key === `Enter`) {
    sendBtn.click();
  }
});

function addMessage(message, sender) {
  const messageDiv = document.createElement(`div`);
  messageDiv.classList.add(`message`);
  messageDiv.classList.add(sender === `user` ? `user-message` : `bot-message`);
  messageDiv.textContent = message;
  chatContainer.appendChild(messageDiv);
  chatContainer.scrollTop = chatContainer.scrollHeight;
}

//フェイクAPI通信
function fakeApiRequest(userText) {
  return new Promise((resolve) => {
    setTimeout(() => {
      let reply = `考え中・・・`;
      if (userText.includes(`こんにちは`)) {
        reply = `こんにちは！今日は何をしましょう？`;
      } else if (userText.includes(`天気`)) {
        reply = `今日は晴れそうですね！`;
      } else if (userText.includes(`ありがとう`)) {
        reply = `どういたしまして！他にも何かお手伝いしましょうか？`;
      } else {
        reply = `ごめんなさい、よくわかりませんでした。`;
      }
      resolve(reply);
    }, 3000); //3秒後に返信
  });
}
