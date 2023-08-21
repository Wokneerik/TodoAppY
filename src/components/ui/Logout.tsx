import React, {FC} from 'react';

import Layout from '../layout/Layout';

import {Text, TouchableHighlight, View} from 'react-native';
import tw from 'twrnc';
import {useAuth} from '../../hooks/useAuth';

const LogoutButton: FC = () => {
  const {logout} = useAuth();
  return (
    <Layout>
      <View style={tw`mx-5 justify-end items-center h-full`}>
        <View style={tw`w-9/12`}>
          <TouchableHighlight
            onPress={logout}
            style={tw`bg-gray-200 text-gray-800 rounded-xl w-full my-4 py-4`}>
            <Text style={tw`text-center`}>Logout</Text>
          </TouchableHighlight>
        </View>
      </View>
    </Layout>
  );
};

export default LogoutButton;
