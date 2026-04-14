let firebaseToken = null;

export function setToken(token) {
  firebaseToken = token;
};

export function getToken() {
  return firebaseToken;
};

export function clearToken() {
  firebaseToken = null;
};