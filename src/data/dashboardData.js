export const currentRole = "Farmer";
export const isFarmer = currentRole === "Farmer";
export const initialListings = [
  {
    id: 1,
    name: "Tomatoes",
    category: "Vegetables",
    price: 1500,
    unit: "basket",
    quantity: 20,
  },
  {
    id: 2,
    name: "Yam",
    category: "Tubers",
    price: 3000,
    unit: "tuber",
    quantity: 50,
  },
  {
    id: 3,
    name: "Garri",
    category: "Grains",
    price: 800,
    unit: "kg",
    quantity: 100,
  },
];

export const farmerOrders = [
  {
    id: 1,
    product: "Tomatoes",
    name: "Chidi Nwosu",
    quantity: 5,
    unit: "basket",
    total: 7500,
    status: "Pending",
  },
  {
    id: 2,
    product: "Yam",
    name: "Amina Bello",
    quantity: 10,
    unit: "tuber",
    total: 30000,
    status: "Confirmed",
  },
  {
    id: 3,
    product: "Garri",
    name: "Seun Adeyemi",
    quantity: 20,
    unit: "kg",
    total: 16000,
    status: "Delivered",
  },
  {
    id: 4,
    product: "Plantain",
    name: "Tunde Obi",
    quantity: 3,
    unit: "bunch",
    total: 6000,
    status: "Cancelled",
  },
];

export const buyerOrders = [
  {
    id: 1,
    product: "Tomatoes",
    name: "Musa Abdullahi",
    quantity: 2,
    unit: "basket",
    total: 3000,
    status: "Delivered",
  },
  {
    id: 2,
    product: "Garri",
    name: "Taiwo Adeleke",
    quantity: 5,
    unit: "kg",
    total: 4000,
    status: "Pending",
  },
  {
    id: 3,
    product: "Yam",
    name: "Emeka Okafor",
    quantity: 4,
    unit: "tuber",
    total: 12000,
    status: "Confirmed",
  },
];
