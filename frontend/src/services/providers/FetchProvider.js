export default class FetchProvider {
  interceptors = [];

  computeQueryParams(query) {
    if (!query) {
      return "";
    }

    const queryParams = new URLSearchParams(query);
    return `?${queryParams.toString()}`;
  }

  async request(options) {
    const url = `${options.baseUrl}${options.path}${this.computeQueryParams(options.query)}`;
    const body = options.data ? JSON.stringify(options.data) : null;

    return fetch(url, {
      method: options.method,
      headers: options.headers,
      body,
    })
      .then((response) => {
        if (!response.ok) {
          return Promise.reject(response);
        }

        return response;
      })
      .then((response) => {
        if (response.status > 201) {
          return Promise.resolve(response);
        }

        return response.json();
      })
      .then((data) => {
        return data;
      })
      .catch(async (response) => {
        const message = await this.onError(response);
        throw Error(message);
      });
  }

  addInterceptor(interceptor) {
    if (interceptor && interceptor.onError) {
      this.interceptors.push(interceptor);
    } else {
      throw Error("Interceptor is not supported.");
    }

    return this;
  }

  async onError(response) {
    if (response.json) {
      const { error } = await response.json();
      const { message, statusCode } = error;

      this.interceptors.forEach((interceptop) => {
        interceptop.onError(statusCode, message);
      });

      throw Error(message);
    } else if (response.message) {
      throw Error(response.message);
    }
  }

  get(path, requestOptions) {
    return this.request({ path, method: "GET", ...requestOptions });
  }

  post(path, requestOptions) {
    return this.request({ path, method: "POST", ...requestOptions });
  }

  put(path, requestOptions) {
    return this.request({ path, method: "PUT", ...requestOptions });
  }

  delete(path, requestOptions) {
    return this.request({ path, method: "DELETE", ...requestOptions });
  }
}
