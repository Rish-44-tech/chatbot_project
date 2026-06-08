import { useRef, useEffect } from "react";
import ChatMessage from "./ChatMessage";

export default function ChatMessages({chatMessages}){
    const chatMessagesRef=useRef(null);
    useEffect(()=>{
        const containerElem=chatMessagesRef.current;
        if(containerElem){
            containerElem.scrollTop=containerElem.scrollHeight;
        }
    },[chatMessages])

    return (
    <div className="message-container" ref={chatMessagesRef}>
    {chatMessages.map((element)=>{
    return (
        <ChatMessage
            message={element.message}
            sender={element.sender}
            key={element.id}
        />
        );
    })}
    </div>
    );
}