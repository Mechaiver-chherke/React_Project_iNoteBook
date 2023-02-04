import React, { useContext } from "react";
import noteContext from "../Context/NoteContext";
const Noteitem = (props) => {
  const context = useContext(noteContext);
  const { deleteNote } = context;
  const { notes, updateNote } = props;

  return (
    <div className=" container col-md-3">
      <div className="card my-3">
        <div className="card-body">
          <div className="d-flex align-items-center">
            <h5 className="card-title">{notes.title}</h5>
            <i
              className="fa-solid fa-trash mx-2"
              onClick={() => {
                deleteNote(notes._id);
                props.showAlert("Deleted Note SuccessFully", "success");
              }}
              style={{ cursor: "pointer" }}
            ></i>
            <i
              className="fa-solid fa-pen-to-square mx-2"
              onClick={() => {
                updateNote(notes);
              }}
              style={{ cursor: "pointer" }}
            ></i>
          </div>
          <p className="card-text">{notes.description}</p>
        </div>
      </div>
    </div>
  );
};

export default Noteitem;
