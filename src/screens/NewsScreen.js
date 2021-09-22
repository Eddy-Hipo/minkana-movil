import React, { useEffect, useState } from "react";
import { ScrollView, Linking } from "react-native";
import { Text, View, Image, Button } from "react-native-ui-lib";
import { LinearGradient } from "expo-linear-gradient";
import styles from "../styles/styles";
import { db } from "../utils/firebase";
import moment from "moment";

const NewsScreen = () => {
  const [verification, setVerification] = useState(false);
  const [totalNews, setTotalNews] = useState({});
  const [isSubscribed, setIsSubscribed] = useState(true);
  const supportedURL = "https://google.com";

  useEffect(() => {
    setIsSubscribed(true);
    if (isSubscribed) {
      db.collection("news")
        .orderBy("publicationDate", "desc")
        .limit(15)
        .onSnapshot((querySnapshot) => {
          const planArray = [];
          querySnapshot.docs.forEach((item) => {
            planArray.push({ ...item.data() });
          });
          setTotalNews(planArray);
          setVerification(true);
        });
    }

    return () => setIsSubscribed(false);
  }, []);

  return (
    <>
      <LinearGradient
        colors={["#E1E1E1", "#D5D5D5", "#F4F1DE"]}
        style={styles.background2}
      />

      <View marginT-15 marginB-5>
        <ScrollView showsVerticalScrollIndicator={false}>
          {verification ? (
            totalNews.map((item) => {
              return (
                <View key={item.id}>
                  <View
                    style={{
                      backgroundColor: "white",
                      borderRadius: 8.5,
                      borderWidth: 1,
                      borderColor: "#909093",
                    }}
                    marginH-15
                    marginB-20
                  >
                    <View
                      paddingL-15
                      style={{
                        backgroundColor: "#3D405B",
                        borderTopRightRadius: 7,
                        borderTopLeftRadius: 7,
                      }}
                    >
                      <Text
                        white
                        h6
                        marginT-10
                        marginB-10
                        style={{ fontWeight: "bold" }}
                      >
                        {item.title}
                      </Text>
                      <View style={{ width: "100%" }}>
                        <Image
                          borderRadius={5}
                          source={{ uri: item.photoURL }}
                          style={{
                            height: 180,
                            width: "96.5%",
                          }}
                          cover={false}
                        />
                      </View>
                      <View marginT-5 marginB-10 row>
                        <Text white h6 style={{ fontWeight: "bold" }}>
                          Fuente:{" "}
                        </Text>
                        <Text white h7>
                          {item.source}
                        </Text>
                      </View>
                      <View marginB-10 row>
                        <Text white h6 style={{ fontWeight: "bold" }}>
                          Fecha de publicación:{" "}
                        </Text>
                        <Text white h7>
                          {moment(item.publicationDate).format("YYYY-MM-DD")}
                        </Text>
                      </View>
                    </View>

                    <View margin-15 spread row>
                      <Button
                        label="VER MÁS"
                        labelStyle={{ fontSize: 14, fontWeight: "bold" }}
                        enableShadow
                        onPress={() => Linking.openURL(item.url)}
                        style={{
                          backgroundColor: "#3D405B",
                          height: 40,
                          borderRadius: 15,
                        }}
                      />
                    </View>
                  </View>
                </View>
              );
            })
          ) : (
            <View />
          )}
        </ScrollView>
      </View>
    </>
  );
};

export default NewsScreen;
