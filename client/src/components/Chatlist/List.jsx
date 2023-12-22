import { useStateProvider } from "@/context/StateContext";
import { reducerCases } from "@/context/constants";
import { GET_INITIAL_CONTACTS_ROUTE } from "@/utils/ApiRoutes";
import axios from "axios";
import React, { useEffect } from "react";
import ChatListItem from "./ChatLIstItem";

function List() {
  const [{ userInfo, userContacts, filteredContacts, contactSearch }, dispatch] = useStateProvider();
  useEffect(() => { 
    console.log(userInfo)
    const getContacts = async () => {
      try {
        const { data: { users, onlineUsers } } = await axios.get(`${GET_INITIAL_CONTACTS_ROUTE}/${userInfo.id}`);
        dispatch({type: reducerCases.SET_ONLINE_USERS, onlineUsers})
        dispatch({ type: reducerCases.SET_USER_CONTACTS, userContacts: users})
      } catch (error) {
        console.log(error);
      }
    }
    if (userInfo) {
      getContacts();
    }
  }, [userInfo])
  return <div className=" bg-search-input-container-background flex-auto overflow-auto max-h-full custom-scrollbar">
    {
      contactSearch ? <>
        {filteredContacts.map(contact => (
          <ChatListItem data={contact} key={contact.id} />
        ))}
        {filteredContacts.length === 0 && <span className="text-secondary text-center w-full block">No contacts found!</span>}
      </> : userContacts.map(contact => (
      
        <ChatListItem data={contact} key={contact.id} />
      ))
    }
  
  </div>;
}

export default List;
