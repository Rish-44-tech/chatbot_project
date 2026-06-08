import { useState } from "react";
import { Chatbot } from "supersimpledev";

export default function ChatInput({chatMessages,setChatMessages}){
    const [inputVal,setInputVal]=useState("");
    function saveInput(event){
        setInputVal(event.target.value);
    }

    function sendMessage(){
        if(inputVal===""){
            return;
        }
        const response=Chatbot.getResponse(inputVal);
        setChatMessages([...chatMessages,{
            message:inputVal,
            sender:"user",
            id:crypto.randomUUID()
        },{
            message:response,
            sender:"robot",
            id:crypto.randomUUID()
        }]);
        setInputVal("");
    }

    return (
        <div className="input-container">
        <input
            type="text"
            placeholder="Send a message to Chatbot"
            size={30} onChange={saveInput}
            value={inputVal}
            className="chat-input"
            onKeyDown={(e)=>{
                if(e.key==="Enter"){
                    sendMessage();
                }
            }}/>
        <button onClick={sendMessage} className="send-button">Send</button>
        </div>
    )
}