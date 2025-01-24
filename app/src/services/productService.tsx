export const fetchProducts = async () => {
    try {
      const response = await fetch("https://fakestoreapi.com/products");
      if (!response.ok) {
        throw new Error("Failed to fetch products");
      }
      return await response.json();
    } catch (error) {
      throw new Error((error as Error).message);
    }
  };
  
  export const fetchSortProducts = async (sort: string = "asc") => {
    try {
      const response = await fetch(`https://fakestoreapi.com/products?sort=${sort}`);
      if (!response.ok) {
        throw new Error("Failed to fetch products");
      }
      return await response.json();
    } catch (error) {
      throw new Error((error as Error).message);
    }
  };
  
  export const fetchProductsWithLimit = async (limit: number) => {
    try {
      const response = await fetch(`https://fakestoreapi.com/products?limit=${limit}`);
      if (!response.ok) {
        throw new Error("Failed to fetch products with limit");
      }
      return await response.json();
    } catch (error) {
      throw new Error((error as Error).message);
    }
  };
  