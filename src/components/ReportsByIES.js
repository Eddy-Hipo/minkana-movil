import React, { useEffect, useState } from "react";
import {
  KeyboardAvoidingView,
  Modal,
  Platform,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import styles from "../styles/styles";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";
import {
  Text,
  View,
  Image,
  RadioButton,
  RadioGroup,
  TextField,
  Button,
} from "react-native-ui-lib";
import moment from "moment";
import PropTypes from "prop-types";
import { db } from "../utils/firebase";
import ReportInformation from "../components/ReportInformation";

const ReportsByIES = ({ ies, onCancel, initialDateRef, finalDateRef }) => {
  const [verification, setVerification] = useState(false);
  const [totalReports, setTotalReports] = useState({});
  const [searchReports, setSearchReports] = useState({});
  const [modalVisibleReport, setModalVisibleReport] = useState(false);
  const [reportDataModal, setReportDataModal] = useState({});
  const [isSubscribed, setIsSubscribed] = useState(true);
  const [searchWord, setSearchWord] = useState("");
  const [dataAttendedBy, setDataAttendedBy] = useState({ data: false });

  //console.log("inicial dateREf: ", initialDateRef);
  //console.log("final dateREf: ", finalDateRef);
  useEffect(() => {
    if (isSubscribed) {
      const getData = async () => {
        const data = await db
          .collection("reports")
          .where("iesOccurred", "==", ies)
          .where("emitionDate", ">=", initialDateRef)
          .where("emitionDate", "<=", finalDateRef)
          .get();
        const planArray = [];
        data.docs.forEach((item) => {
          planArray.push({ ...item.data() });
        });
        setTotalReports(planArray);
        setSearchReports(planArray);
        setVerification(true);
      };
      getData();
    }
    return () => {
      setIsSubscribed(false);
    };
  }, []);

  useEffect(() => {
    if (searchWord.length > 2) {
      const NewReports = totalReports.filter((item) => {
        if (item.title.toLowerCase().includes(searchWord.toLowerCase())) {
          return item;
        }
      });
      setSearchReports(NewReports);
    }
  }, [searchWord]);

  const handleOpenModalReport = async (data) => {
    if (data.attendedBy !== undefined) {
      await db
        .collection("users")
        .doc(data.attendedBy)
        .get()
        .then((doc) => {
          if (doc.exists) {
            setDataAttendedBy({
              name: doc.data().firstname,
              lastname: doc.data().lastname,
              data: true,
            });
          } else {
            console.log("No such document!");
          }
        })
        .catch((error) => {
          console.log("Error getting document:", error);
        });
    } else {
      setDataAttendedBy({ data: false });
    }
    setModalVisibleReport(true);
    setReportDataModal(data);
  };

  const handleCloseModalReport = () => {
    setModalVisibleReport(false);
    setReportDataModal({});
  };

  return (
    <>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "position" : "height"}
      >
        <View style={{ height: "100%" }}>
          <LinearGradient
            colors={["#E1E1E1", "#D5D5D5", "#F4F1DE"]}
            style={styles.background2}
          />

          <View
            paddingL-10
            paddingT-15
            paddingB-9
            row
            spread
            style={{ backgroundColor: "#3D405B" }}
          >
            <TouchableOpacity onPress={onCancel}>
              <Ionicons name="arrow-back-outline" size={35} color="white" />
            </TouchableOpacity>
            <Text white center h2>
              Reportes por IES
            </Text>
            <Text />
          </View>
          <Text marginT-15 marginH-15 center h4 style={{ fontWeight: "bold" }}>
            {ies}
          </Text>
          <View marginH-15 style={{ marginBottom: -15, marginTop: -5 }}>
            <TextField
              search
              placeholder="Buscar reporte"
              autoCapitalize={"none"}
              autoCorrect={false}
              onChangeText={(value) => setSearchWord(value)}
              value={searchWord}
            />
          </View>

          <View style={{ marginBottom: 2, height: "78%" }}>
            <ScrollView showsVerticalScrollIndicator={false}>
              {verification ? (
                searchWord.length <= 2 ? (
                  totalReports.length !== 0 ? (
                    totalReports.map((item) => {
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
                                  Fecha del incidente:{" "}
                                </Text>
                                <Text white h7>
                                  {moment(item.incidentDate).format(
                                    "YYYY-MM-DD"
                                  )}
                                </Text>
                              </View>
                              <View marginB-10 row>
                                <Text white h6 style={{ fontWeight: "bold" }}>
                                  Tipo de acoso:{" "}
                                </Text>
                                <Text white h7>
                                  {item.type}
                                </Text>
                              </View>
                            </View>

                            <View spread row>
                              <Button
                                label="VER MÁS"
                                labelStyle={{
                                  fontSize: 14,
                                  fontWeight: "bold",
                                }}
                                enableShadow
                                onPress={() => handleOpenModalReport(item)}
                                style={
                                  item.veracity !== undefined
                                    ? {
                                        backgroundColor: "#3D405B",
                                        width: 107,
                                        height: 40,
                                        borderRadius: 15,
                                        marginLeft: 15,
                                        marginTop: 32,
                                      }
                                    : {
                                        backgroundColor: "#3D405B",
                                        width: 107,
                                        height: 40,
                                        borderRadius: 15,
                                        marginLeft: 15,
                                        marginTop: 15,
                                        marginBottom: 15,
                                      }
                                }
                              />
                              {item.veracity !== undefined ? (
                                item.veracity ? (
                                  <View
                                    marginB-10
                                    style={{
                                      right: 25,
                                    }}
                                  >
                                    <View margin-5>
                                      <Text
                                        center
                                        h7
                                        style={{ fontWeight: "bold" }}
                                      >
                                        Estado
                                      </Text>
                                    </View>
                                    <View
                                      style={{
                                        backgroundColor: "#42AE27",
                                        width: 100,
                                        height: 40,
                                        padding: 8,
                                        borderRadius: 8.5,
                                      }}
                                    >
                                      <Text
                                        h6
                                        white
                                        style={{ fontWeight: "bold" }}
                                      >
                                        Aceptado
                                      </Text>
                                    </View>
                                  </View>
                                ) : (
                                  <View
                                    marginB-10
                                    style={{
                                      right: 20,
                                    }}
                                  >
                                    <View margin-5>
                                      <Text
                                        center
                                        h7
                                        style={{ fontWeight: "bold" }}
                                      >
                                        Estado
                                      </Text>
                                    </View>
                                    <View
                                      style={{
                                        backgroundColor: "red",
                                        width: 115,
                                        height: 40,
                                        padding: 8,
                                        borderRadius: 8.5,
                                      }}
                                    >
                                      <Text
                                        h6
                                        white
                                        style={{ fontWeight: "bold" }}
                                      >
                                        Rechazado
                                      </Text>
                                    </View>
                                  </View>
                                )
                              ) : null}
                            </View>
                          </View>
                        </View>
                      );
                    })
                  ) : (
                    <View>
                      <Text marginT-30 center h2 style={{ fontWeight: "bold" }}>
                        Sin resultados
                      </Text>
                    </View>
                  )
                ) : searchReports.length !== 0 ? (
                  searchReports.map((item) => {
                    return (
                      <View key={item.id}>
                        <View
                          key={item.id}
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
                                Fecha del incidente:{" "}
                              </Text>
                              <Text white h7>
                                {moment(item.incidentDate).format("YYYY-MM-DD")}
                              </Text>
                            </View>
                            <View marginB-10 row>
                              <Text white h6 style={{ fontWeight: "bold" }}>
                                Tipo de acoso:{" "}
                              </Text>
                              <Text white h7>
                                {item.type}
                              </Text>
                            </View>
                          </View>

                          <View spread row>
                            <Button
                              label="VER MÁS"
                              labelStyle={{
                                fontSize: 14,
                                fontWeight: "bold",
                              }}
                              enableShadow
                              onPress={() => handleOpenModalReport(item)}
                              style={
                                item.veracity !== undefined
                                  ? {
                                      backgroundColor: "#3D405B",
                                      width: 107,
                                      height: 40,
                                      borderRadius: 15,
                                      marginLeft: 15,
                                      marginTop: 32,
                                    }
                                  : {
                                      backgroundColor: "#3D405B",
                                      width: 107,
                                      height: 40,
                                      borderRadius: 15,
                                      marginLeft: 15,
                                      marginTop: 15,
                                      marginBottom: 15,
                                    }
                              }
                            />
                            {item.veracity !== undefined ? (
                              item.veracity ? (
                                <View
                                  marginB-10
                                  style={{
                                    right: 25,
                                  }}
                                >
                                  <View margin-5>
                                    <Text
                                      center
                                      h7
                                      style={{ fontWeight: "bold" }}
                                    >
                                      Estado
                                    </Text>
                                  </View>
                                  <View
                                    style={{
                                      backgroundColor: "#42AE27",
                                      width: 100,
                                      height: 40,
                                      padding: 8,
                                      borderRadius: 8.5,
                                    }}
                                  >
                                    <Text
                                      h6
                                      white
                                      style={{ fontWeight: "bold" }}
                                    >
                                      Aceptado
                                    </Text>
                                  </View>
                                </View>
                              ) : (
                                <View
                                  marginB-10
                                  style={{
                                    right: 20,
                                  }}
                                >
                                  <View margin-5>
                                    <Text
                                      center
                                      h7
                                      style={{ fontWeight: "bold" }}
                                    >
                                      Estado
                                    </Text>
                                  </View>
                                  <View
                                    style={{
                                      backgroundColor: "red",
                                      width: 115,
                                      height: 40,
                                      padding: 8,
                                      borderRadius: 8.5,
                                    }}
                                  >
                                    <Text
                                      h6
                                      white
                                      style={{ fontWeight: "bold" }}
                                    >
                                      Rechazado
                                    </Text>
                                  </View>
                                </View>
                              )
                            ) : null}
                          </View>
                        </View>
                      </View>
                    );
                  })
                ) : (
                  <View>
                    <Text marginT-30 center h2 style={{ fontWeight: "bold" }}>
                      Sin resultados de búsqueda
                    </Text>
                  </View>
                )
              ) : (
                <View />
              )}
            </ScrollView>
          </View>

          <Modal
            animationType="slide"
            transparent={false}
            statusBarTranslucent={false}
            visible={modalVisibleReport}
            onRequestClose={() => {
              handleCloseModalReport();
            }}
          >
            <ReportInformation
              Report={reportDataModal}
              AttendedBy={dataAttendedBy}
              onCancel={handleCloseModalReport}
            />
          </Modal>
        </View>
      </KeyboardAvoidingView>
    </>
  );
};

ReportsByIES.propTypes = {
  Chef: PropTypes.any,
  onCancel: PropTypes.func,
  navigation: PropTypes.object,
};

export default ReportsByIES;
