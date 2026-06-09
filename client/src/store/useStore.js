import { create } from "zustand";
import api from "../utils/api";

export const useStore = create((set, get) => ({
  // Auth State
  token: localStorage.getItem("token") || null,
  user: (() => {
    try {
      return JSON.parse(localStorage.getItem("user")) || null;
    } catch {
      return null;
    }
  })(),

  // Master Data Cache
  customers: [],
  vendors: [],
  items: [],

  // Loading Flags
  loadingCustomers: false,
  loadingVendors: false,
  loadingItems: false,

  // Auth Actions
  login: (token, user) => {
    localStorage.setItem("token", token);
    localStorage.setItem("user", JSON.stringify(user));
    set({ token, user });
  },

  logout: () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    set({
      token: null,
      user: null,
      customers: [],
      vendors: [],
      items: [],
    });
  },

  // Cache Actions
  fetchCustomers: async (force = false) => {
    // Skip fetching if already loaded, unless forced
    if (get().customers.length > 0 && !force) return;
    set({ loadingCustomers: true });
    try {
      const res = await api.get("/masters/customers");
      set({ customers: res.data });
    } catch (err) {
      console.error("Failed to fetch/cache customers:", err);
      throw err;
    } finally {
      set({ loadingCustomers: false });
    }
  },

  addCustomer: async (customerData) => {
    try {
      const res = await api.post("/masters/customers", customerData);
      set((state) => ({
        customers: [...state.customers, res.data],
      }));
      return res.data;
    } catch (err) {
      console.error("Failed to create customer and cache:", err);
      throw err;
    }
  },

  fetchVendors: async (force = false) => {
    if (get().vendors.length > 0 && !force) return;
    set({ loadingVendors: true });
    try {
      const res = await api.get("/masters/vendors");
      set({ vendors: res.data });
    } catch (err) {
      console.error("Failed to fetch/cache vendors:", err);
      throw err;
    } finally {
      set({ loadingVendors: false });
    }
  },

  addVendor: async (vendorData) => {
    try {
      const { name, mobile, address, gstin, openingBalance } = vendorData;
      const res = await api.post("/masters/vendors", { name, mobile, address, gstin, openingBalance });
      const fullVendor = { ...vendorData, ...res.data };
      set((state) => ({
        vendors: [...state.vendors, fullVendor],
      }));
      return fullVendor;
    } catch (err) {
      console.error("Failed to create vendor and cache:", err);
      throw err;
    }
  },

  fetchItems: async (force = false) => {
    if (get().items.length > 0 && !force) return;
    set({ loadingItems: true });
    try {
      const res = await api.get("/masters/items");
      set({ items: res.data });
    } catch (err) {
      console.error("Failed to fetch/cache items:", err);
      throw err;
    } finally {
      set({ loadingItems: false });
    }
  },

  addItem: async (itemData) => {
    try {
      const { name, sku, category, unit, purchasePrice, salePrice, gstPercentage, openingStock, minStockAlert } = itemData;
      const res = await api.post("/masters/items", { name, sku, category, unit, purchasePrice, salePrice, gstPercentage, openingStock, minStockAlert });
      const fullItem = { ...itemData, ...res.data };
      set((state) => ({
        items: [...state.items, fullItem],
      }));
      return fullItem;
    } catch (err) {
      console.error("Failed to create item and cache:", err);
      throw err;
    }
  },
}));
