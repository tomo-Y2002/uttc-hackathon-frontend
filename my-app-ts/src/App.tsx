import "./App.css";
import { useEffect, useState } from "react";
import Form from "./Form"

type UserData = {
  name: string;
  age: string;
}

function App() {
  const [users, setUsers] = useState<UserData[]>([]);

  const fetchData = async () => {
    try {
      const response = await fetch(
        "https://uttc-hackathon-backend-hrvcz32glq-uc.a.run.app/users",
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
        "https://uttc-hackathon-backend-hrvcz32glq-uc.a.run.app/user",
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