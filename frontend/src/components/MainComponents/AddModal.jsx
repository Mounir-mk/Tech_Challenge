import React from "react";
import PropTypes from "prop-types";

function AddModal({ setIsModalOpen, handleSubmit, nameRef, ageRef, tagRef }) {
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
            <input
              type="text"
              name="tags"
              id="tags"
              className="w-64 h-full rounded shadow-lg border p-2"
              ref={tagRef}
            />
            <button
              type="button"
              className="absolute right-0 h-full bg-green-900 text-white font-bold rounded w-6"
              //   onClick={() => {
              //     setTags([...tags, tagRef.current.value]);
              //     tagRef.current.value = "";
              //   }}
            >
              +
            </button>
          </div>
          {/* <div className="flex flex-col items-center justify-center gap-2">
            {tags.map((tag, index) => (
              <div
                key={index}
                className="flex items-center justify-center gap-2"
              >
                <p>{tag}</p>
                <button
                  type="button"
                  className="bg-slate-900 text-white font-bold p-2 mt-16 px-4 rounded"
                  onClick={() => {
                    const newTags = [...tags];
                    newTags.splice(index, 1);
                    setTags(newTags);
                  }}
                >
                  X
                </button>
              </div>
            ))}
          </div> */}
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
  handleSubmit: PropTypes.func.isRequired,
  nameRef: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.shape({ current: PropTypes.string }),
  ]).isRequired,
  ageRef: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.shape({ current: PropTypes.string }),
  ]).isRequired,
  tagRef: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.shape({ current: PropTypes.string }),
  ]).isRequired,
};

export default AddModal;
