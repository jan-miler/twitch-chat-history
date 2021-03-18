import BadgesName from "./BadgesName";
//import styles from "./Chat.module.css";
import Message from "./Message";

function Chat({ messagesStore }) {
  return (
    <ul className={"chat" /*styles.chat*/}>
      {messagesStore.map(msg => (
        <li key={msg.user.id}>
          <BadgesName user={msg.user["display-name"]} color={msg.user.color} />
          <Message message={msg.message} emotes={msg.user.emotes} />
        </li>
      ))}
    </ul>
  );
}

export default Chat;
