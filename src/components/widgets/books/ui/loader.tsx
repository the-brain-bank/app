import { Skeleton } from "@/components/ui/skeleton";


export function BookLoader({ count = 12 }: {
    count?: number;
}) {
    const loaders = Array.from({ length: count });

    return (
        <div className="grid grid-cols-2 gap-6 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
            {loaders.map((_, idx) => (
                <Skeleton key={idx} className="w-full h-48 rounded-lg"></Skeleton>
            ))}
        </div>
    )
}