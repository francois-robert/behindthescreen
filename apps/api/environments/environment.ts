export const environment = {
  production: false,
  mongodb_uri: process.env.MONGODB_URI || `mongodb+srv://${process.env.DB_USER}:${process.env.DB_USER_PWD}@cluster0.avcgm.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`, // local = "mongodb://localhost:27017",
  session_secret: process.env.SESSION_SECRET || "someString",
  jwt_secret: process.env.JWT_SECRET || "someString"
};
