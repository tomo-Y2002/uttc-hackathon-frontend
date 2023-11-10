import React from 'react';
import { ItemData } from '../types';
import './Book.css'; // This will be our new stylesheet for the Book component

interface BookProps {
  items: ItemData[];
}

export const Book: React.FC<BookProps> = ({ items }) => (
  <div className="book-container">
    <h2 className="book-title">技術書</h2>
    {items.map((item, index) => (
      <div key={index} className="book-item">
        <h3 className="item-title">{item.title}</h3>
        <a href={item.content} className="item-link" target="_blank" rel="noopener noreferrer">
          {item.content}
        </a>
        {/* We might add a preview component here if we had a way to fetch preview data */}
      </div>
    ))}
  </div>
);
