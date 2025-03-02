import axios from "axios";
import { jwtDecode } from "jwt-decode";
const api = process.env.NEXT_PUBLIC_API;

export async function getAllOrder(token) {
  try {
    const response = await axios.get(`${api}/order/all`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data.data;
  } catch (err) {
    console.log("Failed to fetch order");
    return err;
  }
}

export async function getOrderById(id, token) {
  try {
    const response = await axios.get(`${api}/order/detail/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data.data;
  } catch (err) {
    console.log("Failed to fetch order");
    return err;
  }
}

export async function createOrder(token) {
  try {
    const response = await axios.get(`${api}/order/create`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data.data;
  } catch (err) {
    console.log("Failed to create order");
    return err;
  }
}

export async function getOrderStatusCanChangedTo(id, token) {
  try {
    const response = await axios.get(`${api}/order/status_can_change_to/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data.data;
  } catch (err) {
    console.log("Failed to fetch order");
    return err;
  }
}

export async function changeOrderStatus(id, status, token) {
  try {
    const response = await axios.put(
      `${api}/order/update/${id}`,
      { status },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data.data;
  } catch (err) {
    console.log("Failed to change order status");
    return err;
  }
}

export async function deleteOrder(id, token) {
  try {
    const response = await axios.delete(`${api}/order/delete/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data.data;
  } catch (err) {
    console.log("Failed to delete order");
    return err;
  }
}
