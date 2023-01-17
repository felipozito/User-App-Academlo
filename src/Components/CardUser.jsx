import React from "react";
import axios from "axios";

const CardUser = ({ user, getUsers, setUpdateInfo, openForm }) => {
      const deleteUser = () => {
            const URL = `https://users-crud1.herokuapp.com/users/${user.id}/`;
            axios.delete(URL)
                  .then((res) => {
                        console.log(res.data);
                        getUsers();
                  })
                  .catch((err) => console.log(err));
      };
      const handleUpdateClick = () => {
            openForm();
            setUpdateInfo(user);
      };
      return (
            <article className="card">
                  <h2 className="card__title">
                        <i className="bx bx-user-circle"></i> {user.first_name} {user.last_name}
                  </h2>
                  <span>Email:</span>
                  <p className="card__mail">{user.email}</p>
                  <span>Birthday:</span>
                  <p className="card__title">{user.birthday}</p>
                  <div className="content_btn">
                        <button onClick={handleUpdateClick}>
                              <i className="bx bx-edit-alt"></i> Update
                        </button>
                        <button onClick={deleteUser}>
                              <i className="bx bx-trash"></i> Delete
                        </button>
                  </div>
            </article>
      );
};

export default CardUser;
