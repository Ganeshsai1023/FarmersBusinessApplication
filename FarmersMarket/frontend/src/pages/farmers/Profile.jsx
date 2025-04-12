import React, { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../../Components/Navbar";
import "./Profile.css";

const Profile = () => {
  const farmerId = localStorage.getItem("farmerId");
  const [farmer, setFarmer] = useState(null);

  useEffect(() => {
    const fetchFarmer = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/farmers/${farmerId}`);
        setFarmer(res.data);
        console.log(res.data);
      } catch (error) {
        console.error("Error fetching farmer details:", error);
      }
    };

    if (farmerId) {
      fetchFarmer();
    }
  }, [farmerId]);

  if (!farmer) return <div className="text-center mt-5">Loading...</div>;

  return (
    <>
      <Navbar />
      <div className="profile-container">
        <div className="card p-4">
          <div className="image d-flex flex-column justify-content-center align-items-center">
            <button className="btn btn-secondary">
              <img src={farmer.photo} height="100" width="100" alt="Farmer" />
            </button>
            <div className="d-flex flex-row justify-content-center align-items-center gap-2">
              <span><i className="fa fa-copy"></i></span>
            </div>

            <div className="d-flex mt-2">
              <button className="btn1 btn-dark">Edit Profile</button>
            </div>

            <div className="text mt-3 text-center">
              <p><strong>📍 Full Name:</strong> {farmer.fullName}</p>
              <p><strong>📍 Address:</strong> {farmer.address}</p>
              <p><strong>📞 Phone:</strong> {farmer.phone}</p>
              <p><strong>📧 Email:</strong> {farmer.email}</p>
              <p><strong>🆔 Aadhar No:</strong> {farmer.aadharNo}</p>
            </div>

            <div className="gap-3 mt-3 icons d-flex flex-row justify-content-center align-items-center">
              <span><i className="fa fa-twitter"></i></span>
              <span><i className="fa fa-facebook-f"></i></span>
              <span><i className="fa fa-instagram"></i></span>
              <span><i className="fa fa-linkedin"></i></span>
            </div>

            <div className="px-2 rounded mt-4 date">
              <span className="join">{new Date(farmer.register_in).toLocaleDateString()}</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;
