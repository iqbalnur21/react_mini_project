import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

const UserDetails = () => {
  const [user, setUser] = useState([]);
  const { id } = useParams();
  const getMenuDetail = () => {
    axios
      .get(`https://reqres.in/api/users/${id}`)
      .then((res) => {
        console.log(res);
        setUser(res.data.data);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    getMenuDetail();
  }, []);

  console.log(user);
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
                <h2 className="mb-5">Detail User</h2>
                <div className="card p-3 my-3">
                  <div className="image my-3">
                    <img src={user.avatar} className="rounded" width="100" />
                  </div>
                  <div className="d-flex align-items-center">
                    <div className="ml-3 w-100">
                      <h4 className="mb-0 mt-0">
                        {user.first_name + user.last_name}
                      </h4>
                      <span className="text-muted">{user.email}</span>
                    </div>
                  </div>
                </div>
                <Link to="/user">
                  <button className="btn btn-danger justify-content-start d-flex">
                    Back
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default UserDetails;
