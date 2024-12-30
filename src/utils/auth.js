const USER_KEY = 'app_user';
const TOKEN_KEY = 'token'

export const auth = {
  setUser: (user) => {
    localStorage.setItem(USER_KEY, JSON.stringify(user));
    localStorage.setItem(TOKEN_KEY, user.token)
  },
  
  getUser: () => {
    const user = localStorage.getItem(USER_KEY);
    return user && user !== "undefined" ? JSON.parse(user) : null;
  },
  
  removeUser: () => {
    localStorage.removeItem(USER_KEY);
  },
  
  isAuthenticated: () => {
    const user = auth.getUser();
    return !!localStorage.getItem(USER_KEY) && user;
  },
  getToken: () => {
    return localStorage.getItem(TOKEN_KEY);
  }

};