import React, { useEffect, useState } from "react";
import { Text, View, FlatList, Image, RefreshControl, ActivityIndicator } from "react-native";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { fetchUser,clearAllUser } from "../../redux/reducer/RootReducer";

const star = require("../../assets/star.png");

const UserListView = () => {
  const dispatch = useDispatch();

  const [refreshing, setRefreshing] = useState(true);
  const [page, setPage] = useState(1);

  const { userData } = useSelector(
    (state) => ({
      userData: state,
    }),
    shallowEqual
  );

  useEffect(() => {
    setRefreshing(false);
  }, [userData]);

  useEffect(() => {
    dispatch(fetchUser(page));
  }, [page]);

  const renderProduct = (item) => {
    return (
      <View
        style={styles.main} >
          <Text style={styles.text}>
            {item.name}
          </Text>
          <Text style={styles.description}>{item.description}</Text>
          <View style={styles.repo}>
            <View style={styles.userDetail}>
              <Image
                style={styles.image}
                source={{ uri: item.owner.avatar_url }}
              />
              <Text style={styles.full_name} numberOfLines={3}>{item.full_name}</Text>
            </View>
            <View style={styles.rating}>
              <Image style={styles.image} source={star} />
              <Text style={styles.full_name}>{item.stargazers_count}</Text>
            </View>
          </View>
      </View>
    );
  };

  const onRefresh = () => {
    dispatch(clearAllUser());
    dispatch(fetchUser());
  };

  const fetchMoreData = () => {
    setPage(page + 1);
   
  };

  const LoaderComp= ()=> {
    if(userData.root.loading){
      return <View>
        <ActivityIndicator />
      </View>
    }
  }

  return (
    <FlatList
      data={userData.root.userData}
      renderItem={({ item }) => renderProduct(item)}
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
      ListFooterComponent={LoaderComp}
      // refreshing={state.isFetching}
    />
  );
};

const styles = {
  main:{
    flex:1,
    backgroundColor: "#fff",
    margin: 4,
    paddingLeft: 8,
    paddingTop: 8,
    paddingBottom: 8,
  },
  text:{
     fontSize: 15, fontWeight: "bold", marginBottom: 4 
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
    
    marginBottom: 10,
  },
  repo: {
    flexDirection: "row",
    margin: 10,
  },
  full_name: {
    fontSize: 12,
    margin: 5,
  },
  rating: {
    flex:1,
    flexDirection: "row",
    marginLeft:10,
    justifyContent:'flex-end'

  },
  userDetail:{
    flex:3,
    flexDirection: "row",
    marginRight:10
  }
};

export default UserListView;
