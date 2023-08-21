import React, {FC} from 'react';
import {ScrollView, View} from 'react-native';
import tw from 'twrnc';

interface ILayout {
  isScrollView?: boolean;
  children: React.ReactNode;
}

const Layout: FC<ILayout> = ({children, isScrollView = true}) => {
  return (
    <View style={tw`h-full w-full bg-white pt-1`}>
      {isScrollView ? <ScrollView>{children}</ScrollView> : children}
    </View>
  );
};

export default Layout;
