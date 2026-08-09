"use client"; // Error boundaries must be Client Components

import { TypographyH2 } from "@/components/ui/typography";

export default function ErrorPage({
  error,
}: {
  error: Error & { digest?: string };
  unstable_retry: () => void;
}) {
  return (
    <div className="min-h-[90vh] flex items-center justify-center">
      <div className="text-center">
        <TypographyH2>Something went wrong!</TypographyH2>
        <p className="">
          We're having trouble loading this page right now. Please try again
          later.
        </p>
        <pre>{error.message}</pre>
      </div>
    </div>
  );
}
