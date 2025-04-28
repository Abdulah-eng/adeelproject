import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { supabase } from "../supabase/supabaseClient";
import ProductCard from "./ProductCard"; // 👈 import your card

function ViewItems() {
    const currentSeller = useSelector(state => state.auth.userData?.email || '');
    const [items, setItems] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchItems = async () => {
            if (!currentSeller) return;
            
            const { data, error } = await supabase
                .from('products')
                .select('*')
                .eq('seller', currentSeller);

            if (error) {
                console.error('Error fetching items:', error.message);
                setError(error);
            } else {
                setItems(data);
            }
        };

        fetchItems();
    }, [currentSeller]);

    return (
        <div className="p-4">
            <h2 className="text-2xl font-bold mb-6">Your Products</h2>

            {error && <p className="text-red-500">Error: {error.message}</p>}

            {items.length === 0 ? (
                <p>No products found.</p>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {items.map((item) => (
                        <ProductCard
                            key={item.id}
                            image={item.imagepath} // 👈 Adjust if your DB column is different
                            name={item.productname}
                            quantity={item.quantity}
                            price={item.price}
                            rating={item.rating}
                            description={item.description}
                            onAddToCart={() => console.log('Add to cart clicked for:', item.productname)}
                            discount={item.discount || 0} // in case you have discount field
                        />
                    ))}
                </div>
            )}
        </div>
    );
}

export default ViewItems;
