export default function useEnvironment() {
  return import.meta.env.DEV
    ? "http://localhost:5000/api"
    : "https://travel-journal-api.onrender.com/api";
}
