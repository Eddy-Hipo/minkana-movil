import React, { useEffect, useState } from "react";
import { Text, View, DateTimePicker, Button } from "react-native-ui-lib";
import { KeyboardAvoidingView, Platform, ScrollView } from "react-native";
import PropTypes from "prop-types";
import moment from "moment";
import { LinearGradient } from "expo-linear-gradient";
import styles from "../styles/styles";
import { BarChart } from "react-native-chart-kit";
import { db } from "../utils/firebase";

const StatisticsScreen = ({ navigation }) => {
  const [isSubscribed, setIsSubscribed] = useState(true);
  const [disableButton, setDisableButton] = useState(true);
  const [disablePicker, setDisablePicker] = useState(false);
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
  const [numOtros, setNumOtros] = useState(0);
  const [initialDate, setInitialDate] = useState(
    moment("2021-07-11").format("YYYY-MM-DD")
  );
  const [initialDate1, setInitialDate1] = useState(
    moment("2021-07-11 12:48:35").format("YYYY-MM-DD kk:mm:ss")
  );
  const [finalDate, setFinalDate] = useState(
    moment().add(1, "days").format("YYYY-MM-DD")
  );
  const [finalDate1, setFinalDate1] = useState(
    moment().add(1, "days").format("YYYY-MM-DD kk:mm:ss")
  );

  useEffect(() => {
    setDisableButton(true);
    setDisablePicker(false);
    setIsSubscribed(true);
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
        let dOtros = 0;

        const data = await db
          .collection("reports")
          .where("emitionDate", ">=", initialDate1)
          .where("emitionDate", "<=", finalDate1)
          .get();
        data.docs.forEach((item) => {
          const idWhistleblower = item.data().whistleblower;
          const getIES = async () => {
            await db
              .collection("users")
              .doc(idWhistleblower)
              .get()
              .then((doc) => {
                //console.log("Document data1:", doc);
                if (doc.exists) {
                  switch (doc.data().ies) {
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
                    case "Universidad Internacional del Ecuador":
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
                      dOtros++;
                      setNumOtros(dOtros);
                      setNum8(d8);
                      break;
                    case "Universidad Tecnológica Equinoccial":
                      d9++;
                      dOtros++;
                      setNumOtros(dOtros);
                      setNum9(d9);
                      break;
                    case "Escuela Sup. Politécnica del Litoral":
                      d10++;
                      dOtros++;
                      setNum10(d10);
                      break;
                    default:
                      dOtros++;
                      setNumOtros(dOtros);
                      break;
                  }
                } else {
                  console.log("No such document!");
                }
              })
              .catch((error) => {
                console.log("Error getting document:", error);
              });
          };
          getIES();
        });
        setDisableButton(false);
        setDisablePicker(true);
      };
      getData();
    }

    return () => setIsSubscribed(false);
  }, []);

  useEffect(() => {
    setDisablePicker(false);
    setDisableButton(true);
    setIsSubscribed(true);
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
        let dOtros = 0;

        const data = await db
          .collection("reports")
          .where("emitionDate", ">=", initialDate1)
          .where("emitionDate", "<=", finalDate1)
          .get();
        data.docs.forEach((item) => {
          const idWhistleblower = item.data().whistleblower;
          const getIES = async () => {
            await db
              .collection("users")
              .doc(idWhistleblower)
              .get()
              .then((doc) => {
                //console.log("Document data1:", doc);
                if (doc.exists) {
                  switch (doc.data().ies) {
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
                    case "Universidad Internacional del Ecuador":
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
                      dOtros++;
                      setNumOtros(dOtros);
                      setNum8(d8);
                      break;
                    case "Universidad Tecnológica Equinoccial":
                      d9++;
                      dOtros++;
                      setNumOtros(dOtros);
                      setNum9(d9);
                      break;
                    case "Escuela Sup. Politécnica del Litoral":
                      d10++;
                      dOtros++;
                      setNum10(d10);
                      break;
                    default:
                      dOtros++;
                      setNumOtros(dOtros);
                      break;
                  }
                } else {
                  console.log("No such document!");
                }
              })
              .catch((error) => {
                console.log("Error getting document:", error);
              });
          };
          getIES();
        });
        setDisablePicker(true);
        setDisableButton(false);
      };
      getData();
    }
    setDisableButton(false);
    return () => setIsSubscribed(false);
  }, [acceptDates]);

  const handleAcceptDates = () => {
    if (moment(finalDate1).isAfter(moment(initialDate1))) {
      setAcceptDates(acceptDates + 1);
    }
  };

  return (
    <>
      <LinearGradient
        // Background Linear Gradient
        colors={["#E1E1E1", "#D5D5D5", "#F4F1DE"]}
        style={styles.background2}
      />

      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "position" : "height"}
      >
        <View style={{ height: "99%", marginBottom: 5, marginTop: 2 }}>
          <ScrollView showsVerticalScrollIndicator={false}>
            <View marginH-4>
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
                  editable={disablePicker}
                  placeholder={"Fecha Inicio"}
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
                    console.log(
                      "valor fecha: ",
                      moment(value).add(1, "days").format("YYYY-MM-DD")
                    );
                    setInitialDate(
                      moment(value).add(1, "days").format("YYYY-MM-DD")
                    );
                    setInitialDate1(
                      moment(value).format("YYYY-MM-DD kk:mm:ss")
                    );
                  }}
                />
                <DateTimePicker
                  value={new Date(finalDate)}
                  editable={disablePicker}
                  style={styles.textFileRegister}
                  placeholder={"Fecha Fin"}
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
                    setFinalDate1(moment(value).format("YYYY-MM-DD kk:mm:ss"));
                  }}
                />
              </View>
              <Button
                label="Aceptar"
                labelStyle={{ fontSize: 15, padding: 3 }}
                enableShadow
                disabled={disableButton}
                onPress={handleAcceptDates}
                style={{
                  backgroundColor: "#3D405B",
                  marginLeft: 70,
                  marginRight: 70,
                  marginTop: -10,
                  marginBottom: 20,
                }}
              />
              <Text h1 style={{ marginBottom: -5 }}>
                Gráfica
              </Text>
              <BarChart
                data={{
                  labels: [
                    "EPN",
                    "UCE",
                    "PUCE",
                    "ESPE",
                    "UIDE",
                    "USFQ",
                    "UDLA",
                    "Otros",
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
                        numOtros,
                      ],
                    },
                  ],
                }}
                width={405} // from react-native
                height={300}
                chartConfig={{
                  backgroundGradientFrom: "#3D405B",
                  backgroundGradientTo: "#394291",
                  decimalPlaces: 0,
                  strokeWidth: 1,
                  color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                  style: {
                    borderRadius: 16,
                  },
                }}
                fromZero={true}
                style={{
                  marginVertical: 8,
                  borderRadius: 5,
                }}
              />
            </View>

            <View marginT-20 marginH-10>
              <Text h1>Resumen</Text>
              <View style={{ flex: 1 }} row>
                <Text h5 style={{ flex: 0.65, fontWeight: "bold" }}>
                  Universidad
                </Text>
                <Text h5 style={{ flex: 0.35, fontWeight: "bold" }}>
                  # Reportes
                </Text>
              </View>
              <Text style={{ fontWeight: "bold" }} marginB-10>
                ________________________________________________
              </Text>
              <View style={{ flex: 1 }} row>
                <Text style={{ flex: 0.7 }}>
                  Escuela Politécnica Nacional (EPN)
                </Text>
                <Text style={{ flex: 0.13 }} />
                <Text style={{ flex: 0.17 }}>{num1}</Text>
              </View>
              <Text style={{ fontWeight: "bold" }} marginB-10>
                ________________________________________________
              </Text>
              <View style={{ flex: 1 }} row>
                <Text style={{ flex: 0.7 }}>
                  Universidad Central del Ecuador (UCE)
                </Text>
                <Text style={{ flex: 0.13 }} />
                <Text style={{ flex: 0.17 }}>{num2}</Text>
              </View>
              <Text style={{ fontWeight: "bold" }} marginB-10>
                ________________________________________________
              </Text>
              <View style={{ flex: 1 }} row>
                <Text style={{ flex: 0.7 }}>
                  Pontificia Universidad Católica del Ecuador (PUCE)
                </Text>
                <Text style={{ flex: 0.13 }} />
                <Text style={{ flex: 0.17 }}>{num3}</Text>
              </View>
              <Text style={{ fontWeight: "bold" }} marginB-10>
                ________________________________________________
              </Text>
              <View style={{ flex: 1 }} row>
                <Text style={{ flex: 0.7 }}>
                  Escuela Politécnica del Ejército (ESPE)
                </Text>
                <Text style={{ flex: 0.13 }} />
                <Text style={{ flex: 0.17 }}>{num4}</Text>
              </View>
              <Text style={{ fontWeight: "bold" }} marginB-10>
                ________________________________________________
              </Text>
              <View style={{ flex: 1 }} row>
                <Text style={{ flex: 0.7 }}>
                  Universidad Internacional del Ecuador (UIDE)
                </Text>
                <Text style={{ flex: 0.13 }} />
                <Text style={{ flex: 0.17 }}>{num5}</Text>
              </View>
              <Text style={{ fontWeight: "bold" }} marginB-10>
                ________________________________________________
              </Text>
              <View style={{ flex: 1 }} row>
                <Text style={{ flex: 0.7 }}>
                  Universidad San Francisco de Quito (USFQ)
                </Text>
                <Text style={{ flex: 0.13 }} />
                <Text style={{ flex: 0.17 }}>{num6}</Text>
              </View>
              <Text style={{ fontWeight: "bold" }} marginB-10>
                ________________________________________________
              </Text>
              <View style={{ flex: 1 }} row>
                <Text style={{ flex: 0.7 }}>
                  Universidad de las Américas (UDLA)
                </Text>
                <Text style={{ flex: 0.13 }} />
                <Text style={{ flex: 0.17 }}>{num7}</Text>
              </View>
              <Text style={{ fontWeight: "bold" }} marginB-10>
                ________________________________________________
              </Text>
              <View style={{ flex: 1 }} row>
                <Text style={{ flex: 0.7 }}>
                  Universidad Andina Simón Bolívar (UASB)
                </Text>
                <Text style={{ flex: 0.13 }} />
                <Text style={{ flex: 0.17 }}>{num8}</Text>
              </View>
              <Text style={{ fontWeight: "bold" }} marginB-10>
                ________________________________________________
              </Text>
              <View style={{ flex: 1 }} row>
                <Text style={{ flex: 0.7 }}>
                  Universidad Tecnológica Equinoccial (UTE)
                </Text>
                <Text style={{ flex: 0.13 }} />
                <Text style={{ flex: 0.17 }}>{num9}</Text>
              </View>
              <Text style={{ fontWeight: "bold" }} marginB-10>
                ________________________________________________
              </Text>
              <View marginB-20 style={{ flex: 1 }} row>
                <Text style={{ flex: 0.7 }}>
                  Escuela Superior Politécnica del Litoral (ESPOL)
                </Text>
                <Text style={{ flex: 0.13 }} />
                <Text style={{ flex: 0.17 }}>{num10}</Text>
              </View>
            </View>
          </ScrollView>
        </View>
      </KeyboardAvoidingView>
    </>
  );
};

StatisticsScreen.propTypes = {
  navigation: PropTypes.object,
};

export default StatisticsScreen;
