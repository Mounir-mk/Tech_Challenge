import { useState, useEffect } from "react";
// eslint-disable-next-line import/no-unresolved
import { useAutoAnimate } from "@formkit/auto-animate/react";
import AddModal from "./MainComponents/AddModal";
import EditModal from "./MainComponents/EditModal";
import MemberCard from "./MainComponents/MemberCard";
import { getMembers } from "../services/api";

function Main() {
  const [members, setMembers] = useState([]);
  const [isMemberAdded, setIsMemberAdded] = useState(false);
  const [isMemberDeleted, setIsMemberDeleted] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [memberToEdit, setMemberToEdit] = useState({});
  const [parent] = useAutoAnimate();

  useEffect(() => {
    getMembers(setMembers);
  }, [isMemberAdded, isMemberDeleted]);

  return (
    <main
      ref={parent}
      className="h-[calc(100%-128px)] w-full bg-white flex flex-col justify-around items-center"
    >
      <button
        type="submit"
        className="bg-black text-white font-bold p-2 rounded-md border-2 border-slate-500 focus:outline-none focus:ring-2 focus:ring-slate-500 focus:border-transparent"
        onClick={() => setIsModalOpen(true)}
      >
        Ajouter un Membre
      </button>
      {isModalOpen && (
        <AddModal
          setIsModalOpen={setIsModalOpen}
          isModalOpen={isModalOpen}
          setIsMemberAdded={setIsMemberAdded}
        />
      )}
      {isEditModalOpen && (
        <EditModal
          setIsEditModalOpen={setIsEditModalOpen}
          isEditModalOpen={isEditModalOpen}
          setIsMemberAdded={setIsMemberAdded}
          memberToEdit={memberToEdit}
        />
      )}
      <section className="h-[calc(100%-64px)] w-full md:flex md:justify-center md:items-center">
        <ul
          ref={parent}
          className="h-full w-full overflow-y-auto px-10 md:px-0 md:overflow-auto md:flex md:flex-wrap md:gap-4"
        >
          {members.map((member) => {
            return (
              <MemberCard
                member={member}
                setMemberToEdit={setMemberToEdit}
                setIsEditModalOpen={setIsEditModalOpen}
                setIsMemberDeleted={setIsMemberDeleted}
              />
            );
          })}
        </ul>
      </section>
    </main>
  );
}

export default Main;
