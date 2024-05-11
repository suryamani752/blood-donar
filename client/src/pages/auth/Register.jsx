import React from "react";
import Form from "../../components/shared/form/Form";
import { useSelector } from "react-redux";
// import { toast } from "react-toastify";
import toast from "react-hot-toast";
import { Dna } from "react-loader-spinner";

const Register = () => {
  const { loading, error } = useSelector((state) => state.auth);

  return (
    <>
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
        <div className="row g-0">
          <div className="col-md-8 form-banner">
            <img src="./assets/images/banner5.jpeg" alt="" />
          </div>
          <div className="col-md-4 form-container">
            <Form
              formTitle={"Register Page"}
              submitBtn={"Register"}
              formType={"register"}
            />
          </div>
        </div>
      )}
    </>
  );
};

export default Register;
