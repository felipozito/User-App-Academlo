import axios from "axios";
import { useEffect, useState } from "react";
import Form from "./Components/Form";
import "./App.css";
import CardUsers from "./Components/CardUser";

function App() {
      const [users, setUsers] = useState();
      const [updateInfo, setUpdateInfo] = useState();
      const [isFormOpen, setIsFormOpen] = useState(false);

      const getUsers = () => {
            const URL = "https://users-crud1.herokuapp.com/users/";
            axios.get(URL)
                  .then((res) => {
                        setUsers(res.data);
                  })
                  .catch((err) => console.log(err));
      };

      const openForm = () => setIsFormOpen(true);
      const closeForm = () => setIsFormOpen(false);

      useEffect(() => {
            getUsers();
      }, []);

      console.log(isFormOpen);
      return (
            <div className="App">
                  <div className="header">
                        <h2>USER APP</h2>
                        <button onClick={openForm} className="new_user_btn">
                              {" "}
                              <i className="bx bx-plus-circle"></i>Create Users
                        </button>
                  </div>
                  <div className={isFormOpen ? "form-container" : "form-none"}>
                        <Form getUsers={getUsers} updateInfo={updateInfo} setUpdateInfo={setUpdateInfo} closeForm={closeForm} />
                  </div>
                  <div className="card_container">
                        {users?.map((item) => (
                              <CardUsers key={item.id} user={item} getUsers={getUsers} setUpdateInfo={setUpdateInfo} openForm={openForm} />
                        ))}
                  </div>
            </div>
      );
}

export default App;
