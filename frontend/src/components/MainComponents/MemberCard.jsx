import React from "react";
import PropTypes from "prop-types";
import edit from "../../assets/edit.svg";
import trash from "../../assets/trash.svg";
import { handleDeleteMember } from "../../services/api";

function MemberCard({
  member,
  setMemberToEdit,
  setIsEditModalOpen,
  setIsMemberDeleted,
}) {
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
        <button
          type="button"
          onClick={() => {
            setMemberToEdit(member);
            setIsEditModalOpen(true);
          }}
        >
          <img src={edit} alt="edit" className="h-6 w-6" />
        </button>
        <button
          type="button"
          onClick={() => handleDeleteMember(member.id, setIsMemberDeleted)}
        >
          <img src={trash} alt="trash" className="h-6 w-6" />
        </button>
      </div>
    </li>
  );
}

MemberCard.propTypes = {
  member: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    age: PropTypes.number.isRequired,
    tags: PropTypes.arrayOf(PropTypes.string).isRequired,
  }).isRequired,
  setMemberToEdit: PropTypes.func.isRequired,
  setIsEditModalOpen: PropTypes.func.isRequired,
  setIsMemberDeleted: PropTypes.func.isRequired,
};

export default MemberCard;
