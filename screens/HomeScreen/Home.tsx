import { View, Text, TouchableOpacity, TextInput, ScrollView, FlatList, TouchableHighlight, Image } from 'react-native'
import React, { useState } from 'react'
import { homeStyle } from './homeStyle'
import { AntDesign, Feather, FontAwesome5, MaterialCommunityIcons } from '@expo/vector-icons'
import { Colors } from '../../constants/Layout'
import { categoriesData, itemData } from '../../constants/Data'
import Categories from '../../components/Categories'
import images from '../../constants/Images'
import Items from '../../components/Items'
import { homeProp } from '../../types'

const Home = ({ navigation }: homeProp) => {
    const [searchText, setSeacrhText] = useState<string>();
    const [data, setData] = useState(categoriesData);

    const handleSelected = (category: any) => {
        const selectedItem = data.map((item) => {
            if (category.id == item.id) {
                return {
                    ...item,
                    selected: true
                };
            } else {
                return {
                    ...item,
                    selected: false
                };
            }
        });
        setData(selectedItem);
    };
    const renderCategories = ({ item }: any) => (
        <Categories handle={() => handleSelected(item)} image={item.image} toggle={item.selected} title={item.title} />
    );

    const renderItems = ({ item }: any) => (
        <Items image={item.image} price={item.price} title={item.title} navigation={navigation} />
    )


    return (
        <View style={homeStyle.main}>

            {/* Header container*/}
            <View style={homeStyle.header}>
                <View style={homeStyle.titleCont}>
                    <View style={{ width: 150, height: 38 }}>
                        <Image source={images.logo} style={{ width: '100%', height: "100%" }} />
                    </View>
                    <TouchableOpacity style={homeStyle.cartBtn} onPress={() => navigation.navigate("Carts")} >
                        <Feather name='shopping-cart' size={18} />
                        <Text style={homeStyle.cartNum}>2</Text>
                    </TouchableOpacity>
                </View>
                {/* Search goes here */}
                <View style={homeStyle.searchContainer}>
                    <View style={homeStyle.search}>
                        <Feather name='search' size={24} />
                        <TextInput style={homeStyle.searchInput} placeholder="Search for something tasty..." value={searchText} onChangeText={setSeacrhText} />
                    </View>
                </View>
            </View>
            <ScrollView style={homeStyle.contentContainer}>

                {/* Recent Container */}
                <View style={homeStyle.recentCont}>
                    <TouchableOpacity style={homeStyle.recentBtn}>
                        <AntDesign name='retweet' size={25} color={Colors.deepDarkGray} />
                        <Text style={homeStyle.recentText}>Repeat Last order</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={[homeStyle.recentBtn, homeStyle.btnMid]} onPress={() => navigation.navigate("Account")}>
                        <MaterialCommunityIcons name='account-outline' size={25} color={Colors.deepDarkGray} />
                        <Text style={homeStyle.recentText}>Account</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={homeStyle.recentBtn} onPress={() => navigation.navigate("AgentConsole")}>
                        <Feather name='share-2' size={25} color={Colors.deepDarkGray} />
                        <Text style={homeStyle.recentText}>Agent Console</Text>
                    </TouchableOpacity>
                </View>
                {/*End Of Recent Container */}



                {/*Categories */}
                <View style={homeStyle.categoryHeaderCont}>
                    <Text style={homeStyle.catHeaderText}>Top Categories </Text>
                    <TouchableOpacity style={homeStyle.categoryHeaderBtn} onPress={() => navigation.navigate("AllCategories")} >
                        <Text style={homeStyle.catBtnText}>View all </Text>
                        <AntDesign name='arrowright' size={18} />
                    </TouchableOpacity>
                </View>
                {/*Category scroll */}
                <View style={{ paddingLeft: 10 }}>
                    <FlatList
                        renderItem={renderCategories}
                        data={data}
                        keyExtractor={(item) => item.id}
                        horizontal={true}
                        showsHorizontalScrollIndicator={false}
                    />
                </View>
                {/* End of Category scroll */}

                {/* Recommended categories */}
                <View>
                    <Text style={homeStyle.recomText}>Recommended</Text>
                    <FlatList
                        renderItem={renderItems}
                        data={itemData}
                        keyExtractor={(item) => item.id}
                        numColumns={2}
                        showsVerticalScrollIndicator={false}
                        contentContainerStyle={homeStyle.itemsContainer}
                    />
                </View>
            </ScrollView>

            <View style={homeStyle.cartsBtnCont}>
                <TouchableHighlight style={homeStyle.viewCartsBent} onPress={() => navigation.navigate("Carts")}>
                    <Text style={homeStyle.viewBtnText}>Check out 2 products</Text>
                </TouchableHighlight>
            </View>
        </View>
    )
}


export default Home