/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import PropTypes from "prop-types";

function EditModal({ setIsEditModalOpen, setIsMemberAdded, memberToEdit }) {
  const nameRef = useRef();
  const ageRef = useRef();
  const [tags, setTags] = useState([]);
  const [selectedTags, setSelectedTags] = useState([]);
  const [member, setMember] = useState({});
  const [errors, setErrors] = useState({});
  const handleUpdate = async () => {
    const data = {
      name: nameRef.current.value,
      age: parseInt(ageRef.current.value, 10),
      tags: selectedTags.map((tag) => ({ tag_id: parseInt(tag.tag_id, 10) })),
    };
    const newErrors = {};
    if (!data.name) {
      newErrors.name = "Le nom est obligatoire";
    }
    if (!data.age) {
      newErrors.age = "L'âge est obligatoire";
    }
    if (data.tags.length === 0) {
      newErrors.tags = "Au moins un tag est obligatoire";
    }
    setErrors(newErrors);
    if (Object.keys(newErrors).length === 0) {
      try {
        await axios.put(
          `${import.meta.env.VITE_BACKEND_URL}/members/${memberToEdit.id}`,
          data,
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        setIsMemberAdded((prev) => !prev);
        setIsEditModalOpen(false);
      } catch (err) {
        console.error(err);
      }
    }
  };

  useEffect(() => {
    const getMember = async () => {
      try {
        const { data } = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/members/${memberToEdit.id}`
        );
        setMember(data);
      } catch (err) {
        console.error(err);
      }
    };
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
    getMember();
    getTags();
  }, []);

  return (
    <div className="absolute top-0 left-0 w-full h-full bg-slate-600 bg-opacity-60 flex items-center justify-center">
      <div className="bg-white rounded-lg shadow flex flex-col items-center justify-center p-4">
        <h1 className="text-3xl font-bold text-slate-900 pb-10">
          Modifier un membre
        </h1>
        <form
          className="flex flex-col items-center justify-center w-full p-6 gap-2"
          onSubmit={(e) => {
            e.preventDefault();
            handleUpdate();
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
            defaultValue={member.name}
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
            defaultValue={member.age}
          />
          {errors.age && (
            <p className="text-red-600 font-bold text-sm">{errors.age}</p>
          )}
          <h1 className="text-xl text-slate-900">Tags Actuels</h1>
          {member.tags && (
            <div className="flex flex-wrap gap-2">
              {member.tags.map((tag) => (
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
    tags: PropTypes.arrayOf(
      PropTypes.shape({
        tag_id: PropTypes.number.isRequired,
        name: PropTypes.string.isRequired,
      })
    ).isRequired,
  }).isRequired,
};

export default EditModal;
