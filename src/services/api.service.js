import { auth } from '../utils/auth'
const useMock = false;
const mockDelay = 1000;

const mockCall = (status, response, delay = mockDelay) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ status, data: response });
    }, delay);
  });
};

const mockUser = {
  username: 'Jeremy Martins',
  email: 'martins@43.com',
  photo: 'https://ui-avatars.com/api/?name=Jeremy+Martins',
  token: 'mock-jwt-token'
};

export const APIService = {
  login: (credentials) => {
    if (useMock) {
      if (credentials.email === 'martins@43.com' && credentials.password === 'password') {
        return mockCall(200, mockUser);
      }
      return mockCall(401, { message: 'Invalid credentials' });
    }
    return fetch('https://finance-manager-api-5wzn.onrender.com/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({email:credentials.email, password:credentials.password })
    }).then(res => res.json());
  },

  signup: (userData) => {
    if (useMock) {
      return mockCall(200, { ...mockUser, ...userData });
    }
    return fetch('https://finance-manager-api-5wzn.onrender.com/api/auth/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({email:userData.email, password:userData.password,name:userData.name})
    }).then(res => res.json());
  },

  socialLogin: (provider) => {
    if (useMock) {
      return mockCall(200, { 
        ...mockUser,
        provider 
      });
    }
    return fetch(`/api/auth/${provider}`)
      .then(res => res.json());
  },
  getUserProfile: () => {
    if (useMock) {
      return mockCall(200, mockUser);
    }
    return fetch('https://finance-manager-api-5wzn.onrender.com/api/user/profile', {
      method: 'GET',
      headers: { 
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${mockUser.token}` // Replace mockUser.token with actual token
      },
    }).then(res => res.json());
  },
  updateUserProfile: (profileData) => {
    if (useMock) {
      return mockCall(200, { ...mockUser, ...profileData });
    }
    return fetch('https://finance-manager-api-5wzn.onrender.com/api/user/profile', {
      method: 'PUT',
      headers: { 
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${mockUser.token}` // Replace mockUser.token with actual token
      },
      body: JSON.stringify(profileData),
    }).then(res => res.json());
  },
  deleteUserProfile: () => {
    if (useMock) {
      return mockCall(200, { message: 'Profile deleted successfully' });
    }
    return fetch('https://finance-manager-api-5wzn.onrender.com/api/user/profile', {
      method: 'DELETE',
      headers: { 
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${mockUser.token}` // Replace mockUser.token with actual token
      },
    }).then(res => res.json());
},
getUserBudgets: () => {
  return fetch('https://finance-manager-api-5wzn.onrender.com/api/budgets', {
    method: 'GET',
    headers: { 'Content-Type': 'application/json','Authorization':`Bearer ${auth.getToken()}`},
  }).then(res => res.json());
},
createUserBudget: (budget) => {
  return fetch('https://finance-manager-api-5wzn.onrender.com/api/budgets', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json','Authorization':`Bearer ${auth.getToken()}`},
    body: JSON.stringify(budget)
  }).then(res => res.json());
},
updateUserBudgetByID: (budget) => {
  return fetch('https://finance-manager-api-5wzn.onrender.com/api/budgets/'+budget._id, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json','Authorization':`Bearer ${auth.getToken()}`},
    body: JSON.stringify(budget)
  }).then(res => res.json());
},
deleteUserBudgetByID: (budget) => {
  return fetch('https://finance-manager-api-5wzn.onrender.com/api/budgets/'+ budget._id, {
    method: 'DELETE',
    headers: { 'Content-Type': 'application/json','Authorization':`Bearer ${auth.getToken()}`},
  }).then(res => res.json());
},
getUserTransactions: () => {
  return fetch('https://finance-manager-api-5wzn.onrender.com/api/transactions', {
    method: 'GET',
    headers: { 'Content-Type': 'application/json','Authorization':`Bearer ${auth.getToken()}`},
  }).then(res => res.json());
},
createUserTransaction: (transaction) => {
  return fetch('https://finance-manager-api-5wzn.onrender.com/api/transactions', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json','Authorization':`Bearer ${auth.getToken()}`},
    body: JSON.stringify(transaction)
  }).then(res => res.json());
},
updateUserTransactionByID: (transaction) => {
  return fetch('https://finance-manager-api-5wzn.onrender.com/api/transactions/'+transaction._id, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json','Authorization':`Bearer ${auth.getToken()}`},
    body: JSON.stringify(transaction)
  }).then(res => res.json());
},
deleteUserTransactionByID: (transaction) => {
  return fetch('https://finance-manager-api-5wzn.onrender.com/api/transactions/'+ transaction._id, {
    method: 'DELETE',
    headers: { 'Content-Type': 'application/json','Authorization':`Bearer ${auth.getToken()}`},
  }).then(res => res.json());
},
}