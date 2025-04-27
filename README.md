# 🛒 Farmers Mart (FBA)

Farmers Mart (FBA) is a full-stack application connecting farmers directly with consumers, enabling transparent and fair agricultural trade.  
It integrates secure payments (Razorpay), image storage (Firebase Storage), and password recovery (Nodemailer) functionalities.

---

## 🚀 Features

- 🌾 Farmer and Consumer Registration & Login
- 🛒 Product listing and purchasing
- 💸 Secure Payments via Razorpay
- 📷 Product Image Uploads via Firebase Storage
- ✉️ Password Reset Functionality via Email using Nodemailer
- 🔒 OTP-based Authentication for sensitive operations
- 🧾 Order management and transaction history

---

## 🛠️ Tech Stack

- **Frontend**: React.js, HTML5, CSS3, JavaScript
- **Backend**: Node.js, Express.js
- **Database**: MongoDB
- **Third-party Integrations**:
  - **Razorpay** - Payment Gateway
  - **Firebase Storage** - Image Uploading
  - **Nodemailer** - Sending Emails for Password Reset

---

## 🏗️ Project Setup

### 1. Clone the repository

```bash
git clone https://github.com/your-username/your-repo-name.git
cd your-repo-name


# MongoDB
MONGO_URI=your_mongodb_connection_string

# Razorpay
RAZORPAY_KEY_ID=your_razorpay_key_id
RAZORPAY_KEY_SECRET=your_razorpay_key_secret

# Firebase(frontend)
FIREBASE_API_KEY=your_firebase_api_key
FIREBASE_AUTH_DOMAIN=your_firebase_auth_domain
FIREBASE_PROJECT_ID=your_firebase_project_id
FIREBASE_STORAGE_BUCKET=your_firebase_storage_bucket
FIREBASE_MESSAGING_SENDER_ID=your_firebase_messaging_sender_id
FIREBASE_APP_ID=your_firebase_app_id

# Nodemailer
EMAIL_HOST=smtp.gmail.com
EMAIL_USER=your_email@example.com
EMAIL_PASS=your_email_password
