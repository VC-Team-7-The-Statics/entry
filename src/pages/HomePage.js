import styles from "./HomePage.module.scss";
import { useCallback, useRef } from "react";
import { useSelector } from "react-redux";
import { useInfiniteQuery } from "react-query";
import axios from "axios";

import { selectUser } from "../features/user/userSlice";
import UserCard from "../components/UserCard";
import ApiService from "../services/Api";

const ApiInstance = new ApiService(axios);

const infiniteFetcher =
  (userId) =>
  ({ pageParam = 0 }) =>
    ApiInstance.API.get(`/user/${userId}/recommend?p=${pageParam}`);

function HomePage() {
  const user = useSelector(selectUser);

  const {
    isLoading,
    data: users,
    hasNextPage,
    fetchNextPage,
  } = useInfiniteQuery("users", infiniteFetcher(user.id), {
    getNextPageParam: (lastPage) => {
      if (lastPage.data.isLastPage) return;

      return lastPage.data.page + 1;
    },
  });

  const observer = useRef();

  const lastUserCardRef = useCallback(
    (node) => {
      if (isLoading) return;
      if (observer.current) observer.current.disconnect();

      observer.current = new IntersectionObserver(([entry]) => {
        if (entry.isIntersecting && hasNextPage) {
          fetchNextPage();
        }
      });

      if (node) observer.current.observe(node);
    },
    [fetchNextPage, isLoading, hasNextPage]
  );

  if (isLoading) return <h1>LOADING.....!!!!</h1>;

  return (
    <div className={styles.app__videos}>
      {users.pages.map(({ data }, i) => (
        <UserCard
          image={data.recommendation[0].image}
          name={data.recommendation[0].name}
          company={data.recommendation[0].company}
          expertise={data.recommendation[0].expertise}
          languages={data.recommendation[0].languages}
          userId={data.recommendation[0]._id}
          key={i}
          lastUserCardRef={
            users.pages.length - 1 === i ? lastUserCardRef : null
          }
        />
      ))}
    </div>
  );
}

export default HomePage;
