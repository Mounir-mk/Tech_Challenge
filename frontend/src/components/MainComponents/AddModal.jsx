/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import PropTypes from "prop-types";

function AddModal({ setIsModalOpen, setIsMemberAdded }) {
  const nameRef = useRef();
  const ageRef = useRef();
  const [tags, setTags] = useState([]);
  const [selectedTags, setSelectedTags] = useState([]);
  const handleSubmit = async () => {
    // I need an object like this:
    // {
    //   name: "John",
    //   age: 25,
    //   tags: [
    //     {
    //       tag_id: 1,
    //     },
    //     {
    //       tag_id: 2,
    //     },
    //   ],
    // }
    const data = {
      name: nameRef.current.value,
      age: parseInt(ageRef.current.value, 10),
      tags: selectedTags.map((tag) => ({ tag_id: parseInt(tag.tag_id, 10) })),
    };
    try {
      await axios.post(`${import.meta.env.VITE_BACKEND_URL}/members`, data, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      setIsMemberAdded((prev) => !prev);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    const getTags = async () => {
      try {
        const { data } = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/tags`
        );
        setTags(data);
      } catch (err) {
        console.error(err);
      }
    };
    getTags();
  }, []);

  return (
    <div className="absolute top-0 left-0 w-full h-full bg-slate-600 bg-opacity-60 flex items-center justify-center">
      <div className="bg-white rounded-lg shadow flex flex-col items-center justify-center p-4">
        <h1 className="text-3xl font-bold text-slate-900 pb-10">
          Ajouter un membre
        </h1>
        <form
          className="flex flex-col items-center justify-center w-full p-6 gap-2"
          onSubmit={handleSubmit}
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
              onClick={(e) => {
                e.preventDefault();
                handleSubmit();
                setIsModalOpen(false);
              }}
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
