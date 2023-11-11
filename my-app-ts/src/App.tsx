import "./App.css";
import { useEffect, useState } from "react";
import { initializeFirebaseApp } from "./firebase";
import Signup from "./pages/signup";
import Signin from "./pages/signin";
import { AuthProvider } from "./feature/auth/provider/AuthProvider";
import {Header} from "./component/Header";
import { BrowserRouter, Link, Route, Routes } from "react-router-dom";
import { ProtectedRoute } from "./component/auth/ProtectedRoute";
import { ItemForm } from "./component/Form/ItemForm";
import { ItemData } from "./types";
import { Home } from "./pages/Home/Home";

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
      <header className="App-header">
        <h1>User Register</h1>
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.1/css/all.min.css"></link>
      </header>
      <AuthProvider>
        <Header />
        <BrowserRouter>
          <Link to="/">Home</Link>
          <br />
          <Link to="/signup">SignUp</Link>
          <br />
          <Link to="/signin">SignIn</Link>
          <br />
          <Routes>
            <Route path="/" element={
              <ProtectedRoute>
                <div>
                  <div>以下アイテムリスト</div>
                  <ItemForm onSubmit={handleSubmitItem}/>
                  <Home items={items} onUpdate={handleUpdateItem} onDelete={handleDeleteItem}/>
                </div>
              </ProtectedRoute>
            } />
            <Route path="/signup" element={<Signup/>}/>
            <Route path="/signin" element={<Signin/>}/>
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </div>
  );
}

export default App;