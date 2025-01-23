import React, { useRef } from 'react';
import './Body.module.css';
import Detective from '../img/Detective-check-footprint 1.svg?react';
import Plus from '../img/plus.svg?react';
import Trash from '../img/trash-svgrepo-com 1.svg?react';
import Edit from '../img/edit.svg?react';

const Body = ({
  setShowModal,
  todoList,
  setTodoList,
  displayedList,
  edit,
  setEdit,
  inputValue,
  setInputValue,
  search,
  theme,
}) => {
  const inputRef = useRef(null);

  const handleDelete = (task) => {
    const newDelete = todoList.filter((todo) => todo.title !== task.title);
    setTodoList(newDelete);
  };

  const handleEditClick = (index) => {
    setEdit(index);
    setInputValue(todoList[index].title);
    setTimeout(() => {
      inputRef.current?.focus();
    }, 0);
  };

  React.useEffect(() => {
    const handleClickOutside = (event) => {
      if (inputRef.current && !inputRef.current.contains(event.target)) {
        setEdit(null);
      }
    };
    document.addEventListener('mouseDown', handleClickOutside);
    return () => {
      document.removeEventListener('mouseDown', handleClickOutside);
    };
  }, [setEdit]);

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      const updatedTodo = [...todoList];
      updatedTodo[edit].title = inputValue;
      setEdit(updatedTodo);
    }
    if (event.key === 'Escape') {
      setEdit(null);
    }
  };

  console.log('displayedList: ', displayedList);

  return (
    <div className="container">
      {displayedList.length > 0 ? (
        displayedList
          .filter((task) => {
            return task.title.toLowerCase().includes(search.toLowerCase());
          })
          .map((item, index) => (
            <li key={index} className="list">
              <>
                <div className="listContainer">
                  <div className="checked">
                    <input className="checkbox" type="checkbox" />
                    <>
                      {edit === index ? (
                        <input
                          ref={inputRef}
                          onChange={handleInputChange}
                          onKeyDown={handleKeyDown}
                          onBlur={() => setEdit(false)}
                          className="editInput"
                          placeholder="Edit your task..."
                          type="text"
                          defaultValue={item.title}
                        />
                      ) : (
                        <span
                          className="task"
                          onClick={() => handleEditClick(index)}
                        >
                          {item.title}
                        </span>
                      )}
                    </>
                  </div>
                  <div>
                    <button
                      onClick={() => handleEditClick(index)}
                      className="btnEdit"
                    >
                      <img src={Edit} alt="edit" />
                    </button>
                    <button
                      className="btnDelete"
                      onClick={(task) => handleDelete(item)}
                    >
                      <img src={Trash} alt="trash" />
                    </button>
                  </div>
                </div>
              </>
            </li>
          ))
      ) : (
        <>
          {theme === 'light' ? (
            <img className="detective" src={Detective} alt="detective" />
          ) : (
            <img className="detective" src={Detective} alt="detective" />
          )}
          <span className="empty">Empty...</span>
        </>
      )}
      <button className="addButtom" onClick={() => setShowModal(true)}>
        <img className="plus" src={Plus} alt="plus" />
      </button>
    </div>
  );
};

export default Body;
