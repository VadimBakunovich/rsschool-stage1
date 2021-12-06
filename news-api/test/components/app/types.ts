interface IOptions {
  [x: string]: string
}

interface ISource {
  name: string
}

interface IObj {
  author: string
  description: string
  id: string
  name: string
  publishedAt: string
  source: ISource
  title: string
  url: string
  urlToImage: string
}

interface IData {
  [x: string]: IObj[]
}

type Callback = {
  (someArg: IData): void;
}

export { IOptions, IObj, IData, Callback };