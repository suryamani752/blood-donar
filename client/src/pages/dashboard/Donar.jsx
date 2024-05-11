import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Dna } from "react-loader-spinner";

import Layout from "../../components/shared/Layout/Layout";
import API from "../../services/API";
import moment from "moment";
// import { toast } from "react-toastify";
import toast from "react-hot-toast";

const Donar = () => {
  const { loading, error } = useSelector((state) => state.auth);

  const [data, setData] = useState([]);

  const getDonar = async () => {
    try {
      const { data } = await API.get("/inventory/get-donar");
      //   console.log(data);
      if (data?.success) {
        setData(data?.donar);
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
                <th scope="col">Date</th>
              </tr>
            </thead>
            <tbody>
              {data?.map((record) => (
                <tr key={record._id}>
                  <td>{record.name || record.organisationName + " (ORG) "}</td>
                  <td>{record.email}</td>
                  <td>{record.phone}</td>
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

export default Donar;
