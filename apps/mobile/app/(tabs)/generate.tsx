import React from 'react'
import { Image, StyleSheet, Text, TextInput, Touchable, TouchableOpacity, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { fal } from "@fal-ai/client"
const GeneratePage = () => {
  const [prompt , setPrompt] = React.useState<string>("")
  const [image , setImage] = React.useState<string|null>("")
  
  const generateThumbnail = async()=>{
    console.log("Started")
    if(!prompt){
      alert("Please Enter a prompt");
      return;
    }

    fal.config({
      credentials: process.env.EXPO_PUBLIC_FAL_API_KEY
    });

    const response = await fal.subscribe("fal-ai/flux/dev", {
      input: {
        prompt: prompt,
        output_format: "png",
        num_inference_steps:50,
        image_size:{"width":1920,"height":1080}
      },
    });

    setImage(response.data.images[0].url)
    
    console.log("DONE")
  }
  return (
    <SafeAreaView className='flex-1 items-center bg-neutral-950 text-white p-5'>
      <View className='flex-col items-center text-center mt-10'>
        <Text className='text-6xl'>
          🔥
        </Text>
      <Text className='text-white text-3xl font-bold'>
        Idea to thumbnail in seconds.
      </Text>
      <Text className='text-white/60'>
        Thumbnaily is your superhuman thumbnail artist.
      </Text>
      </View>
      <View className='border border-neutral-700 w-full rounded-2xl p-2 mt-5'>
        <TextInput className='p-2 h-12 text-start text-white' placeholder='Enter Your prompt here' onChangeText={setPrompt}/>
        <View className='flex-row justify-between items-center'>
          <TouchableOpacity><Text className='text-white bg-neutral-900 border border-neutral-700  p-4 rounded-xl py-3'>Attach Reference</Text></TouchableOpacity>
          <TouchableOpacity><Text className='bg-white p-4 rounded-xl py-3' onPress={generateThumbnail}>Generate</Text></TouchableOpacity>
        </View>
      </View>
      <View className='flex-1 items-center w-full mt-16'>
        {image&&<Image 
          source={{uri:image}}
          className="w-full aspect-[1.77] object-contain rounded-md"
        />}
        {image&&<TouchableOpacity className=''><Text>Download</Text></TouchableOpacity>}
      </View>
    </SafeAreaView>
  )
}

export default GeneratePage