import { isRouteErrorResponse, useRouteError } from '@remix-run/react';

export function ErrorBoundary() {
  const error = useRouteError();

  if (isRouteErrorResponse(error)) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center">
          <h1 className="text-3xl font-bold">
            {error.status} {error.statusText}
          </h1>
          <p className="mt-4 text-xl text-gray-600 dark:text-gray-400">
            {error.data}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="text-center">
        <h1 className="text-3xl font-bold">Something went wrong</h1>
        <p className="mt-4 text-xl text-gray-600 dark:text-gray-400">
          Please try again later
        </p>
      </div>
    </div>
  );
} 