import React from 'react';
import { Blog } from '../../component/Blog'; 
import { Book } from '../../component/Book'; 
import { Video } from '../../component/Video';
import { ItemData } from '../../types'; 

interface HomeProps {
  items: ItemData[];
  onUpdate: (itemId: number, userId: string, categoryId: number, chapterId: number, title: string,  description: string, content: string,) => void;
  onDelete: (itemId: number) => void;
}

export const Home: React.FC<HomeProps> = ({ items , onUpdate, onDelete}) => {
  const blogs = items.filter(item => item.categoryId === 1);
  const books = items.filter(item => item.categoryId === 2);
  const videos = items.filter(item => item.categoryId === 3);

  return (
    <div>
      <Blog items={blogs} handleUpdateItem={onUpdate} handleDeleteItem={onDelete}/>
      <Book items={books} handleUpdateItem={onUpdate} handleDeleteItem={onDelete}/>
      <Video items={videos} handleUpdateItem={onUpdate} handleDeleteItem={onDelete}/>
    </div>
  );
};
