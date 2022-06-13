import { View, Text, StyleSheet, TextInput, ScrollView } from 'react-native'
import React, { useState } from 'react'
import { homeProp } from '../../types'
import Header from '../../components/Header'
import { Colors, Fonts, Sizes } from '../../constants/Layout'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { Feather } from '@expo/vector-icons'

const Change = ({ navigation }: homeProp) => {
    const [password, setPassword] = useState(false)
    const [phone, setPhone] = useState(false)
    const [email, setEmail] = useState(false)

    return (
        <View style={styles.main}>
            <View style={styles.header}>
                <Header title='Change Info' navigation={navigation} />
            </View>
            <ScrollView style={styles.ContentCont}>
                <View>
                    <View>
                        <View style={styles.infoCont}>
                            <Text style={styles.infoText}>Email:</Text>
                            <Text style={styles.infoText}>asaregid444@gmail.com</Text>
                            <TouchableOpacity onPress={() => setEmail(prev => !prev)}>
                                <Feather name='edit' size={23} color={Colors.primary} />
                            </TouchableOpacity>
                        </View>
                        {
                            email ? (
                                <View style={styles.newInfoCont}>
                                    <Text style={styles.infoHeaderText}>Change Email</Text>
                                    <TextInput style={styles.newInput} placeholder='Enter new Email' />
                                    <TouchableOpacity style={styles.updateBtn}>
                                        <Text style={styles.updateText}>Update</Text>
                                    </TouchableOpacity>
                                </View>


                            ) : null
                        }
                    </View>
                    <View>
                        <View style={styles.infoCont}>
                            <Text style={styles.infoText}>Phone Number:</Text>
                            <Text style={styles.infoText}>024********56</Text>
                            <TouchableOpacity onPress={() => setPhone(prev => !prev)}>
                                <Feather name='edit' size={23} color={Colors.primary} />
                            </TouchableOpacity>
                        </View>
                        {
                            phone ? (
                                <View style={styles.newInfoCont}>
                                    <Text style={styles.infoHeaderText}>Change phone Number</Text>
                                    <TextInput style={styles.newInput} placeholder='Enter new phone num' />
                                    <TouchableOpacity style={styles.updateBtn}>
                                        <Text style={styles.updateText}>Update</Text>
                                    </TouchableOpacity>
                                </View>


                            ) : null
                        }
                    </View>
                    <View style={styles.infoMain}>
                        <View style={styles.infoCont}>
                            <Text style={styles.infoText}>password:</Text>
                            <Text style={styles.infoText}>************</Text>
                            <TouchableOpacity onPress={() => setPassword(prev => !prev)}>
                                <Feather name='edit' size={23} color={Colors.primary} />
                            </TouchableOpacity>
                        </View>
                        {
                            password ? (
                                <View style={styles.newInfoCont}>
                                    <Text style={styles.infoHeaderText}>Change password</Text>
                                    <TextInput style={styles.newInput} placeholder='Enter new password' />
                                    <TextInput style={styles.newInput} placeholder='Comfirm Password' />
                                    <TouchableOpacity style={styles.updateBtn}>
                                        <Text style={styles.updateText}>Update</Text>
                                    </TouchableOpacity>
                                </View>
                            ) : null
                        }
                    </View>
                </View>
            </ScrollView>
        </View>
    )
}
const styles = StyleSheet.create({
    infoHeaderText: {
        ...Fonts.body2,
        fontSize: 18,
        marginTop: 5,
        color: Colors.darkgray
    },
    updateText: {
        color: Colors.warmWhite,
        ...Fonts.body3,
        textAlign: "center"
    },
    updateBtn: {
        backgroundColor: Colors.primary,
        padding: 5,
        paddingLeft: 30,
        paddingRight: 30,
        borderRadius: 8
    },
    newInput: {
        width: "90%",
        borderBottomWidth: 0.3,
        padding: 8,
        ...Fonts.body3,
        borderWidth: .3,
        marginTop: 12,
        borderRadius: 10,
        borderColor: Colors.darkgray,
        marginBottom: 8
    },
    newInfoCont: {
        justifyContent: "center",
        alignItems: "center",

    },
    infoText: {
        ...Fonts.body2,
        fontSize: 17,
        color: Colors.darkgray
    },
    infoCont: {
        flexDirection: "row",
        justifyContent: "space-between",
        padding: 10,
        marginBottom: 1,
        borderBottomWidth: 0.3,
        paddingTop: 14,
        paddingBottom: 14
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
        padding: 15,
        flex: 1
    },
})


export default Change