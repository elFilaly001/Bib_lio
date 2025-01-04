import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import axiosInstance from "@/service/axiosInstence"
import { useState, useEffect } from "react"
import axios from "axios"

export default function Allbooks() {
    const [data, setData] = useState([])
    const [selectedBook, setSelectedBook] = useState(null)
    const [isModalOpen, setIsModalOpen] = useState(false)

    useEffect(() => {
        console.log("Component mounted, attempting to fetch data");
        const fetchData = async () => {
            try {
                console.log("Fetching data...");
                const res = await axiosInstance.get('/books')
                console.log("Response received:", res);
                setData(res.data)
                console.log("Data set successfully");
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        }
        fetchData();
    }, [])

    const handleEdit = (book) => {
        setSelectedBook(book)
        setIsModalOpen(true)
    }

    const handleUpdate = async (e) => {
        e.preventDefault()
        try {
            await axiosInstance.put(`/book/${selectedBook.isbn}`, selectedBook)
            // Refresh the data after update
            const res = await axiosInstance.get('/book')
            setData(res.data)
            setIsModalOpen(false)
        } catch (error) {
            console.error("Error updating book:", error)
        }
    }

    return (
        <div className="w-full mx-20 pt-10">
            <h1 className="text-2xl font-bold mb-5">All books</h1>
            <Table>
                <TableCaption>A list of the Books in your library</TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead className="w-[200px]">ISBN</TableHead>
                        <TableHead>Title</TableHead>
                        <TableHead>Author</TableHead>
                        <TableHead>Publisher</TableHead>
                        <TableHead>Available</TableHead>
                        <TableHead className="text-right">Action</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {data.forEach((book) => (
                        <TableRow key={book.isbn}>
                            <TableCell className="font-medium">{book.isbn}</TableCell>
                            <TableCell>{book.title}</TableCell>
                            <TableCell>{book.authors}</TableCell>
                            <TableCell>{book.publisher}</TableCell>
                            <TableCell className="text-right">
                                {book.available ? 
                                    <span className="font-bold bg-green-500 text-white p-2 px-4 rounded">Yes</span>
                                    : <span className="font-bold bg-red-500 text-white p-2 px-4 rounded">No</span>
                                }
                            </TableCell>
                            <TableCell className="text-right flex gap-2">
                                <Button 
                                    variant="default" 
                                    onClick={() => handleEdit(book)}
                                    className="bg-blue-500 text-white hover:bg-blue-600"
                                >
                                    Edit
                                </Button>
                                <Button variant="destructive">Delete</Button>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>

            <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Edit Book</DialogTitle>
                    </DialogHeader>
                    {selectedBook && (
                        <form onSubmit={handleUpdate} className="space-y-4">
                            <div>
                                <label className="text-sm font-medium">Title</label>
                                <Input
                                    value={selectedBook.title}
                                    onChange={(e) => setSelectedBook({
                                        ...selectedBook,
                                        title: e.target.value
                                    })}
                                />
                            </div>
                            <div>
                                <label className="text-sm font-medium">Author</label>
                                <Input
                                    value={selectedBook.authors}
                                    onChange={(e) => setSelectedBook({
                                        ...selectedBook,
                                        authors: e.target.value
                                    })}
                                />
                            </div>
                            <div>
                                <label className="text-sm font-medium">Publisher</label>
                                <Input
                                    value={selectedBook.publisher}
                                    onChange={(e) => setSelectedBook({
                                        ...selectedBook,
                                        publisher: e.target.value
                                    })}
                                />
                            </div>
                            <div className="flex justify-end gap-2">
                                <Button type="button" variant="outline" onClick={() => setIsModalOpen(false)}>
                                    Cancel
                                </Button>
                                <Button type="submit">
                                    Save Changes
                                </Button>
                            </div>
                        </form>
                    )}
                </DialogContent>
            </Dialog>
        </div>
    )
}