import React, { useEffect, useState } from "react";
import Layout from "../../components/shared/Layout/Layout";
import { useSelector } from "react-redux";
import API from "../../services/API";
// import { toast } from "react-toastify";
import toast from "react-hot-toast";
import { Dna } from "react-loader-spinner";
import moment from "moment";

const Consumer = () => {
  const { user, loading, error } = useSelector((state) => state.auth);

  const [data, setData] = useState([]);

  const getDonar = async () => {
    try {
      const { data } = await API.post("/inventory/get-inventory-hospital", {
        filters: {
          inventoryType: "out",
          hospital: user?._id,
        },
      });
      //   console.log(data);
      if (data?.success) {
        setData(data?.getInventory);
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
      <div className="container mt-4">
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
                  <th scope="col">Blood Group</th>
                  <th scope="col">Inventory Type</th>
                  <th scope="col">Quantity</th>
                  <th scope="col">Email</th>
                  <th scope="col">Date</th>
                </tr>
              </thead>
              <tbody>
                {data?.map((record) => (
                  <tr key={record._id}>
                    <td>{record.bloodGroup}</td>
                    <td>{record.inventoryType}</td>
                    <td>{record.quantity}</td>
                    <td>{record.email}</td>
                    <td>
                      {moment(record.createdAt).format("DD/MM/YYYY hh:mm A")}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </>
        )}
      </div>
    </Layout>
  );
};

export default Consumer;
