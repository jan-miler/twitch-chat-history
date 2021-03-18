var channels = ["agraelus"], // Channels to initially join
  useColor = true; // Use chatters' colors or to inherit
//showBadges = true, // Show chatters' badges
//showEmotes = true; // Show emotes in the chat

var chat = document.getElementById("chat");
var clientOptions = {
  options: {
    debug: true,
  },
  channels: channels,
};
var client = new window.tmi.Client(clientOptions);

function dehash(channel) {
  return channel.replace(/^#/, "");
}

function htmlEntities(html) {
  function it() {
    return html.map(n => {
      if (n.length === 1) {
        return n.replace(/[\u00A0-\u9999<>&]/gim, i => {
          return "&#" + i.charCodeAt(0) + ";";
        });
      }
      return n;
    });
  }
  var isArray = Array.isArray(html);
  if (!isArray) {
    html = html.split("");
  }
  html = it(html);
  if (!isArray) html = html.join("");
  return html;
}

function formatEmotes(text, emotes) {
  var splitText = text.split(""); // ["L", "U", "L" ]

  for (var i in emotes) {
    var e = emotes[i];

    for (var j in e) {
      var mote = e[j];

      mote = mote.split("-");
      mote = [parseInt(mote[0]), parseInt(mote[1])];
      var length = mote[1] - mote[0],
        /* empty = Array.apply(null, new Array(length + 1)).map(function () {
            return "";             
          });*/
        empty = Array(length + 1).fill("");
      splitText = splitText
        .slice(0, mote[0])
        .concat(empty)
        .concat(splitText.slice(mote[1] + 1, splitText.length));

      splitText.splice(
        mote[0],
        1,
        '<img class="emoticon" src="http://static-cdn.jtvnw.net/emoticons/v1/' +
          i +
          '/3.0">'
      );
    }
  }
  return htmlEntities(splitText).join("");
}

function badges(chan, user, isBot) {
  function createBadge(name) {
    var badge = document.createElement("div");
    badge.className = "chat-badge-" + name;
    return badge;
  }

  var chatBadges = document.createElement("span");
  chatBadges.className = "chat-badges";

  if (!isBot) {
    if (user.username === chan) {
      chatBadges.appendChild(createBadge("broadcaster"));
    }
    if (user.badges !== null) {
      // console.log(user.badges);
      chatBadges.appendChild(createBadge("subscriber"));
    }
    if (user.turbo) {
      chatBadges.appendChild(createBadge("turbo"));
    }
  } else {
    // chatChages.appendChild(createBadge("bot"));
  }

  return chatBadges;
}

function handleChat(channel, user, message, self) {
  var chan = dehash(channel),
    name = user.username,
    chatLine = document.createElement("div"),
    chatChannel = document.createElement("span"),
    chatName = document.createElement("span"),
    chatColon = document.createElement("span"),
    chatMessage = document.createElement("span");

  var color = useColor ? user.color : "black";

  // <div class="chat-line" ></div>
  chatLine.className = "chat-line";
  chatLine.dataset.username = name;
  chatLine.dataset.channel = channel;

  chatChannel.className = "chat-channel";
  chatChannel.innerHTML = chan;

  chatName.className = "chat-name";
  chatName.style.color = color;
  chatName.innerHTML = user["display-name"] || name;

  chatColon.className = "chat-colon";

  chatMessage.className = "chat-message";
  chatMessage.style.color = color;
  chatMessage.innerHTML = formatEmotes(message, user.emotes); // showEmotes  ?
  // : htmlEntities(message);

  // append <span> elements to chatLine
  chatLine.appendChild(badges(chan, user, self));
  chatLine.appendChild(chatName);
  chatLine.appendChild(chatColon);
  chatLine.appendChild(chatMessage);
  chat.appendChild(chatLine);
}

client.addListener("message", handleChat);
client.connect();
