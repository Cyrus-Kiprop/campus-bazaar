import { handleResponse, handleError } from "./apiUtils";
// const baseUrl = process.env.API_URL + "/courses/";

// get courses from the mockdatabase
export function getProduct(baseUrl) {
  return fetch(baseUrl)
    .then(handleResponse)
    .catch(handleError);
}

// get product by id  from the database
export function getProductById(baseUrl) {
  return fetch(baseUrl)
    .then(handleResponse)
    .catch(handleError);
}

// a dual purpose route for editing and creating courses
export function saveProduct(baseUrl, product) {
  return fetch(baseUrl + (product.id || ""), {
    method: product.id ? "PUT" : "POST", // POST for create, PUT to update when id already exists.
    headers: { "content-type": "application/json" },
    body: JSON.stringify(product)
  })
    .then(handleResponse)
    .catch(handleError);
}

// delete a course from the mockDatabase
export function deleteProduct(baseUrl, productId) {
  return fetch(baseUrl + productId, { method: "DELETE" })
    .then(handleResponse)
    .catch(handleError);
}
