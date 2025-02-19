import { useState } from "react";
import { useUserContext } from "./context/UserContext";

const AddUserForm = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const { dispatch } = useUserContext();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if(!name || !email) return;

    const newUser = {id: Date.now(), name, email};

    const response = await fetch("http://localhost:8000", {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(newUser)
    })
    const data = await response.json();
    if(data){
    dispatch({type: "ADD_USER", payload: data.user});
    setEmail("");
    setName("");
    } else {
        console.error("Failed to add user");
    }



  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={name}
        placeholder="Name"
        onChange={e => setName(e.target.value)}
        className="p-2 border border-gray-300 rounded-md w-full"
      />
      <input
        type="email"
        value={email}
        placeholder="Email"
        onChange={e => setEmail(e.target.value)}

        className="p-2 border border-gray-300 rounded-md w-full"
      />
      <button
        type="submit"
        className="p-2 bg-blue-500 text-white rounded-md w-full"
      >
        Submit
      </button>
    </form>
  );
};

export default AddUserForm;