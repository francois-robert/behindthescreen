const db_user = "changeme"
const db_password = "changeme"

export const environment = {
  production: false,
  mongodb_uri: process.env.MONGODB_URI || `mongodb+srv://${db_user}:${db_password}@cluster0.avcgm.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`, // local = "mongodb://localhost:27017",
  session_secret: "someString",
  jwt_secret: "someString"
};
