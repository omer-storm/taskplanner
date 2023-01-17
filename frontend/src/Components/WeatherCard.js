import React, { useState, useEffect } from "react";
import { View, ScrollView, StyleSheet, Image } from "react-native";
import { Text, Card, Button, Icon } from "@rneui/themed";
import { API_KEY } from "../Constants";

const WeatherCard = () => {
  const [data, setData] = useState();
  useEffect(() => {
    fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=karachi&appid=${API_KEY}`
    )
      .then((res) => res.json())
      .then((res) => setData(res))
      .catch((err) => console.log(err));
  }, []);

  return (
    <Card>
      <Card.Title>Karachi Weather</Card.Title>
      <Card.Divider />
      {data ? (
        <View style={{ flexDirection: "row" }}>
          <Image
            style={{ width: 100, height: 100 }}
            resizeMode="contain"
            source={{
              uri: `http://openweathermap.org/img/wn/${data["weather"][0]["icon"]}@2x.png`,
            }}
          />
          <View>
            <Text style={{ fontSize: 30, fontWeight: "400" }}>
              {(data["main"]["temp"] - 273).toFixed(2)}&deg;C
            </Text>
            <Text style={{ fontSize: 20, fontWeight: "400" }}>
              {data["weather"][0]["main"]}
            </Text>
            <Text>wind: {data["wind"]["speed"]}m/s</Text>
            <Text>pressure: {data["main"]["pressure"]}hPa</Text>
            <Text>humidity: {data["main"]["humidity"]}%</Text>
            <Text>visibility: {data["visibility"]}km</Text>
          </View>
        </View>
      ) : (
        <Text>Data is unable to be displayed</Text>
      )}
    </Card>
  );
};

export default WeatherCard;
