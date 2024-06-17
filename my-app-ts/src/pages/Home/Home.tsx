import React from 'react';
import { Blog } from '../../component/Blog/Blog'; 
import { Book } from '../../component/Book/Book'; 
import { Video } from '../../component/Video/Video';
import { ItemData, UpdateProps, DeleteProps } from '../../types'; 

interface HomeProps {
  items: ItemData[];
  onUpdate: (props: UpdateProps) => void;
  onDelete: (props: DeleteProps) => void;
}

export const Home: React.FC<HomeProps> = ({ items , onUpdate, onDelete}) => {
  const blogs = items.filter(item => item.categoryId === 1);
  const books = items.filter(item => item.categoryId === 2);
  const videos = items.filter(item => item.categoryId === 3);

  return (
    <div>
      {/* <Blog items={blogs} handleUpdateItem={onUpdate} handleDeleteItem={onDelete}/> */}
      {/* <Book items={books} handleUpdateItem={onUpdate} handleDeleteItem={onDelete}/>
      <Video items={videos} handleUpdateItem={onUpdate} handleDeleteItem={onDelete}/> */}
    </div>
  );
};
