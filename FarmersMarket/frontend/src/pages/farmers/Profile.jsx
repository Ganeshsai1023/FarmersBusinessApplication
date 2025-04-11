import React from "react";
import Navbar from "../../Components/Navbar";
import "./Profile.css";

const Profile = () => {
  const farmer = {
    name: "Eleanor Pena",
    username: "@eleanorpena",
    id: "FARM-0001",
    profileImage: "https://i.imgur.com/wvxPV9S.png",
    followers: 1069,
    phone: "+1 234 567 890",
    email: "eleanor@greenfarm.com",
    farmLocation: "Green Valley, Texas",
    description:
      "Eleanor is an experienced organic farmer growing fresh vegetables and grains. Passionate about sustainability and healthy living.",
    joinDate: "Joined May 2021",
  };

  return (
    <>
      <Navbar />
      <div className="profile-container">
        <div className="card p-4">
          <div className="image d-flex flex-column justify-content-center align-items-center">
            <button className="btn btn-secondary">
              <img src={farmer.profileImage} height="100" width="100" alt="Farmer" />
            </button>
            <span className="name mt-3">{farmer.name}</span>
            <span className="idd">{farmer.username}</span>

            <div className="d-flex flex-row justify-content-center align-items-center gap-2">
              <span className="idd1">{farmer.id}</span>
              <span><i className="fa fa-copy"></i></span>
            </div>

            {/* <div className="d-flex flex-row justify-content-center align-items-center mt-3">
            <span className="number">{farmer.followers} <span className="follow">Followers</span></span>
          </div> */}

            <div className="d-flex mt-2">
              <button className="btn1 btn-dark">Edit Profile</button>
            </div>

            <div className="text mt-3">
              <span>{farmer.description}</span>
            </div>

            <div className="text mt-3 text-center">
              <p><strong>📍 Farm Location:</strong> {farmer.farmLocation}</p>
              <p><strong>📞 Contact:</strong> {farmer.phone}</p>
              <p><strong>📧 Email:</strong> {farmer.email}</p>
            </div>

            <div className="gap-3 mt-3 icons d-flex flex-row justify-content-center align-items-center">
              <span><i className="fa fa-twitter"></i></span>
              <span><i className="fa fa-facebook-f"></i></span>
              <span><i className="fa fa-instagram"></i></span>
              <span><i className="fa fa-linkedin"></i></span>
            </div>

            <div className="px-2 rounded mt-4 date">
              <span className="join">{farmer.joinDate}</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;


