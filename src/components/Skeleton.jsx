export function ProductSkeleton() {
    return (
        <div className="card-dark overflow-hidden">
            <div className="skeleton-shine aspect-square" />
            <div className="p-4 space-y-2.5">
                <div className="skeleton-shine h-2.5 w-16 rounded-md" />
                <div className="skeleton-shine h-4 w-full rounded-md" />
                <div className="skeleton-shine h-4 w-3/4 rounded-md" />
                <div className="skeleton-shine h-5 w-28 rounded-md mt-3" />
            </div>
        </div>
    )
}

export function GridSkeleton({ count = 8 }) {
    return (
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 md:gap-5">
            {Array.from({ length: count }).map((_, i) => <ProductSkeleton key={i} />)}
        </div>
    )
}