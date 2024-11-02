import axios from "axios";

export async function fetchProducts() {
  try {
    const response = await axios.get("http://localhost:5000/products");
    return response.data;
  } catch (e) {
    console.log(e);
  }
}

export async function fetchProductById(id) {
  try {
    const response = await axios.get(`http://localhost:5000/products/${id}`);
    return response.data;
  } catch (e) {
    console.log(e);
  }
}

export async function fetchOrders() {
  try {
    const response = await axios.get("http://localhost:5000/orders");
    return response.data;
  } catch (e) {
    console.log(e);
  }
}

export async function fetchOrdersById(id) {
  try {
    const response = await axios.get(`http://localhost:5000/orders/${id}`);
    return response.data;
  } catch (e) {
    console.log(e);
  }
}

export async function fetchUsers() {
  try {
    const response = await axios.get("http://localhost:5000/users");
    return response.data;
  } catch (e) {
    console.log(e);
  }
}

export async function fetchUsersById(id) {
  try {
    const response = await axios.get(`http://localhost:5000/users/${id}`);
    return response.data;
  } catch (e) {
    console.log(e);
  }
}

export async function fetchCategories() {
  try {
    const response = await axios.get("http://localhost:5000/categories");
    return response.data;
  } catch (e) {
    console.log(e);
  }
}

export async function fetchCategoryByID(id) {
  try {
    const response = await axios.get(`http://localhost:5000/categories/${id}`);
    return response.data;
  } catch (e) {
    console.log(e);
  }
}
