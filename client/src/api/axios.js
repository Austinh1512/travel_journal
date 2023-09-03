import axios from "axios";
import useEnvironment from "../hooks/useEnvironment";

const BASE_URL = useEnvironment();

export default axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
});
