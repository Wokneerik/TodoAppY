import auth from '@react-native-firebase/auth';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import React from 'react';
import {Image, StyleSheet, Text, TouchableOpacity} from 'react-native';

GoogleSignin.configure({
  webClientId:
    '417168148974-va3t34dd5qflvpejlgeolrvof3j1leem.apps.googleusercontent.com',
});

const GoogleButton = () => {
  async function onGoogleButtonPress() {
    // Check if your device supports Google Play
    await GoogleSignin.hasPlayServices({showPlayServicesUpdateDialog: true});
    // Get the users ID token
    const {idToken} = await GoogleSignin.signIn();

    // Create a Google credential with the token
    const googleCredential = auth.GoogleAuthProvider.credential(idToken);

    // Sign-in the user with the credential
    return auth().signInWithCredential(googleCredential);
  }

  return (
    <TouchableOpacity style={styles.googleButton} onPress={onGoogleButtonPress}>
      <Image
        style={styles.googleIcon}
        source={{
          uri: 'https://i.ibb.co/j82DCcR/search.png',
        }}
        resizeMode="contain"
      />
      <Text style={styles.googleButtonText}>Sign in with Google</Text>
    </TouchableOpacity>
  );
};
const styles = StyleSheet.create({
  bottomContent: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },

  googleButton: {
    backgroundColor: '#0e71b3',
    borderRadius: 10,
    paddingHorizontal: 34,
    paddingVertical: 10,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  googleButtonText: {
    marginLeft: 16,
    fontSize: 18,
    fontWeight: '600',
    color: '#ffffff',
  },
  googleIcon: {
    height: 24,
    width: 24,
  },
});
export default GoogleButton;
