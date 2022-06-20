import axios from "axios";
import { useInfiniteQuery, useMutation } from "react-query";

import queryKeys from "../constants/queryKeys";
import ApiService from "../services/Api";

const ApiInstance = new ApiService(axios);

export const useCoffeeFormSend = (options) =>
  useMutation((coffeeForm) => ApiInstance.sendCoffeeForm({ ...coffeeForm }), {
    ...options,
  });

export const useInfitniteUsers = (userId, options) =>
  useInfiniteQuery(
    queryKeys.INFINITE_USERS,
    ApiInstance.fetchInfinite(userId),
    { ...options }
  );
