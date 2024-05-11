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
}
