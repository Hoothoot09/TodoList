import React from 'react';
import Header from './Header';
import Body from './Body';
import Modal from './Modal';
import '../public/style.css';

const App = () => {
  const [showModal, setShowModal] = React.useState(false);
  const [todoList, setTodoList] = React.useState([]);
  const [displayedList, setDisplayedList] = React.useState(todoList);
  const [search, setSearch] = React.useState('');
  const [theme, setTheme] = React.useState('light');
  const [edit, setEdit] = React.useState(false);
  const [inputValue, setInputValue] = React.useState('');
  React.useEffect(() => console.log(todoList), [todoList]);

  return (
    <div className={`mainContainer ${theme}`}>
      <Header
        theme={theme}
        todoList={todoList}
        setDisplayedList={setDisplayedList}
        search={search}
        setSearch={setSearch}
        setTheme={setTheme}
      />
      <Modal
        setShowModal={setShowModal}
        showModal={showModal}
        setTodoList={setTodoList}
      />
      <Body
        theme={theme}
        setShowModal={setShowModal}
        todoList={todoList}
        setTodoList={setTodoList}
        displayedList={displayedList}
        setDisplayedList={setDisplayedList}
        search={search}
        setSearch={setSearch}
        setTheme={setTheme}
        edit={edit}
        setEdit={setEdit}
        inputValue={inputValue}
        setInputValue={setInputValue}
      />
    </div>
  );
};

export default App;
