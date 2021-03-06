import React from 'react'
import { View, Text, TouchableOpacity, Image } from 'react-native'
import { Colors, Fonts } from '../constants/Layout'
import { categoriesProp } from '../Types'

const Categories = ({ title, toggle, handle, image }: categoriesProp) => {
    return (
        <TouchableOpacity onPress={handle} style={{
            backgroundColor: toggle ? Colors.primary : Colors.white,
            padding: 2,
            paddingLeft: 5,
            paddingRight: 10,
            flexDirection: "row",
            alignItems: "center",
            borderRadius: 15,
            marginRight: 10,
            elevation: 2,
            borderBottomWidth: 0.2

        }}>
            <Image source={image} style={{ height: 40, width: 40, borderRadius: 30 }} />
            <Text style={{
                ...Fonts.body2,
                marginLeft: 5,
                color: toggle ? Colors.white : Colors.darkgray
            }}>{title}</Text>
        </TouchableOpacity>
    )
}

export default Categories
