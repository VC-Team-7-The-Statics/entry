class ApiService {
  constructor(axios) {
    this.API = axios.create({
      baseURL: "/",
      timeout: 5000,
    });

    this.API.interceptors.request.use((req) => {
      const token = window.token;
      req.headers.Authorization = `Bearer ${token}`;
      return req;
    });
  }

  login = (body) => this.API.post("/auth/login", { ...body });
}

export default ApiService;
