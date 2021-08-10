import React, { useEffect, useState } from "react";
import { Text, View, DateTimePicker, Button } from "react-native-ui-lib";
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Modal,
} from "react-native";
import PropTypes from "prop-types";
import moment from "moment";
import { LinearGradient } from "expo-linear-gradient";
import styles from "../styles/styles";
import { BarChart } from "react-native-chart-kit";
import { db } from "../utils/firebase";
import Loading from "../components/Loading";
import ReportsByIES from "../components/ReportsByIES";

const StatisticsScreen = () => {
  const [modalVisibleReport, setModalVisibleReport] = useState(false);
  const [reportDataIesSearchModal, setReportDataIesSearchModal] = useState("");
  const [loading, setLoading] = useState(false);
  const [isSubscribed, setIsSubscribed] = useState(true);
  const [acceptDates, setAcceptDates] = useState(0);
  const [num1, setNum1] = useState(0);
  const [num2, setNum2] = useState(0);
  const [num3, setNum3] = useState(0);
  const [num4, setNum4] = useState(0);
  const [num5, setNum5] = useState(0);
  const [num6, setNum6] = useState(0);
  const [num7, setNum7] = useState(0);
  const [num8, setNum8] = useState(0);
  const [num9, setNum9] = useState(0);
  const [num10, setNum10] = useState(0);
  const [num11, setNum11] = useState(0);
  const [numOtros, setNumOtros] = useState(0);
  const [initialDate, setInitialDate] = useState(
    moment("2021-07-11").format("YYYY-MM-DD")
  );
  const [initialDate1, setInitialDate1] = useState(
    moment().subtract(1, "months").valueOf()
  );
  const [finalDate, setFinalDate] = useState(
    moment().add(1, "days").format("YYYY-MM-DD")
  );
  const [finalDate1, setFinalDate1] = useState(moment().valueOf());

  useEffect(() => {
    if (isSubscribed) {
      const getData = async () => {
        let d1 = 0;
        let d2 = 0;
        let d3 = 0;
        let d4 = 0;
        let d5 = 0;
        let d6 = 0;
        let d7 = 0;
        let d8 = 0;
        let d9 = 0;
        let d10 = 0;
        let d11 = 0;
        let dOtros = 0;

        setNum1(0);
        setNum2(0);
        setNum3(0);
        setNum4(0);
        setNum5(0);
        setNum6(0);
        setNum7(0);
        setNum8(0);
        setNum9(0);
        setNum10(0);
        setNum11(0);
        setNumOtros(0);
        await db
          .collection("reports")
          .where("emitionDate", ">=", initialDate1)
          .where("emitionDate", "<=", finalDate1)
          .get()
          .then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
              // doc.data() is never undefined for query doc snapshots
              switch (doc.data().iesOccurred) {
                case "Escuela Politécnica Nacional":
                  d1++;
                  setNum1(d1);
                  break;
                case "Universidad Central del Ecuador":
                  d2++;
                  setNum2(d2);
                  break;
                case "Pontificia Uni. Católica del Ecuador":
                  d3++;
                  setNum3(d3);
                  break;
                case "Escuela Politécnica del Ejército":
                  d4++;
                  setNum4(d4);
                  break;
                case "Universidad Politécnica Salesiana":
                  d5++;
                  setNum5(d5);
                  break;
                case "Universidad San Francisco de Quito":
                  d6++;
                  setNum6(d6);
                  break;
                case "Universidad de las Américas":
                  d7++;
                  setNum7(d7);
                  break;
                case "Universidad Andina Simón Bolívar":
                  d8++;
                  setNum8(d8);
                  break;
                case "Universidad Tecnológica Equinoccial":
                  d9++;
                  setNum9(d9);
                  break;
                case "Escuela Sup. Politécnica del Litoral":
                  d10++;
                  setNum10(d10);
                  break;
                case "Universidad Internacional del Ecuador":
                  d11++;
                  setNum11(d11);
                  break;
                default:
                  dOtros++;
                  setNumOtros(dOtros);
                  break;
              }
            });
          })
          .catch((error) => {
            console.log("Error getting documents: ", error);
          });
      };
      getData();
    }
    return () => {
      setIsSubscribed(false);
      setLoading(false);
    };
  }, [acceptDates]);

  const handleAcceptDates = () => {
    if (moment(finalDate1).isAfter(moment(initialDate1))) {
      setAcceptDates(acceptDates + 1);
      setLoading(true);
      setIsSubscribed(true);
    }
  };

  const handleOpenModalReport = () => {
    setModalVisibleReport(true);
  };

  const handleCloseModalReport = () => {
    setModalVisibleReport(false);
    setReportDataIesSearchModal("");
  };

  return (
    <>
      <LinearGradient
        colors={["#E1E1E1", "#D5D5D5", "#F4F1DE"]}
        style={styles.background2}
      />
      {loading && <Loading />}
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "position" : "height"}
      >
        <View style={{ height: "99%", marginBottom: 5, marginTop: 2 }}>
          <ScrollView showsVerticalScrollIndicator={false}>
            <View marginH-7>
              <View
                marginT-5
                marginH-10
                style={{ flex: 1, marginBottom: -10 }}
                row
              >
                <Text style={{ flex: 0.55, fontWeight: "bold" }}>Inicio</Text>
                <Text style={{ flex: 0.45, fontWeight: "bold" }}>Fin</Text>
              </View>
              <View spread row>
                <DateTimePicker
                  value={new Date(moment(initialDate).format("YYYY-MM-DD"))}
                  style={styles.textFileRegister}
                  minimumDate={
                    new Date(moment("2021-07-11").format("YYYY-MM-DD"))
                  }
                  maximumDate={
                    new Date(
                      moment(finalDate).subtract(7, "days").format("YYYY-MM-DD")
                    )
                  }
                  dateFormat={"YYYY-MM-DD"}
                  onChange={(value) => {
                    setInitialDate(
                      moment(value).add(1, "days").format("YYYY-MM-DD")
                    );
                    setInitialDate1(moment(value).valueOf());
                  }}
                />
                <DateTimePicker
                  value={new Date(finalDate)}
                  style={styles.textFileRegister}
                  minimumDate={
                    new Date(
                      moment(initialDate).add(7, "days").format("YYYY-MM-DD")
                    )
                  }
                  maximumDate={
                    new Date(moment().add(1, "days").format("YYYY-MM-DD"))
                  }
                  dateFormat={"YYYY-MM-DD"}
                  onChange={(value) => {
                    setFinalDate(
                      moment(value).add(1, "days").format("YYYY-MM-DD")
                    );
                    setFinalDate1(moment(value).valueOf());
                  }}
                />
              </View>
              <Button
                label="Aceptar"
                labelStyle={{ fontSize: 15, padding: 3 }}
                enableShadow
                onPress={handleAcceptDates}
                style={{
                  backgroundColor: "#3D405B",
                  marginLeft: 70,
                  marginRight: 70,
                  marginTop: -10,
                  marginBottom: 20,
                }}
              />
              <Text h1 style={{ marginBottom: 8 }}>
                Gráfica
              </Text>
              <Text
                h6
                style={{
                  fontWeight: "700",
                  textAlign: "center",
                  marginBottom: 5,
                }}
              >
                Cantidad de Reportes por Universidad
              </Text>
              <ScrollView horizontal={true}>
                <BarChart
                  data={{
                    labels: [
                      "EPN",
                      "UCE",
                      "PUCE",
                      "ESPE",
                      "UPS",
                      "USFQ",
                      "UDLA",
                      "UASB",
                      "UTE",
                      "ESPOL",
                      "UIDE",
                    ],
                    datasets: [
                      {
                        data: [
                          num1,
                          num2,
                          num3,
                          num4,
                          num5,
                          num6,
                          num7,
                          num8,
                          num9,
                          num10,
                          num11,
                        ],
                      },
                    ],
                  }}
                  width={600}
                  height={300}
                  chartConfig={{
                    backgroundGradientFrom: "#3D405B",
                    backgroundGradientTo: "#394291",
                    decimalPlaces: 0,
                    strokeWidth: 1,
                    color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                    style: {
                      borderRadius: 8,
                    },
                  }}
                  fromZero={true}
                  style={{
                    marginVertical: 8,
                    borderRadius: 5,
                    marginLeft: -15,
                  }}
                />
              </ScrollView>
            </View>

            <View marginT-20 marginH-10>
              <Text h1>Resumen</Text>
              <View spread style={styles.ViewBorder} row>
                <Text h5 style={{ flex: 0.65, fontWeight: "bold" }}>
                  Universidad
                </Text>
                <Text h5 style={{ flex: 0.35, fontWeight: "bold" }}>
                  # Reportes
                </Text>
              </View>

              <View style={styles.ViewBorder} marginT-15 row>
                <Text style={{ flex: 0.68 }}>
                  Escuela Politécnica Nacional (EPN)
                </Text>
                <Text style={{ flex: 0.02 }} />
                <View style={{ flex: 0.3 }} marginR-10 row>
                  <Text marginT-8>{num1}</Text>
                  <Button
                    label="Ver Más"
                    labelStyle={{ fontSize: 14 }}
                    enableShadow
                    onPress={() => {
                      setReportDataIesSearchModal(
                        "Escuela Politécnica Nacional"
                      );
                      handleOpenModalReport();
                    }}
                    style={{
                      backgroundColor: "#3D405B",
                      width: 97,
                      height: 45,
                      borderRadius: 20,
                      marginLeft: 15,
                      marginRight: 35,
                      padding: 0,
                    }}
                  />
                </View>
              </View>

              <View style={styles.ViewBorder} marginT-15 row>
                <Text style={{ flex: 0.68 }}>
                  Universidad Central del Ecuador (UCE)
                </Text>
                <Text style={{ flex: 0.02 }} />
                <View style={{ flex: 0.3 }} marginR-10 row>
                  <Text marginT-8>{num2}</Text>
                  <Button
                    label="Ver Más"
                    labelStyle={{ fontSize: 14 }}
                    enableShadow
                    onPress={() => {
                      setReportDataIesSearchModal(
                        "Universidad Central del Ecuador"
                      );
                      handleOpenModalReport();
                    }}
                    style={{
                      backgroundColor: "#3D405B",
                      width: 97,
                      height: 45,
                      borderRadius: 20,
                      marginLeft: 15,
                      marginRight: 35,
                      padding: 0,
                    }}
                  />
                </View>
              </View>

              <View style={styles.ViewBorder} marginT-15 row>
                <Text style={{ flex: 0.68 }}>
                  Pontificia Universidad Católica del Ecuador (PUCE)
                </Text>
                <Text style={{ flex: 0.02 }} />
                <View style={{ flex: 0.3 }} marginR-10 row>
                  <Text marginT-8>{num3}</Text>
                  <Button
                    label="Ver Más"
                    labelStyle={{ fontSize: 14 }}
                    enableShadow
                    onPress={() => {
                      setReportDataIesSearchModal(
                        "Pontificia Uni. Católica del Ecuador"
                      );
                      handleOpenModalReport();
                    }}
                    style={{
                      backgroundColor: "#3D405B",
                      width: 97,
                      height: 45,
                      borderRadius: 20,
                      marginLeft: 15,
                      marginRight: 35,
                      padding: 0,
                    }}
                  />
                </View>
              </View>

              <View style={styles.ViewBorder} marginT-15 row>
                <Text style={{ flex: 0.68 }}>
                  Escuela Politécnica del Ejército (ESPE)
                </Text>
                <Text style={{ flex: 0.02 }} />
                <View style={{ flex: 0.3 }} marginR-10 row>
                  <Text marginT-8>{num4}</Text>
                  <Button
                    label="Ver Más"
                    labelStyle={{ fontSize: 14 }}
                    enableShadow
                    onPress={() => {
                      setReportDataIesSearchModal(
                        "Escuela Politécnica del Ejército"
                      );
                      handleOpenModalReport();
                    }}
                    style={{
                      backgroundColor: "#3D405B",
                      width: 97,
                      height: 45,
                      borderRadius: 20,
                      marginLeft: 15,
                      marginRight: 35,
                      padding: 0,
                    }}
                  />
                </View>
              </View>

              <View style={styles.ViewBorder} marginT-15 row>
                <Text style={{ flex: 0.68 }}>
                  Universidad Politécnica Salesiana (UPS)
                </Text>
                <Text style={{ flex: 0.02 }} />
                <View style={{ flex: 0.3 }} marginR-10 row>
                  <Text marginT-8>{num5}</Text>
                  <Button
                    label="Ver Más"
                    labelStyle={{ fontSize: 14 }}
                    enableShadow
                    onPress={() => {
                      setReportDataIesSearchModal(
                        "Universidad Politécnica Salesiana"
                      );
                      handleOpenModalReport();
                    }}
                    style={{
                      backgroundColor: "#3D405B",
                      width: 97,
                      height: 45,
                      borderRadius: 20,
                      marginLeft: 15,
                      marginRight: 35,
                      padding: 0,
                    }}
                  />
                </View>
              </View>

              <View style={styles.ViewBorder} marginT-15 row>
                <Text style={{ flex: 0.68 }}>
                  Universidad Internacional del Ecuador (UIDE)
                </Text>
                <Text style={{ flex: 0.02 }} />
                <View style={{ flex: 0.3 }} marginR-10 row>
                  <Text marginT-8>{num11}</Text>
                  <Button
                    label="Ver Más"
                    labelStyle={{ fontSize: 14 }}
                    enableShadow
                    onPress={() => {
                      setReportDataIesSearchModal(
                        "Universidad Internacional del Ecuador"
                      );
                      handleOpenModalReport();
                    }}
                    style={{
                      backgroundColor: "#3D405B",
                      width: 97,
                      height: 45,
                      borderRadius: 20,
                      marginLeft: 15,
                      marginRight: 35,
                      padding: 0,
                    }}
                  />
                </View>
              </View>

              <View style={styles.ViewBorder} marginT-15 row>
                <Text style={{ flex: 0.68 }}>
                  Universidad San Francisco de Quito (USFQ)
                </Text>
                <Text style={{ flex: 0.02 }} />
                <View style={{ flex: 0.3 }} marginR-10 row>
                  <Text marginT-8>{num6}</Text>
                  <Button
                    label="Ver Más"
                    labelStyle={{ fontSize: 14 }}
                    enableShadow
                    onPress={() => {
                      setReportDataIesSearchModal(
                        "Universidad San Francisco de Quito"
                      );
                      handleOpenModalReport();
                    }}
                    style={{
                      backgroundColor: "#3D405B",
                      width: 97,
                      height: 45,
                      borderRadius: 20,
                      marginLeft: 15,
                      marginRight: 35,
                      padding: 0,
                    }}
                  />
                </View>
              </View>

              <View style={styles.ViewBorder} marginT-15 row>
                <Text style={{ flex: 0.68 }}>
                  Universidad de las Américas (UDLA)
                </Text>
                <Text style={{ flex: 0.02 }} />
                <View style={{ flex: 0.3 }} marginR-10 row>
                  <Text marginT-8>{num7}</Text>
                  <Button
                    label="Ver Más"
                    labelStyle={{ fontSize: 14 }}
                    enableShadow
                    onPress={() => {
                      setReportDataIesSearchModal(
                        "Universidad de las Américas"
                      );
                      handleOpenModalReport();
                    }}
                    style={{
                      backgroundColor: "#3D405B",
                      width: 97,
                      height: 45,
                      borderRadius: 20,
                      marginLeft: 15,
                      marginRight: 35,
                      padding: 0,
                    }}
                  />
                </View>
              </View>

              <View style={styles.ViewBorder} marginT-15 row>
                <Text style={{ flex: 0.68 }}>
                  Universidad Andina Simón Bolívar (UASB)
                </Text>
                <Text style={{ flex: 0.02 }} />
                <View style={{ flex: 0.3 }} marginR-10 row>
                  <Text marginT-8>{num8}</Text>
                  <Button
                    label="Ver Más"
                    labelStyle={{ fontSize: 14 }}
                    enableShadow
                    onPress={() => {
                      setReportDataIesSearchModal(
                        "Universidad Andina Simón Bolívar"
                      );
                      handleOpenModalReport();
                    }}
                    style={{
                      backgroundColor: "#3D405B",
                      width: 97,
                      height: 45,
                      borderRadius: 20,
                      marginLeft: 15,
                      marginRight: 35,
                      padding: 0,
                    }}
                  />
                </View>
              </View>

              <View style={styles.ViewBorder} marginT-15 row>
                <Text style={{ flex: 0.68 }}>
                  Universidad Tecnológica Equinoccial (UTE)
                </Text>
                <Text style={{ flex: 0.02 }} />
                <View style={{ flex: 0.3 }} marginR-10 row>
                  <Text marginT-8>{num9}</Text>
                  <Button
                    label="Ver Más"
                    labelStyle={{ fontSize: 14 }}
                    enableShadow
                    onPress={() => {
                      setReportDataIesSearchModal(
                        "Universidad Tecnológica Equinoccial"
                      );
                      handleOpenModalReport();
                    }}
                    style={{
                      backgroundColor: "#3D405B",
                      width: 97,
                      height: 45,
                      borderRadius: 20,
                      marginLeft: 15,
                      marginRight: 35,
                      padding: 0,
                    }}
                  />
                </View>
              </View>

              <View style={styles.ViewBorder} marginT-15 row>
                <Text style={{ flex: 0.68 }}>
                  Escuela Superior Politécnica del Litoral (ESPOL)
                </Text>
                <Text style={{ flex: 0.02 }} />
                <View style={{ flex: 0.3 }} marginR-10 row>
                  <Text marginT-8>{num10}</Text>
                  <Button
                    label="Ver Más"
                    labelStyle={{ fontSize: 14 }}
                    enableShadow
                    onPress={() => {
                      setReportDataIesSearchModal(
                        "Escuela Sup. Politécnica del Litoral"
                      );
                      handleOpenModalReport();
                    }}
                    style={{
                      backgroundColor: "#3D405B",
                      width: 97,
                      height: 45,
                      borderRadius: 20,
                      marginLeft: 15,
                      marginRight: 35,
                      padding: 0,
                    }}
                  />
                </View>
              </View>
            </View>
          </ScrollView>
        </View>
      </KeyboardAvoidingView>
      <Modal
        animationType="slide"
        transparent={false}
        statusBarTranslucent={false}
        visible={modalVisibleReport}
        onRequestClose={() => {
          handleCloseModalReport();
        }}
      >
        <ReportsByIES
          ies={reportDataIesSearchModal}
          onCancel={handleCloseModalReport}
        />
      </Modal>
    </>
  );
};

StatisticsScreen.propTypes = {
  navigation: PropTypes.object,
};

export default StatisticsScreen;
