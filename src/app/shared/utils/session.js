import { jwtDecode } from 'jwt-decode';

export const clearStorage = () => {
  localStorage.clear();
  window.location.href = '/auth';
};

export const checkTokenExpiration = () => {
  const token = localStorage.getItem('token');
  if (token) {
    const { exp } = jwtDecode(token);
    if (Date.now() >= exp * 1000) {
      clearStorage();
    }
  }
};
