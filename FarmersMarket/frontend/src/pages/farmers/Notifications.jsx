import React from "react";
import { AiOutlineBell } from "react-icons/ai";
import "./Notifications.css"; // Import the CSS file
import Navbar from "../../Components/Navbar"; // Import Navbar
const notifications = [
  { id: 1, message: "Your order #12345 has been shipped", time: "1 hour ago" },
  { id: 2, message: "Payment of $500.00 was received", time: "3 hours ago" },
  { id: 3, message: "New message from customer", time: "Yesterday" },
  { id: 4, message: "Your listing ‘Fresh Apples’ has been approved", time: "2 days ago" },
  { id: 5, message: "Your listing ‘ Apples’ has been approved", time: "2 days ago" },
  { id: 6, message: "Your listing ‘Oranges’ has been approved", time: "2 days ago" },
  { id: 7, message: "Your listing ‘Oranges’ has been approved", time: "2 days ago" },
  { id: 8, message: "Your listing ‘Oranges’ has been approved", time: "2 days ago" },


];

const Notifications = ({ farmerId }) => {
  return (
    <>
      <Navbar />
      <div className="notifications-container">
        <h2 className="notifications-title">Notifications</h2>
        {notifications.map((notification) => (
          <div key={notification.id} className="notification-card">
            <AiOutlineBell className="notification-icon" />
            <div className="notification-text">
              <p className="notification-message">{notification.message}</p>
              <p className="notification-time">{notification.time}</p>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default Notifications;
