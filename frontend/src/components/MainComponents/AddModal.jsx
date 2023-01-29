/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useState, useRef, useEffect } from "react";
import PropTypes from "prop-types";
import { handleSubmit, getTags } from "../../services/api";

function AddModal({ setIsModalOpen, setIsMemberAdded }) {
  const nameRef = useRef();
  const ageRef = useRef();
  const [tags, setTags] = useState([]);
  const [selectedTags, setSelectedTags] = useState([]);
  const [errors, setErrors] = useState({});

  const args = {
    nameRef,
    ageRef,
    setIsModalOpen,
    setIsMemberAdded,
    setErrors,
    selectedTags,
  };

  useEffect(() => {
    getTags(setTags);
  }, []);

  return (
    <div className="absolute top-0 left-0 w-full h-full bg-slate-600 bg-opacity-60 flex items-center justify-center">
      <div className="bg-white rounded-lg shadow flex flex-col items-center justify-center p-4">
        <h1 className="text-3xl font-bold text-slate-900 pb-10">
          Ajouter un membre
        </h1>
        <form
          className="flex flex-col items-center justify-center w-full p-6 gap-2"
          onSubmit={(e) => {
            e.preventDefault();
            handleSubmit(args);
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
          />
          {errors.age && (
            <p className="text-red-600 font-bold text-sm">{errors.age}</p>
          )}
          <label htmlFor="tags" className="text-xl text-slate-900">
            Tags
          </label>
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
              onClick={() => setIsModalOpen(false)}
            >
              Annuler
            </button>
            <button
              type="submit"
              className="bg-blue-900 text-white font-bold p-2 mt-16 px-4 rounded"
            >
              Ajouter
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

AddModal.propTypes = {
  setIsModalOpen: PropTypes.func.isRequired,
  setIsMemberAdded: PropTypes.func.isRequired,
};

export default AddModal;
