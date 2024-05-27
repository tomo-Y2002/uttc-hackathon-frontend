import { ItemData } from "../types";
import { useState } from "react";

export const useFetchItems = () => {
  const [items, setItems] = useState<ItemData[]>([]);
  const endpoint = process.env.REACT_APP_ENDPOINT || "http://localhost:8080";

  const fetchItems = async () => {
    try {
      const response = await fetch(
        endpoint+"/items",
        {
          method: "GET"
        }
      );
      if (!response.ok) {
        throw new Error("Failed to fetch data: ${response.status}");
      }
      const items = await response.json();
      setItems(items);
    } catch (error) {
      console.error(error);
    }
  };

  return { items, fetchItems };
}