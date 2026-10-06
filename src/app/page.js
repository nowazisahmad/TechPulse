import Image from "next/image";
import baseUrl from "../services/baseUrl";
import ProductCard from "../components/ProductCard";
import AllProducts from "../components/AllProducts";
import Marquee from "../components/Marquee";

const getProducts = async () => {
  const res = await fetch(`${baseUrl}/api/products`);
  const data = await res.json();
  return data;
}

export default async function Home() {

  const products = await getProducts();

  const downProducts = products.filter(p => p.trend == 'down')
  console.log(downProducts);

  return (
    <div>
      <Marquee products={products}></Marquee>
      <div className="w-full max-w-7xl mx-auto space-y-8">
        {/* down product */}
        <div>
          <p>Down Products</p>
          <div>
            <div className='grid grid-cols-5 gap-8'>
              {
                downProducts.map(product => <ProductCard key={product._id} product={product} ></ProductCard>)
              }
            </div>
          </div>
        </div>

        {/* All products product */}
        <div>
          <AllProducts products={products} />
        </div>

      </div>
    </div>
  );
}