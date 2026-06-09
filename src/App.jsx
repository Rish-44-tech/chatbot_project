import { useState } from 'react'
import ChatInput from './components/ChatInput';
import ChatMessages from './components/ChatMessages';
import ChatMessage from './components/ChatMessage';
import './App.css'

function AppBottom({setTB,chatMessages,setChatMessages}){
     function moveTop(){
        setTB("top");
     }
    return (
        <div className="app-container">
        {chatMessages.length===0 && <p className="welcome-message-bottom">Welcome to my chatbot project! Send a message using the textbox below!</p>}
        <ChatMessages chatMessages={chatMessages}/>
        <ChatInput chatMessages={chatMessages} setChatMessages={setChatMessages}/>
        <button className="pos-switch" onClick={moveTop}>Move textbox to Top</button>
        </div>
    );
}

function AppTop({setTB,chatMessages,setChatMessages}){
     function moveBottom(){
        setTB("bottom");
     }
    return (
        <div className="app-container">
        <ChatInput chatMessages={chatMessages} setChatMessages={setChatMessages}/>
        {chatMessages.length===0 && <p className="welcome-message-top">Welcome to my chatbot project! Send a message using the textbox above!</p>}
        <ChatMessages chatMessages={chatMessages}/>
        <button className="pos-switch" onClick={moveBottom}>Move textbox to Bottom</button>
        </div>
    );
}
export default function App(){
    const[TB,setTB]=useState("top");
    const [chatMessages,setChatMessages]=useState([]);
    if(TB==="top"){
        return (
            <>
            <AppTop setTB={setTB} chatMessages={chatMessages} setChatMessages={setChatMessages}></AppTop>
            </>
        );
    }
    else if(TB==="bottom"){
        return (
            <>
            <AppBottom setTB={setTB} chatMessages={chatMessages} setChatMessages={setChatMessages}></AppBottom>
            </>
        );
    }
    else{
        return null;
    }
}

