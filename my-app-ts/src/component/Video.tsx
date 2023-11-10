import React from 'react';
import { ItemData } from '../types';
import './Video.css'; // Import the new stylesheet

interface VideoProps {
  items: ItemData[];
}

const extractYouTubeID = (url: string) => {
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
  const match = url.match(regExp);

  if (match && match[2].length === 11) {
    return match[2];
  } else {
    return null; // In case of an invalid URL format
  }
}

export const Video: React.FC<VideoProps> = ({ items }) => (
  <div className="video-container">
    <h2 className="video-title">技術系動画</h2>
    {items.map((item, index) => {
      const videoId = extractYouTubeID(item.content || "");
      const videoSrc = videoId ? `https://www.youtube.com/embed/${videoId}` : "";
      return (
        <div key={index} className="video-item">
          <h3 className="video-item-title">{item.title}</h3>
          {videoSrc && <iframe className="video-iframe" src={videoSrc} frameBorder="0" allowFullScreen></iframe>}
        </div>
      );
    })}
  </div>
);
