import { useEffect,useState } from 'react'
import { Chatbot } from 'supersimpledev';
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
    const [chatMessages,setChatMessages]=useState(JSON.parse(localStorage.getItem("messages"))||[]);

    useEffect(()=>{
        Chatbot.addResponses({
            "hi":"Hi! How can I help?",
            "Give a random number between 1 and 100":()=>{
                return "Sure. The number is "+String(Math.ceil(Math.random()*100));
            },
            
        })
        Chatbot.unsuccessfulResponse=`Sorry, I didn't quite understand that. Currently, I only know how to flip a coin, roll a dice, generate a random number between 1 and 100 or get today's date. Let me know how I can help!`;
        console.log(Chatbot.additionalResponses);
    },[]);

    useEffect(()=>{
        localStorage.setItem("messages",JSON.stringify(chatMessages));
    },[chatMessages]);

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

