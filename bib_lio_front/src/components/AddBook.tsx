import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import axiosInstance from "@/service/axiosInstence";

const AddBook = () => {
    const [formData, setFormData] = useState({
        title: "",
        description: "",
        authors: "",
        publisher: "",
        isbn: "",
        pageCount: 0,
        available: true,
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value, type, checked } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: type === "checkbox" ? checked : value,
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const response = await axiosInstance.post('/book', formData);
            console.log("Book added successfully:", response.data);
            // Optionally reset the form or provide feedback to the user
        } catch (error) {
            console.error("Error adding book:", error);
        }
    };

    return (
        <div className="w-full mx-20 pt-10">
            <Card>
                <CardHeader>
                    <CardTitle>Add a New Book</CardTitle>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="space-y-2">
                            <Label htmlFor="title">Title</Label>
                            <Input
                                id="title"
                                name="title"
                                value={formData.title}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="description">Description</Label>
                            <Textarea
                                id="description"
                                className="h-[10px]"
                                name="description"
                                value={formData.description}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="authors">Authors</Label>
                            <Input
                                id="authors"
                                name="authors"
                                value={formData.authors}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="publisher">Publisher</Label>
                            <Input
                                id="publisher"
                                name="publisher"
                                value={formData.publisher}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="isbn">ISBN</Label>
                            <Input
                                id="isbn"
                                name="isbn"
                                value={formData.isbn}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="pageCount">Page Count</Label>
                            <Input
                                id="pageCount"
                                name="pageCount"
                                type="number"
                                value={formData.pageCount}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div className="flex items-center space-x-2">
                            <Checkbox
                                id="available"
                                name="available"
                                checked={formData.available}
                                onCheckedChange={(checked) => 
                                    setFormData(prev => ({ ...prev, available: checked }))
                                }
                            />
                            <Label htmlFor="available">Available</Label>
                        </div>

                        <Button type="submit" className="w-full">
                            Add Book
                        </Button>
                    </form>
                </CardContent>
            </Card>
        </div>
    )
};

export default AddBook;
