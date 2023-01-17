import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";

const Form = ({ getUsers, updateInfo, setUpdateInfo, closeForm }) => {
      const { register, reset, handleSubmit } = useForm();
      const defaultValue = {
            first_name: "",
            last_name: "",
            email: "",
            password: "",
            birthday: "",
      };
      const createUser = (data) => {
            const URL = "https://users-crud1.herokuapp.com/users/";
            axios.post(URL, data)
                  .then((res) => {
                        console.log(res.data);
                        getUsers();
                  })
                  .catch((err) => console.log(err));
      };
      useEffect(() => {
            if (updateInfo) {
                  reset(updateInfo);
            }
      }, [updateInfo]);

      const updateUser = (data) => {
            const URL = `https://users-crud1.herokuapp.com/users/${updateInfo.id}/`;
            axios.patch(URL, data)
                  .then((res) => {
                        console.log(res.data);
                        getUsers();
                  })
                  .catch((err) => console.log(err));
      };
      const submit = (data) => {
            if (updateInfo) {
                  // Update Movie
                  updateUser(data);
                  setUpdateInfo();
            } else {
                  // Create User
                  createUser(data);
                  console.log(data);
            }
            reset(defaultValue);
            closeForm();
      };
      const close = () => {
            closeForm();
            reset(defaultValue);
      };
      return (
            <form onSubmit={handleSubmit(submit)} className="form">
                  <div onClick={close} className="form__equis">
                        x
                  </div>
                  <h2 className="form__title">{updateInfo ? "Update Users" : "Create User"}</h2>
                  <ul className="form__list">
                        <li className="form__item">
                              <label htmlFor="first_name">
                                    <i className="bx bx-user"></i>:
                              </label>
                              <div className="item">
                                    <input {...register("first_name")} type="text" id="first_name" placeholder="Name" />
                                    <input {...register("last_name")} type="text" id="last_name" placeholder="Surname" />
                              </div>
                        </li>
                        <li className="form__item">
                              <label htmlFor="email">
                                    <i className="bx bx-envelope"></i>:
                              </label>
                              <input {...register("email")} type="text" id="email" placeholder="Email" />
                        </li>
                        <li className="form__item">
                              <label htmlFor="password">
                                    <i className="bx bxs-lock-alt"></i>:
                              </label>
                              <input {...register("password")} type="password" id="password" placeholder="Password" />
                        </li>
                        <li className="form__item">
                              <label htmlFor="date">
                                    <i className="bx bx-cake"></i>:
                              </label>
                              <input {...register("birthday")} type="date" id="date" />
                        </li>
                  </ul>
                  <button className="form__btn"> {updateInfo ? "Update" : "Create"}</button>
            </form>
      );
};

export default Form;
