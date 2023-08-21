import {
  NavigationContainer,
  useNavigationContainerRef,
} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React, {FC, useEffect, useState} from 'react';
import Auth from '../components/screens/auth/Auth';
import Home from '../components/screens/home/Home';
import {useAuth} from '../hooks/useAuth';

const Stack = createNativeStackNavigator();

const Navigation: FC = () => {
  const {user} = useAuth();
  const ref = useNavigationContainerRef();

  const [name, setName] = useState<string | undefined>(undefined);

  useEffect(() => {
    const timeout = setTimeout(() => setName(ref.getCurrentRoute()?.name), 100);

    return () => clearTimeout(timeout);
  }, []);

  useEffect(() => {
    const listeren = ref.addListener('state', () =>
      setName(ref.getCurrentRoute()?.name),
    );

    return () => {
      ref.removeListener('state', listeren);
    };
  }, []);

  return (
    <>
      <NavigationContainer ref={ref}>
        <Stack.Navigator screenOptions={{headerShown: false}}>
          {user ? (
            <>
              <>
                <Stack.Screen name="Home" component={Home} />
                {/* <Stack.Screen name='Payments' component={Payments} />
            <Stack.Screen name='Services' component={Services } />
            <Stack.Screen name='Support' component={Support} />
            <Stack.Screen name='More' component={More} />
            <Stack.Screen name='Profile' component={Profile} /> */}
              </>
            </>
          ) : (
            <Stack.Screen name="Auth" component={Auth} />
          )}
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
};

export default Navigation;
