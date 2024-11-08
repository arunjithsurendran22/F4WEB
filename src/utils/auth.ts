// utils/auth.ts
export const isAuthenticated = (): boolean => {
    // Check if the user is authenticated (e.g., check for a token in localStorage)
    const token = typeof window !== "undefined" ? window.localStorage.getItem("accessToken") : ''
    return !!token; // Return true if token exists
  };
  
  export const login = (token: string) => {
    localStorage.setItem("accessToken", token); // Store token in localStorage
  };
  
  export const logout = () => {
    localStorage.removeItem("accessToken"); // Remove token from localStorage
  };