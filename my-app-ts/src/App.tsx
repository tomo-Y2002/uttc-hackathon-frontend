import "./App.css";
import { useEffect } from "react";
import { initializeFirebaseApp } from "./firebase";
import { AuthProvider } from "./feature/auth/provider/AuthProvider";
import { BrowserRouter, Link, Route, Routes } from "react-router-dom";
import { ProtectedRoute } from "./feature/auth/provider/ProtectedRoute";
import { ItemForm } from "./component/Form/ItemForm";
import { Blog } from './component/Blog/Blog'; 
import { Book } from './component/Book/Book'; 
import { Video } from './component/Video/Video';
import { useFetchItems } from "./hooks/useFetchItems";
import { Header } from "./component/Header";
import { SignInPage } from "./pages/SignIn";
import { SignUpPage } from "./pages/SignUp";

initializeFirebaseApp();
function App() {
  const endpoint = process.env.REACT_APP_ENDPOINT || "http://localhost:8080";
  const { items, fetchItems} = useFetchItems();
  console.log("items in App", items.filter(item => item.categoryId === 1));

  useEffect(() => {
    fetchItems();
  }, []);

  return (
    <div className="App">
      <header >
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/9.15.10/styles/solarized-dark.min.css"/>
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.1/css/all.min.css"></link>
        <style>
        @import url('https://fonts.googleapis.com/css2?family=BIZ+UDPGothic&display=swap');
        </style>
      </header>
      <AuthProvider>
        <BrowserRouter>
          <Header />
          {/* 以下でコンポーネントのチェックを行っています。 */}
          <Routes>
            <Route path="/" element={
              <ProtectedRoute>
                <div className="item-container">
                  <h2>アイテム追加</h2>
                  <ItemForm fetchItems={fetchItems}/>
                  {/* <Home items={items} onUpdate={handleUpdateItem} onDelete={handleDeleteItem}/> */}
                </div>
              </ProtectedRoute>
            } />
            <Route path="/blog" element={
              <ProtectedRoute>
                <Blog items={items.filter(item => item.categoryId === 1)} fetchItems={fetchItems}/>
              </ProtectedRoute>
            } />
            <Route path="/book" element={
              <ProtectedRoute>
                <Book items={items.filter(item => item.categoryId === 2)} fetchItems={fetchItems} />
              </ProtectedRoute>
            } />
            <Route path="/video" element={
              <ProtectedRoute>
                <Video items={items.filter(item => item.categoryId === 3)} fetchItems={fetchItems} />
              </ProtectedRoute>
            } />
            <Route path="/signup" element={<SignUpPage/>}/>
            <Route path="/signin" element={<SignInPage/>}/>
            <Route path="/*" element={<div>No content</div>}/>
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </div>
  );
}

export default App;