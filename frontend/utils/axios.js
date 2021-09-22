import axios from "axios";
import { endpoint } from "./utils";

const instance = axios.create({
    baseURL: endpoint,
});

export default instance;