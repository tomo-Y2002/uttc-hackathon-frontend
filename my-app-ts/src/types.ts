export interface ItemData {
  itemId: number;
  userId: string; 
  categoryId: number; 
  chapterId: number; 
  title: string;
  description: string; 
  content: string; 
  createdAt: string; 
  updatedAt: string; 
}

export interface SubmitProps {
  userId: string; 
  categoryId: number; 
  chapterId: number; 
  title: string; 
  description: string; 
  content: string; 
}

export interface UpdateProps {
  itemId: number;
  userId: string; 
  categoryId: number; 
  chapterId: number; 
  title: string; 
  description: string; 
  content: string; 
}

export interface DeleteProps {
  itemId: number;
}