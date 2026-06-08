import { useState } from 'react'
import ChatInput from './components/ChatInput';
import ChatMessages from './components/ChatMessages';
import ChatMessage from './components/ChatMessage';
import './App.css'

function AppBottom({setTB,chatMessages,setChatMessages}){
     function moveTop(){
        console.log(2);
        setTB("top");
     }
    return (
        <div className="app-container">
        <ChatMessages chatMessages={chatMessages}/>
        <ChatInput chatMessages={chatMessages} setChatMessages={setChatMessages}/>
        <button className="pos-switch" onClick={moveTop}>Move textbox to Top</button>
        </div>
    );
}

function AppTop({setTB,chatMessages,setChatMessages}){
     function moveBottom(){
        console.log(1);
        setTB("bottom");
     }
    return (
        <div className="app-container">
        <ChatInput chatMessages={chatMessages} setChatMessages={setChatMessages}/>
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

