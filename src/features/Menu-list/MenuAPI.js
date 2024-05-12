import axios, { Axios } from "axios";

{/*
  this is fetch method to fetch data 
  
  export function fetchAllProducts() {
  return new Promise(async (resolve) => {
    //TODO: we will not hard-code server URL here
    const response = await fetch('http://localhost:8080/products');

    const data = await response.json();
    resolve({ data });
  });
}
export function fetchAllCategories() {
  return new Promise(async (resolve) => {
    const response = await fetch('http://localhost:8080/category');
    const data = await response.json();
    resolve({ data });
  });
}*/}


export function fetchAllProducts(){
  return axios.get('http://localhost:8080/products');
}
export function fetchAllCategories(){
  return axios.get('http://localhost:8080/category');
}
export function fetchProductByCategories(categoryName) {
  const queryString = `category=${encodeURIComponent(categoryName)}`;
  return axios.get(`http://localhost:8080/products?${queryString}`);
}


