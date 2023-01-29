import axios from "axios";

const handleDeleteMember = async (id, setIsMemberDeleted) => {
  try {
    await axios.delete(`${import.meta.env.VITE_BACKEND_URL}/members/${id}}`);
    setIsMemberDeleted((old) => !old);
  } catch (error) {
    console.error(error);
  }
};

const getMembers = async (setMembers) => {
  try {
    const { data } = await axios.get(
      `${import.meta.env.VITE_BACKEND_URL}/members`
    );
    setMembers(data);
  } catch (err) {
    console.error(err);
  }
};

const handleSubmit = async ({
  nameRef,
  ageRef,
  selectedTags,
  setIsModalOpen,
  setErrors,
  setIsMemberAdded,
}) => {
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
      await axios.post(`${import.meta.env.VITE_BACKEND_URL}/members`, data, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      setIsMemberAdded((prev) => !prev);
      setIsModalOpen(false);
    } catch (err) {
      console.error(err);
    }
  }
};

const getTags = async (setTags) => {
  try {
    const { data } = await axios.get(
      `${import.meta.env.VITE_BACKEND_URL}/tags`
    );
    setTags(data);
  } catch (err) {
    console.error(err);
  }
};

const handleUpdate = async ({
  memberToEdit,
  nameRef,
  ageRef,
  selectedTags,
  setIsEditModalOpen,
  setErrors,
  setIsMemberAdded,
}) => {
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

export { handleDeleteMember, getMembers, handleSubmit, getTags, handleUpdate };
