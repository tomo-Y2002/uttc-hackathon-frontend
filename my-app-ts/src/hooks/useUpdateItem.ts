import { UpdateProps } from "../types";

export const useUpdateItem = () => {
  const endpoint = process.env.REACT_APP_ENDPOINT || "http://localhost:8080";

  const handleUpdateItem = async(props: UpdateProps) => {
    const {itemId, userId, categoryId, chapterId, title, description, content} = props;

    try {
      const response = await fetch(
        endpoint + "/items",
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            itemId,
            userId,
            categoryId,
            chapterId,
            title,
            description,
            content
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

  return { handleUpdateItem };
}
