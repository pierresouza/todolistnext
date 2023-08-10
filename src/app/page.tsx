"use client";
import Image from "next/image";
import styles from "./page.module.css";
import { useState } from "react";
import { IoIosRemoveCircleOutline } from "react-icons/io";
import { IoIosAddCircle } from "react-icons/io";
import { api } from "../services";
import Swal from "sweetalert2";

export default function Home() {
  const [checked, setChecked] = useState(false);
  const [todos, setTodos] = useState<string[]>([]);
  const [removed, setRemoved] = useState<string[]>([]);
  const [value, setValue] = useState("");

  function handleChecked() {
    setChecked(!checked);
    console.log(checked);
  }

  function handleRemove(index: any) {
    const remove = todos.splice(index, 1);
    setRemoved(remove);
    console.log(remove);
  }

  const onSubmit = (data: any) => {
    if (!data)
      return api
        .post("/tasks", data)
        .then((response) => {
          Swal.fire({
            title: "Sucesso ",
            text: "tarefca criada com sucesso",
            icon: "success",
            confirmButtonText: "ok",
          });
          console.log(response.data);
        })
        .catch((error) => {
          Swal.fire({
            title: "Erro ",
            text: "Erro ao criar tarefa",
            icon: "error",
            confirmButtonText: "ok",
          });
          console.log(error);
        });
  };

  return (
    <div className={styles.main}>
      <div className={styles.box}>
        <form
        onClick={onSubmit}
          onSubmit={(event) => {
            event.preventDefault();
            if (!!value) {
              setTodos([...todos, value]);
              setValue("");
            }
            setTodos([...todos, value]);
          }}
        >
          <div className={styles.inputArea}>
            <button type="submit">
              <IoIosAddCircle size={24} color={"blue"} />
            </button>
            <input type="text" placeholder="Crie uma tarefa" value={value} onChange={(event) => setValue(event.target.value)} required />
            <select name="" id="">
              <option value="In Progress">In Progress</option>
              <option value="Completed">Completed</option>
              <option value="Removed">Removed</option>
            </select>
          </div>
          <ul>
            {todos.map((todos, index) => {
              return (
                <li key={index} className={styles.listArea}>
                  <div className={styles.boxButtons}>
                    <input type="checkbox" checked={checked} onChange={handleChecked} />
                    {todos}
                    <button className={styles.btnRemove} title="deletar tarefa" value={removed} onClick={handleRemove}>
                      <IoIosRemoveCircleOutline size={24} color={"red"} />
                    </button>
                  </div>
                </li>
              );
            })}
          </ul>
        </form>
      </div>
    </div>
  );
}
