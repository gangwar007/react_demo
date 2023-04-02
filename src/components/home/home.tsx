import React, { useEffect, useState } from "react";
import { Text, View, FlatList, Image, RefreshControl } from "react-native";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { fetchUser } from "../../redux/reducer/RootReducer";

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
    console.log("aaaaaa", userData);
    setRefreshing(false);
  }, [userData]);

  useEffect(() => {
    dispatch(fetchUser(page));
  }, [page]);

  const renderProduct = (item) => {
    return (
      <View
        style={{
          backgroundColor: "#fff",
          margin: 4,
          paddingLeft: 8,
          paddingTop: 8,
          paddingBottom: 8,
        }}
      >
        <View style={styles.info}>
          <Text style={{ fontSize: 15, fontWeight: "bold", marginBottom: 4 }}>
            {item.name}
          </Text>
          <Text style={styles.price}>{item.description}</Text>
          <View style={styles.repo}>
            <View style={styles.rating}>
              <Image
                style={styles.image}
                source={{ uri: item.owner.avatar_url }}
              />
              <Text style={styles.full_name}>{item.full_name}</Text>
            </View>
            <View style={styles.rating}>
              <Image style={styles.image} source={star} />
              <Text style={styles.full_name}>{item.stargazers_count}</Text>
            </View>
          </View>
        </View>
      </View>
    );
  };

  const onRefresh = () => {
    dispatch(fetchUser());
  };

  const fetchMoreData = () => {
    setPage(page + 1);
  };

  return (
    <FlatList
      data={userData.root.userData.items}
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
      // refreshing={state.isFetching}
    />
  );
};

const styles = {
  image: {
    width: "12%",
    aspectRatio: 1,
    marginTop: 5,
  },
  info: {
    marginTop: 2,
  },
  name: {
    fontSize: 12,
    fontWeight: "bold",
    marginBottom: 10,
  },
  repo: {
    flexDirection: "row",
    fontSize: 12,
    margin: 10,
    justifyContent: "space-between",
  },
  full_name: {
    fontSize: 12,
    margin: 5,
  },
  rating: {
    flexDirection: "row",
  },
};

export default UserListView;
