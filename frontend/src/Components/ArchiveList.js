import { Button, Card, ListItem } from "@rneui/themed";
import Icon from "react-native-vector-icons/Ionicons";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import {
  getArchiveBooks,
  deleteBooks,
  updateBooks,
} from "../features/books/booksSlice";
import {
  deleteMovies,
  getArchiveMovies,
  updateMovies,
} from "../features/movies/moviesSlice";
import {
  StyleSheet,
  TextInput,
  View,
  TouchableOpacity,
  Text,
  Alert,
  ActivityIndicator,
} from "react-native";

const ArchiveList = () => {
  const dispatch = useDispatch();

  const data = useSelector((state) => ({
    books: state.books,
    movies: state.movies,
  }));

  const tabOptions = ["books", "movies"];
  const [selectedIndex, setSelectedIndex] = useState(0);

  data[tabOptions[selectedIndex]] !== null &&
    useEffect(() => {
      if (data[tabOptions[selectedIndex]].isError)
        Alert.alert("Error: ", data[tabOptions[selectedIndex]].message);
      dispatch(getArchiveBooks());
      dispatch(getArchiveMovies());
    }, [
      data["books"].isError,
      data["books"].message,
      data["movies"].isError,
      data["movies"].message,
    ]);

  return (
    <View style={{ marginBottom: 46 }}>
      <Card>
        <Card.Title>Archive</Card.Title>
        <Card.Divider />
        <View style={styles.tabContainer}>
          {tabOptions.map((value, index) => (
            <TouchableOpacity
              key={index}
              onPress={() => setSelectedIndex(index)}
              style={
                selectedIndex === index
                  ? { ...styles.tab, backgroundColor: "grey" }
                  : styles.tab
              }
            >
              <Text>{value}</Text>
            </TouchableOpacity>
          ))}
        </View>

        <Card.Divider />

        {data[tabOptions[selectedIndex]][tabOptions[selectedIndex]] !== null &&
        data[tabOptions[selectedIndex]][tabOptions[selectedIndex]].length !==
          0 ? (
          data[tabOptions[selectedIndex]][tabOptions[selectedIndex]].map(
            (value, index) => (
              <React.Fragment key={value._id}>
                <ListItem bottomDivider style={{ marginTop: -10 }}>
                  <ListItem.Content
                    style={{
                      flexDirection: "row",
                      justifyContent: "space-between",
                    }}
                  >
                    <ListItem.Title>
                      {index + 1}. {value.name}
                    </ListItem.Title>
                    <View style={{ flexDirection: "row" }}>
                      <Button
                        onPress={() =>
                          tabOptions[selectedIndex] === "books"
                            ? dispatch(updateBooks(value))
                            : dispatch(updateMovies(value))
                        }
                        color={"white"}
                      >
                        <Icon name="archive" size={30} color="black" />
                      </Button>
                      <Button
                        onPress={() =>
                          tabOptions[selectedIndex] === "books"
                            ? dispatch(deleteBooks(value))
                            : dispatch(deleteMovies(value))
                        }
                        color={"white"}
                      >
                        <Icon name="close-circle" size={30} color="maroon" />
                      </Button>
                    </View>
                  </ListItem.Content>
                </ListItem>
                <Card.Divider />
              </React.Fragment>
            )
          )
        ) : (
          <Text>The {tabOptions[selectedIndex]} will be displayed here</Text>
        )}

        {data[tabOptions[selectedIndex]].isLoading && (
          <ActivityIndicator size="small" color="black" />
        )}
      </Card>
    </View>
  );
};

const styles = StyleSheet.create({
  tabContainer: {
    flex: 1,
    flexDirection: "row",
    marginTop: 2,
    marginBottom: 10,
  },
  tab: {
    flex: 1,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
  },
  form: {
    flexDirection: "row",
    justifyContent: "space-between",
    margin: 5,
    marginTop: -10,
  },
  textInput: {
    width: 240,
    height: 40,
    borderWidth: 1,
    padding: 10,
    margin: 6,
    marginLeft: -4,
  },
  button: {
    width: 40,
    height: 40,
    margin: 6,
    marginLeft: -4,
  },
});

export default ArchiveList;
