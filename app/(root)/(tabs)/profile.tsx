import React from 'react'
import {View, Text, ScrollView, Image, TouchableOpacity, ImageSourcePropType, StyleProp, Alert} from 'react-native'
import {SafeAreaView} from "react-native-safe-area-context";
import icons from "@/constants/icons";
import images from "@/constants/images";
import {settings} from "@/constants/data";
import {useGlobalContext} from "@/lib/global-provider";
import {logout} from "@/lib/appwrite";

interface SettingsItemsProps {
    icon: ImageSourcePropType,
    title: string,
    onPress?: () => void,
    textStyle?: string,
    showArrow?: boolean,
}

const SettingsItem = ({icon, title, onPress, textStyle, showArrow = true}:SettingsItemsProps) => (
    <TouchableOpacity
        onPress={onPress}
        className="flex flex-row items-center justify-between py-3">
        <View className="flex flex-row items-center gap-3">
            <Image source={icon} className="size-6"/>
            <Text className={`text-lg font-rubik-medium text-black-300 ${textStyle}`}>{title}</Text>
        </View>
        {
            showArrow && <Image source={icons.rightArrow} className="size-5" />
        }
    </TouchableOpacity>
)

const Profile = () => {
    const {user, refetch} = useGlobalContext();
    const handleLogout = async () => {
        const result = await logout();
        if(result){
            Alert.alert("Success","Successfully logged out!");
            await refetch();
        }else{
            Alert.alert("Error","Failed to logged out!");
        }
    }

    return (
        <SafeAreaView className="h-full bg-white">
            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerClassName="pb-32 px-7"
            >

                <View className="flex flex-row items-center justify-between mt-5">
                    <Text className="text-xl font-rubik-bold"> Profile </Text>
                    <Image source={icons.bell} className="size-5"/>
                </View>

                <View className="flex-row justify-center flex mt-5">
                    <View className="flex flex-col items-center relative mt-5">
                        <Image source={{uri: user?.avatar}} className="size-44 relative rounded-full"/>
                        <TouchableOpacity className="absolute bottom-11 right-2">
                            <Image source={icons.edit} className="size-9"/>
                        </TouchableOpacity>

                        <Text className="text-2xl font-rubik-bold mt-2">{user?.name}</Text>
                    </View>
                </View>


                <View className="flex flex-col mt-10">
                    <SettingsItem title="My bookings" icon={icons.calendar} />
                    <SettingsItem title="Payments" icon={icons.wallet} />
                </View>

                <View className="flex flex-col mt-5 border-t pt-5 border-primary-200">
                    { settings.slice(2).map((item, i) => (
                        <SettingsItem key={i} {...item} />
                    ))}
                </View>

                <View className="flex flex-col mt-5 border-t pt-5 border-primary-200">
                    <SettingsItem title="Logout" textStyle="text-danger" icon={icons.logout} showArrow={false} onPress={handleLogout} />
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

export default Profile
