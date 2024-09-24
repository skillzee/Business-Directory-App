import { View, Text, Image, TouchableOpacity } from 'react-native';
import React from 'react';
import { Colors } from '@/constants/Colors';
import { useWarmUpBrowser } from '@/hooks/useWarmUpBrowser';
import * as WebBrowser from 'expo-web-browser';
import { useOAuth } from '@clerk/clerk-expo';

WebBrowser.maybeCompleteAuthSession();

export default function LoginScreen() {
  useWarmUpBrowser();

  const { startOAuthFlow } = useOAuth({ strategy: 'oauth_google' });

  const onPress = React.useCallback(async () => {
    try {
      const result = await startOAuthFlow();
      // console.log('OAuth Result:', result);
      
      if (result && result.createdSessionId) {
        console.log("Session Id found:", result.createdSessionId);
        
        try {
          await result.setActive({ session: result.createdSessionId });
          console.log("Session is now active:", result.createdSessionId);
        } catch (setActiveError) {
          console.error('Error setting active session:', setActiveError);
        }
  
      } else {
        console.log("No session Id received in result");
      }
  
    } catch (error) {
      console.error('OAuth error:', error);
    }
  }, []);
  
  

  return (
    <View>
      <View
        style={{
          display: 'flex',
          alignItems: 'center',
          marginTop: 100,
        }}
      >
        <Image
          source={require('../assets/images/login.png')}
          style={{
            width: 220,
            height: 450,
            borderRadius: 20,
            borderWidth: 6,
            borderColor: '#000',
          }}
        />
      </View>

      <View style={{ backgroundColor: '#fff', padding: 20, marginTop: -20 }}>
        <Text
          style={{
            fontSize: 30,
            textAlign: 'center',
          }}
        >
          Your Ultimate{' '}
          <Text
            style={{
              color: Colors.PRIMARY,
            }}
          >
            Community Business Directory
          </Text>{' '}
          App
        </Text>

        <Text
          style={{
            fontSize: 15,
            textAlign: 'center',
            marginVertical: 15,
            color: Colors.GRAY,
          }}
        >
          Find Your favourite business near you and post your own business
        </Text>

        <TouchableOpacity
          style={{
            backgroundColor: Colors.PRIMARY,
            padding: 20,
            borderRadius: 99,
            marginTop: 20,
          }}
          onPress={onPress}
        >
          <Text style={{ textAlign: 'center', color: 'white' }}>Let's Get Started</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
