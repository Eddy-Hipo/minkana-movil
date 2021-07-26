import { useEffect, useState } from "react";
import { dataTotalReports } from "../services/reports";
import { useAuth } from "../utils/auth";

export const dataReports = () => {
  const [dataReports, setDataReports] = useState({});
  const { user } = useAuth();
  const [isSubscribed, setIsSubscribed] = useState(true);

  useEffect(() => {
    if (isSubscribed) {
      dataTotalReports(user.uid).onSnapshot((querySnapshot) => {
        const planArray = [];
        querySnapshot.docs.forEach((item) => {
          planArray.push({ id: item.id, ...item.data() });
        });
        setDataReports(planArray);
      });
    }
    return () => setIsSubscribed(false);
  }, []);

  return [dataReports];
};

export const numReport = () => {
  const { user } = useAuth();
  const [numTotal, setNumTotal] = useState(0);

  useEffect(() => {
    dataTotalReports(user.uid).onSnapshot((querySnapshot) => {
      let aux = 0;
      querySnapshot.docs.forEach((item) => {
        aux++;
      });
      setNumTotal(aux);
    });
  }, []);

  return [numTotal];
};
