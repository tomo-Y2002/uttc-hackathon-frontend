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

type UserData = {
  name: string;
  age: string;
}

initializeFirebaseApp();
function App() {
  const [users, setUsers] = useState<UserData[]>([]);
  const endpoint = process.env.REACT_ENDPOINT || "http://localhost:8080";

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

  useEffect(() => {
    fetchData();
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