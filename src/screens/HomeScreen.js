import React, { useEffect, useState } from "react";
import { ScrollView, Modal } from "react-native";
import { Button, Text, View, Card, Image } from "react-native-ui-lib";
import { useAuth } from "../utils/auth";
import PropTypes from "prop-types";
import { LinearGradient } from "expo-linear-gradient";
import styles from "../styles/styles";
//import { dataReports } from "../hooks/useReports";
import { dataTotalReports } from "../services/reports";
import { db } from "../utils/firebase";
import ReportInformation from "../components/ReportInformation";

const HomeScreen = ({ navigation }) => {
  const { user, logout } = useAuth();
  const [modalVisible, setModalVisible] = useState(false);
  const [verification, setVerification] = useState(false);
  const [totalReports, setTotalReports] = useState({});
  const [modalVisibleReport, setModalVisibleReport] = useState(false);
  const [reportDataModal, setReportDataModal] = useState({});

  //const [dataReportsRef] = dataReports();
  //console.log("Datos de los reportes: ", dataReportsRef);
  //console.log("comporbacion de s ay datos", dataReportsRef !== 0);

  useEffect(() => {
    if (user.role !== "ROLE_WHISTLEBLOWER") {
      handleOpenModal();
    } else {
      db.collection("reports")
        .where("whistleblower", "==", user.uid)
        .orderBy("emitionDate", "desc")
        .onSnapshot((querySnapshot) => {
          const planArray = [];
          querySnapshot.docs.forEach((item) => {
            planArray.push({ id: item.id, ...item.data() });
          });
          setTotalReports(planArray);
          setVerification(true);
        });
    }
  }, []);

  const handleOpenModalReport = (data) => {
    setModalVisibleReport(true);
    setReportDataModal(data);
  };

  const handleCloseModalReport = () => {
    setModalVisibleReport(false);
    setReportDataModal({});
  };

  const handleOpenModal = () => {
    setModalVisible(true);
  };

  const handleCloseModal = () => {
    setModalVisible(false);
    logout();
  };

  return (
    <>
      <LinearGradient
        // Background Linear Gradient
        colors={["#E1E1E1", "#D5D5D5", "#F4F1DE"]}
        style={styles.background2}
      />
      <ScrollView showsVerticalScrollIndicator={false}>
        <Button
          label="Generar un reporte "
          onPress={() => {
            navigation.navigate("Reportes");
          }}
        />

        <Button
          label="Ver estadísticas"
          onPress={() => {
            navigation.navigate("Estadísticas");
          }}
        />

        {verification ? (
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
        ) : (
          <View />
        )}
      </ScrollView>

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

      <Modal
        animationType="slide"
        statusBarTranslucent={true}
        visible={modalVisible}
        onRequestClose={handleCloseModal}
      >
        <View flex style={{ height: "100%", justifyContent: "space-around" }}>
          <LinearGradient
            // Background Linear Gradient
            colors={["#E1E1E1", "#D5D5D5", "#3D405B"]}
            style={styles.background2}
          />
          <Text marginT-100 h1 style={{ color: "#CC0000" }}>
            Aviso!!!
          </Text>
          <Text margin-30 h4 style={{ lineHeight: 30, textAlign: "justify" }}>
            Su cuenta esta registrada como un usuario Administrador, por esa
            razón no puede acceder a la aplicación móvil, porfavor acceder a la
            aplicación web para ejercer acciones de Administrador.
          </Text>
          <Text margin-30 h4>
            Gracias por su comprensión.
          </Text>
          <Button
            label="Aceptar"
            onPress={handleCloseModal}
            style={{
              backgroundColor: "#E07A5F",
              margin: 90,
            }}
          />
        </View>
      </Modal>
    </>
  );
};

export default HomeScreen;
