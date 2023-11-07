import "./App.css";
import { useEffect, useState } from "react";
import Form from "./Form"
// import { onAuthStateChanged } from "firebase/auth";
// import { fireAuth } from "./firebase";
import { LoginForm } from "./LoginForm";

type UserData = {
  name: string;
  age: string;
}

function App() {
  const [users, setUsers] = useState<UserData[]>([]);
  // const [loginUser, setLoginUser] = useState(fireAuth.currentUser);
  // onAuthStateChanged(fireAuth, user => {
  //   setLoginUser(user);
  // });

  const fetchData = async () => {
    try {
      const response = await fetch(
        "http://localhost:8080/users",
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
        "http://localhost:8080/user",
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
      <LoginForm />
      <Form onSubmit={handleSubmit}/>
      <div className="user-list">
        {users.map((user, index) => (
          <div key={index} className="user-item">{user.name}, {user.age}</div>
        ))}
      </div>
    </div>
  );
}

export default App;