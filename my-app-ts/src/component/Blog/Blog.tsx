import React, { useState, useMemo } from 'react';
import { ItemData } from '../../types';
import './Blog.css';
import Modal from 'react-modal';
import { marked } from "marked";
import sanitizeHtml from 'sanitize-html';
import { UpdateProps, DeleteProps } from '../../types';
import { useUpdateItem } from '../../hooks/useUpdateItem';
import { useDeleteItem } from '../../hooks/useDeleteItem';

Modal.setAppElement('#root');

interface StringifyProps {
  msg: string;
}

interface BlogProps {
  items: ItemData[];
  fetchItems: () => void;
}

// export const Blog: React.FC<BlogProps> = ({ items, handleUpdateItem , handleDeleteItem}) => {
export const Blog = (blogProps: BlogProps) => {
  const { items, fetchItems } = blogProps;
  const [editMode, setEditMode] = useState<boolean>(false);
  const [editingItem, setEditingItem] = useState<ItemData | null>(null);
  const [filterChapterId, setFilterChapterId] = useState<number | "">(0);
  const [sortKey, setSortKey] = useState<'createdAt' | 'updatedAt'>('createdAt');
  const [sortOrder, setSortOrder] = useState<'↑' | '↓'>('↑');
  const [modalIsOpen, setIsOpen] = useState(false);
  const [selectedContent, setSelectedContent] = useState("");
  const [selectedTitle, setSelectedTitle] = useState("");
  const { handleUpdateItem } = useUpdateItem();
  const { handleDeleteItem } = useDeleteItem();

  marked.setOptions({
    gfm: true,
    breaks: true,
  });

  const startEdit = (item: ItemData) => {
    setEditMode(true);
    setEditingItem({ ...item });
  };

  const handleEditChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    if (editingItem) {
      setEditingItem({ ...editingItem, [e.target.name]: e.target.value });
    }
  };

  const applyEdit = () => {
    if (editingItem ) {
      const updateProps: UpdateProps = {
        itemId: editingItem.itemId,
        userId: editingItem.userId,
        categoryId: editingItem.categoryId,
        chapterId: editingItem.chapterId,
        title: editingItem.title,
        description: editingItem.description,
        content: editingItem.content,
      };
      handleUpdateItem(updateProps);
      fetchItems();
      setEditMode(false);
      setEditingItem(null);
    }
  };

  const confirmAndDelete = (itemId: number) => {
    if (window.confirm('このアイテムを削除してもよろしいですか？')) {
      const deleteProps: DeleteProps = {
        itemId: itemId,
      }
      handleDeleteItem(deleteProps);
      fetchItems();
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

  // モーダルを開く関数
  const openModal = (title: string, content: string) => {
    setSelectedContent(content);
    setSelectedTitle(title);
    setIsOpen(true);
  };

  // モーダルを閉じる関数
  const closeModal = () => {
    setIsOpen(false);
  };

  const customStyles = {
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
      width: '80%', // 幅を80%に設定
      maxWidth: '1000px', // 最大幅を設定
      minWidth: '300px', // 最小幅を設定
      maxHeight: '90vh', // 最大高さを画面の90%に設定
      overflow: 'auto', // 内容が多い場合はスクロール可能にする
      border: '1px solid #ccc',
      borderRadius: '10px',
      padding: '20px',
      backgroundColor: '#fff',
      boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
    },
    overlay: {
      backgroundColor: 'rgba(0, 0, 0, 0.75)',
    },
  };

  const Stringify: React.FC<StringifyProps> = ({ msg }) => {
    // const sanitizedText = sanitizeHtml(msg, {
    //   allowedTags: [],
    //   disallowedTagsMode: 'recursiveEscape',
    // });
    // const htmlText = marked.parse(sanitizedText);
    const texts = msg.split(/(\n)/).map((item, index) => (
      <React.Fragment key={index}>
        {item.match(/\n/) ? <br /> : item}
      </React.Fragment>
    ));
  
    return <div>{texts}</div>;
    // return <React.Fragment>{htmlText}</React.Fragment>;
  };
  
  
  return (
    <div className="blog-container">
      <div className="blog-header">
        <h2 className="blog-title">技術ブログ</h2>
        <div className="blog-controls">
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
        <div className="blog-edit">
          <div className="edit-form">
            <label htmlFor="title">タイトル:</label>
            <input
              id="title"
              type="text"
              name="title"
              value={editingItem.title}
              onChange={handleEditChange}
            />
            <label htmlFor="content">コンテンツ:</label>
            <textarea
              id="content"
              name="content"
              value={editingItem.content}
              onChange={handleEditChange}
            />
            <button className="apply-button" onClick={applyEdit}>適用</button>
          </div>
        </div>
      ) : (
        filteredAndSortedItems.map((item, index) => (
          <div key={index} className="blog-item">
            <div className="blog-item-header">
              <h3 className="item-title" onClick={() => openModal(item.title, item.content)}>{item.title}</h3>
              <span className="item-created-at">{new Date(item.createdAt).toLocaleDateString()}</span>
            </div>
            <p className="item-description">{item.description}</p>
            <div className="item-actions">
              <button className="edit-button" onClick={() => startEdit(item)}>
                <i className="fas fa-edit"></i> 編集
              </button>
              <button className="delete-button" onClick={() => confirmAndDelete(item.itemId)}>
                <i className="fas fa-trash"></i> 削除
              </button>
            </div>
          </div>
        ))
      )}
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Blog Content"
      >
        <div style={{ position: 'relative' }}>
          <button
            onClick={closeModal}
            style={{
              position: 'absolute',
              top: '0px',
              right: '20px',
              background: 'none',
              border: 'none',
              fontSize: '1.5rem',
              cursor: 'pointer',
            }}
          >
            &times;
          </button>
          <h2 style={{ marginBottom: '20px' }}>{selectedTitle}</h2>
          <div style={{ marginBottom: '20px' }}>
            <Stringify msg={selectedContent}/>
          </div>
        </div>
      </Modal>
    </div>
  );
};
