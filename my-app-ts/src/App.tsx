import "./App.css";
import { useEffect, useState } from "react";
import Form from "./Form";
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

type UserData = {
  name: string;
  age: string;
}


initializeFirebaseApp();
function App() {
  const [users, setUsers] = useState<UserData[]>([]);
  const [items, setItems] = useState<ItemData[]>([]);
  const endpoint = process.env.REACT_APP_ENDPOINT || "http://localhost:8080";

  const fetchData = async () => {
    try {
      const response = await fetch(
        endpoint+"/users",
         {
           method: "GET" 
         }
      );
      if (!response.ok) {
        throw new Error("Failed to fetch data: ${response.status}");
      }
      const data = await response.json();
      setUsers(data);
    } catch (error) {
      console.error(error);
    }
  };

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
    fetchData();
    fetchItems();
  }, []);

  const handleSubmit = async(name: string, age: number) => {
    try {
      const response = await fetch(
        endpoint + "/user",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name,
            age
          }),
        }
      );
      if (!response.ok) {
        throw new Error("Failed to create user: ${response.status}");
      }
      
      fetchData();
    } catch (error) {
      console.error(error);
    }
  };

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

  return (
    <div className="App">
      <header className="App-header">
        <h1>User Register</h1>
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
                  <Form onSubmit={handleSubmit}/>
                  <div className="user-list">
                    {users.map((user, index) => (
                      <div key={index} className="user-item">{user.name}, {user.age}</div>
                    ))}
                  </div>
                  <div>以下アイテムリスト</div>
                  <ItemForm onSubmit={handleSubmitItem}/>
                  {/* <div className="user-list">
                    {items.map((item, index) => (
                      <div key={index} className="item-item">{item.title}, {item.content}</div>
                    ))}
                  </div> */}
                  <Home items={items}/>
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