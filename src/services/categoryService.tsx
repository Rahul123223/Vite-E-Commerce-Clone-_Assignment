export const fetchCategories = async () => {
    try {
      const response = await fetch("https://fakestoreapi.com/products/categories");
      if (!response.ok) {
        throw new Error("Failed to fetch categories");
      }
      return await response.json();
    } catch (error) {
      throw new Error((error as Error).message);
    }
  };
  