import { DeleteProps } from "../types";

export const useDeleteItem = () => {
  const endpoint = process.env.REACT_APP_ENDPOINT || "http://localhost:8080";

  const handleDeleteItem = async(props: DeleteProps) => {
    const { itemId } = props;
  
    try {
      const response = await fetch(
        endpoint + "/items",
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            itemId
          }),
        }
      );
      if (!response.ok) {
        throw new Error("Failed to create user: ${response.status}");
      }
      
    } catch (error) {
      console.error(error);
    }
  };

  return { handleDeleteItem }
}
