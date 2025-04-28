import { useState } from "react";
import { useSelector } from "react-redux";
import { supabase } from "../supabase/supabaseClient";
import { uploadAndGetPublicUrl } from "../supabase/handleImageUpload";

function Additems() {
    const seller = useSelector(state => state.auth.userData?.email || '');

    const [productName, setProductName] = useState('');
    const [quantity, setQuantity] = useState(0);
    const [price, setPrice] = useState(0);
    const [discount, setDiscount] = useState(0);
    const [imageFile, setImageFile] = useState(null);
    const [rating, setRating] = useState(5);
    const [description, setDescription] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            let imageUrl = '';

            if (imageFile) {
                imageUrl = await uploadAndGetPublicUrl(imageFile);
            }

            const { data, error } = await supabase.from('products').insert([
                {
                    seller: seller,
                    productname: productName,
                    quantity: quantity,
                    price: price,
                    discount: discount,
                    rating: rating,
                    description: description,
                    imagepath: imageUrl,
                }
            ]);

            if (error) throw error;

            alert('Product added successfully!');
            // Reset form
            setProductName('');
            setQuantity(0);
            setPrice(0);
            setDiscount(0);
            setImageFile(null);
            setRating(5);
            setDescription('');
        } catch (err) {
            console.error(err);
            alert('Failed to add product.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-2xl mx-auto mt-10 p-6 border rounded-lg shadow-lg bg-white">
            <h2 className="text-2xl font-bold mb-6 text-center text-indigo-700">Add New Product</h2>

            <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Product Name</label>
                    <input
                        type="text"
                        placeholder="Enter product name"
                        value={productName}
                        onChange={(e) => setProductName(e.target.value)}
                        className="w-full border border-gray-300 p-2 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                        required
                    />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Quantity</label>
                        <input
                            type="number"
                            placeholder="Available quantity"
                            value={quantity}
                            onChange={(e) => setQuantity(Number(e.target.value))}
                            min="0"
                            className="w-full border border-gray-300 p-2 rounded-md focus:ring-2 focus:ring-indigo-500"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Price ($)</label>
                        <input
                            type="number"
                            placeholder="Product price"
                            value={price}
                            onChange={(e) => setPrice(Number(e.target.value))}
                            min="0"
                            step="0.01"
                            className="w-full border border-gray-300 p-2 rounded-md focus:ring-2 focus:ring-indigo-500"
                            required
                        />
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Discount (%)</label>
                        <input
                            type="number"
                            placeholder="Discount percentage"
                            value={discount}
                            onChange={(e) => setDiscount(Number(e.target.value))}
                            min="0"
                            max="100"
                            className="w-full border border-gray-300 p-2 rounded-md focus:ring-2 focus:ring-indigo-500"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Rating (1-5)</label>
                        <input
                            type="number"
                            placeholder="Product rating"
                            value={rating}
                            onChange={(e) => setRating(Number(e.target.value))}
                            min="1"
                            max="5"
                            className="w-full border border-gray-300 p-2 rounded-md focus:ring-2 focus:ring-indigo-500"
                            required
                        />
                    </div>
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Product Image</label>
                    <div className="flex items-center justify-center w-full">
                        <label className="flex flex-col w-full border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-indigo-500 hover:bg-gray-50">
                            <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                {imageFile ? (
                                    <p className="text-sm text-gray-700">{imageFile.name}</p>
                                ) : (
                                    <>
                                        <svg className="w-8 h-8 mb-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                        </svg>
                                        <p className="text-sm text-gray-500">Click to upload product image</p>
                                    </>
                                )}
                            </div>
                            <input 
                                type="file" 
                                accept="image/*" 
                                onChange={(e) => setImageFile(e.target.files[0])} 
                                className="hidden" 
                                required 
                            />
                        </label>
                    </div>
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                    <textarea
                        placeholder="Enter product description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        rows="4"
                        className="w-full border border-gray-300 p-2 rounded-md focus:ring-2 focus:ring-indigo-500"
                        required
                    />
                </div>

                <button
                    type="submit"
                    disabled={loading}
                    className={`w-full py-3 px-4 rounded-md font-medium text-white ${loading 
                        ? 'bg-indigo-400 cursor-not-allowed' 
                        : 'bg-indigo-600 hover:bg-indigo-700'} transition-colors shadow-md`}
                >
                    {loading ? (
                        <span className="flex items-center justify-center">
                            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            Processing...
                        </span>
                    ) : 'Add Product'}
                </button>
            </form>
        </div>
    );
}

export default Additems;