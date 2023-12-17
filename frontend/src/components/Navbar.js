import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Badge } from "react-bootstrap";
import Modal from "../Modal";
import Cart from "../srcreens/Cart";
import { useCart } from "./ContextReducer";
export default function Navbar() {
  const navigate = useNavigate();
  const data = useCart();
  const [cartView, setCartView] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-success">
      <div className="container-fluid logo">
        <Link className="navbar-brand fs-1" to="/">
          Your Food
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="/navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav me-auto mb-2">
            <li className="nav-item ">
              <Link className="nav-link active fs-5" aria-current="page" to="/">
                Home
              </Link>
            </li>
            {/* {localStorage.getItem("token") ? (
              <Link className="nav-link active fs-5" aria-current="page" to="/">
                My Orders
              </Link>
            ) : (
              ""
            )} */}
            {localStorage.getItem("token") && (
              <Link
                className="nav-link active fs-5"
                aria-current="page"
                to="/myorder"
              >
                My Orders
              </Link>
            )}
          </ul>

          {!localStorage.getItem("token") ? (
            <div className="d-flex">
              <Link
                className="btn text-success bg-white mx-1 fw-bold ls-5"
                to="/login"
              >
                Login
              </Link>

              <Link
                className="btn text-success bg-white mx-1 fw-bold ls-2"
                to="/createuser"
              >
                Signup
              </Link>
            </div>
          ) : (
            <div>
              <div
                className="btn text-success bg-white mx-2"
                onClick={() => {
                  setCartView(true);
                }}
              >
                My Cart{" "}
                <Badge pill bg="danger">
                  {data.length}
                </Badge>
              </div>
              {cartView && (
                <Modal
                  onClose={() => {
                    setCartView(false);
                  }}
                >
                  <Cart />
                </Modal>
              )}
              <div
                className="btn text-danger bg-white mx-2"
                onClick={handleLogout}
              >
                Logout
              </div>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}
