import React, { useEffect, useState } from "react";
import useFetch from "../hooks/useFetch";
import Appointments from "./Appointments";

const Display = () => {
  const [appointments, setAppointments] = useState([]);
  const [isError, setIsError] = useState(false);
  const [error, setError] = useState(null);
  const fetchData = useFetch();

  const getAppointments = async () => {
    setIsError(false);
    setError(null);

    const res = await fetchData("/lab/appointments", undefined, undefined);

    if (res.ok) {
      setAppointments(res.data);
    } else {
      console.error(res.msg);
      setError(res.msg);
      setIsError(true);
    }
  };

  // addAppointment

  const deleteAppointment = async (id) => {
    setIsError(false);
    setError(null);

    const res = await fetchData("/lab/appointments/", "DELETE", {
      id: id,
    });

    if (res.ok) {
      getAppointments();
    } else {
      console.error(res.msg);
      setError(res.msg);
      setIsError(true);
    }
  };

  useEffect(() => {
    getAppointments();
  }, []);

  return (
    <div className="container">
      {isError && error}
      <div className="row">
        <h1 className="col-md">Appointment List</h1>
      </div>

      <div className="row">
        <div className="col-md"></div>
      </div>
      {appointments.map((item) => {
        return (
          <Appointments
            key={item._id}
            id={item._id}
            title={item.title}
            type={item.type}
            purpose={item.purpose}
            company={item.company}
            address={item.address}
            personnel={item.personnel}
            date={item.date}
            time={item.time}
            comments={item.comments}
            getAppointments={getAppointments}
            deleteAppointment={deleteAppointment}
          />
        );
      })}
    </div>
  );
};

export default Display;

/*

return (
    <div className="container">
      {isError && error}
      <div className="row">
        <h1 className="col-md-6">Appointment List</h1>
        {console.log(JSON.stringify(appointments))}
      </div>
      <div className="row">
        <div className="col-md"></div>
      </div>
      {appointments.map((item) => {
        return (
          <Appointments
            key={item._id}
            id={item._id}
            title={item.title}
            type={item.type}
            purpose={item.purpose}
            company={item.company}
            address={item.address}
            personnel={item.personnel}
            date={item.date}
            time={item.time}
            comments={item.comments}
            getAppointments={getAppointments}
          />
        );
      })}
    </div>
  );
};

*/
