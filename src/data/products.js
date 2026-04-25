import tomatoes from "../assets/tomatoes.jpg";
import yam from "../assets/yam.jpg";
import plantain from "../assets/plantain.jpg";
import garri from "../assets/garri.jpg";

const productsData = [
  {
    id: 1,
    name: "Tomatoes",
    category: "Vegetables",
    price: 1500,
    unit: "basket",
    quantity: 20,
    farmerName: "Musa Abdullahi",
    location: "Kano State",
    image: tomatoes,
  },
  {
    id: 2,
    name: "Yam",
    category: "Tubers",
    price: 3000,
    unit: "tuber",
    quantity: 50,
    farmerName: "Emeka Okafor",
    location: "Benue State",
    image: yam,
  },
  {
    id: 3,
    name: "Garri",
    category: "Grains",
    price: 800,
    unit: "kg",
    quantity: 100,
    farmerName: "Taiwo Adeleke",
    location: "Oyo State",
    image: garri,
  },
  {
    id: 4,
    name: "Plantain",
    category: "Fruits",
    price: 2000,
    unit: "bunch",
    quantity: 30,
    farmerName: "Chidi Nwosu",
    location: "Anambra State",
    image: plantain,
  },
];

export default productsData;
