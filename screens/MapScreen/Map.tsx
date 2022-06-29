import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import { Colors, Fonts, Sizes } from "../../constants/Layout"
import MapView from 'react-native-maps'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { AntDesign, Feather } from '@expo/vector-icons'
import { homeProp } from '../../types'

const Map = ({ navigation }: homeProp) => {
    return (
        <View style={styles.main}>
            <View style={styles.backBtnCont}>
                <TouchableOpacity onPress={() => navigation.goBack()} >
                    <AntDesign name='arrowleft' size={24} color={Colors.white} />
                </TouchableOpacity>
            </View>
            <MapView
                loadingEnabled={true}
                region={{
                    latitude: 37.78825,
                    longitude: -122.4324,
                    latitudeDelta: 0.015,
                    longitudeDelta: 0.0121
                }}
                style={styles.map} />
            <View style={styles.contentCont}>
                <View style={{ flexDirection: "row", justifyContent: "space-between", marginBottom: 10 }}>
                    <View>
                        <Text style={styles.headerText}>Arrival Time</Text>
                        <Text style={styles.numText}>9:30 pm</Text>
                    </View>
                    <View>
                        <Text style={styles.headerText}>Distance</Text>
                        <Text style={styles.numText}>30.3km</Text>
                    </View>
                </View>
                <TouchableOpacity style={styles.callBtn}>
                    <Feather name='phone' size={22} color="white" />
                    <Text style={styles.btnText}>Call</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    backBtnCont: {
        position: "absolute",
        top: 35,
        marginLeft: 15,
        zIndex: 222,
        backgroundColor: Colors.primary,
        padding: 3,
        paddingLeft: 10,
        paddingRight: 10,
        borderRadius: 7,
    },
    btnText: {
        ...Fonts.body2,
        color: Colors.white,
        marginLeft: 10
    },
    callBtn: {
        flexDirection: "row",
        justifyContent: "center",
        backgroundColor: Colors.primary,
        padding: 8,
        marginTop: 7,
        borderRadius: 4,
        alignItems: 'center'
    },
    numText: {
        ...Fonts.h2,
        color: Colors.deepDarkGray,
        paddingLeft: 3
    },
    headerText: {
        ...Fonts.body2,
        color: Colors.darkgray,

    },
    contentCont: {
        width: Sizes.width - 20,
        alignSelf: "center",
        backgroundColor: Colors.white,
        borderRadius: 10,
        padding: 10,
        position: "absolute",
        bottom: 50,
    },
    main: {
        flex: 1,
        paddingTop: Sizes.paddingTop,
    },
    map: {
        height: Sizes.height,
        width: Sizes.width
    }
})
export default Map