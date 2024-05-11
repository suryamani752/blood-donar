import React from "react";
import Layout from "../../components/shared/Layout/Layout";
import { useSelector } from "react-redux";

const AdminHome = () => {
  const { user } = useSelector((state) => state.auth);
  return (
    <Layout>
      <div className="container">
        <div className="d-flex flex-column mt-4">
          <h1>
            welcome Admin <i className="text-success">{user?.name}</i>
          </h1>
          <h4>Manage Blood Bank App</h4>
          <hr />
          <p>
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Mollitia
            eius, neque ullam minima fuga quaerat. Culpa libero accusamus id
            dignissimos. Doloremque nam id excepturi, ea quisquam optio,
            reiciendis omnis, perspiciatis vero magnam exercitationem dolor
            minima pariatur corrupti. Delectus est quo magnam voluptate quis
            vitae odio aliquid, deserunt laudantium eum velit.
          </p>
        </div>
      </div>
    </Layout>
  );
};

export default AdminHome;
