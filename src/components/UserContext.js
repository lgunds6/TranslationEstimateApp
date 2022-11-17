import React, {
  useState,
  useEffect,
  useCallback,
  useRef,
  useContext,
  createContext,
} from "react";

const UserContext = React.createContext();
const UpdateUserContext = React.createContext();

export const useUserContext = () => {
  return useContext(UserContext);
};

export const useUpdateUserContext = () => {
  return useContext(UpdateUserContext);
};

export const UseProvider = ({ value, children }) => {
  const [ticked, setTicked] = useState(value);
  return (
    <UserContext.Provider value={ticked}>
      <useUpdateUserContext value={setTicked}>{children}</useUpdateUserContext>
    </UserContext.Provider>
  );
};

export default UserContext;
