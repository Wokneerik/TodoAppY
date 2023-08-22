import React, {FC} from 'react';
import {ScrollView, View} from 'react-native';

interface ILayout {
  isScrollView?: boolean;
  children: React.ReactNode;
}

const Layout: FC<ILayout> = ({children, isScrollView = true}) => {
  return (
    <View>{isScrollView ? <ScrollView>{children}</ScrollView> : children}</View>
  );
};

export default Layout;
