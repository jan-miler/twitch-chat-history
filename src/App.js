import { useState, useEffect } from "react";
import Chat from "./Chat";
import "./App.css";

const initialState =
  //
  [
    {
      channel: "",
      user: {
        "badge-info": "subscriber/1",
        badges: '{subscriber: "0"}',
        "client-nonce": "d995380831027c3eeda3cf3744bccc22",
        color: null,
        "display-name": "",
        emotes: null,
        flags: null,
        id: "1d22a6575-6e7e-4033-968d-0724cc83419d",
        mod: false,
        "room-id": "26753250",
        subscriber: true,
        "tmi-sent-ts": "1614183856554",
        turbo: false,
        "user-id": "421529328",
        "user-type": null,
        "emotes-raw": null,
        "badges-raw": "subscriber/0",
        username: "beastcz",
        "message-type": "chat",
      },
      message: "Vítejte v chatovací místnosti",
      self: false,
    },
    {
      channel: "#freezecz",
      user: {
        "badge-info": "subscriber/1",
        badges: '{subscriber: "0"}',
        "client-nonce": "d995380831027c3eeda3cf3744bccc22",
        color: null,
        "display-name": "BeastCz",
        emotes: null,
        flags: null,
        id: "122a6575-6e7e-4033-968d-0724cc83419d",
        mod: false,
        "room-id": "26753250",
        subscriber: true,
        "tmi-sent-ts": "1614183856554",
        turbo: false,
        "user-id": "421529328",
        "user-type": null,
        "emotes-raw": null,
        "badges-raw": "subscriber/0",
        username: "beastcz",
        "message-type": "chat",
      },
      message:
        "@Freezecz Myslíš si že je illaoi OP?asasasassaasasasasasasasasasasasasasasassaasaasasasasssassasassasasasasx",
      self: false,
    },
    {
      channel: "#freezecz",
      user: {
        "badge-info": "subscriber/9",
        badges: {
          subscriber: "9",
          "sub-gifter": "1",
        },
        "client-nonce": "a3d64c0413f6272e880d06e0e1eab547",
        color: "#FF69B4",
        "display-name": "Featherro",
        emotes: null,
        flags: null,
        id: "823b0d39-fa99-4fb9-b555-544b59ef7b3c",
        mod: false,
        "room-id": "26753250",
        subscriber: true,
        "tmi-sent-ts": "1614183894742",
        turbo: false,
        "user-id": "136332258",
        "user-type": null,
        "emotes-raw": null,
        "badges-raw": "subscriber/9,sub-gifter/1",
        username: "featherro",
        "message-type": "chat",
      },
      message: "@Freezecz Kdo spravuje ten discord ?",
      self: false,
    },
    {
      channel: "#blueport",
      user: {
        "badge-info": null,
        badges: { broadcaster: "1" },
        "client-nonce": "889fbb29c640696b71e62b9473845cfb",
        color: "#0000FF",
        "display-name": "BluePort",
        "emote-only": true,
        emotes: { 1: ["0-1"] },
        flags: null,
        id: "dc36650b-c6f3-4913-b118-af1d68a6b744",
        mod: false,
        "room-id": "159900077",
        subscriber: false,
        "tmi-sent-ts": "1614857663253",
        turbo: false,
        "user-id": "159900077",
        "user-type": null,
        "emotes-raw": "1:0-1",
        "badges-raw": "broadcaster/1",
        username: "blueport",
        "message-type": "chat",
      },
      message: ":)",
      self: false,
    },
  ];

function App() {
  const [messagesStore, setMessagesStore] = useState(initialState);

  useEffect(() => {
    var clientOptions = {
      options: {
        debug: true,
      },
      channels: ["blueport"],
    };

    function handleListener(channel, user, message, self) {
      const maxNumberMessages = 25;
      setMessagesStore(prevState => {
        if (prevState.length >= maxNumberMessages) {
          prevState.shift();
        }
        return prevState.concat([{ channel, user, message, self }]);
      });
    }

    var client = new window.tmi.Client(clientOptions);
    client.addListener("message", handleListener);
    client.connect();
    return () => client.removeListener("message", handleListener);
  }, []);

  return (
    <>
      <h1>CHAT STREAMU</h1>
      <Chat messagesStore={messagesStore} />
    </>
  );
}

export default App;
