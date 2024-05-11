import React from "react";
import { BiDonateBlood, BiUserCircle } from "react-icons/bi";
import { useSelector } from "react-redux";
import { useNavigate, useLocation, Link } from "react-router-dom";
// import { toast } from "react-toastify";
import toast from "react-hot-toast";

const Header = () => {
  const { user } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const location = useLocation();

  //logout
  const logoutHandler = () => {
    localStorage.clear();
    toast.success("Logout successfully", {
      position: "top-right",
      duration: 2000,
    });
    navigate("/login");
  };

  return (
    <>
      <nav className="navbar">
        <div className="container-fluid">
          <div className="navbar-brand mx-3 p-3">
            <BiDonateBlood color="red" />
            Blood Bank App
          </div>
          <ul className="navbar-nav flex-row">
            <li className="nav-item mx-3">
              <p className="nav-link">
                <BiUserCircle />
                welcome{" "}
                {user?.name ||
                  user?.hospitalName ||
                  user?.organisationName}{" "}
                &nbsp;
                <span className="badge bg-secondary">{user?.role}</span>
              </p>
            </li>
            {location.pathname === "/" ||
            location.pathname === "/donar" ||
            location.pathname === "/hospital" ? (
              <li className="nav-item mx-3">
                <Link to="/analytics" className="nav-link">
                  Analytics
                </Link>
              </li>
            ) : (
              <li className="nav-item mx-3">
                <Link to="/" className="nav-link">
                  Home
                </Link>
              </li>
            )}
            <li className="nav-item mx-3">
              <button className="btn btn-danger" onClick={logoutHandler}>
                Logout
              </button>
            </li>
          </ul>
        </div>
      </nav>
    </>
  );
};

export default Header;
