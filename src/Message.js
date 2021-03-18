import ReactHtmlParser from "react-html-parser";
import "./Message.css";

function Message({ message, emotes }) {
  function messageToMessageWithEmotes(message, emotes) {
    if (emotes === null) return message;

    let splitText = message.split("");

    for (let emoteId in emotes) {
      for (let emoteIdObject in emotes[emoteId]) {
        let mote = emotes[emoteId][emoteIdObject];
        mote = mote.split("-");
        const [startEmotePosition, endEmotePosition] = [
          parseInt(mote[0]),
          parseInt(mote[1]),
        ];

        const length = endEmotePosition - startEmotePosition + 1;
        const empty = Array(length).fill("");

        splitText = splitText
          .slice(0, startEmotePosition)
          .concat(empty)
          .concat(splitText.slice(endEmotePosition + 1, splitText.length));

        splitText.splice(
          startEmotePosition,
          1,
          '<img class="emoticon" src="http://static-cdn.jtvnw.net/emoticons/v1/' +
            emoteId +
            '/3.0">'
        );
      }
    }

    return splitText.join("");
  }
  const html = messageToMessageWithEmotes(message, emotes);

  return (
    <>
      <span className="message">{ReactHtmlParser(html)}</span>
    </>
  );
}

export default Message;

// TODO xss is possible <iframe src="javascript:alert('xss')" />
