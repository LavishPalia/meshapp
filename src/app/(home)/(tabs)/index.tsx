import React from "react";
import { ChannelList } from "stream-chat-expo";
import { router } from "expo-router";

const MainTabScreen = () => {
  return (
    <ChannelList
      onSelect={(channel) => {
        router.push(`/channel/${channel.cid}`);
      }}
    />
  );
};

export default MainTabScreen;
