/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useState, useRef, useEffect } from "react";
import PropTypes from "prop-types";
// eslint-disable-next-line import/no-unresolved
import { useAutoAnimate } from "@formkit/auto-animate/react";
import { toast } from "react-toastify";
import { getTags, handleUpdate } from "../../services/api";
import "react-toastify/dist/ReactToastify.css";

function EditModal({ setIsEditModalOpen, setIsMemberAdded, memberToEdit }) {
  const notify = () =>
    toast.success("Membre modifié avec succès !", {
      position: "top-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: true,
      progress: undefined,
      theme: "dark",
    });
  const [parent] = useAutoAnimate();
  const nameRef = useRef();
  const ageRef = useRef();
  const [tags, setTags] = useState([]);
  const [selectedTags, setSelectedTags] = useState([]);
  const [errors, setErrors] = useState({});

  const args = {
    memberToEdit,
    nameRef,
    ageRef,
    selectedTags,
    setIsEditModalOpen,
    setErrors,
    setIsMemberAdded,
  };

  useEffect(() => {
    getTags(setTags);
  }, []);

  return (
    <div className="absolute top-0 left-0 w-full h-full bg-slate-600 bg-opacity-60 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow flex flex-col items-center justify-center p-4">
        <h1 className="text-3xl font-bold text-slate-900 pb-10">
          Modifier un membre
        </h1>
        <form
          ref={parent}
          className="flex flex-col items-center justify-center w-full p-6 gap-2"
          onSubmit={(e) => {
            e.preventDefault();
            handleUpdate(args);
            notify();
          }}
        >
          <label htmlFor="name" className="text-xl text-slate-900">
            Nom
          </label>
          <input
            type="text"
            name="firstname"
            id="firstname"
            className="w-64 h-10 rounded shadow-lg border p-2"
            ref={nameRef}
            defaultValue={memberToEdit.name}
          />
          {errors.name && (
            <p className="text-red-600 font-bold text-sm">{errors.name}</p>
          )}
          <label htmlFor="age" className="text-xl text-slate-900">
            Age
          </label>
          <input
            type="number"
            name="age"
            id="age"
            className="w-64 h-10 rounded shadow-lg border p-2"
            ref={ageRef}
            defaultValue={memberToEdit.age}
          />
          {errors.age && (
            <p className="text-red-600 font-bold text-sm">{errors.age}</p>
          )}
          <h1 className="text-xl text-slate-900">Tags Actuels</h1>
          {memberToEdit.tags && (
            <div className="flex flex-wrap gap-2">
              {memberToEdit.tags.map((tag) => (
                <div
                  key={tag}
                  className="flex items-center justify-center bg-slate-900 text-white rounded-lg w-32 h-10"
                >
                  {tag}
                </div>
              ))}
            </div>
          )}
          <label htmlFor="tags" className="text-xl text-slate-900">
            Nouveaux Tags
          </label>
          <p className="text-red-600 text-xs">Les anciens seront supprimés !</p>
          <div className="relative w-full h-10">
            <select
              id="tags"
              className="w-full h-full rounded shadow-lg border p-2"
            >
              <option value="---">---</option>
              {tags.map((tag) => (
                // eslint-disable-next-line jsx-a11y/control-has-associated-label
                <option
                  key={tag.name}
                  value={`${tag.id}.${tag.name}`}
                  className="text-slate-900"
                >
                  {tag.name}
                </option>
              ))}
            </select>
            <button
              type="button"
              className="absolute right-0 h-full bg-green-900 text-white font-bold rounded w-6"
              onClick={() => {
                const tagId = document
                  .getElementById("tags")
                  .value.split(".")[0];
                const tagName = document
                  .getElementById("tags")
                  .value.split(".")[1];
                const newTags = [...selectedTags];
                if (
                  !selectedTags.find((tag) => tag.name === tagName) &&
                  tagId !== "---"
                ) {
                  newTags.push({ tag_id: tagId, name: tagName });
                }
                setSelectedTags(newTags);
              }}
            >
              +
            </button>
          </div>
          {errors.tags && (
            <p className="text-red-600 font-bold text-sm">{errors.tags}</p>
          )}
          {selectedTags.map((tag) => (
            <div
              key={tag.name}
              className="flex items-center justify-between w-64 h-10 rounded shadow-lg border p-2"
            >
              <p className="text-slate-900">{tag.name}</p>
              <button
                type="button"
                className="bg-red-600 text-white font-bold rounded w-6 h-6"
                onClick={() => {
                  const newTags = [...selectedTags];
                  newTags.splice(newTags.indexOf(tag), 1);
                  setSelectedTags(newTags);
                }}
              >
                X
              </button>
            </div>
          ))}

          <div className="flex gap-4">
            <button
              type="button"
              className="bg-red-600 text-white font-bold p-2 mt-16 px-4 rounded"
              onClick={() => setIsEditModalOpen(false)}
            >
              Annuler
            </button>
            <button
              type="submit"
              className="bg-blue-900 text-white font-bold p-2 mt-16 px-4 rounded"
            >
              Modifier
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

EditModal.propTypes = {
  setIsEditModalOpen: PropTypes.func.isRequired,
  setIsMemberAdded: PropTypes.func.isRequired,
  memberToEdit: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    age: PropTypes.number.isRequired,
    tags: PropTypes.arrayOf(PropTypes.string).isRequired,
  }).isRequired,
};

export default EditModal;
