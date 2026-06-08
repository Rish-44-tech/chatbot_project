import robo_img from '../assets/robot.png';
import user_img from '../assets/user.png';
import './ChatMessage.css';

export default function ChatMessage({message,sender}){
    return(
        <div className={sender+"-message"}>
            {sender==="robot" && <img src={robo_img} className="chat-img"></img>}
            <div className="message-text">{message}</div>
            {sender==="user" && <img src={user_img} className="chat-img"></img>}
        </div>
    );
}