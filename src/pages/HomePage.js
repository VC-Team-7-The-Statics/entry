import styles from "./HomePage.module.scss";
import { useCallback, useRef } from "react";
import { useSelector } from "react-redux";
import { useInfiniteQuery } from "react-query";
import axios from "axios";

import { selectUser } from "../features/user/userSlice";
import UserCard from "../components/UserCard";
import ApiService from "../services/Api";
import CoffeeLoading from "../components/CoffeeLoading";

const ApiInstance = new ApiService(axios);

function HomePage() {
  const user = useSelector(selectUser);

  const {
    isLoading,
    data: users,
    hasNextPage,
    fetchNextPage,
    refetch,
  } = useInfiniteQuery("users", ApiInstance.fetchInfinite(user.id), {
    staleTime: Infinity,
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

  if (isLoading) return <CoffeeLoading />;

  return (
    <div className={styles.container}>
      {users.pages.map(({ data }, i) => (
        <div className={styles.app__videos} key={i}>
          {data.success && data.recommendation.length ? (
            <UserCard
              image={data.recommendation[0].image}
              name={data.recommendation[0].name}
              company={data.recommendation[0].company}
              expertise={data.recommendation[0].expertise}
              languages={data.recommendation[0].languages}
              userId={data.recommendation[0]._id}
              lastUserCardRef={
                users.pages.length - 1 === i ? lastUserCardRef : null
              }
            />
          ) : (
            <div className={styles["notification-container"]}>
              <p className={styles.notification}>
                현재 반경 1km 이내에 사용자가 없습니다.
              </p>
              <div onClick={refetch}>다시 불러오기</div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

export default HomePage;
