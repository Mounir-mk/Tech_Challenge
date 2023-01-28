import axios from "axios";
import { useEffect, useState, useRef } from "react";
import Header from "./components/Header";
import Main from "./components/Main";
import Footer from "./components/Footer";

function App() {
  const memberRef = useRef();
  const [members, setMembers] = useState([]);
  const [isMemberAdded, setIsMemberAdded] = useState(false);
  const [isMaxMembers, setIsMaxMembers] = useState(false);

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

    if (members.length >= 45) {
      setIsMaxMembers(true);
    }
  }, [isMemberAdded]);
  return (
    <div className="h-screen w-screen flex place-content-center">
      <div className="h-full w-full md:w-5/6  flex flex-col justify-between">
        <Header />
        <Main
          members={members}
          isMaxMembers={isMaxMembers}
          memberRef={memberRef}
          handleSubmit={handleSubmit}
        />
        <Footer />
      </div>
    </div>
  );
}

export default App;
