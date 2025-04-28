import { useEffect, useState } from "react";
import { supabase } from "./supabase/supabaseClient";
import ProductCard from "./components/ProductCard";
import InfiniteScroll from "react-infinite-scroll-component";
import Header from "./components/Header";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";


function App() {
  const currentUser = useSelector(state => state.auth.userData?.email || '');
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate=useNavigate();
 
  const limit = 6; 

  const fetchProducts = async (reset = false) => {
    setLoading(true);
    const from = (page - 1) * limit;
    const to = from + limit - 1;

    let query = supabase
      .from("products")
      .select("*")
      .range(from, to);

    if (searchTerm) {
      query = query.ilike("productname", `%${searchTerm}%`);
    }

    const { data, error } = await query;

    if (error) {
      console.error("Error fetching products:", error.message);
    } else {
      if (reset) {
        setProducts(data);
      } else {
        setProducts((prev) => [...prev, ...data]);
      }

      if (data.length < limit) {
        setHasMore(false); 
      } else {
        setHasMore(true);
      }
    }

    setLoading(false);
  };

  useEffect(() => {
    fetchProducts(true); 
  }, [searchTerm]);

  const fetchMoreData = () => {
    setPage((prev) => prev + 1);
  };

  useEffect(() => {
    if (page > 1) {
      fetchProducts();
    }
  }, [page]);
  const addtocart = async (productId) => {
    
    if ( !currentUser) {
      alert('login to add items to cart');
      navigate('/signup')
    };
  
    const { data, error } = await supabase.from('addcart').insert([
      {
        buyer: currentUser,
        productid: productId
      }
    ]);
  
    if (error) {
      console.error('Error adding to cart:', error.message);

    } else {
      alert('Added to cart:', data);
    }
  };

  return (
    <>
      <Header/>
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 p-4">
        {/* Search Bar */}
        <div className="flex justify-center mb-8">
          <div className="relative w-full max-w-2xl">
            <input
              type="text"
              placeholder="Search products..."
              value={searchTerm}
              onChange={(e) => {
                setPage(1);
                setProducts([]);
                setSearchTerm(e.target.value);
              }}
              className="p-4 w-full border-0 rounded-xl shadow-md focus:outline-none focus:ring-2 focus:ring-purple-500 text-gray-700 placeholder-gray-400"
            />
            <svg
              className="absolute right-4 top-4 h-5 w-5 text-gray-400"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                clipRule="evenodd"
              />
            </svg>
          </div>
        </div>

        {/* Products Grid */}
        <InfiniteScroll
          dataLength={products.length}
          next={fetchMoreData}
          hasMore={hasMore}
          loader={
            <div className="flex justify-center my-8">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"></div>
            </div>
          }
          endMessage={
            <p className="text-center text-gray-500 my-8">
              {products.length > 0 ? "You've reached the end!" : "No products found"}
            </p>
          }
        >
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 px-4">
            {products.map((item) => (
              <ProductCard
                key={item.id}
                image={item.imagepath}
                name={item.productname}
                quantity={item.quantity}
                price={item.price}
                rating={item.rating}
                description={item.description}
                onAddToCart={
                 ()=>{
                  addtocart(item.id)
                 }
                }
                discount={item.discount || 0}
              />
            ))}
          </div>
        </InfiniteScroll>

        {loading && (
          <div className="flex justify-center my-8">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"></div>
          </div>
        )}
      </div>
    </>
  );
}

export default App;