import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from '@/components/ui/card'

import { Button } from '@/components/ui/button'
import axiosInstance from '@/service/axiosInstence';
import { useEffect, useState } from 'react';

// Add type for user data
type UserData = {
    sub: string;
    // ... other fields if needed
};

export default function HomeContent() {

    const [data, setData] = useState<Array<{
        title: string;
        authors: string;
        description: string;
        available: boolean;
        isbn: number;
        pageCount: number;
        publisher: string;
        _id: string;
        borrowedBy?: string; // Add this field to track who borrowed the book
    }>>([])

    // Add user state or get it from context/props
    const [user, setUser] = useState<UserData | null>(null);

    useEffect(() => {
        console.log("Component mounted, attempting to fetch data");
        const fetchData = async () => {
            try {
                console.log("Fetching data...");
                const res = await axiosInstance.get('/')
                console.log("Response received:", res);
                setData(res.data)
                console.log("Data set successfully");
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        }
        fetchData();
    }, [])

    const handleBookAction = async (bookId: string, action: 'borrow' | 'return') => {
        try {
            const endpoint = action === 'borrow' ? '/borrow' : '/borrow/return';
            await axiosInstance.post(endpoint, { bookId });
            // 
            const res = await axiosInstance.get('/');
            setData(res.data);
        } catch (error) {
            console.error(`Error ${action}ing book:`, error);
        }
    };

    return (
        <>
            <div className="flex flex-wrap gap-5 m-10">
                {data.map((book) => (
                    <Card key={book._id} className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4">
                        <CardHeader>
                            <CardTitle>{book.title}</CardTitle>
                            <CardDescription>{book.authors}</CardDescription>
                        </CardHeader>
                        <CardContent className="max-h-20 overflow-hidden my-2">
                            <p className="line-clamp-3">{book.description}</p>
                        </CardContent>
                        <CardFooter className='flex justify-end'>
                            <Button 
                                className='w-full'
                                onClick={() => handleBookAction(
                                    book._id, 
                                    book.borrowedBy === user?.sub ? 'return' : 'borrow'
                                )}
                                disabled={book.borrowedBy && book.borrowedBy !== user?.sub}
                            >
                                {book.borrowedBy === user?.sub ? 'Return' : 
                                 !book.borrowedBy ? 'Borrow' : 'Unavailable'}
                            </Button>
                        </CardFooter>
                    </Card>
                ))}
            </div>
        </>

    );
}