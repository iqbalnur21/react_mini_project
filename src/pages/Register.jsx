import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Register = () => {
  const [type, setType] = useState("");
  const [menu, setMenu] = useState({
    email: "",
    password: "",
  });
  const handleChange = (event) => {
    setMenu({
      ...menu,
      [event.target.name]: event.target.value,
    });
  };

  const [notif, setNotif] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const handleRegister = () => {
    const payload = {
      email: menu.email,
      password: menu.password,
    };

    setLoading(true);

    axios
      .post("https://reqres.in/api/register", payload)
      .then((res) => {
        setNotif("Register Succeeded");
        setType("success");
        setLoading(false);
        setTimeout(() => {
          navigate("/login");
        }, 1000)
      })
      .catch((err) => {
        const msg = err.response.data.error;
        setType("danger");
        setNotif(msg);
        setLoading(false);
      });
  };
  console.log(notif);
  return (
    <section className="vh-100" style={{ backgroundColor: "#508bfc" }}>
      <div className="container py-5 h-100">
        <div className="row d-flex justify-content-center align-items-center h-100">
          <div className="col-12 col-md-8 col-lg-6 col-xl-5">
            <div
              className="card shadow-2-strong"
              style={{ borderRadius: "1rem" }}
            >
              <div className="card-body p-5 text-center">
                <h3 className="mb-5">Sign Up</h3>

                {!!notif.length && (
                  <div className={`alert alert-${type}`} role="alert">
                    {type === "success" ? "Register Succeeded" : notif}
                  </div>
                )}
                <div className="form-outline mb-4">
                  <label className="form-label text-start d-block">Email</label>
                  <input
                    name="email"
                    type="email"
                    className="form-control form-control-lg"
                    onChange={handleChange}
                  />
                </div>

                <div className="form-outline mb-4">
                  <label className="form-label text-start d-block">
                    Password
                  </label>
                  <input
                    name="password"
                    type="password"
                    className="form-control form-control-lg"
                    onChange={handleChange}
                  />
                </div>

                <button
                  className="btn btn-primary btn-lg w-100"
                  onClick={handleRegister}
                  disabled={loading}
                >
                  {loading ? "Loading..." : "Register"}
                </button>
                <h5 className="mt-4">
                  Have an account?{" "}
                  <Link to={"/login"}>
                    <button className="btn btn-info">Login Here</button>
                  </Link>
                </h5>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Register;
