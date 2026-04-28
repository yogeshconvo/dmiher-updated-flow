import api from "./config/api";

export async function getData() {
  const { data } = await api.get("/data");
  return data;
}

export default api;
