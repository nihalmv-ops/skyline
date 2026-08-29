const mongoose = require("mongoose");
const dns = require("dns");

const connectDB = async () => {
  try {
    // Use Google DNS because the current network DNS
    // is refusing MongoDB Atlas SRV queries.
    dns.setServers(["8.8.8.8", "1.1.1.1"]);

    await mongoose.connect(process.env.MONGO_URI);

    console.log("MongoDB connected successfully");
  } catch (error) {
    console.error(
      "MongoDB connection failed:",
      error.message
    );

    process.exit(1);
  }
};

module.exports = connectDB;