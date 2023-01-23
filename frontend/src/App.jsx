import axios from "axios";
import { useEffect, useState, useRef } from "react";

function App() {
  const memberRef = useRef();
  const [members, setMembers] = useState([]);
  const [isMemberAdded, setIsMemberAdded] = useState(false);

  const handleSubmit = async () => {
    try {
      await axios.post(`${import.meta.env.VITE_BACKEND_URL}/members`, {
        name: memberRef.current.value,
      });
      setIsMemberAdded(!isMemberAdded);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    const getMembers = async () => {
      try {
        const { data } = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/members`
        );
        setMembers(data);
      } catch (err) {
        console.error(err);
      }
    };
    getMembers();
  }, [isMemberAdded]);
  return (
    <div className="h-screen w-screen flex place-content-center">
      <div className="h-full w-full md:w-5/6 bg-red-500 flex flex-col justify-between">
        <header className="h-16 bg-blue-500 flex justify-around">
          <div className="h-16 w-16 bg-yellow-500">Logo</div>
          <div className="h-16 w-16 bg-yellow-500">Title</div>
        </header>
        <main className="h-[calc(100%-128px)] bg-green-500 flex flex-col justify-around items-center">
          <form className="h-16 w-96 bg-yellow-500 flex justify-around items-center">
            <input
              className="h-8 w-64 bg-white"
              type="text"
              placeholder="Ajouter un membre"
              ref={memberRef}
            />
            <button
              type="submit"
              className="h-8 w-16 bg-white"
              onClick={(e) => {
                e.preventDefault();
                handleSubmit();
              }}
            >
              Ajouter
            </button>
          </form>
          <section className="w-full bg-yellow-500 flex gap-4 md:justify-around overflow-x-auto">
            {/* each 10 members a new unordered list  */}
            {members.map((a, index) => {
              if (index % 10 === 0) {
                return (
                  <ul className="bg-white flex flex-col">
                    {members.slice(index, index + 10).map((member) => {
                      return <li>{member.name}</li>;
                    })}
                  </ul>
                );
              }
              return null;
            })}
          </section>
        </main>
        <footer className="h-16 bg-yellow-500">Footer</footer>
      </div>
    </div>
  );
}

export default App;
