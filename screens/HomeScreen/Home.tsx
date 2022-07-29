import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  ScrollView,
  FlatList,
  TouchableHighlight,
  Image,
  ActivityIndicator,
  Modal,
  Alert,
  Linking,
  ImageBackground,
  ImageBackgroundBase,
  Animated,
  Dimensions,
  Keyboard,
} from "react-native";
import React, { useEffect, useRef, useState } from "react";
import { homeStyle } from "./homeStyle";
import {
  AntDesign,
  Feather,
  FontAwesome,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import { Colors, Fonts, Sizes } from "../../constants/Layout";
import Categories from "../../components/Categories";
import images from "../../constants/Images";
import Items from "../../components/Items";
import { homeProp, notificationTypes } from "../../types";
import useFirebaseAuth from "../../hooks/useFirebaseAuth";
import { useAppDispatch, useAppSelector } from "../../app/reduxHooks/hooks";
import {
  categoryType,
  getFoodCategories,
  selectCategories,
} from "../../features/categories/categorySlice";
import axios from "../../app/axios";
import {
  foodType,
  getFoods,
  selectFoodsWithCategory,
} from "../../features/foods/foodsSlice";
import { devMode } from "../../app/Globals";
import { useIsFocused } from "@react-navigation/native";
import allFoodCategoryImage from "../../assets/images/all-foods-category.jpg";
import { cartItemType, selectCarts } from "../../features/cart/cartSlice";
import { signOut } from "firebase/auth";
import { auth, db } from "../../app/Firebase";
import { Button } from "react-native-elements";
import {
  cleanOrders,
  getOrders,
  orderType,
  selectOrders,
  selectPreviousOrder,
  selectProcessingOrders,
} from "../../features/orders/OrdersSlice";
import {
  addDoc,
  collection,
  getDocs,
  limit,
  orderBy,
  query,
  where,
} from "firebase/firestore";
import SnackBar from "react-native-snackbar-component";
import useNotificationToken from "../../hooks/useNotificationToken";
import {
  selectAppVersion,
  setAppVersion,
} from "../../features/appConfig/appConfigSlice";
import { styles } from "./styles";
import * as Animatable from 'react-native-animatable';

const Home = ({ navigation, route }: homeProp) => {
  const isFocused = useIsFocused();
  const dispatch = useAppDispatch();
  const processingOrders = useAppSelector(selectProcessingOrders);
  const orders = useAppSelector(selectOrders(1));
  const carts = useAppSelector(selectCarts);
  const { user, completed } = useFirebaseAuth();
  const [lastUpdateComplete, setLastUpdateComplete] = useState(false);
  const [foodsLastUpdate, setFoodsLastUpdate] = useState(0);
  const [foodsLoading, setFoodsLoading] = useState(false);
  const [page, setPage] = useState(0);
  const [changeCategoryLoading, setChangeCategoryLoading] = useState(false);
  const [categoryActive, setCategoryActive] = useState("");
  const [search, setSearch] = useState("");
  const foods = useAppSelector(selectFoodsWithCategory(categoryActive));
  const categories = useAppSelector(selectCategories);
  const [error, setError] = useState("");
  const [searchFoods, setSearchFoods] = useState<foodType[]>([]);
  const [searchTimer, setSearchTimer] = useState<{ timer: any; last: number }>({
    timer: undefined,
    last: 0,
  });


  const screenHeight = Dimensions.get("screen").height;
  console.log(screenHeight)
  const height = screenHeight < 650 ? screenHeight / 8 : screenHeight / 4.8
  const imageSize = useRef(new Animated.Value(240)).current;
  const slideTopAnim = useRef(new Animated.Value(height)).current;
  const fadeOutAnim = useRef(new Animated.Value(1)).current;
  const [removedAnim, setRemovedAnim] = useState(true)
  const [keyboardShow, setKeyboardShow] = useState(false)
  const [isAnimationDone, setIsAnimationDone] = useState(false)
  const [foodsHaveMore, setFoodsHaveMore] = useState(foods.items.length >= 9);
  const [inWorkingHoursLoading, setInWorkingHoursLoading] = useState(true);
  const [inWorkingHours, setInWorkingHours] = useState(false);
  const [foodCategoriesLastUpdate, setFoodCategoriesLastUpdate] = useState(0);
  const [showAllCategories, setShowAllCategories] = useState(false);
  const [logoutLoading, setLogoutLoading] = useState(false);
  const [logoutConfirmShow, setLogoutConfirmShow] = useState(false);
  const previousOrder = useAppSelector(selectPreviousOrder);
  const [foodCategoriesLoading, setfoodCategoriesLoading] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const appVersion = useAppSelector(selectAppVersion);
  const [ordersLastUpdate, setOrdersLastUpdate] = useState<number>(0);
  const { notification, response: notificationReponse } =
    useNotificationToken();

  useEffect(() => {
    const showSubscription = Keyboard.addListener("keyboardDidShow", () => {
      setKeyboardShow(prev => !prev)
    })
    const hideSubscription = Keyboard.addListener("keyboardDidHide", () => {
      setKeyboardShow(prev => !prev)
    })
  }, [])
  const slideUp = () => {
    Animated.timing(slideTopAnim, {
      toValue: -30,
      duration: 800,
      useNativeDriver: false,
    }).start();
  };

  const fadeOut = () => {
    Animated.timing(fadeOutAnim, {
      toValue: 0,
      duration: 400,
      useNativeDriver: false,
    }).start();
  };

  const setImageSize = () => {
    Animated.timing(imageSize, {
      toValue: 170,
      duration: 800,
      useNativeDriver: false,
    }).start();
  };

  const handleAnimation = () => {
    fadeOut()
    slideUp()
    setImageSize()
    setIsAnimationDone(true)
  }
  useEffect(() => {
    (async () => {
      if (!categories.length) setfoodCategoriesLoading(true);
      setfoodCategoriesLoading(true);
      if (lastUpdateComplete) {
        await dispatch(
          getFoodCategories({ page: 1, lastUpdate: foodCategoriesLastUpdate })
        );
        setfoodCategoriesLoading(false);
      }
    })();
  }, [lastUpdateComplete, dispatch, foodCategoriesLastUpdate, isFocused]);

  useEffect(() => {
    if (lastUpdateComplete) if (!orders.length) dispatch(cleanOrders());
  }, [lastUpdateComplete]);

  useEffect(() => {
    if (notification) {
      const notificationData = notification.request.content.data;
      if (notificationData.type === notificationTypes.order) {
        navigation.navigate("PreviousOrders", {
          fromOrders: true,
        });
      }
    }
  }, [notification]);

  useEffect(() => {
    if (notificationReponse) {
      const notificationData =
        notificationReponse.notification.request.content.data;
      if (notificationData.type === notificationTypes.order) {
        navigation.navigate("PreviousOrders", {
          fromOrders: true,
        });
      }
    }
  }, [notificationReponse]);

  useEffect(() => {
    (async () => {
      setInWorkingHoursLoading(true);
      const res = await axios.get("/users/serviceGlobals");
      const data = res.data;
      setInWorkingHours(data.inWorkingHours);
      setInWorkingHoursLoading(false);
      if (data?.appVersion !== appVersion && data?.appUrl) {
        Alert.alert("Update Available", "New App Version Available", [
          {
            text: "Update",
            onPress: () => {
              Linking.openURL(data.appUrl);
            },
          },
        ]);
        return;
      }
      if (data?.appVersion) dispatch(setAppVersion(data?.appVersion));
    })();
  }, []);

  useEffect(() => {
    (async () => {
      if (!foods.items.length) setFoodsLoading(true);
      if (lastUpdateComplete) {
        await dispatch(
          getFoods({
            page,
            lastUpdate: foodsLastUpdate,
            category: categoryActive,
          })
        );
      }
      setFoodsLoading(false);
    })();
  }, [
    lastUpdateComplete,
    dispatch,
    page,
    foodsLastUpdate,
    categoryActive,
    isFocused,
  ]);

  useEffect(() => {
    (async () => {
      if (lastUpdateComplete) {
        await dispatch(
          getOrders({
            lastUpdate: ordersLastUpdate,
            page: page,
          })
        );
      }
    })();
  }, [page, lastUpdateComplete, ordersLastUpdate]);

  useEffect(() => {
    if (search) {
      (async () => {
        if (setFoodsLoading) setFoodsLoading(true);
        if (Date.now() - searchTimer.last < 3 * 1000) {
          if (searchTimer.timer) clearTimeout(searchTimer.timer);
        }
        let timer = setTimeout(async () => {
          const searchRes = await axios.get(
            `/users/searchFood?s=${search}&page=${page}`
          );
          if (setFoodsLoading) setFoodsLoading(false);
          if (searchRes.data.error) return setError(searchRes.data.error);
          setSearchFoods(searchRes.data);
        }, 1000);
        setSearchTimer({
          last: Date.now(),
          timer: timer,
        });
      })();
    } else {
      setSearchFoods([]);
      if (setFoodsLoading) setFoodsLoading(false);
      if (searchTimer.timer) clearTimeout(searchTimer.timer);
    }
  }, [search]);

  useEffect(() => {
    (async () => {
      setLastUpdateComplete(false);
      const res = await axios.get("/users/foodGlobals");
      const globals: any = res.data;
      setFoodsLastUpdate(globals?.foodsLastUpdate);
      setFoodCategoriesLastUpdate(globals?.foodCategoriesLastUpdate || 0);
      setOrdersLastUpdate(globals?.ordersLastUpdate);
      setLastUpdateComplete(true);
    })();
  }, [isFocused]);

  useEffect(() => {
    if (error) setSnackbarMessage(error);
    else setSnackbarMessage("");
  }, [error]);

  useEffect(() => {
    if (!inWorkingHoursLoading && !inWorkingHours) {
      setSnackbarMessage(
        "Currently Not In Working Hours, Orders will be held until work starts"
      );
    }
  }, [inWorkingHours, inWorkingHoursLoading]);

  const handleOnScrollBottomFoods = async () => {
    if (foodsLoading) return;
    if (!foodsHaveMore) return;
    setFoodsLoading(true);
    await dispatch(
      getFoods({
        page,
        lastUpdate: foodsLastUpdate,
        category: categoryActive,
      })
    );
    setFoodsLoading(false);
  };
  const handleSelected = (id: string) => {
    setCategoryActive(id);
  };

  const handleLogout = async () => {
    setLogoutLoading(true);
    await signOut(auth);
    dispatch(cleanOrders());
    setLogoutLoading(false);
  };

  const handleProcessPreviousOrder = async () => {
    let prevOrderCart: Partial<cartItemType>[] = [];

    if (previousOrder) {
      prevOrderCart = previousOrder.items.map((item) => ({
        id: item.id,
        name: item.foodName,
        price: item.price,
        quantity: item.quantity,
      }));
    } else {
      try {
        if (auth.currentUser && user) {
          const q = query(
            collection(db, "orders"),
            where("createdBy", "==", user?.uid),
            orderBy("createdAt"),
            limit(1)
          );
          const res = await getDocs(q);
          if (res.empty) {
            setError("There are no previous orders linked to this account");
            return;
          }
          const orderData = res.docs[0].data() as orderType;
          prevOrderCart = orderData.items.map((item) => ({
            id: item.id,
            name: item.foodName,
            price: item.price,
            quantity: item.quantity,
          }));
        } else {
          return setError("No User Logged In");
        }
      } catch (err) {
        console.log(err);
      }
    }
    if (prevOrderCart) {
      navigation.navigate("ProcessPreviousOrder", {
        prevOrder: JSON.stringify(prevOrderCart),
      });
    } else {
      setError("There are no previous orders linked to this account");
      return;
    }
  };

  const renderCategories = ({
    item,
    index,
    allCatsModal,
  }: {
    item: categoryType;
    index: number;
    allCatsModal?: boolean;
  }) => (
    <>
      {index === 0 && (
        <Categories
          handle={() => {
            handleSelected("");
            if (allCatsModal) setShowAllCategories(false);
          }}
          image={allFoodCategoryImage}
          active={categoryActive}
          id={""}
          title={"All Foods"}
        />
      )}
      <Categories
        handle={() => {
          handleSelected(item.id);
          if (allCatsModal) setShowAllCategories(false);
        }}
        image={{
          uri: devMode
            ? item.imgURL?.toString().replace("localhost", "10.0.2.2") || ""
            : item.imgURL?.toString(),
        }}
        active={categoryActive}
        id={item.id}
        title={item.name}
      />
    </>
  );

  const renderItems = ({ item }: { item: foodType }) => (
    <Items
      id={item.id}
      image={{
        uri: devMode
          ? item.imgURL?.toString().replace("localhost", "10.0.2.2") || ""
          : item.imgURL?.toString(),
      }}
      price={item.price}
      title={item.name}
      includes={item.includes}
      available={item.available}
      navigation={navigation}
    />
  );
  let fuck = true

  if (fuck) {
    return (
      <View style={styles.main}>
        {/**LOGIN MODAL */}
        <Animated.View style={[styles.loginModal, { opacity: fadeOutAnim, display: isAnimationDone ? "none" : "flex" }]}>
          <ImageBackground source={images.items[6]} style={{ height: "100%", width: "100%", alignItems: "center", justifyContent: "flex-end", }} >
            <View style={{ height: screenHeight < 650 ? Sizes.height / 2.2 : Sizes.height / 2.5, }}>
              <View style={[styles.loginInputCont, { marginTop: keyboardShow ? 250 : 60, }]}>
                <Text style={styles.inputText}>+233</Text>
                <TextInput style={styles.input} />
              </View>
              <TouchableOpacity style={styles.loginBtn} onPress={() => handleAnimation()}>
                <Image source={images.items[4]} style={{ height: 80, width: 80 }} />
              </TouchableOpacity>
            </View>
          </ImageBackground>

        </Animated.View>
        {/**END OF LOGIN MODAL */}
        <View style={styles.statusBar}>
        </View>
        <View style={styles.header}>
          <ImageBackground source={images.items[1]} style={styles.bgImg}>
            <Animated.View style={[styles.imgCont, { height: imageSize, width: imageSize, marginTop: slideTopAnim }]}>
              <View style={[styles.logoImg, { top: isAnimationDone ? 80 : 90, }]}>
                <Image source={images.items[2]} style={{ height: isAnimationDone ? 47 : 60, width: isAnimationDone ? 158 : 188 }} />
              </View>
              <Image source={images.items[0]} style={{ height: "100%", width: "100%" }} />
            </Animated.View>

            {
              isAnimationDone ? (
                <Animatable.View style={styles.headerSearchCont} ref={el => {
                  if (removedAnim) {
                    if (el) {
                      (el as any).fadeInUp(1100).then((anim: any) => { anim.finished ? setRemovedAnim(false) : console.log("anim cancelled") })
                    }
                  }
                }}>
                  <Feather name="search" color={Colors.deepDarkGray} size={24} />
                  <TextInput placeholder="search" style={styles.headerInput} />
                  <TouchableOpacity>
                    <Image source={images.items[3]} style={{ height: 20, width: 20 }} />
                  </TouchableOpacity>
                </Animatable.View>
              ) : null
            }
          </ImageBackground>
        </View>
        <View style={styles.mainContent}>
          <ScrollView style={styles.scrollContent}>
            {/*Category scroll */}
            <View style={{ paddingLeft: 10, flexDirection: "row", marginTop: 2, paddingRight: 15 }}>
              <FlatList
                renderItem={renderCategories}
                data={categories}
                keyExtractor={(item) => item.id}
                horizontal={true}
                showsHorizontalScrollIndicator={false}
              />
            </View>
            {/** Food items */}
            <View style={styles.foodItemCont}>
              <FlatList
                renderItem={renderItems}
                onEndReachedThreshold={5}
                data={
                  !searchFoods.length && !search ? foods.items : searchFoods
                }
                keyExtractor={(item) => item.id}
                onEndReached={handleOnScrollBottomFoods}
                numColumns={2}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={[
                  homeStyle.itemsContainer,
                  {
                    paddingBottom: 35,
                    marginBottom: 20,
                  },
                ]}
              />
            </View>
          </ScrollView>
        </View>
      </View>
    )
  } else {
    return (
      <View style={homeStyle.main}>
        <SnackBar
          visible={Boolean(snackbarMessage)}
          textMessage={snackbarMessage}
          backgroundColor={error ? "red" : "green"}
          accentColor="white"
          actionHandler={() => {
            setSnackbarMessage("");
          }}
          actionText="Close"
        />
        {showAllCategories && (
          <Modal
            onRequestClose={() => setShowAllCategories(false)}
            animationType="fade"
          >
            <View style={{ width: "100%", padding: 10 }}>
              <Text
                style={{
                  ...Fonts.h2,
                  textAlign: "center",
                  marginTop: 10,
                  marginBottom: 20,
                }}
              >
                All Categories
              </Text>
              <FlatList
                renderItem={({ item, index }) =>
                  renderCategories({ item, index, allCatsModal: true })
                }
                numColumns={1}
                data={categories}
                keyExtractor={(item) => item.id}
                showsHorizontalScrollIndicator={false}
              />
            </View>
          </Modal>
        )}
        {logoutConfirmShow && (
          <Modal animationType="slide" transparent>
            <View style={homeStyle.modalFull}>
              <View style={homeStyle.modalContent}>
                <Text
                  style={{ ...Fonts.h3, textAlign: "center", marginBottom: 10 }}
                >
                  Confirm Logout?
                </Text>
                <View style={{ flexDirection: "row", justifyContent: "center" }}>
                  <Button
                    title="Cancel"
                    buttonStyle={{
                      backgroundColor: Colors.darkgray,
                      padding: 10,
                      marginHorizontal: 5,
                    }}
                    containerStyle={{
                      width: "40%",
                    }}
                    style={{
                      padding: 10,
                    }}
                    onPress={() => {
                      setLogoutConfirmShow(false);
                    }}
                  />
                  <Button
                    title="Yes"
                    buttonStyle={{
                      backgroundColor: Colors.red,
                      padding: 10,
                      marginHorizontal: 5,
                    }}
                    containerStyle={{
                      width: "40%",
                    }}
                    style={{
                      padding: 10,
                    }}
                    loading={logoutLoading}
                    onPress={async () => {
                      setLogoutLoading(true);
                      await handleLogout();
                      setLogoutConfirmShow(false);
                      setLogoutLoading(true);
                    }}
                  />
                </View>
              </View>
            </View>
          </Modal>
        )}
        {/* Header container*/}
        <View style={homeStyle.header}>
          <View style={homeStyle.titleCont}>
            <View style={{ width: 150, height: 38 }}>
              <Image
                source={images.logo}
                style={{ width: "100%", height: "100%" }}
              />
            </View>
            <View style={{ flexDirection: "row" }}>
              {processingOrders.length > 0 && (
                <TouchableOpacity onPress={() => navigation.navigate("Map")}>
                  <FontAwesome name="map-marker" size={37} color={"white"} />
                  <Text style={homeStyle.bage}>{processingOrders.length}</Text>
                </TouchableOpacity>
              )}

              {user ? (
                <TouchableOpacity
                  style={homeStyle.cartBtn}
                  onPress={() => setLogoutConfirmShow(true)}
                >
                  <AntDesign name="logout" color="white" size={18} />
                </TouchableOpacity>
              ) : (
                <TouchableOpacity
                  style={[
                    homeStyle.cartBtn,
                    {
                      backgroundColor: Colors.primary,
                      borderColor: Colors.lightGray,
                      borderWidth: 1,
                    },
                  ]}
                  onPress={() => navigation.navigate("LoginScreen")}
                >
                  <Text style={{ ...Fonts.body4, color: "white" }}>Log In</Text>
                </TouchableOpacity>
              )}
            </View>
          </View>
          {/* Search goes here */}
          <View style={homeStyle.searchContainer}>
            <View style={homeStyle.search}>
              <Feather name="search" size={24} />
              <TextInput
                style={homeStyle.searchInput}
                placeholder="Search for something tasty..."
                value={search}
                onChangeText={(t) => {
                  setSearch(t);
                }}
              />
            </View>
          </View>
        </View>
        <ScrollView style={homeStyle.contentContainer}>
          {user && (
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Text style={{ ...Fonts.h5, padding: 10, fontSize: 14 }}>
                Welcome,
              </Text>
              <Text style={{ ...Fonts.body5, fontSize: 14 }}>
                {user.username || user.email || user.phone}
              </Text>
            </View>
          )}
          {/* Recent Container */}
          <View style={homeStyle.recentCont}>
            <TouchableOpacity
              style={homeStyle.recentBtn}
              onPress={handleProcessPreviousOrder}
            >
              <AntDesign name="retweet" size={18} color={Colors.deepDarkGray} />
              <Text style={homeStyle.recentText}>Repeat Last order</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[homeStyle.recentBtn, homeStyle.btnMid]}
              onPress={() => navigation.navigate("Account")}
            >
              <MaterialCommunityIcons
                name="account-outline"
                size={18}
                color={Colors.deepDarkGray}
              />
              <Text style={homeStyle.recentText}>Account</Text>
            </TouchableOpacity>
            {user?.agent && (
              <TouchableOpacity
                style={homeStyle.recentBtn}
                onPress={() => navigation.navigate("AgentConsole")}
              >
                <Feather name="share-2" size={18} color={Colors.deepDarkGray} />
                <Text style={homeStyle.recentText}>Agent Console</Text>
              </TouchableOpacity>
            )}
          </View>
          {/*End Of Recent Container */}
          <View style={homeStyle.categoryHeaderCont}>
            <Text style={homeStyle.catHeaderText}>Categories </Text>
            <TouchableOpacity
              style={homeStyle.categoryHeaderBtn}
              onPress={() => setShowAllCategories(true)}
            >
              <Text style={homeStyle.catBtnText}>View all</Text>
              <AntDesign name="arrowright" size={18} />
            </TouchableOpacity>
          </View>
          {!foodCategoriesLoading && !foodsLoading && (
            /*Categories */
            <>
              {/*Category scroll */}
              <View style={{ paddingLeft: 10, flexDirection: "row" }}>
                <FlatList
                  renderItem={renderCategories}
                  data={categories}
                  keyExtractor={(item) => item.id}
                  horizontal={true}
                  showsHorizontalScrollIndicator={false}
                />
              </View>
              {/* End of Category scroll */
            /* Recommended categories */}
              <View>
                <Text style={homeStyle.recomText}>
                  {search
                    ? search
                    : categoryActive
                      ? categories.find((c) => c.id === categoryActive)?.name
                      : "All Foods"}
                </Text>
                {!!search && !searchFoods.length && (
                  <View
                    style={{
                      marginTop: 20,
                      alignItems: "center",
                      justifyContent: "center",
                      flex: 1,
                    }}
                  >
                    <MaterialCommunityIcons
                      size={48}
                      name="food-off-outline"
                      color={"red"}
                    />
                    <Text>No Food Found</Text>
                  </View>
                )}
                <FlatList
                  renderItem={renderItems}
                  onEndReachedThreshold={5}
                  data={
                    !searchFoods.length && !search ? foods.items : searchFoods
                  }
                  keyExtractor={(item) => item.id}
                  onEndReached={handleOnScrollBottomFoods}
                  numColumns={2}
                  showsVerticalScrollIndicator={false}
                  contentContainerStyle={[
                    homeStyle.itemsContainer,
                    {
                      paddingBottom: 35,
                      marginBottom: 20,
                    },
                  ]}
                />
              </View>
            </>
          )}
        </ScrollView>

        <View style={homeStyle.cartsBtnCont}>
          {(foodsLoading || foodCategoriesLoading) && (
            <ActivityIndicator
              animating
              size={28}
              color={Colors.primary}
              style={{ marginBottom: 5 }}
            />
          )}

          <TouchableHighlight
            style={homeStyle.viewCartsBent}
            onPress={() => navigation.navigate("Carts")}
          >
            <Text style={homeStyle.viewBtnText}>
              Check out {carts.length} Foods
            </Text>
          </TouchableHighlight>
        </View>
      </View>
    );
  }

};

export default Home;
