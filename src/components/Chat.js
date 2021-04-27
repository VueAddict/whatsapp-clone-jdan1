import firebase from "firebase";

import { Avatar, IconButton } from "@material-ui/core";

import {
  AttachFile,
  InsertEmoticon,
  Mic,
  MoreVert,
  SearchOutlined,
} from "@material-ui/icons";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { useStateValue } from "../context/StateProvider";
import { db } from "../firebase/firebase.config";
import "../styles/Chat.css";

function Chat() {
  const [message, setMessage] = useState("");
  const [roomName, setRoomName] = useState("");
  const [messages, setMessages] = useState([]);

  // get user from context store

  const [{ user }, dispatch] = useStateValue();

  const { roomId, seed } = useParams();

  // console.log(roomId);

  // fetch rooms from firebase

  useEffect(() => {
    if (roomId) {
      db.collection("rooms")
        .doc(roomId)
        .onSnapshot((snap) => setRoomName(snap.data()?.name));
    }
  }, [roomId]);

  // fetch messages in a specific room from firebase

  useEffect(() => {
    if (roomId) {
      db.collection("rooms")
        .doc(roomId)
        .collection("messages")
        .orderBy("timestamp", "asc")
        .onSnapshot((snap) => setMessages(snap.docs.map((doc) => doc.data())));
    }
  }, [roomId]);

  console.log(messages[0]);

  // save message to firebase db
  const sendMessage = (e) => {
    e.preventDefault();
    db.collection("rooms")
      .doc(roomId)
      .collection("messages")
      .add({
        name: user?.displayName || "jdan1",
        message,
        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      });

    // clear out input field after sending message
    setMessage("");
  };
  return (
    <div className="chat">
      <div className="chat__header">
        <Avatar src={`https://avatars.dicebear.com/api/human/${seed}.svg`} />

        <div className="chat__headerInfo">
          <h3>{roomName}</h3>
          <p>
            last seen at{" "}
            {messages.length
              ? new Date(
                  messages[messages.length - 1]?.timestamp?.toDate()
                ).toLocaleString()
              : "..."}
          </p>
        </div>
        <div className="chat__headerRight">
          <IconButton>
            <SearchOutlined />
          </IconButton>
          <IconButton>
            <AttachFile />
          </IconButton>
          <IconButton>
            <MoreVert />
          </IconButton>
        </div>
      </div>
      {/* chat body */}
      <div className="chat__body">
        {messages.map((message) => (
          <p
            key={message?.timestamp.seconds}
            className={`chat__message ${
              message?.name === user?.displayName && "chat__reciever"
            }`}
          >
            <span className="chat__name">{message?.name}</span>
            {message?.message}
            <span className="chat__timestamp">
              {new Date(message?.timestamp?.toDate()).toLocaleTimeString()}
            </span>
          </p>
        ))}
      </div>
      <div className="chat__footer">
        <InsertEmoticon />
        <form action="">
          <input
            type="text"
            placeholder="Type a message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
          <button type="submit" onClick={sendMessage}>
            Send a message
          </button>
        </form>
        <Mic />
      </div>
    </div>
  );
}

export default Chat;
