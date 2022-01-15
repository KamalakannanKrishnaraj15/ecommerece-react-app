const localStorage =
  ("localStorage" in window && window.localStorage) || null;

const getItem = function(key) {
  if (localStorage) {
    if (!localStorage[key]) {
      return null;
    }
    const objectWithTime = JSON.parse(localStorage[key]);
    return objectWithTime.content;
  }
};

const setItem = function(key, value) {
  if (localStorage) {
    const objectWithTime = { content: value, timestamp: new Date() };
    localStorage[key] = JSON.stringify(objectWithTime);
  }
};
const removeItem = function(key) {
  if (localStorage) {
    if (!localStorage[key]) return;
    delete localStorage[key];
  }
};

const obj = {
  getItem,
  setItem,
  removeItem,
};

export default obj;