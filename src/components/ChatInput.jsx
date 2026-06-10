import { useState } from "react";
import { Chatbot } from "supersimpledev";
import dayjs from "dayjs";
import './ChatInput.css';

export default function ChatInput({chatMessages,setChatMessages}){
    const [inputVal,setInputVal]=useState("");
    const [isLoading,setIsLoading]=useState(false);
    function saveInput(event){
        setInputVal(event.target.value);
    }
    async function sendMessage(){
        if(inputVal===""){
            return;
        }
        if(isLoading){
            return;
        }
        const newCm=[...chatMessages,{
            message:inputVal,
            sender:"user",
            id:crypto.randomUUID(),
            time:dayjs(dayjs().valueOf()).format("h:mma")
        }];
        setChatMessages([...newCm,{
            message:<img src="https://supersimple.dev/images/loading-spinner.gif" className="loading-spinner"></img>,
            sender:"robot",
            id:crypto.randomUUID(),
            time:null
        }]);
        setInputVal("");
        setIsLoading(true);
        const response=await Chatbot.getResponseAsync(inputVal);
        setIsLoading(false);
        setChatMessages([...newCm,{
            message:response,
            sender:"robot",
            id:crypto.randomUUID(),
            time:dayjs(dayjs().valueOf()).format("h:mma")
        }]);
    }
    return (
        <div className="input-container">
        <input
            type="text"
            placeholder="Send a message to chatbot..."
            size={30}
            onChange={saveInput}
            value={inputVal}
            className="chat-input"
            onKeyDown={(e)=>{
                if(e.key==="Enter"){
                    sendMessage();
                }
            }}/>
        <button onClick={sendMessage} className="send-button">Send</button>
        <button onClick={()=>{
            localStorage.setItem("messages","[]");
            setChatMessages([]);
        }}
        className="clear-button">
            Clear
        </button>
        </div>
    )
}