import axios from "axios";
import { useMutation, useQuery } from "react-query";

import queryKeys from "../constants/queryKeys";
import ApiService from "../services/Api";

const ApiInstance = new ApiService(axios);

export const useAutoLogin = (options) =>
  useQuery(queryKeys.AUTO_LOGIN, ApiInstance.login, { ...options });

export const useUserPrice = (options) =>
  useQuery(
    queryKeys.PRICE,
    (userId) => ApiInstance.getUserCoffeePrice(userId),
    {
      ...options,
    }
  );

export const useLanguageSample = (options) =>
  useQuery(queryKeys.LANGUAGES, ApiInstance.getLanguages, { ...options });

export const useSignUp = (options) =>
  useMutation((credentials) => ApiInstance.signup({ ...credentials }), {
    ...options,
  });

export const useLogin = (options) =>
  useMutation((userInput) => ApiInstance.login({ ...userInput }), {
    ...options,
  });

export const useLike = (options) =>
  useMutation((requestBody) => ApiInstance.likeUser({ ...requestBody }), {
    ...options,
  });
