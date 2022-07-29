import { categoriesDataTyp } from "../types";
import images from "./Images";

export const itemData = [
  {
    id: "1",
    title: "Rice and stew",
    image: images.items[0],
    price: 300,
  },
  {
    id: "2",
    title: "Grilled Meat",
    image: images.items[1],
    price: 100,
  },
  {
    id: "3",
    title: "Rice ball with Banana",
    image: images.items[2],
    price: 300,
  },
  {
    id: "k3",
    title: "Fresh Donuts",
    image: images.items[3],
    price: 300,
  },
];
export const categoriesData: categoriesDataTyp = [
  {
    id: "1",
    title: "Fruits",
    selected: false,
    image: images.categories[0],
  },
  {
    id: "3",
    title: "Donuts",
    selected: true,
    image: images.categories[1],
  },
  {
    id: "4",
    title: "Rice",
    selected: false,
    image: images.categories[2],
  },
  {
    id: "5",
    title: "Rice",
    selected: false,
    image: images.categories[3],
  },
];
export const cartsData = [
  {
    id: "1",
    title: "Rice and stew",
    image: images.items[0],
    price: 300,
    text: "description of the food goes here",
  },
  {
    id: "2",
    title: "Grilled Meat",
    image: images.items[1],
    price: 100,
    text: "description of the food goes here",
  },
  {
    id: "3",
    title: "Rice ball with Banana",
    image: images.items[2],
    price: 300,
    text: "description of the food goes here",
  },
  {
    id: "3dd",
    title: "Rice ball with Banana",
    image: images.items[2],
    price: 300,
    text: "description of the food goes here",
  },
];
