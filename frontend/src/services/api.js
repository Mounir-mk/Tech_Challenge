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

const validate = (data) => {
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
  return newErrors;
};

const handle = async (args) => {
  const {
    memberToEdit,
    nameRef,
    ageRef,
    selectedTags,
    setErrors,
    setIsMemberAdded,
    setIsModalOpen,
    setIsEditModalOpen,
    notify,
  } = args;

  const data = {
    name: nameRef.current.value,
    age: parseInt(ageRef.current.value, 10),
    tags: selectedTags.map((tag) => ({ tag_id: parseInt(tag.tag_id, 10) })),
  };
  const newErrors = validate(data);
  setErrors(newErrors);
  if (Object.keys(newErrors).length === 0) {
    try {
      const endpoint = memberToEdit
        ? `${import.meta.env.VITE_BACKEND_URL}/members/${memberToEdit.id}`
        : `${import.meta.env.VITE_BACKEND_URL}/members`;
      const method = memberToEdit ? "put" : "post";
      await axios[method](endpoint, data, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      setIsMemberAdded((prev) => !prev);
      if (memberToEdit) {
        setIsEditModalOpen(false);
        notify();
      } else {
        setIsModalOpen(false);
        notify();
      }
    } catch (err) {
      console.error(err);
    }
  }
};

const handleUpdate = (args) =>
  handle({ ...args, memberToEdit: args.memberToEdit });
const handleSubmit = (args) => handle({ ...args });

export { handleDeleteMember, getMembers, handleSubmit, getTags, handleUpdate };
