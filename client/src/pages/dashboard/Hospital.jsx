import React, { useEffect, useState } from "react";
import Layout from "../../components/shared/Layout/Layout";
import { useSelector } from "react-redux";
import API from "../../services/API";
// import { toast } from "react-toastify";
import toast from "react-hot-toast";
import { Dna } from "react-loader-spinner";
import moment from "moment";

const Hospital = () => {
  const { loading, error } = useSelector((state) => state.auth);

  const [data, setData] = useState([]);

  const getDonar = async () => {
    try {
      const { data } = await API.get("/inventory/get-hospital");
      //   console.log(data);
      if (data?.success) {
        setData(data?.hospital);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getDonar();
  }, []);

  return (
    <Layout>
      {error && <span>{toast.error(error)}</span>}
      {loading ? (
        <>
          <div className="loader-container">
            <Dna
              visible={true}
              height="150"
              width="150"
              ariaLabel="dna-loading"
              wrapperStyle={{}}
              wrapperClass="dna-wrapper"
            />
          </div>
        </>
      ) : (
        <>
          <table className="table">
            <thead>
              <tr>
                <th scope="col">Name</th>
                <th scope="col">Email</th>
                <th scope="col">Phone</th>
                <th scope="col">Address</th>
                <th scope="col">Date</th>
              </tr>
            </thead>
            <tbody>
              {data?.map((record) => (
                <tr key={record._id}>
                  <td>{record.hospitalName}</td>
                  <td>{record.email}</td>
                  <td>{record.phone}</td>
                  <td>{record.address}</td>
                  <td>
                    {moment(record.createdAt).format("DD/MM/YYYY hh:mm A")}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      )}
    </Layout>
  );
};

export default Hospital;
