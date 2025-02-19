import {useEffect} from 'react';
import {useUserContext} from './context/UserContext';

interface User {
  id: number;
  name: string;
  email: string;
}

const UserList = () => {
  const {state, dispatch} = useUserContext();

  useEffect(() => {
    dispatch({type: "SET_LOADING", payload: true});
      fetchUsers();
  }, [dispatch])

  const fetchUsers = async () => {
    const response = await fetch("http://localhost:8000");
    const data = await response.json();
    if(data){
      dispatch({type: "SET_USERS",payload: data})
    } else{
      console.error("Failed to fetch users");
    }
  }

  if(state.loading){
    return <p>Loading...</p>
  }

  return (
    <div>
      {state.users.length === 0 ? (
        <p>No users found</p>
      ) : (
        state.users.map((user: User) => (
          <div key={user.id}>
            <p>{user.name}</p>
            <p>{user.email}</p>
          </div>
        ))
      )}
    </div>
  )
}

export default UserList