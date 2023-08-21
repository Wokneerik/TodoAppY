import React, {FC, useState} from 'react';
import {
  Keyboard,
  Pressable,
  Text,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import tw from 'twrnc';
import {useAuth} from '../../../hooks/useAuth';
import Button from '../../ui/Button';
import Field from '../../ui/Field';
import GoogleButton from '../../ui/GoogleButton';
import Loader from '../../ui/Loader';

interface IData {
  email: string;
  password: string;
}

const Auth: FC = () => {
  const {isLoading, login, register} = useAuth();

  const [data, setData] = useState<IData>({} as IData);
  const [isReg, setIsReg] = useState(false);

  const authHandler = async () => {
    const {email, password} = data;

    if (isReg) await register(email, password);
    else await login(email, password);

    setData({} as IData);
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <View style={tw`h-full w-full bg-white pt-16`}>
        <View style={tw`mx-5 justify-center items-center h-full`}>
          <View style={tw`w-9/12`}>
            <Text style={tw`text-center text-gray-800 text-2xl font-bold mb-2`}>
              {isReg ? 'Sign Up' : 'Sign In'}
            </Text>

            {isLoading ? (
              <Loader />
            ) : (
              <>
                <Field
                  val={data.email}
                  placeholder="Enter email"
                  onChange={val => setData({...data, email: val})}
                />
                <Field
                  val={data.password}
                  placeholder="Enter password"
                  onChange={val => setData({...data, password: val})}
                  isSecure={true}
                />
                <Button onPress={authHandler} title={`Let's go`} />

                <View style={tw`mt-4 mb-4`}>
                  <GoogleButton />
                </View>

                <Pressable onPress={() => setIsReg(!isReg)}>
                  <Text
                    style={tw`text-gray-800 opacity-30 text-right font-bold`}>
                    {isReg ? 'Login' : 'Register'}
                  </Text>
                </Pressable>
              </>
            )}
          </View>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default Auth;
