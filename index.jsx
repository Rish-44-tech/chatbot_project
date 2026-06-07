function ChatInput({chatMessages,setChatMessages}){
    const [inputVal,setInputVal]=React.useState("");
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

function ChatMessage({message,sender}){
    return(
        <div className={sender+"-message"}>
            {sender==="robot" && <img src="./robot.png" className="chat-img"></img>}
            <div className="message-text">{message}</div>
            {sender==="user" && <img src="./user.png" className="chat-img"></img>}
        </div>
    );
}

function ChatMessages({chatMessages}){
    const chatMessagesRef=React.useRef(null);
    React.useEffect(()=>{
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

function App(){
    const[TB,setTB]=React.useState("top");
    const [chatMessages,setChatMessages]=React.useState([]);
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

const container = document.querySelector(".js-container");
ReactDOM.createRoot(container).render(<App/>);