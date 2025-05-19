import { baseInstance, localInstance } from "../../../services/axios";

export async function configureInitDataInterceptor(initData: string) {
  try {
    // const session = await getSession();

    // console.log("session", session);

    baseInstance.interceptors.request.use(
      (config) => {
        config.headers["init-data"] = initData;
        return config;
      },
      (error) => Promise.reject(error)
    );
    localInstance.interceptors.request.use(
      (config) => {
        config.headers["init-data"] = initData;
        config.withCredentials = true;
        return config;
      },
      (error) => Promise.reject(error)
    );
  } catch {
    // console.log(error);
  }
}

export async function configureUserInterceptor(data: string) {
  try {
    // const session = await getSession();

    // console.log("session", session);

    baseInstance.interceptors.request.use(
      (config) => {
        config.headers["x-encrypted-user"] = data;
        return config;
      },
      (error) => Promise.reject(error)
    );
    localInstance.interceptors.request.use(
      (config) => {
        config.headers["x-encrypted-user"] = data;
        config.withCredentials = true;
        return config;
      },
      (error) => Promise.reject(error)
    );
  } catch {
    // console.log(error);
  }
}
