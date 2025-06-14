import axios from "axios";
import { toast } from "sonner";
import { QueryClient } from "@tanstack/react-query";

export const instance = axios.create({
  baseURL: "http://localhost:3000",
  headers: { "Content-Type": "application/json" },
  withCredentials: true,
});

instance.interceptors.response.use(
  async (response) => {
    // await new Promise(resolve => setTimeout(resolve, Math.random() * 3000));
    return response;
  },
  (error) => {
    if (error.response) {
      const status = error.response.status;

      switch (status) {
        case 400:
          toast.error(
            error.response.data?.message ||
              "Неверный запрос (400). Проверьте введённые данные."
          );
          break;
        case 401:
        case 403:
          toast.error("Доступ запрещён. Пожалуйста, войдите в систему.");
          if (typeof window !== "undefined") {
            window.location.href = "/login";
          }
          break;
        case 404:
          toast.error("Ресурс не найден (404).");
          break;
        case 500:
          toast.error("Внутренняя ошибка сервера (500). Попробуйте позже.");
          break;
        default:
          toast.error(
            error.response.data?.message || "Произошла неизвестная ошибка."
          );
      }
    } else {
      toast.error("Ошибка сети или сервер не отвечает.");
    }

    return Promise.reject(error);
  }
);

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      staleTime: 5 * 60 * 1000,
    },
  },
});
