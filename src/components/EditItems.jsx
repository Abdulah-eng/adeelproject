import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { supabase } from "../supabase/supabaseClient";
import ProductCard from "./ProductCard"; // 👈 importing your card

function EditItems() {
  const currentSeller = useSelector(state => state.auth.userData?.email || '');
  const [items, setItems] = useState([]);
  const [formData, setFormData] = useState({}); // store editable values
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

        // Initialize editable data
        const initialFormData = {};
        data.forEach(item => {
          initialFormData[item.id] = { ...item };
        });
        setFormData(initialFormData);
      }
    };

    fetchItems();
  }, [currentSeller]);

  const handleInputChange = (itemId, field, value) => {
    setFormData(prev => ({
      ...prev,
      [itemId]: {
        ...prev[itemId],
        [field]: value,
      },
    }));
  };

  const handleSaveChanges = async (itemId) => {
    const updatedItem = formData[itemId];
    const { id, ...updateData } = updatedItem;

    const { error } = await supabase
      .from('products')
      .update(updateData)
      .eq('id', itemId);

    if (error) {
      console.error('Error updating product:', error.message);
      alert('Error updating product!');
    } else {
      alert('Product updated successfully!');
    }
  };

  const handleDelete = async (itemId) => {
    if (!window.confirm('Are you sure you want to delete this product?')) return;

    const { error } = await supabase
      .from('products')
      .delete()
      .eq('id', itemId);

    if (error) {
      console.error('Error deleting product:', error.message);
      alert('Error deleting product!');
    } else {
      alert('Product deleted successfully!');
      setItems(prev => prev.filter(item => item.id !== itemId));
      
      // Also remove from formData
      setFormData(prev => {
        const newData = { ...prev };
        delete newData[itemId];
        return newData;
      });
    }
  };

  return (
    <div className="p-4 min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
      <h2 className="text-2xl font-bold mb-6 text-center">🛠 Edit Your Products</h2>

      {error && <p className="text-red-500">Error: {error.message}</p>}

      {items.length === 0 ? (
        <p className="text-center text-gray-500">No products found.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map((item) => (
            <div key={item.id} className="relative">
             <ProductCard
                image={formData[item.id]?.imagepath || ''}
                name={formData[item.id]?.productname || ''}
                quantity={formData[item.id]?.quantity || 0}
                price={formData[item.id]?.price || 0}
                rating={formData[item.id]?.rating || 0}
                description={formData[item.id]?.description || ''}
                discount={formData[item.id]?.discount || 0}
                onFieldChange={(field, value) => handleInputChange(item.id, field, value)}
                onAddToCart={() => handleSaveChanges(item.id)}
                deleteItem={() => handleDelete(item.id)}
                use="edititems"
/>

            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default EditItems;
