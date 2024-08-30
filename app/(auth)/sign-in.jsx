import { Image, View, Text, ScrollView } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import {images} from '../../constants'
import FormField from '../../components/FormField'
import { useState } from 'react'

const SignIn = () => {
  const [form, setForm] = useState({
    email: '',
    password: ''
  })

  return (
    <SafeAreaView className="bg-primary h-full">
      <ScrollView>
        <View className="w-full justify-center h-full  px-4 my-6">
          <Image
            source={images.logo} resizeMode='contain' className="w-[115px] h-[35px]"
          />

          <Text className="text-xl text-white font-semibold mt-10 font-psemibold">Log in to Aora</Text>

          <FormField
            title="Email"
            value={form.email}
            handleChangeText={(e) => setForm({...form, email:e})}
            otherStyles="mt-7"
            keyboardType="email-address"
          />

          <FormField
            title="Password"
            value={form.password}
            handleChangeText={(e) => setForm({...form, password:e})}
            otherStyles="mt-7"
          
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default SignIn