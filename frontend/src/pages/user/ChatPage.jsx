import React from "react";
import { useContext } from "react";
import { ChatContext } from "../../Context/ChatProvider";
// import SideDrawer from "../../components/miscellaneous/SideDrawer";
import MyChat from "../../components/MyChat/MyChat";
import ChatBox from "../../components/ChatBox/ChatBox";

const ChatPage = () => {
  const { user } = useContext(ChatContext);

  return (
    <div style={{ width: "100%" }}>
      <div>
        {user && <MyChat/>}
        {user && <ChatBox/>}
      </div>
    </div>
  );
};

export default ChatPage;
