import robo_img from '../assets/robot.png';
import user_img from '../assets/user.png';
import './ChatMessage.css';

export default function ChatMessage({message,sender,time}){
    return(
        <div className={sender+"-message"}>
            {sender==="robot" && <img src={robo_img} className="chat-img"></img>}
            <div className="message-text">
                {message}
                <br/>
                <span className='time'>{time}</span>
            </div>
            {sender==="user" && <img src={user_img} className="chat-img"></img>}
        </div>
    );
}