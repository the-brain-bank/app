'use client' // Error boundaries must be Client Components

import { TypographyH2 } from '@/components/ui/typography'
import { useEffect } from 'react'

export default function ErrorPage({
    error,
    unstable_retry,
}: {
    error: Error & { digest?: string }
    unstable_retry: () => void
}) {
    useEffect(() => {
        // Log the error to an error reporting service
        console.error(error)
    }, [error])

    return (
        <div className='min-h-[90vh] flex items-center justify-center'>
            <div className='text-center'>
                <TypographyH2>Something went wrong!</TypographyH2>
                <p className="">
                    We're having trouble loading this page right now. Please try again later.
                </p>
                <pre>
                    {error.message}
                </pre>
            </div>

        </div>
    )
}