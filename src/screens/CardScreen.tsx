import React, { useEffect, useState } from "react";
import CardTemplate from "src/components/CardTemplate";
import Loader from "src/components/Loader";

const CardScreen = () => {
  /**State for users to be received from API response */
  const [users, setUsers] = useState([]);

  /**Condition when state should be rerendered */
  const [fetching, setFetching] = useState(false);

  useEffect(() => {
    if (fetching || users.length === 0) {
      fetchData();
    }
  }, [fetching]);

  useEffect(() => {
    document.addEventListener("scroll", scrollHandler);
    return function () {
      document.removeEventListener("scroll", scrollHandler);
    };
  }, []);

  /**This function fetch GET response to the server
   * After successed response data goes into state as new users instead of old users
   * @returns {Object[]} The data to be received
   */
  const fetchData = async function () {
    try {
      const res = await fetch(
        `https://randomuser.me/api/?results=3&inc=name,picture,email`
      );
      const data = await res.json();
      const { results } = data;
      setFetching(false);
      setUsers([...users, ...results]);
    } catch (err) {
      console.log(err);
    }
  };

  /**This function defines when fetchData function should be called while scrolling
   * @params Browser Event
   */
  const scrollHandler = (e: React.UIEvent<HTMLElement> | any): void => {
    const scrollHeight = e.target.documentElement.scrollHeight;
    const scrollTop = e.target.documentElement.scrollTop;
    const innerHeight = window.innerHeight;
    if (scrollHeight - (scrollTop + innerHeight) < 300) {
      setFetching(true);
    }
  };

  if (users.length === 0) return <Loader />;
  return (
    <>
      {users.map((user) => {
        return <CardTemplate user={user} />;
      })}
    </>
  );
};

export default CardScreen;
