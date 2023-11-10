import React from 'react';
import { Blog } from '../../component/Blog'; 
import { Book } from '../../component/Book'; 
import { Video } from '../../component/Video';
import { ItemData } from '../../types'; 

interface HomeProps {
  items: ItemData[];
}

export const Home: React.FC<HomeProps> = ({ items }) => {
  const blogs = items.filter(item => item.categoryId === 1);
  const books = items.filter(item => item.categoryId === 2);
  const videos = items.filter(item => item.categoryId === 3);

  return (
    <div>
      <Blog items={blogs} />
      <Book items={books} />
      <Video items={videos} />
    </div>
  );
};
