import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const User = () => {
  const navigate = useNavigate();

  const [notif, setNotif] = useState("");
  const [users, setUsers] = useState("");

  const getMenu = () => {
    axios
      .get("https://reqres.in/api/users?per_page=3")
      .then((res) => {
        setUsers(res.data.data);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    getMenu();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("access_token");
    navigate("/login");
  };
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
                <div className="d-flex justify-content-between align-items-start">
                  <h2 className="mb-5">List User</h2>
                  <button className="btn btn-danger" onClick={handleLogout}>
                    Logout
                  </button>
                </div>
                {!!notif.length && (
                  <div className="alert alert-success" role="alert">
                    {notif}
                  </div>
                )}
                {!!users && users.map((user) => (
                  <div className="card p-3 my-3" key={user.id}>
                    <div className="d-flex align-items-center">
                      <div className="image">
                        <img
                          src={user.avatar}
                          className="rounded"
                          width="100"
                        />
                      </div>
                      <div className="ml-3 w-100">
                        <h4 className="mb-0 mt-0">
                          {user.first_name + user.last_name}
                        </h4>
                        <span>{user.email}</span>

                        <div className="button mt-2 align-items-center">
                          <Link to={`/user/${user.id}`}>
                            <button className="btn btn-sm btn-outline-primary">
                              Detail
                            </button>
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default User;
