import { useEffect, useState } from "react";
import "./chatOnline.css";
import { getConversation, getFriednsConversation } from "../../api/index";
import defaultAvatar from "../../Images/noavator.png";

export default function ChatOnline({
  profileImg,
  onlineUsers,
  currentId,
  setCurrentChat,
}) {
  const [friends, setFriends] = useState([]);
  const [onlineFriends, setOnlineFriends] = useState([]);

  useEffect(() => {
    const getFriends = async () => {
      const res = await getConversation(currentId);
      setFriends(res.data);
    };

    getFriends();
  }, [currentId]);

  useEffect(() => {
    if (onlineUsers && onlineUsers?.length > 0) {
      setOnlineFriends(friends?.filter((f) => onlineUsers.includes(f._id)));
    }
  }, [onlineUsers]);

  const handleClick = async (user) => {
    try {
      const res = await getFriednsConversation(currentId, user._id);
      setCurrentChat(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="chatOnline">
      {onlineUsers.map((o) => (
        <div
          style={{
            pointerEvents: `${o._id === currentId ? "none" : "all"}`,
          }}
          className="chatOnlineFriend"
          onClick={() => handleClick(o)}
        >
          <div className="chatOnlineImgContainer">
            <img
              className="chatOnlineImg"
              src={o?.profileImg ? o.profileImg : defaultAvatar}
              alt=""
            />
            <div className="chatOnlineBadge"></div>
          </div>
          <span className="chatOnlineName">{`${o?.firstname} ${o?.lastname} ${
            o._id === currentId && "(Me)"
          }`}</span>
        </div>
      ))}
    </div>
  );
}
