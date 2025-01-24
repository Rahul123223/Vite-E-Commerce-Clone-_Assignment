const BASE_URL = "https://fakestoreapi.com/carts";

export const fetchSingleCart = async (cartId: number) => {
  const response = await fetch(`${BASE_URL}/${cartId}`);
  if (!response.ok) {
    throw new Error("Failed to fetch cart");
  }
  return await response.json();
};

export const fetchLimitedCarts = async (limit: number) => {
  const response = await fetch(`${BASE_URL}?limit=${limit}`);
  if (!response.ok) {
    throw new Error("Failed to fetch limited carts");
  }
  return await response.json();
};

export const fetchSortedCarts = async (sort: "asc" | "desc") => {
  const response = await fetch(`${BASE_URL}?sort=${sort}`);
  if (!response.ok) {
    throw new Error("Failed to fetch sorted carts");
  }
  return await response.json();
};

export const fetchCartsByDateRange = async (startDate: string, endDate: string) => {
  const response = await fetch(`${BASE_URL}?startdate=${startDate}&enddate=${endDate}`);
  if (!response.ok) {
    throw new Error("Failed to fetch carts by date range");
  }
  return await response.json();
};

export const fetchUserCarts = async (userId: number) => {
  const response = await fetch(`${BASE_URL}/user/${userId}`);
  if (!response.ok) {
    throw new Error("Failed to fetch user carts");
  }
  return await response.json();
};

export const addCart = async (cartData: { userId: number; date: string; products: any[] }) => {
  const response = await fetch(BASE_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(cartData),
  });
  if (!response.ok) {
    throw new Error("Failed to add cart");
  }
  return await response.json();
};

export const updateCart = async (
  cartId: number,
  updatedData: { userId: number; date: string; products: any[] }
) => {
  const response = await fetch(`${BASE_URL}/${cartId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(updatedData),
  });
  if (!response.ok) {
    throw new Error("Failed to update cart");
  }
  return await response.json();
};

export const patchCart = async (
  cartId: number,
  updatedData: { userId: number; date: string; products: any[] }
) => {
  const response = await fetch(`${BASE_URL}/${cartId}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(updatedData),
  });
  if (!response.ok) {
    throw new Error("Failed to partially update cart");
  }
  return await response.json();
};

export const deleteCart = async (cartId: number) => {
  const response = await fetch(`${BASE_URL}/${cartId}`, {
    method: "DELETE",
  });
  if (!response.ok) {
    throw new Error("Failed to delete cart");
  }
  return await response.json();
};
