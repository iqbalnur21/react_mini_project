import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [notif, setNotif] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const handleLogin = () => {
    const payload = {
      username: username,
      password: password,
    };

    setLoading(true);

    axios
      .post("https://reqres.in/api/login", payload)
      .then((res) => {
        console.log("res",  res);
        const token = res.data.token;
        localStorage.setItem("access_token", token);
        if (token) {
          setLoading(false);
          setNotif("Login Succeeded");
          setTimeout(() => {
            navigate("/user");
          }, 1000);
        }
      })
      .catch((err) => {
        setLoading(false);
        const msg = err.response.data.error;
        if (msg == "user not found") {
          setNotif("User Not Found, Check Your Email or Password");
        } else {
          setNotif(err.response.data.error);
        }
      });
  };

  const type = notif === "Login Succeeded" ? "success" : "danger";

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
                <h3 className="mb-5">Sign in</h3>

                {!!notif.length && (
                  <div className={`alert alert-${type}`} role="alert">
                    {notif}
                  </div>
                )}
                <div className="form-outline mb-4">
                  <label className="form-label text-start d-block">Email</label>
                  <input
                    type="email"
                    className="form-control form-control-lg"
                    onChange={(e) => setUsername(e.target.value)}
                  />
                </div>

                <div className="form-outline mb-4">
                  <label className="form-label text-start d-block">
                    Password
                  </label>
                  <input
                    type="password"
                    className="form-control form-control-lg"
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>

                <button
                  className="btn btn-primary btn-lg w-100"
                  onClick={handleLogin}
                  disabled={loading}
                >
                  {loading ? "Loading..." : "Login"}
                </button>
                <h5 className="mt-4">
                  Dont have an account?{" "}
                  <Link to={"/register"}>
                    <button className="btn btn-info">Register Here</button>
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

export default Login;
