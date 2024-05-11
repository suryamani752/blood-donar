import React, { useState } from "react";
import InputType from "./InputType";
import { Link } from "react-router-dom";
import { handleLogin, handleRegister } from "../../../services/authService";
// import toast from "react-hot-toast";

const Form = ({ formType, submitBtn, formTitle }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("donar");
  const [name, setName] = useState("");
  const [organisationName, setOrganisationName] = useState("");
  const [hospitalName, setHospitalName] = useState("");
  const [website, setWebsite] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");

  return (
    <form
      onSubmit={(e) => {
        if (formType === "login") return handleLogin(e, email, password, role);
        else if (formType === "register")
          return handleRegister(
            e,
            name,
            role,
            email,
            password,
            organisationName,
            hospitalName,
            website,
            address,
            phone
          );
      }}
    >
      <h1 className="text-center">{formTitle}</h1>
      <hr />
      <div className="d-flex mb-3">
        <div className="form-check">
          <input
            type="radio"
            className="form-check-input"
            name="role"
            id="donarRadio"
            value={"donar"}
            onChange={(e) => setRole(e.target.value)}
            defaultChecked
          />
          <label htmlFor="donarRadio" className="form-check-label">
            Donar
          </label>
        </div>
        <div className="form-check ms-2">
          <input
            type="radio"
            className="form-check-input"
            name="role"
            id="adminRadio"
            value={"admin"}
            onChange={(e) => setRole(e.target.value)}
          />
          <label htmlFor="adminRadio" className="form-check-label">
            Admin
          </label>
        </div>
        <div className="form-check ms-2">
          <input
            type="radio"
            className="form-check-input"
            name="role"
            id="hospitalRadio"
            value={"hospital"}
            onChange={(e) => setRole(e.target.value)}
          />
          <label htmlFor="hospitalRadio" className="form-check-label">
            Hospital
          </label>
        </div>
        <div className="form-check ms-2">
          <input
            type="radio"
            className="form-check-input"
            name="role"
            id="organisationRadio"
            value={"organisation"}
            onChange={(e) => setRole(e.target.value)}
          />
          <label htmlFor="organisationRadio" className="form-check-label">
            Organisation
          </label>
        </div>
      </div>
      {/* switch statement */}
      {(() => {
        //eslint-disable-next-line
        switch (true) {
          case formType === "login": {
            return (
              <>
                <InputType
                  labelText={"Email"}
                  labelFor={"Email"}
                  type={"email"}
                  value={email}
                  name={"email"}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <InputType
                  labelText={"Password"}
                  labelFor={"Password"}
                  type={"password"}
                  value={password}
                  name={"password"}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </>
            );
          }
          case formType === "register": {
            return (
              <>
                {(role === "admin" || role === "donar") && (
                  <InputType
                    labelText={"Name"}
                    labelFor={"Name"}
                    type={"text"}
                    value={name}
                    name={"name"}
                    onChange={(e) => setName(e.target.value)}
                  />
                )}
                <InputType
                  labelText={"Email"}
                  labelFor={"Email"}
                  type={"email"}
                  value={email}
                  name={"email"}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <InputType
                  labelText={"Password"}
                  labelFor={"Password"}
                  type={"password"}
                  value={password}
                  name={"password"}
                  onChange={(e) => setPassword(e.target.value)}
                />
                {role === "organisation" && (
                  <InputType
                    labelText={"Organisation Name"}
                    labelFor={"Organisation Name"}
                    type={"text"}
                    value={organisationName}
                    name={"name"}
                    onChange={(e) => setOrganisationName(e.target.value)}
                  />
                )}
                {role === "hospital" && (
                  <InputType
                    labelText={"Hospital Name"}
                    labelFor={"Hospital Name"}
                    type={"text"}
                    value={hospitalName}
                    name={"hospitalName"}
                    onChange={(e) => setHospitalName(e.target.value)}
                  />
                )}

                <InputType
                  labelText={"website"}
                  labelFor={"website"}
                  type={"text"}
                  value={website}
                  name={"website"}
                  onChange={(e) => setWebsite(e.target.value)}
                />
                <InputType
                  labelText={"Address"}
                  labelFor={"Address"}
                  type={"text"}
                  value={address}
                  name={"address"}
                  onChange={(e) => setAddress(e.target.value)}
                />
                <InputType
                  labelText={"Phone"}
                  labelFor={"Phone"}
                  type={"text"}
                  value={phone}
                  name={"phone"}
                  onChange={(e) => setPhone(e.target.value)}
                />
              </>
            );
          }
        }
      })()}

      <div className="d-flex flex-row justify-content-between">
        {formType === "login" ? (
          <p>
            Not registerd yet ? Register
            <Link to="/register"> Here !</Link>
          </p>
        ) : (
          <p>
            Already User Please
            <Link to="/login"> Login</Link>
          </p>
        )}
        <button className="btn btn-primary" type="submit">
          {submitBtn}
        </button>
      </div>
    </form>
  );
};

export default Form;
