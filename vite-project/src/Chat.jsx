import { useState, useEffect } from 'react'
import './Chat.css'
import Button from './Button.jsx'
import userAvatar from './assets/user.png'
import botAvatar from './assets/bot.png'




      function Chat() {
        const [text, setText] = useState("");
        const [list, setList] = useState([]);

        function loadMessages() {
          fetch("/messages")
            .then((response) => response.json())
            .then((data) => {
              setList(data);
            });
        }

        useEffect(() => {
          loadMessages();
        }, []);

        function sendMessage() {
          fetch("/send-message", {
            method: "POST",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify({
              message: text
            })
          }).then(() => {
            loadMessages();
            setText("");
          });
        }

        return (
        <div className = "chat">
          <div className = "input-area">
            <input
              value={text}
              onChange={(e) => setText(e.target.value)}
              className="input"
            />
          

            <Button
              placeholder="Send"
              onClick={sendMessage}
              className="button"
            />
          </div>


          <div className = "messages">
            {list.map((message, index) => (
              <div key={index} 
              className={message.sender === "user" 
              ? "user-message" 
              : "bot-message"}>
              {message.sender === "bot" ? (
                <>
                <img src={botAvatar} className="avatar" />
                <div className="bot-container">
                  {message.text}
                </div>
                </>
              ) : (
                <>
                <div className="user-container">
                  {message.text}
                </div>
                <img src={userAvatar} className="avatar" />
                </>
              )}
              </div>
            ))}
          </div>
        </div>
        );
      } 

export default Chat;