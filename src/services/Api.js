class ApiService {
  constructor(axios) {
    this.API = axios.create({
      baseURL: "/api",
      timeout: 5000,
    });

    this.API.interceptors.request.use((req) => {
      const token = window.token;
      req.headers.Authorization = `Bearer ${token}`;
      return req;
    });
  }

  login = (body) => this.API.post("/auth/login", { ...body });

  signup = (credentials) => this.API.post("/auth/signup", { ...credentials });

  likeUser = (body) => this.API.post("/user/like", { ...body });

  sendCoffeeForm = (coffeeForm) =>
    this.API.post("/coffee-form", { ...coffeeForm });

  fetchInfinite =
    (userId) =>
    ({ pageParam = 0 }) =>
      this.API.get(`/user/${userId}/recommend?p=${pageParam}`);

  getLanguages = () => this.API.get("/languages");

  getUserCoffeePrice = (userId) => () => this.API.get(`/user/${userId}/price`);
}

export default ApiService;
