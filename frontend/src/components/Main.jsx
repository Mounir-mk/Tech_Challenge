import PropTypes, { oneOfType } from "prop-types";

function Main({ members, isMaxMembers, memberRef, handleSubmit }) {
  return (
    <main className="h-[calc(100%-128px)] bg-green-500 flex flex-col justify-around items-center">
      <form className="h-16 w-96 flex justify-around items-center">
        <input
          className={`h-8 w-64 bg-white ${
            isMaxMembers ? "border-red-500 border-2 animate-pulse" : ""
          } `}
          type="text"
          placeholder="Ajouter un membre"
          ref={memberRef}
          disabled={isMaxMembers}
        />
        <button
          type="submit"
          className={`h-8 w-16 bg-white ${
            isMaxMembers ? "border-red-500" : ""
          }`}
          disabled={isMaxMembers}
          onClick={(e) => {
            e.preventDefault();
            handleSubmit();
          }}
        >
          Ajouter
        </button>
      </form>
      <section className="w-full bg-yellow-500 flex gap-4 md:justify-around overflow-x-auto">
        {/* each 15 members a new unordered list  */}
        {members.map((splitingMember, index) => {
          if (index % 15 === 0) {
            return (
              <ul className="bg-white flex flex-col" key={splitingMember.id}>
                {members.slice(index, index + 15).map((member) => {
                  return <li key={member.id}>{member.name}</li>;
                })}
              </ul>
            );
          }
          return null;
        })}
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
  isMaxMembers: PropTypes.bool.isRequired,
  memberRef: oneOfType([
    PropTypes.func,
    PropTypes.shape({ current: PropTypes.instanceOf(Element) }),
  ]).isRequired,
  handleSubmit: PropTypes.func.isRequired,
};

export default Main;
