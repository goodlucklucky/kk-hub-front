import axios, { AxiosError, AxiosResponse } from "axios";

const baseInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_APP_API_BASE_URL,
  headers: {
    "ngrok-skip-browser-warning": "69420",
    "x-game-key": "1m1",
    "x-game-source": "1m1",
    "x-game-env": process.env.NODE_ENV,
    "x-token": process.env.NEXT_PUBLIC_APP_TOKEN,
    "is-valid-user": "true",
  },
});

const localInstance = axios.create({
  baseURL: "/api",
  headers: {
    "ngrok-skip-browser-warning": "69420",
    "x-game-key": "1m1",
    "x-game-source": "1m1",
    "x-game-env": process.env.NODE_ENV,
    "is-valid-user": "true",
  },
  withCredentials: true,
});

function baseRequestSuccessResponseInterceptor(response: AxiosResponse) {
  return response;
}

function baseRequestErrorResponseInterceptor(error: AxiosError) {
  const status = error?.response?.status;
  const url = error?.request?.responseURL;

  if (status === 401) {
    console.log("401", url);

    // window.location.href = "/";
  }
  return Promise.reject(error);
}

baseInstance.interceptors.response.use(
  baseRequestSuccessResponseInterceptor,
  baseRequestErrorResponseInterceptor
);

localInstance.interceptors.response.use(
  baseRequestSuccessResponseInterceptor,
  baseRequestErrorResponseInterceptor
);

export { baseInstance, localInstance };
