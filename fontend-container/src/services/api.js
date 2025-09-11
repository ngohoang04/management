import axios from "axios";
import { mockInventory } from "../utils/mockData";

const API_BASE = process.env.REACT_APP_API_BASE || "";
const api = axios.create({ baseURL: API_BASE });

/* --------- AUTH --------- */
export async function loginUser({ email, password }) {
  try {
    const res = await api.post("/api/login", { email, password });
    return res.data;
  } catch {
    return { success: true, token: "fake-token", user: { email } };
  }
}

export async function signupUser({ email, password }) {
  try {
    const res = await api.post("/api/signup", { email, password });
    return res.data;
  } catch {
    return { success: true, token: "fake-token", user: { email } };
  }
}

/* --------- INVENTORY --------- */
export async function fetchInventory() {
  try {
    const res = await api.get("/api/inventory");
    return res.data;
  } catch {
    return mockInventory();
  }
}

export async function createInbound(payload) {
  try {
    const res = await api.post("/api/inbound", payload);
    return res.data;
  } catch {
    return { success: true, record: { ...payload, id: Date.now() } };
  }
}

export async function createOutbound(payload) {
  try {
    const res = await api.post("/api/outbound", payload);
    return res.data;
  } catch {
    return { success: true, record: { ...payload, id: Date.now() } };
  }
}

export async function fetchInventoryItem(id) {
  try {
    const res = await api.get(`/api/inventory/${id}`);
    return res.data;
  } catch {
    return mockInventory().find((c) => c.id === id);
  }
}
