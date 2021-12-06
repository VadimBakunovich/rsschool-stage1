import Loader from './loader';

class AppLoader extends Loader {
  constructor() {
    super('https://newsapi.org/v2/', {
      apiKey: 'c49d25c9f6de4b27b30b25eedb63391e', // получите свой ключ https://newsapi.org/
    });
  }
}

export default AppLoader;
