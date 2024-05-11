import React, { useState, useEffect } from "react";
import Header from "../../components/shared/Layout/Header";
import API from "../../services/API";
import moment from "moment";
// import { toast } from "react-hot-toast";
// import ProgressBar from "../../styles/ProgressBar";

const Analytics = () => {
  const [data, setData] = useState([]);
  const [recent, setRecent] = useState([]);
  const colors = [
    "#F8F0E5",
    "#EADBC8",
    "#DAC0A3",
    "#D2DE32",
    "#94A684",
    "#FFB6D9",
    "#ED7B7B",
    "#FFF6DC",
  ];
  const getBloodGroupData = async () => {
    try {
      const { data } = await API.get("/analytics/BloodGroup-record-data");
      if (data?.success) {
        setData(data?.bloodGroupData);
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getBloodGroupData();
  }, []);
  const getBloodRecord = async () => {
    try {
      const { data } = await API.get("/inventory/get-recent-record");
      if (data?.success) {
        setRecent(data?.inventory);
        // console.log(data);
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getBloodRecord();
  }, []);
  return (
    <>
      <Header />
      <div className="d-flex flex-row flex-wrap ms-5">
        {data?.map((record, index) => (
          <div
            className="card m-2 p-1"
            key={index}
            style={{ width: "18rem", backgroundColor: `${colors[index]}` }}
          >
            <div className="card-body">
              <h5 className="card-title bg-light text-dark text-center mb-3">
                {record.bloodGroup}
              </h5>
              <p className="card-text">
                TotalIn: <b>{record.totalIn}</b> ml
              </p>
              {/* <p className="card-text">
                <ProgressBar
                  bgcolor="orange"
                  progress={record.totalIn}
                  height={30}
                  total="In"
                />
              </p> */}
              {/* <p className="card-text">
                <ProgressBar
                  bgcolor="orange"
                  progress={record.totalOut}
                  height={30}
                  total="Out"
                />
              </p> */}

              <p className="card-text">
                TotalOut: <b>{record.totalOut}</b> ml
              </p>
            </div>
            <div className="card-footer text-light bg-dark text-center">
              {`Total Available ${record.bloodGroup} Blood: ${record.availableBlood} `}
            </div>
          </div>
        ))}
      </div>
      <div className="container my-3">
        <h1 className="my-3">Top 3 Recent Blood Transactions</h1>
        <table className="table">
          <thead>
            <tr>
              <th scope="col">Blood Group</th>
              <th scope="col">Inventory Type</th>
              <th scope="col">Quantity</th>
              <th scope="col">Donar Email</th>
              <th scope="col">Time and Data</th>
            </tr>
          </thead>
          <tbody>
            {recent?.map((record) => (
              <tr key={record._id}>
                <td>{record.bloodGroup}</td>
                <td>{record.inventoryType}</td>
                <td>{record.quantity} ml</td>
                <td>{record.email}</td>
                <td>{moment(record.createdAt).format("DD/MM/YYYY hh:mm A")}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Analytics;
