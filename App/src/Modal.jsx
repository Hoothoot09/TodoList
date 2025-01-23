import React, { useRef } from 'react';

const Modal = ({ setShowModal, showModal, setTodoList, inputValue }) => {
  const [title, setTitle] = React.useState('');
  const modalRef = useRef();

  const onSubmit = React.useCallback(
    (event) => {
      event.preventDefault();
      console.log('onSubmit: ', title);
      setTodoList((prev) => [...prev, { title: title, status: 'Incomplete' }]);
      setShowModal(false);
    },
    [title],
  );

  React.useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        setShowModal(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [setShowModal]);

  React.useEffect(() => console.log(title), [title]);
  if (!showModal) return null;

  return (
    <>
      <div className="containerModalFora" />
      <div ref={modalRef} className="containerModalDentro">
        <h1 className="modalTitulo">NEW NOTE</h1>
        <form onSubmit={onSubmit}>
          <input
            onChange={(event) => setTitle(event.target.value)}
            value={inputValue}
            className="inputModal"
            type="text"
            placeholder="Input your note..."
          />
          <div className="divBotaoModal">
            <button
              className="cancel"
              type="button"
              onClick={() => setShowModal(false)}
            >
              CANCEL
            </button>
            <button type="submit" className="apply">
              APPLY
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default Modal;
