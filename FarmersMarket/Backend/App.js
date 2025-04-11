// const mongoose = require("mongoose");
// require("dotenv").config();

// // Admin Schema Definition
// const adminSchema = new mongoose.Schema(
//   {
//     id: {
//       type: String,
//       required: true,
//       unique: true,
//       lowercase: true,
//       trim: true,
//     },
//     email: {
//       type: String,
//       required: true,
//       unique: true,
//       lowercase: true,
//       trim: true,
//       match: [/.+@.+\..+/, "Please enter a valid email address"],
//     },
//     username: {
//       type: String,
//       required: true,
//       unique: true,
//       trim: true,
//     },
//     password: {
//       type: String,
//       required: true,
//     },
//     phoneNumber: {
//       type: String,
//       required: true,
//       match: [/^[6-9]\d{9}$/, "Please enter a valid phone number"],
//     },
//   },
//   {
//     timestamps: true,
//   }
// );

// const Admin = mongoose.model("Admins", adminSchema);

// // Insert Sample Admins (Only if none exist)
// const insertSampleAdmins = async () => {
//   try {
//     await mongoose.connect(process.env.MONGO_URL);
//     console.log("✅ Connected to MongoDB");

//     const count = await Admin.countDocuments();
//     if (count === 0) {
//       const sampleAdmins = [
//         {
//           id: "ganesh",
//           email: "ganeshsai_veluri@srmap.edu.in",
//           username: "AP22110011209",
//           password: "11209",
//           phoneNumber: "9948636712",
//         },
//         {
//           id: "nikitha",
//           email: "nikitha_thotapalli@srmap.edu.in",
//           username: "AP22110011212",
//           password: "11212",
//           phoneNumber: "7286009525",
//         },
//         {
//           id: "lavayana",
//           email: "sailavanya_madam@srmap.edu.in",
//           username: "AP22110011299",
//           password: "11299",
//           phoneNumber: "8008020932",
//         },
//         {
//           id: "rajeswari",
//           email: "rajeswari_ganta@srmap.edu.in",
//           username: "AP22110011087",
//           password: "11087",
//           phoneNumber: "7981528370",
//         },
//       ];
//       await Admin.insertMany(sampleAdmins);
//       console.log("✅ Sample admins inserted successfully!");
//     } else {
//       console.log("⚠️ Admins already exist. Skipping insertion.");
//     }

//     mongoose.disconnect();
//   } catch (error) {
//     console.error("❌ Error inserting admins:", error);
//   }
// };

// // Only run insertion if this script is executed directly
// if (require.main === module) {
//   insertSampleAdmins();
// }

// // Export the model in case you want to use it elsewhere
// module.exports = Admin;
