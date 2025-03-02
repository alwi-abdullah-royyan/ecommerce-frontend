import axios from "axios";
const api = process.env.NEXT_PUBLIC_API;

export async function getOrderItemById(id, token) {
  try {
    const response = await axios.get(`${api}/orderitem/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data.data;
  } catch (err) {
    console.log("Failed to fetch order item");
    return err;
  }
}
