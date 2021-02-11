export default {
  MONGODB: JSON.parse(process.env.MONGODB || "{}"),
  JWT_PASSWORD: process.env.JWT_PASSWORD || "",
  SOCKET_SECRET: process.env.SOCKET_SECRET || "",
  GOOGLE_CLIENT: JSON.parse(process.env.GOOGLE_CLIENT || "{}"),
}