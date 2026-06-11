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
            message:<img src="https://supersimple.dev/images/loading-spinner.gif" classNameName="loading-spinner"></img>,
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
        <div classNameName="input-container">
        <input
            type="text"
            placeholder="Send a message to chatbot..."
            size={30}
            onChange={saveInput}
            value={inputVal}
            classNameName="chat-input"
            onKeyDown={(e)=>{
                if(e.key==="Enter"){
                    sendMessage();
                }
            }}/>
        <button onClick={sendMessage} classNameName="send-button">Send</button>
        <button onClick={()=>{
            localStorage.setItem("messages","[]");
            setChatMessages([]);
        }}
        classNameName="clear-button">
            Clear
        </button>
        </div>
    )
}