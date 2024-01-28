import { useState, useEffect } from "react";
import TodoCard from "./components/TodoCard.jsx";
import mainImage from "./assets/Rectangle.png";
import ToDo from "./components/ToDo.jsx";
import "./App.css";

function App() {
  const [weekday, setWeekday] = useState("");
  const [time, setTime] = useState("");
  const [name, setName] = useState("");
  const [todoList, setTodoList] = useState([]);
  const [isFormVisible, setFormVisibility] = useState(false);
  const [markedIndices, setMarkedIndices] = useState([]);

  function handleMarked(index) {
    if (markedIndices.includes(index)) {
      setMarkedIndices((prevMarkedIndices) =>
        prevMarkedIndices.filter((markedIndex) => markedIndex !== index)
      );
    } else {
      setMarkedIndices((prevMarkedIndices) => [...prevMarkedIndices, index]);
    }
  }

  function handleDeleted(index) {
    setTodoList((prevTodoList) => {
      const newTodoList = [...prevTodoList];
      newTodoList.splice(index, 1);
      return newTodoList;
    });
  }

  function handleClick() {
    const date = new Date();
    const currentDay = date.getDate();
    if (name.trim() !== "") {
      setTodoList([
        ...todoList,
        {
          name,
          date: `${currentDay - date.getDate()} days ago at ${date
            .toTimeString()
            .replace(" GMT+0400 (Georgia Standard Time)", "")}`,
        },
      ]);
      setName("");
    }

    setFormVisibility(true);
  }

  function handleNameChange(value) {
    setName(value);
  }

  useEffect(() => {
    const updateDateTime = () => {
      const currentDate = new Date();

      const dayOfWeek = currentDate.getDay();
      const weekdays = [
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
      ];
      setWeekday(weekdays[dayOfWeek] + ` ` + currentDate.getDate());

      const currentTime = `${currentDate.getHours()}:${currentDate.getMinutes()}`;
      setTime(currentTime);
    };

    updateDateTime();

    const intervalId = setInterval(updateDateTime, 1000);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <>
      <main>
        <div id="name">
          <h1>Todo</h1>
        </div>
        <div className="parent_div">
          <TodoCard
            image={mainImage}
            day={weekday}
            time={time}
            onNameChange={handleNameChange}
            clicked={handleClick}
          />
          <div id="todo_area">
            {isFormVisible && (
              <div className="todo">
                {todoList.map((todo, index) => (
                  <ToDo
                    key={index}
                    id={index}
                    name={todo.name}
                    date={todo.date}
                    marked={handleMarked}
                    deleted={() => handleDeleted(index)}
                    markSvg={
                      <svg
                        id={index}
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                      >
                        {markedIndices.includes(index) ? (
                          <>
                            <path
                              d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z"
                              fill="#20EEB0"
                              stroke="#20EEB0"
                              stroke-width="2"
                            />
                            <path
                              d="M10.7783 14.657L8.9143 12.7253C8.81386 12.6212 8.67763 12.5628 8.53558 12.5628C8.39354 12.5628 8.25731 12.6212 8.15687 12.7253C8.05643 12.8294 8 12.9706 8 13.1178C8 13.1907 8.01385 13.2628 8.04077 13.3302C8.06768 13.3975 8.10714 13.4587 8.15687 13.5102L10.4023 15.8372C10.6118 16.0543 10.9502 16.0543 11.1597 15.8372L16.8431 9.94748C16.9436 9.8434 17 9.70222 17 9.55502C17 9.40782 16.9436 9.26665 16.8431 9.16256C16.7427 9.05848 16.6065 9 16.4644 9C16.3224 9 16.1861 9.05848 16.0857 9.16256L10.7783 14.657Z"
                              fill="white"
                            />
                          </>
                        ) : (
                          <path
                            d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z"
                            stroke="#20EEB0"
                            stroke-width="2"
                          />
                        )}
                      </svg>
                    }
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </main>
    </>
  );
}

export default App;
