import { IOptions, IData, Callback } from '../app/types';

class Loader {
  private baseLink: string;
  private options: IOptions;

  constructor(baseLink: string, options: IOptions) {
    this.baseLink = baseLink;
    this.options = options;
  }

  getResp(
    { endpoint = '', options = {} },
    callback: Callback,
  ) {
    this.load('GET', endpoint, callback, options);
  }

  errorHandler = (res: Response): Response => {
    if (!res.ok) {
      if (res.status === 401 || res.status === 404) { console.log(`Sorry, but there is ${res.status} error: ${res.statusText}`); }
      throw Error(res.statusText);
    }

    return res;
  }

  makeUrl(options: IOptions, endpoint: string) {
    const urlOptions = { ...this.options, ...options };
    let url = `${this.baseLink}${endpoint}?`;

    Object.keys(urlOptions).forEach(key => {
      url += `${key}=${urlOptions[key]}&`;
    });

    return url.slice(0, -1);
  }

  load(method: string, endpoint: string, callback: Callback, options = {}) {
    fetch(this.makeUrl(options, endpoint), { method })
      .then(this.errorHandler)
      .then(res => res.json())
      .then((data: IData) => callback(data))
      .catch((err: Error) => console.error(err));
  }
}

export default Loader;
