import React, { useEffect, useState } from "react";
import {StyleSheet, Text, View, FlatList, Image, RefreshControl, ActivityIndicator } from "react-native";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { fetchUser,clearAllUser } from "../../redux/reducer/RootReducer";

const star = require("../../assets/star.png");

const UserListView = () => {
  const dispatch = useDispatch();

  const [refreshing, setRefreshing] = useState(true);
  const [page, setPage] = useState(1);

  const { userData } = useSelector(
    (state:any) => ({
      userData: state,
    }),
    shallowEqual
  );

  useEffect(() => {
    setRefreshing(false);
  }, [userData]);

  useEffect(() => {
    dispatch(fetchUser() as any);
  }, [page]);

  const renderProduct = (item:any) => {
    return (
      <View
        style={styles.main} >
          <Text style={styles.text}>
            {item.name}
          </Text>
          <Text style={styles.description}>{item?.description}</Text>
          <View style={styles.repo}>
            <View style={styles["user-detail"]}>
              <Image
                style={styles.image}
                source={{ uri: item?.owner?.avatar_url }}/>
              <Text style={styles["full-name"]} numberOfLines={3}>{item?.full_name}</Text>
            </View>
            <View style={styles.rating}>
              <Image style={styles.image} source={star} />
              <Text style={styles["full-name"]}>{item?.stargazers_count}</Text>
            </View>
          </View>
      </View>
    );
  };

  // refresh data on pull to refresh

  const onRefresh = () => {
    dispatch(clearAllUser());
    dispatch(fetchUser() as any);
  };


  // it's use for pagination and increase the count

  const fetchMoreData = () => {
    setPage(page + 1);
   
  };

// it's a loader for fetching data from api

  const LoaderComp= ()=> {
    if(userData.root.loading){
      return <View>
        <ActivityIndicator />
      </View>
    }
  }

  return (
     <FlatList
      data={userData.root.userData ||[]}
      renderItem={({ item }) => userData?.root?.userData == '' ? <Text style={styles.error}>{userData?.root?.errorMassege} </Text>:renderProduct(item)}
      keyExtractor={(item, index) => index + ""}
      refreshControl={
        <RefreshControl
          //refresh control used for the Pull to Refresh
          refreshing={refreshing}
          onRefresh={onRefresh}
        />
      }
      onEndReachedThreshold={0.2}
      onEndReached={fetchMoreData}
      ListFooterComponent={LoaderComp as any}
      // refreshing={state.isFetching}
    />
  );
};

const styles = StyleSheet.create({
  main:{
    flex:1,
    backgroundColor: "#fff",
    margin: 4,
    paddingLeft: 8,
    paddingTop: 8,
    paddingBottom: 8,
  },
  text:{
     fontSize: 15, 
     fontWeight: "bold",
      marginBottom: 4,
      color: 'black', 
  },
  image: {
    width: "12%",
    aspectRatio: 1,
    marginTop: 5,
  },
  info: {
    marginTop: 2,
  },
  
  description: {
    fontSize: 12,
    color: 'black',
    marginBottom: 10,
  },
  repo: {
    flexDirection: "row",
    margin: 10,
  },
  "full-name": {
    fontSize: 12,
    margin: 5,
    color: 'black',
  },
  rating: {
    flex:1,
    flexDirection: "row",
    marginLeft:10,
    justifyContent:'flex-end'

  },
  "user-detail":{
    flex:3,
    flexDirection: "row",
    marginRight:10
  },
  error:{
    textAlign: 'center', 
    fontWeight: 'bold',
    fontSize: 18,
    marginTop: 0,
    width: 200,

 },
});

export default UserListView;
