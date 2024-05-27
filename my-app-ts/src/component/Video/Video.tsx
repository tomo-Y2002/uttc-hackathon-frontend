import React, { useState, useMemo } from 'react';
import { ItemData } from '../../types';
import './Video.css';

interface VideoProps {
  items: ItemData[];
  handleUpdateItem: (itemId: number, userId: string, categoryId: number, chapterId: number, title: string, description: string, content: string) => void;
  handleDeleteItem: (itemId: number) => void;
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

export const Video: React.FC<VideoProps> = ({ items, handleUpdateItem, handleDeleteItem}) => {
  const [editMode, setEditMode] = useState<boolean>(false);
  const [editingItem, setEditingItem] = useState<ItemData | null>(null);
  const [filterChapterId, setFilterChapterId] = useState<number | "">(0);
  const [sortKey, setSortKey] = useState<'createdAt' | 'updatedAt'>('createdAt');
  const [sortOrder, setSortOrder] = useState<'↑' | '↓'>('↑');

  const startEdit = (item: ItemData) => {
    setEditMode(true);
    setEditingItem({ ...item });
  };

  const handleEditChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (editingItem) {
      setEditingItem({ ...editingItem, [e.target.name]: e.target.value });
    }
  };

  const applyEdit = () => {
    if (editingItem) {
      handleUpdateItem(
        editingItem.itemId,
        editingItem.userId,
        editingItem.categoryId,
        editingItem.chapterId,
        editingItem.title,
        editingItem.description,
        editingItem.content
      );
      setEditMode(false);
      setEditingItem(null);
    }
  };

  const confirmAndDelete = (itemId: number) => {
    if (window.confirm('このアイテムを削除してもよろしいですか？')) {
      handleDeleteItem(itemId);
    }
  };

  const filteredAndSortedItems = useMemo(() => {
    let filteredItems = filterChapterId ? items.filter(item => item.chapterId === filterChapterId) : items;

    filteredItems.sort((a, b) => {
      if (a[sortKey] < b[sortKey]) return sortOrder === '↑' ? -1 : 1;
      if (a[sortKey] > b[sortKey]) return sortOrder === '↑' ? 1 : -1;
      return 0;
    });

    return filteredItems;
  }, [items, filterChapterId, sortKey, sortOrder]);

  const toggleSortOrder = () => {
    setSortOrder(sortOrder === '↑' ? '↓' : '↑');
  };

  return (
    <div className="video-container">
      <div className="video-header">
        <h2 className="video-title">技術系動画</h2>
        <div className="video-controls">
          <select onChange={e => setFilterChapterId(Number(e.target.value))} value={filterChapterId}>
            <option value="">- - - </option>
            <option value="1">OSコマンド</option>
            <option value="2">Git</option>
            <option value="3">GitHub</option>
            <option value="4">HTML&CSS</option>
            <option value="5">JavaScript</option>
            <option value="6">React</option>
            <option value="7">React x Typescript</option>
            <option value="8">SQL</option>
            <option value="9">Docker</option>
            <option value="10">Go</option>
            <option value="11">HTTP Server</option>
            <option value="12">RDBMS</option>
            <option value="13">UnitTest</option>
            <option value="14">フロントエンドとバックエンドの接続</option>
            <option value="15">CI</option>
            <option value="16">CD</option>
            <option value="17">認証</option>
            <option value="18">ハッカソン準備</option>
          </select>
          <select onChange={e => setSortKey(e.target.value as 'createdAt' | 'updatedAt')}>
            <option value="createdAt" onClick={toggleSortOrder}>作成日時 {sortOrder}</option>
            <option value="updatedAt" onClick={toggleSortOrder}>更新日時 {sortOrder}</option>
          </select>
        </div>
      </div>
      {editMode && editingItem ? (
        <div className="video-edit">
          <div className="edit-form">
            <label htmlFor="title">タイトル:</label>
            <input
              id="title"
              type="text"
              name="title"
              value={editingItem.title}
              onChange={handleEditChange}
            />
            <label htmlFor="content">YouTubeリンク:</label>
            <input
              id="content"
              type="text"
              name="content"
              value={editingItem.content}
              onChange={handleEditChange}
            />
            <button className="apply-button" onClick={applyEdit}>適用</button>
          </div>
        </div>
      ) : (
        <div className="video-item-wrapper">
          {filteredAndSortedItems.map((item, index) => {
            const videoId = extractYouTubeID(item.content || "");
            const videoSrc = videoId ? `https://www.youtube.com/embed/${videoId}` : "";
            return (
                <div key={index} className="video-item">
                  <div className="video-item-header">
                    <h3 className="item-title">{item.title}</h3>
                    <span className="item-created-at">{new Date(item.createdAt).toLocaleDateString()}</span>
                  </div>
                  {videoSrc && <iframe className="video-iframe" src={videoSrc} frameBorder="0" allowFullScreen></iframe>}
                  <div className="item-actions">
                    <button className="edit-button" onClick={() => startEdit(item)}>
                      <i className="fas fa-edit"></i> 編集
                    </button>
                    <button className="delete-button" onClick={() => confirmAndDelete(item.itemId)}>
                      <i className="fas fa-trash"></i> 削除
                    </button>
                  </div>
                </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
