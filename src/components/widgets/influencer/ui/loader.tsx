import { Skeleton } from "@/components/ui/skeleton";

export function Loader({ count = 12 }: { count?: number }) {
  const loaders = Array.from({ length: count });

  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 2xl:grid-cols-5">
      {loaders.map((_, idx) => (
        // biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
        <Skeleton key={idx} className="w-full h-64 rounded-xl"></Skeleton>
      ))}
    </div>
  );
}
