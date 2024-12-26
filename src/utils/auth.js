const USER_KEY = 'app_user';

export const auth = {
  setUser: (user) => {
    localStorage.setItem(USER_KEY, JSON.stringify(user));
  },
  
  getUser: () => {
    const user = localStorage.getItem(USER_KEY);
    return user ? JSON.parse(user) : null;
  },
  
  removeUser: () => {
    localStorage.removeItem(USER_KEY);
  },
  
  isAuthenticated: () => {
    return !!localStorage.getItem(USER_KEY);
  }
};