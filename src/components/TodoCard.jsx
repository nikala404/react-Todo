import { useState } from "react";
export default function TodoCard({ image, time, day, onNameChange, clicked }) {
  const [value, setValue] = useState("");

  function handlChange(event) {
    const value = event.target.value;
    setValue(value);
    onNameChange(value);
  }

  return (
    <>
      <div className="img_div">
        <img src={image} alt="image" />
        <div className="date">
          <h4 className="day">{day}</h4>
          <h1 className="time">{time}</h1>
        </div>
      </div>
      <div className="input_div">
        <input
          type="text"
          name="todo_input"
          id="todo_input"
          value={value}
          onChange={handlChange}
          placeholder="Note"
        />
        <div className="svg_icon">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
          >
            <path
              d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z"
              fill="#20EEB0"
              stroke="#20EEB0"
              strokeWidth="2"
            />
            <path
              d="M10.7783 14.657L8.9143 12.7253C8.81386 12.6212 8.67763 12.5628 8.53558 12.5628C8.39354 12.5628 8.25731 12.6212 8.15687 12.7253C8.05643 12.8294 8 12.9706 8 13.1178C8 13.1907 8.01385 13.2628 8.04077 13.3302C8.06768 13.3975 8.10714 13.4587 8.15687 13.5102L10.4023 15.8372C10.6118 16.0543 10.9502 16.0543 11.1597 15.8372L16.8431 9.94748C16.9436 9.8434 17 9.70222 17 9.55502C17 9.40782 16.9436 9.26665 16.8431 9.16256C16.7427 9.05848 16.6065 9 16.4644 9C16.3224 9 16.1861 9.05848 16.0857 9.16256L10.7783 14.657Z"
              fill="white"
            />
          </svg>
        </div>
        <button className="add_todo" onClick={clicked}>
          +
        </button>
      </div>
    </>
  );
}
