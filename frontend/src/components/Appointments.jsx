import React, { useState } from "react";
import styles from "./Appointments.module.css";
import UpdateModal from "./UpdateModal";

const Appointments = (props) => {
  const [showUpdateModal, setShowUpdateModal] = useState(false);

  const handleDelete = () => {
    const isConfirmed = window.confirm("Delete appointment?");

    if (isConfirmed) {
      props.deleteAppointment(props.id);
    }
  };

  return (
    <div>
      {showUpdateModal && (
        <UpdateModal
          id={props.id}
          title={props.title}
          type={props.type}
          purpose={props.purpose}
          company={props.company}
          address={props.address}
          personnel={props.personnel}
          date={props.date}
          time={props.time}
          comments={props.comments}
          getAppointments={props.getAppointments}
          setShowUpdateModal={setShowUpdateModal}
        />
      )}

      <div className={styles["appointment-card"]}>
        <div className="card">
          <div className="card-body">
            <h5 className="card-title">{props.title}</h5>
            <p className="card-text">
              <strong>Type:</strong> {props.type || "N/A"}
            </p>
            <p className="card-text">
              <strong>Purpose:</strong> {props.purpose || "Appointment"}
            </p>
            <p className="card-text">
              <strong>Company:</strong> {props.company || "N/A"}
            </p>
            <p className="card-text">
              <strong>Address:</strong> {props.address || "TBC"}
            </p>
            <p className="card-text">
              <strong>Personnel:</strong> {props.personnel || "TBC"}
            </p>
            <p className="card-text">
              <strong>Date:</strong> {props.date || "N/A"}
            </p>
            <p className="card-text">
              <strong>Time:</strong> {props.time || "N/A"}
            </p>
            <p className="card-text">
              <strong>Comments:</strong> {props.comments || "nil"}
            </p>
            <>
              <button
                className="btn btn-primary"
                onClick={() => setShowUpdateModal(true)}
              >
                update
              </button>
              <button className="btn btn-outline-danger" onClick={handleDelete}>
                delete
              </button>
            </>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Appointments;
