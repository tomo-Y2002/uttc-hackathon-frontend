import { SubmitProps } from "../types";


export const useSubmitItem = () => {

  const endpoint = process.env.REACT_APP_ENDPOINT || "http://localhost:8080";

  const handleSubmitItem = async(props: SubmitProps) => {
    const { userId, categoryId, chapterId, title, description, content } = props;

    try {
      const response = await fetch(
        endpoint + "/items",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
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

  return { handleSubmitItem }
};