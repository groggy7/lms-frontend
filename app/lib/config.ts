export const getApiUrl = () => {
  if (typeof window !== 'undefined' && (window as any).env?.VITE_API_URL) {
    return (window as any).env.VITE_API_URL;
  }
  return import.meta.env.VITE_API_URL || 'http://localhost:8080';
};
