import { View } from 'react-native'
import React, { FC } from 'react'
import tw from 'twrnc';
import { PropsWithChildren } from 'react'



const Padding: React.FC<PropsWithChildren & { style?: any }> = ({ style, children }) => {
  return (
    <View style={{...tw`px-4`, ...style}}>
      {children}
    </View>
  )
}

export default Padding