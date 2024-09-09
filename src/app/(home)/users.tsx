import React, { useEffect, useState } from "react";
import { Alert, FlatList } from "react-native";
import { supabase } from "@/src/lib/supabase";
import { Profile, useAuth } from "@/src/providers/AuthProvider";
import UserListItem from "@/src/components/UserListItem";

const UsersScreen = () => {
  const [users, setUsers] = useState<Profile[]>([]);

  const { user } = useAuth();

  useEffect(() => {
    const fetchUsers = async () => {
      let { data: profiles, error } = await supabase
        .from("profiles")
        .select("*")
        .neq("id", user?.id);

      if (error) {
        Alert.alert(error.message);
        return;
      }
      setUsers(profiles!);
    };

    fetchUsers();
  }, []);

  return (
    <FlatList
      data={users}
      renderItem={({ item }) => <UserListItem user={item} />}
    />
  );
};

export default UsersScreen;
