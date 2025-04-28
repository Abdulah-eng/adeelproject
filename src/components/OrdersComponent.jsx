
import { useState, useEffect } from 'react';
import { supabase } from "../supabase/supabaseClient";
import { useSelector } from "react-redux";
import ProductCard from "./ProductCard";

function OrdersComponent(){

    const currentBuyer = useSelector(state => state.auth.userData?.email || '');
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
  
    
    // Function to fetch products in the cart
    const getProductsInCart = async () => {
      setLoading(true);
      try {
        const { data: cartItems, error: cartError } = await supabase
          .from('placedorder')
          .select('productid')
          .eq('buyer', currentBuyer);
  
        if (cartError) {
          throw cartError;
        }
  
        const productIds = cartItems.map(item => item.productid);
  
        if (productIds.length === 0) {
          setProducts([]);
          setLoading(false);
          return;
        }
  
        const { data: productData, error: productError } = await supabase
          .from('products')
          .select('*')
          .in('id', productIds);
  
        if (productError) {
          throw productError;
        }
  
        setProducts(productData);
      } catch (err) {
        console.error('Error fetching cart products:', err.message);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    useEffect(() => {
        if (currentBuyer) {
          getProductsInCart();
        }
      }, [currentBuyer]);

    const deleteitem = async (productId) => {
        try {
          setLoading(true);
          // Delete from 'addcart' where productid = productId and buyer = currentBuyer
          const { error } = await supabase
            .from('placedorder')
            .delete()
            .match({ productid: productId, buyer: currentBuyer });
      
          if (error) {
            throw error;
          }
      
          // After successful deletion, refresh the cart
          getProductsInCart();
         
        } catch (err) {
          console.error('Error deleting item from cart:', err.message);
          alert('Failed to delete item from cart!');
        } finally {
          setLoading(false);
        }
      };

      if (loading) {
        return (
          <div className="flex justify-center my-8">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"></div>
          </div>
        );
      }
    
      if (error) {
        return (
          <div className="text-center text-red-500 mt-8">
            Error: {error}
          </div>
        );
      }

    return (
       <>
       
       <div className="p-4 min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
      <h2 className="text-2xl font-bold mb-6 text-center">🛒 Your Orders</h2>

      {products.length === 0 ? (
        <p className="text-center text-gray-500">No items ordered.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map(product => (
            <ProductCard
              key={product.id}
              image={product.imagepath}
              name={product.productname}
              quantity={product.quantity}
              price={product.price}
              rating={product.rating}
              description={product.description}
              onAddToCart={()=>deleteitem(product.id)}  // Use onOrderNow directly
              discount={product.discount || 0}
              use={'orderscomponent'}
             
            />
          ))}
        </div>
      )}
    </div>
       </>
    )
}
export default OrdersComponent