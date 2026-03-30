import mongoose from "mongoose";

// Bypassing broken local DNS SRV resolution by using standard hosts directly
const uri = "mongodb://kit27csbs54:Sharvesh2005@ac-zfuy8gs-shard-00-00.tpmjyg3.mongodb.net:27017,ac-zfuy8gs-shard-00-01.tpmjyg3.mongodb.net:27017,ac-zfuy8gs-shard-00-02.tpmjyg3.mongodb.net:27017/?ssl=true&authSource=admin&retryWrites=true&w=majority&appName=Cluster0";

console.log("Attempting to connect via Standard Connection string...");
mongoose.connect(uri)
  .then(() => {
    console.log("SUCCESSFULLY connected to MongoDB Atlas without SRV!");
    process.exit(0);
  })
  .catch((err) => {
    console.error("CONNECTION FAILED:");
    console.error(err);
    process.exit(1);
  });
