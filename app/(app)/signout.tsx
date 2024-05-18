import React from 'react';
import { View } from 'react-native';
import { Text } from '@/components/ui/text';
import { useSession } from '../../ctx'; // Ensure this path is correct based on your project structure

export default function Index() {
  const { signOut } = useSession();

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text
        onPress={() => {
          // The `app/(app)/_layout.tsx` will redirect to the sign-in screen.
          signOut();
        }}
        style={{ color: 'blue', fontSize: 18 }} // Adding some styles for better visibility
      >
        Sign Out
      </Text>
    </View>
  );
}
