import { View, StyleSheet, Text } from 'react-native'
import React from 'react'
import { homeProp } from '../../types'
import { Colors, Fonts, Sizes } from '../../constants/Layout'
import Header from '../../components/Header'
import { ScrollView } from 'react-native-gesture-handler'

const Help = ({ navigation }: homeProp) => {
    return (
        <View style={styles.main}>
            <View style={styles.header}>
                <Header title='Help' navigation={navigation} />
            </View>
            <ScrollView style={styles.ContentCont}>
                <View >
                    <View style={styles.textCont}>
                        <Text style={styles.headerText}>About Homiez Foods</Text>
                        <Text style={styles.text}>Welcome to hommiez food, your food choice is delivered to you any where you are
                            Welcome to hommiez food, your food choice is delivered to you any where you areWelcome to hommiez food, your food choice is delivered to you any where you are
                        </Text>
                    </View>
                    <View style={styles.textCont}>
                        <Text style={styles.headerText}>How the app works</Text>
                        <Text style={styles.text}>Welcome to hommiez food, your food choice is delivered to you any where you are
                            Welcome to hommiez food, your food choice is delivered to you any where you areWelcome to hommiez food, your food choice is delivered to you any where you are
                        </Text>
                    </View>

                </View>
            </ScrollView>
        </View>
    )
}
const styles = StyleSheet.create({
    textCont: {
        marginBottom: 15,
        paddingBottom: 5,
        borderBottomWidth: 0.5
    },
    text: {
        ...Fonts.body3,
        color: Colors.darkgray,
        textAlign: "justify"
    },

    headerText: {
        ...Fonts.h2,
        color: Colors.darkgray,
        marginBottom: 10
    },
    main: {
        flex: 1,
        paddingTop: Sizes.paddingTop,
        backgroundColor: Colors.primary,
    },
    header: {
        height: 60,
    },
    ContentCont: {
        backgroundColor: Colors.warmWhite,
        padding: 19,
        flex: 1
    },
})
export default Help