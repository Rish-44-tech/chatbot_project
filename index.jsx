function ChatInput({chatMessages,setChatMessages}){
    const [inputVal,setInputVal]=React.useState("");
    function saveInput(event){
        setInputVal(event.target.value);
    }

    function sendMessage(){
        setChatMessages([...chatMessages,{
            message:inputVal,
            sender:"user",
            id:crypto.randomUUID()
        }]);
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
        <>
        <input type="text" placeholder="Send a message to Chatbot" size={30} onChange={saveInput} value={inputVal}/>
        <button onClick={sendMessage}>Send</button>
        <br/>Welcome to the Chatbot! Send a message using the textbox above!
        </>
    )
}

function ChatMessage({message,sender}){
    return(
        <>
        <div className="robot-message">
            {sender==="robot" && <img src="./robot.png" width={50}></img>}
            {message}
            {sender==="user" && <img src="./user.png" width={50}></img>}
        </div>
        </>
    );
}

function ChatMessages({chatMessages}){
    return (
    <>
    {chatMessages.map((element)=>{
    return (
        <ChatMessage
            message={element.message}
            sender={element.sender}
            key={element.id}
        />
        );
    })}
    </>
    );
}

function App(){
     const [chatMessages,setChatMessages]=React.useState([]);

    return (
        <>
        <ChatInput chatMessages={chatMessages} setChatMessages={setChatMessages}/>
        <ChatMessages chatMessages={chatMessages}/>
        </>
    );
}

const container = document.querySelector(".js-container");
ReactDOM.createRoot(container).render(<App/>);