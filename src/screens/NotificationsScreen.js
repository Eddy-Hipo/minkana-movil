import React, { useEffect, useState } from "react";
import { ScrollView, Modal } from "react-native";
import {
  Text,
  View,
  Card,
  Image,
  RadioButton,
  RadioGroup,
  TextField,
} from "react-native-ui-lib";
import { useAuth } from "../utils/auth";
import PropTypes from "prop-types";
import { LinearGradient } from "expo-linear-gradient";
import styles from "../styles/styles";
import { db } from "../utils/firebase";
import ReportInformation from "../components/ReportInformation";
import { SafeAreaView } from "react-native-safe-area-context";
import Loading from "../components/Loading";

const NotificationScreen = ({ navigation }) => {
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [verification, setVerification] = useState(false);
  const [totalReports, setTotalReports] = useState({});
  const [searchReports, setSearchReports] = useState({});
  const [modalVisibleReport, setModalVisibleReport] = useState(false);
  const [reportDataModal, setReportDataModal] = useState({});
  const [isSubscribed, setIsSubscribed] = useState(true);
  const [statusReport, setStatusReport] = useState("Pendiente");
  const [searchWord, setSearchWord] = useState("");
  const [dataAttendedBy, setDataAttendedBy] = useState({ data: false });

  //const [dataReportsRef] = dataReports();
  //console.log("Datos de los reportes: ", dataReportsRef);
  //console.log("comporbacion de s ay datos", dataReportsRef !== 0);

  useEffect(() => {
    setLoading(true);
    setIsSubscribed(true);
    if (isSubscribed) {
      db.collection("reports")
        .where("whistleblower", "==", user.uid)
        .where("status", "==", "Pendiente")
        .orderBy("emitionDate", "desc")
        .onSnapshot((querySnapshot) => {
          const planArray = [];
          querySnapshot.docs.forEach((item) => {
            planArray.push({ id: item.id, ...item.data() });
          });
          setTotalReports(planArray);
          setSearchReports(planArray);
          setVerification(true);
        });
    }
    setLoading(false);
    return () => setIsSubscribed(false);
  }, [statusReport]);

  useEffect(() => {
    setLoading(true);
    setIsSubscribed(true);
    if (isSubscribed) {
      //console.log("valor de radioButton", statusReport);
      db.collection("reports")
        .where("whistleblower", "==", user.uid)
        .where("status", "==", statusReport)
        .orderBy("emitionDate", "desc")
        .onSnapshot((querySnapshot) => {
          const planArray = [];
          querySnapshot.docs.forEach((item) => {
            planArray.push({ id: item.id, ...item.data() });
          });
          setTotalReports(planArray);
          setSearchReports(planArray);
          setVerification(true);
        });
    }
    setLoading(false);
    return () => setIsSubscribed(false);
  }, [statusReport]);

  useEffect(() => {
    if (searchWord.length > 2) {
      //console.log("Valor de busqueda: ", searchWord);
      const NewReports = totalReports.filter((item) => {
        if (item.title.toLowerCase().includes(searchWord.toLowerCase())) {
          return item;
        }
      });
      setSearchReports(NewReports);
      //console.log("datos de busqeuda reportes3", searchReports.length === 0);
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
    //console.log("datos de admin: ", dataAttendedBy);
    setModalVisibleReport(true);
    setReportDataModal(data);
  };

  const handleCloseModalReport = () => {
    setModalVisibleReport(false);
    setReportDataModal({});
  };

  return (
    <>
      <LinearGradient
        // Background Linear Gradient
        colors={["#E1E1E1", "#D5D5D5", "#F4F1DE"]}
        style={styles.background2}
      />
      {loading && <Loading />}
      <View marginH-15 marginB-10>
        <TextField
          search
          placeholder="Buscar reporte"
          autoCapitalize={"none"}
          autoCorrect={false}
          onChangeText={(value) => setSearchWord(value)}
          value={searchWord}
        />

        <RadioGroup
          initialValue={statusReport}
          onValueChange={(value) => setStatusReport(value)}
        >
          <View>
            <Text h4 marginB-10>
              Estados
            </Text>
          </View>
          <View row>
            <View marginR-14>
              <RadioButton value="Pendiente" label="Pendientes" />
            </View>
            <View marginR-14>
              <RadioButton value="En proceso" label="En Proceso" />
            </View>
            <View marginR-14>
              <RadioButton value="Atendido" label="Atendidos" />
            </View>
          </View>
        </RadioGroup>
      </View>
      <View style={{ marginBottom: 2, height: "78%" }}>
        <ScrollView showsVerticalScrollIndicator={false}>
          {verification ? (
            searchWord.length <= 2 ? (
              totalReports.map((item) => {
                return (
                  <Card
                    key={item.id}
                    height={290}
                    borderRadius={25}
                    margin-15
                    style={{ backgroundColor: "#E07A5F" }}
                    onPress={() => handleOpenModalReport(item)}
                  >
                    <Image
                      borderRadius={25}
                      source={{ uri: item.photoURL }}
                      style={{
                        height: 190,
                        width: "100%",
                      }}
                      cover={false}
                    />
                    <Card.Section
                      padding-10
                      flex
                      content={[
                        {
                          text: `${item.title}  \n ${item.incidentDate}`,
                          text70: true,
                          grey10: true,
                        },
                      ]}
                      contentStyle={{
                        alignText: "center",
                        alignItems: "center",
                        margin: 0,
                        padding: 0,
                      }}
                    />
                  </Card>
                );
              })
            ) : searchReports.length !== 0 ? (
              searchReports.map((item) => {
                return (
                  <Card
                    key={item.id}
                    height={280}
                    borderRadius={25}
                    margin-15
                    style={{ backgroundColor: "#E07A5F" }}
                    onPress={() => handleOpenModalReport(item)}
                  >
                    <Image
                      borderRadius={25}
                      source={{ uri: item.photoURL }}
                      style={{
                        height: 200,
                        width: "100%",
                      }}
                      cover={false}
                    />
                    <Card.Section
                      padding-10
                      flex
                      content={[
                        {
                          text: `${item.title}  \n ${item.incidentDate}`,
                          text70: true,
                          grey10: true,
                        },
                      ]}
                      contentStyle={{
                        alignItems: "center",
                        margin: 0,
                        padding: 0,
                      }}
                    />
                  </Card>
                );
              })
            ) : (
              <View>
                <Text marginT-30 center h2>
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
        //fullScreen
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
    </>
  );
};

export default NotificationScreen;
