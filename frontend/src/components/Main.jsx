import { useState } from "react";
import axios from "axios";
import PropTypes from "prop-types";
import AddModal from "./MainComponents/AddModal";
import edit from "../assets/edit.svg";
import trash from "../assets/trash.svg";

function Main({ members }) {
  const handleDeleteMember = async (id) => {
    try {
      const response = await axios.delete(
        `http://localhost:3000/members/${id}`
      );
      console.warn(response);
    } catch (error) {
      console.error(error);
    }
  };
  const [isModalOpen, setIsModalOpen] = useState(false);
  return (
    <main className="h-[calc(100%-128px)] w-full bg-white flex flex-col justify-around items-center">
      <button
        type="submit"
        className="bg-black text-white font-bold p-2 rounded-md border-2 border-slate-500 focus:outline-none focus:ring-2 focus:ring-slate-500 focus:border-transparent"
        onClick={() => setIsModalOpen(true)}
      >
        Ajouter un Membre
      </button>
      {isModalOpen && (
        <AddModal setIsModalOpen={setIsModalOpen} isModalOpen={isModalOpen} />
      )}
      <section className="h-[calc(100%-64px)] w-full md:flex md:justify-center md:items-center">
        <ul className="h-full w-full overflow-y-auto px-10 md:px-0 md:overflow-auto md:flex md:flex-wrap md:gap-4">
          {members.map((member) => {
            return (
              <li
                className="h-24 w-full border my-4 border-slate-500 rounded-md flex shadow-neutral-200 md:flex-responsive-card"
                key={member.id}
              >
                <div className="h-full w-1/2 bg-slate-200 rounded-l-md flex flex-col items-center justify-center">
                  <p className="text-xl font-bold">{member.name}</p>
                  {member.tags.map((tag) => {
                    return <p className="text-sm font-semibold">{tag}</p>;
                  })}
                </div>
                <div className="h-full w-1/2 bg-slate-500 rounded-r-md flex items-center justify-evenly">
                  <button type="button">
                    <img src={edit} alt="edit" className="h-6 w-6" />
                  </button>
                  <button
                    type="button"
                    onClick={() => handleDeleteMember(member.id)}
                  >
                    <img src={trash} alt="trash" className="h-6 w-6" />
                  </button>
                </div>
              </li>
            );
          })}
        </ul>
      </section>
    </main>
  );
}

Main.propTypes = {
  members: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
    })
  ).isRequired,
};

export default Main;
