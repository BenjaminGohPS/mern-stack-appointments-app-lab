import React, { useEffect, useRef, useState } from "react";
import ReactDom from "react-dom";
import styles from "./Modal.module.css";
import useFetch from "../hooks/useFetch";

const OverLay = (props) => {
  //codes
  const fetchData = useFetch();
  const titleRef = useRef("");
  const typeRef = useRef("");
  const purposeRef = useRef("");
  const companyRef = useRef("");
  const addressRef = useRef("");
  const personnelRef = useRef("");
  const dateRef = useRef("");
  const timeRef = useRef("");
  const commentsRef = useRef("");
  const [isError, setIsError] = useState(false);
  const [error, setError] = useState(null);

  const addAppointment = async () => {
    setIsError(false);
    setError(null);

    const res = await fetchData("/lab/appointments", "PUT", {
      title: titleRef.current.value,
      type: typeRef.current.value,
      purpose: purposeRef.current.value,
      company: companyRef.current.value,
      address: addressRef.current.value,
      personnel: personnelRef.current.value,
      date: dateRef.current.value,
      time: timeRef.current.value,
      comments: commentsRef.current.value,
    });

    if (res.ok) {
      props.getAppointments();
      props.setShowAddAppointmentModal(false);
    } else {
      console.error(res.msg);
      setError(res.msg);
      setIsError(true);
    }
  };

  useEffect(() => {
    // titleRef.current.value = props.title;
    // typeRef.current.value = props.type;
    // purposeRef.current.value = props.purpose;
    // companyRef.current.value = props.company;
    // addressRef.current.value = props.address;
    // personnelRef.current.value = props.personnel;
    // dateRef.current.value = props.date;
    // timeRef.current.value = props.time;
    // commentsRef.current.value = props.comments;
  }, []);

  return (
    <div className={styles.backdrop}>
      {isError && error}
      <div className={styles.modal}>
        <div className="row">
          <div className="col-md-3"></div>
          <p className="col-md-9">
            <strong>Please key in minimally the following:</strong>
          </p>

          <div className="col-md-4"></div>
          <ul className="col-md-8">
            <li>Title</li>
            <li>Type</li>
            <li>Date</li>
            <li>Time</li>
          </ul>
        </div>

        <br />
        <br />
        <div className="row">
          <div className="col-md-3"></div>
          <div className="col-md-3">Title</div>
          <input
            ref={titleRef}
            type="text"
            className="col-md-3"
            placeholder="REQUIRED"
          />
          <div className="col-md-3"></div>
        </div>

        <div className="row">
          <div className="col-md-3"></div>
          <div className="col-md-3">Type</div>
          <input
            ref={typeRef}
            type="text"
            className="col-md-3"
            placeholder="REQUIRED"
          />
          <div className="col-md-3"></div>
        </div>

        <div className="row">
          <div className="col-md-3"></div>
          <div className="col-md-3">Purpose</div>
          <input ref={purposeRef} type="text" className="col-md-3" />
          <div className="col-md-3"></div>
        </div>

        <div className="row">
          <div className="col-md-3"></div>
          <div className="col-md-3">Company</div>
          <input ref={companyRef} type="text" className="col-md-3" />
          <div className="col-md-3"></div>
        </div>

        <div className="row">
          <div className="col-md-3"></div>
          <div className="col-md-3">Address</div>
          <input ref={addressRef} type="text" className="col-md-3" />
          <div className="col-md-3"></div>
        </div>

        <div className="row">
          <div className="col-md-3"></div>
          <div className="col-md-3">Personnel</div>
          <input ref={personnelRef} type="text" className="col-md-3" />
          <div className="col-md-3"></div>
        </div>

        <div className="row">
          <div className="col-md-3"></div>
          <div className="col-md-3">Date</div>
          <input
            ref={dateRef}
            type="text"
            className="col-md-3"
            placeholder="REQUIRED"
          />
          <div className="col-md-3"></div>
        </div>

        <div className="row">
          <div className="col-md-3"></div>
          <div className="col-md-3">Time</div>
          <input
            ref={timeRef}
            type="text"
            className="col-md-3"
            placeholder="REQUIRED"
          />
          <div className="col-md-3"></div>
        </div>

        <div className="row">
          <div className="col-md-3"></div>
          <div className="col-md-3">Comments</div>
          <textarea ref={commentsRef} type="text" className="col-md-3" />
          <div className="col-md-3"></div>
        </div>

        <br />
        <div className="row">
          <div className="col-md-3"></div>
          <button onClick={() => addAppointment()} className="col-md-3">
            add
          </button>
          <button
            onClick={() => props.setShowAddAppointmentModal(false)}
            className="col-md-3"
          >
            cancel
          </button>
          <div className="col-md-3"></div>
        </div>
      </div>
    </div>
  );
};

const AddAppointmentModal = (props) => {
  return (
    <>
      {ReactDom.createPortal(
        <OverLay
          setShowAddAppointmentModal={props.setShowAddAppointmentModal}
          getAppointments={props.getAppointments}
        />,
        document.querySelector("#modal-root")
      )}
      ;
    </>
  );
};

export default AddAppointmentModal;
