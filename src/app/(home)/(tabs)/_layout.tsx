import React from 'react';
import { Tabs } from 'expo-router';

import Ionicons from '@expo/vector-icons/Ionicons';

const TabsNavigator = () => {
  return (
    <Tabs>
      <Tabs.Screen
        name='index'
        options={{
          title: 'Chats',
          tabBarIcon: ({ size, color }) => (
            <Ionicons name='chatbubble-sharp' size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name='profile'
        options={{
          title: 'Profile',
          tabBarIcon: ({ size, color }) => (
            <Ionicons name='person' size={size} color={color} />
          ),
        }}
      />
    </Tabs>
  );
};

export default TabsNavigator;
