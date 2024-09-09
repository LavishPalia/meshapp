import { Image, Text, Pressable, StyleSheet, View } from "react-native";
import React, { useEffect, useState } from "react";
import { useChatContext } from "stream-chat-expo";
import { Profile, useAuth } from "../providers/AuthProvider";
import { router } from "expo-router";
import { supabase } from "../lib/supabase";

const UserListItem = ({
  user,
  size = 50,
}: {
  user: Profile;
  size?: number;
}) => {
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null);

  const { client } = useChatContext();
  const { user: me } = useAuth();

  const avatarSize = { height: size, width: size };

  useEffect(() => {
    if (user.avatar_url) downloadImage(user.avatar_url);
  }, [user.avatar_url]);

  async function downloadImage(path: string) {
    try {
      const { data, error } = await supabase.storage
        .from("avatars")
        .download(path);

      if (error) {
        throw error;
      }

      const fr = new FileReader();
      fr.readAsDataURL(data);
      fr.onload = () => {
        setAvatarUrl(fr.result as string);
      };
    } catch (error) {
      if (error instanceof Error) {
        console.log("Error downloading image: ", error.message);
      }
    }
  }

  const onPress = async () => {
    //start a chat with him
    const channel = client.channel("messaging", null, {
      members: [me?.id!, user.id],
    });
    await channel.watch();
    router.replace(`/(home)/channel/${channel.cid}`);
  };

  return (
    <Pressable onPress={onPress}>
      <View
        style={{
          padding: 15,
          backgroundColor: "white",
          flexDirection: "row",
          alignItems: "center",
          gap: 5,
        }}
      >
        {avatarUrl ? (
          <Image
            source={{ uri: avatarUrl }}
            accessibilityLabel="Avatar"
            style={[avatarSize, styles.avatar, styles.image]}
          />
        ) : (
          <View style={[avatarSize, styles.avatar, styles.noImage]} />
        )}

        <Text style={{ fontWeight: "600", fontSize: 20 }}>
          {user.full_name}
        </Text>
      </View>
    </Pressable>
  );
};

export default UserListItem;

const styles = StyleSheet.create({
  avatar: {
    borderRadius: 100,
    overflow: "hidden",
    maxWidth: "100%",
  },
  image: {
    objectFit: "cover",
    paddingTop: 0,
  },
  noImage: {
    backgroundColor: "#333",
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: "rgb(200, 200, 200)",
    borderRadius: 100,
  },
  uploadButton: {
    borderRadius: 10,
  },
  my10: {
    marginVertical: 10,
  },
});
