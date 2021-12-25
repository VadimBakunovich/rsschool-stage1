interface IOptions {
  [x: string]: string;
}

interface ISource {
  id: string;
  name: string;
}

interface IObj {
  author: string;
  description: string;
  id: string;
  name: string;
  publishedAt: string;
  source: ISource;
  title: string;
  url: string;
  urlToImage: string;
}

interface IData {
  status: string;
  sources?: IObj[];
  totalResults?: number;
  articles?: IObj[];
}

type Callback = (someArg: IData) => void;

export { IOptions, IObj, IData, Callback };