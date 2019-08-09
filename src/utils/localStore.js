const localStore = {
  set(key, val) {
    try {
      window.localStorage.setItem(key, JSON.stringify(val));
    } catch (oException) {
      if (oException.name === 'QuotaExceededError') {
        console.warn('超出本地存储限额！');
        window.localStorage.clear();
        window.localStorage.setItem(key, JSON.stringify(val));
      }
    }
  },
  get(key, defaultVal) {
    const result = window.localStorage.getItem(key);
    return result !== null ? JSON.parse(result) : defaultVal;
  },
};

export default localStore