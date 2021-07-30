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

const NotificationScreen = ({ navigation }) => {
  const { user } = useAuth();
  const [verification, setVerification] = useState(false);
  const [totalReports, setTotalReports] = useState({});
  const [searchReports, setSearchReports] = useState({});
  const [modalVisibleReport, setModalVisibleReport] = useState(false);
  const [reportDataModal, setReportDataModal] = useState({});
  const [isSubscribed, setIsSubscribed] = useState(true);
  const [statusReport, setStatusReport] = useState("Pendiente");
  const [searchWord, setSearchWord] = useState("");

  //const [dataReportsRef] = dataReports();
  //console.log("Datos de los reportes: ", dataReportsRef);
  //console.log("comporbacion de s ay datos", dataReportsRef !== 0);

  useEffect(() => {
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
    return () => setIsSubscribed(false);
  }, [statusReport]);

  useEffect(() => {
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

  const handleOpenModalReport = (data) => {
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
            <View marginR-15>
              <RadioButton value="Pendiente" label="Pendiente" />
            </View>
            <View marginR-15>
              <RadioButton value="Atendido" label="Atendido" />
            </View>
            <View marginR-15>
              <RadioButton value="Rechazado" label="Rechazado" />
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
          onCancel={handleCloseModalReport}
        />
      </Modal>
    </>
  );
};

export default NotificationScreen;
