import robo_img from '../assets/robot.png';
import user_img from '../assets/user.png';
import './ChatMessage.css';

export default function ChatMessage({message,sender,time}){
    return(
        <div classNameName={sender+"-message"}>
            {sender==="robot" && <img src={robo_img} classNameName="chat-img"></img>}
            <div classNameName="message-text">
                {message}
                <br/>
                <span classNameName='time'>{time}</span>
            </div>
            {sender==="user" && <img src={user_img} classNameName="chat-img"></img>}
        </div>
    );
}