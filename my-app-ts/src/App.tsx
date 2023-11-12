import "./App.css";
import { useEffect, useState } from "react";
import { initializeFirebaseApp } from "./firebase";
import Signup from "./pages/signup";
import Signin from "./pages/signin";
import { AuthProvider } from "./feature/auth/provider/AuthProvider";
// import {Header} from "./component/Header";
import { BrowserRouter, Link, Route, Routes } from "react-router-dom";
import { ProtectedRoute } from "./component/auth/ProtectedRoute";
import { ItemForm } from "./component/Form/ItemForm";
import { ItemData } from "./types";
// import { Home } from "./pages/Home/Home";
import { Blog } from './component/Blog'; 
import { Book } from './component/Book'; 
import { Video } from './component/Video';
import { Navbar } from "./component/Navbar";
import { Header } from  "./component/Header/Header"

initializeFirebaseApp();
function App() {
  const [items, setItems] = useState<ItemData[]>([]);
  const endpoint = process.env.REACT_APP_ENDPOINT || "http://localhost:8080";

  const fetchItems = async () => {
    try {
      const response = await fetch(
        endpoint+"/items",
         {
           method: "GET" 
         }
      );
      if (!response.ok) {
        throw new Error("Failed to fetch data: ${response.status}");
      }
      const items = await response.json();
      setItems(items);
    } catch (error) {
      console.error(error);
    }
  };


  useEffect(() => {
    fetchItems();
  }, []);

  const handleSubmitItem = async(userId: string, categoryId: number, chapterId: number, title: string, description: string, content: string) => {
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
      
      fetchItems();
    } catch (error) {
      console.error(error);
    }
  };

  const handleUpdateItem = async(itemId: number, userId: string, categoryId: number, chapterId: number, title: string, description: string, content: string) => {
    try {
      const response = await fetch(
        endpoint + "/items",
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            itemId,
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
      
      fetchItems();
    } catch (error) {
      console.error(error);
    }
  };

  const handleDeleteItem = async(itemId: number) => {
    try {
      const response = await fetch(
        endpoint + "/items",
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            itemId
          }),
        }
      );
      if (!response.ok) {
        throw new Error("Failed to create user: ${response.status}");
      }
      
      fetchItems();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="App">
      <header >
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/9.15.10/styles/solarized-dark.min.css"/>
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.1/css/all.min.css"></link>
      </header>
      <AuthProvider>
        <BrowserRouter>
          <Header />
          <Routes>
            <Route path="/" element={
              <ProtectedRoute>
                <div className="item-container">
                  <h2>アイテム追加</h2>
                  <ItemForm onSubmit={handleSubmitItem}/>
                  {/* <Home items={items} onUpdate={handleUpdateItem} onDelete={handleDeleteItem}/> */}
                </div>
              </ProtectedRoute>
            } />
            <Route path="/blog" element={
              <ProtectedRoute>
                <Blog items={items.filter(item => item.categoryId === 1)} handleUpdateItem={handleUpdateItem} handleDeleteItem={handleDeleteItem} />
              </ProtectedRoute>
            } />
            <Route path="/book" element={
              <ProtectedRoute>
                <Book items={items.filter(item => item.categoryId === 2)} handleUpdateItem={handleUpdateItem} handleDeleteItem={handleDeleteItem} />
              </ProtectedRoute>
            } />
            <Route path="/video" element={
              <ProtectedRoute>
                <Video items={items.filter(item => item.categoryId === 3)} handleUpdateItem={handleUpdateItem} handleDeleteItem={handleDeleteItem} />
              </ProtectedRoute>
            } />
            <Route path="/signup" element={<Signup/>}/>
            <Route path="/signin" element={<Signin/>}/>
            <Route path="/*" element={<div>No content</div>}/>
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </div>
  );
}

export default App;