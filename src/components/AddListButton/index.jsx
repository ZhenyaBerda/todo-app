import React, { useState } from "react";
import List from "../List/List";
import Badge from "../Badge";

import closeSVG from "../../assets/img/close.svg";

import "./AddListButton.scss";

const AddListButton = ({ colors, onAdd }) => {
  const [visiblePopup, setVisiblePopup] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [selectedColor, selectColor] = useState(colors[0].id);

  const addList = () => {
    if (!inputValue) {
      alert('Введите название списка');
      return;
    }
    const color = colors.filter(color => color.id === selectedColor)[0].name;
    onAdd({
      id: Math.random(),
      name: inputValue,
      color: color
    });


  }


  return (
    <div className="add-list">
      <List
        onClick={() => setVisiblePopup(!visiblePopup)}
        items={[
          {
            className: "list__add-button",
            icon: (
              <svg
                width="12"
                height="12"
                viewBox="0 0 16 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M8 1V15"
                  stroke="black"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M1 8H15"
                  stroke="black"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            ),
            name: "Добавить список",
          },
        ]}
      />
      {visiblePopup && (
        <div className="add-list__popup">
          <img
            onClick={() => setVisiblePopup(false)}
            src={closeSVG}
            alt=""
            className="add-list__popup-close-btn"
          />
          <input
            value={inputValue}
            onChange = {e => setInputValue(e.target.value)}
            className="field"
            type="text"
            placeholder="Название списка"
          />
          <div className="add-list__popup-colors">
            {colors.map((color) => (
              <Badge
                onClick={() => selectColor(color.id)}
                key={color.id}
                color={color.name}
                className={selectedColor === color.id && "active"}
              />
            ))}
          </div>
          <button onClick={addList} className="button">Добавить</button>
        </div>
      )}
    </div>
  );
};

export default AddListButton;
