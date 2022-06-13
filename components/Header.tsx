import { AntDesign } from '@expo/vector-icons';
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import { Fonts } from '../constants/Layout';
import { headerProp } from '../Types';

const Header = ({ navigation, title }: headerProp) => {
	return (
		<View style={styles.header}>
			<TouchableOpacity style={styles.headerBtn} onPress={() => navigation.goBack()}>
				<AntDesign name="arrowleft" color={Colors.white} size={25} />
			</TouchableOpacity>
			<Text style={styles.headerText}>{title}</Text>
		</View>
	);
};

const styles = StyleSheet.create({
	header: {
		width: '100%',
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center',
		paddingBottom: 20
	},
	headerText: {
		textAlign: 'center',
		...Fonts.h2,
		fontSize: 23,
		color: Colors.white
	},
	headerBtn: {
		position: 'absolute',
		left: 14,
		paddingBottom: 5
	}
});
export default Header;
