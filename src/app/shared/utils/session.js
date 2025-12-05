import { jwtDecode } from 'jwt-decode';

export const clearStorage = () => {
  // Clear localStorage
  localStorage.clear();

  // Clear sessionStorage (optional but recommended)
  sessionStorage.clear();

  // Clear all cookies
  document.cookie.split(";").forEach((cookie) => {
    const name = cookie.split("=")[0].trim();
    document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
  });

  // Redirect
  window.location.href = '/';
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
