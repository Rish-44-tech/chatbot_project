import { useRef, useEffect } from "react";
import ChatMessage from "./ChatMessage";
import './ChatMessages.css';

function useAutoScroll(dependencies){
    const chatMessagesRef=useRef(null);
    useEffect(()=>{
        const contElem=chatMessagesRef.current;
        contElem.scrollTop=contElem.scrollHeight;
    },[dependencies]);
    return chatMessagesRef;
}

export default function ChatMessages({chatMessages}){
    const chatMessagesRef=useAutoScroll(chatMessages);
    return (
    <div classNameName="message-container" ref={chatMessagesRef}>
    {chatMessages.map((element)=>{
    return (
        <ChatMessage
            message={element.message}
            sender={element.sender}
            key={element.id}
            time={element.time}
        />
        );
    })}
    </div>
    );
}