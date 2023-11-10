import React from 'react';
import { ItemData } from '../types';
import './Blog.css'; // スタイルシートをインポート

interface BlogProps {
  items: ItemData[];
}

export const Blog: React.FC<BlogProps> = ({ items }) => (
  <div className="blog-container">
    <h2 className="blog-title">技術ブログ</h2>
    {items.map((item, index) => (
      <div key={index} className="blog-item">
        <h3 className="item-title">{item.title}</h3>
        <p className="item-content">{item.content}</p>
      </div>
    ))}
  </div>
);
