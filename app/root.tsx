import {
  isRouteErrorResponse,
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useNavigation,
} from "react-router";

import type { Route } from "./+types/root";
import "./app.css";
import { QueryClientProvider } from "@tanstack/react-query";
import React from "react";
import { Toaster } from "sonner";
import { ThemeProvider } from "./components/theme/theme-provider";
import { AuthProvider } from "./providers/authContext";
import { queryClient } from "./api/api.config";
import Spinner from "./components/ui/loading-spinner";

export const links: Route.LinksFunction = () => [
  { rel: "preconnect", href: "https://fonts.googleapis.com" },
  {
    rel: "preconnect",
    href: "https://fonts.gstatic.com",
    crossOrigin: "anonymous",
  },
  {
    rel: "stylesheet",
    href: "https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap",
  },
];

export async function clientLoader({
  request,
  params,
}: Route.ClientLoaderArgs) {
  return null;
}

export default function App() {
  const [queryClientToProvide] = React.useState(() => queryClient);

  return (
    <AuthProvider>
      <QueryClientProvider client={queryClientToProvide}>
        <ThemeProvider>
          <Outlet />
        </ThemeProvider>
      </QueryClientProvider>
    </AuthProvider>
  );
}

export function Layout({ children }: { children: React.ReactNode }) {
  const navigation = useNavigation();
  const isNavigating = Boolean(navigation.location);
  const isLoading = Boolean(navigation.state === "loading");

  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <script
          dangerouslySetInnerHTML={{
            __html: `
          (function() {
            try {
              const theme = localStorage.getItem('vite-ui-theme');
              const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
              const root = document.documentElement;
              if (theme === 'dark' || (!theme && prefersDark)) {
                root.classList.add('dark');
                root.classList.remove('light');
              } else {
                root.classList.add('light');
                root.classList.remove('dark');
              }
            } catch (e) {
              // fail silently
            }
          })();
          `,
          }}
        />
        <Meta />
        <Links />
      </head>
      <body>
        {isNavigating && (
          <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center z-50 ">
            <Spinner className="h-52 w-52" />
          </div>
        )}
        {children}
        <Toaster offset="10vh" position="top-center" />
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export function HydrateFallback() {
  return (
    <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center z-50 bg-background text-foreground animate-fade-out">
      <Spinner className="h-52 w-52" />
    </div>
  );
}

export function ErrorBoundary({ error }: Route.ErrorBoundaryProps) {
  let message = "Oops!";
  let details = "An unexpected error occurred.";
  let stack: string | undefined;

  if (isRouteErrorResponse(error)) {
    message = error.status === 404 ? "404" : "Error";
    details =
      error.status === 404
        ? "The requested page could not be found."
        : error.statusText || details;
  } else if (import.meta.env.DEV && error && error instanceof Error) {
    details = error.message;
    stack = error.stack;
  }

  return (
    <main className="pt-16 p-4 container mx-auto">
      <h1>{message}</h1>
      <p>{details}</p>
      {stack && (
        <pre className="w-full p-4 overflow-x-auto">
          <code>{stack}</code>
        </pre>
      )}
    </main>
  );
}
