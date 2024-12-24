import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from '@/components/ui/card'

import { Button } from '@/components/ui/button'

export default function HomeContent() {
    return (
        <>
            <div className="flex flex-wrap gap-5 m-10">
                <Card className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4">
                    <CardHeader>
                        <CardTitle>Book title</CardTitle>
                        <CardDescription>Book author</CardDescription>
                    </CardHeader>
                    <CardContent className="max-h-20 overflow-hidden my-2">
                        <p className="line-clamp-3">Card Content that is long enough to demonstrate the truncation effect. This text will be limited to four lines and will be truncated if it exceeds that limit.</p>
                    </CardContent>
                    <CardFooter className='flex justify-end'>
                        <Button className='w-full'>Borrow</Button>
                    </CardFooter>
                </Card>
            </div>
        </>

    );
}