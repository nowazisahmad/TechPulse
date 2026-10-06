import Link from 'next/link';
import baseUrl from '../../../services/baseUrl';
import ProductCard from '../../../components/ProductCard';

const getCategoryProducts = async (categorySlug) => {
    const res = await fetch(`${baseUrl}/api/products?category=${categorySlug}`)
    const data = await res.json();
    return data
}

const getCategories = async () => {
    const res = await fetch(`${baseUrl}/api/categories`);
    const data = await res.json();
    return data;
}
const CategoryProducts = async ({ params }) => {
    const { categorySlug } = await params;

    const categoryProducts = await getCategoryProducts(categorySlug);

    const categories = await getCategories()

    const currentCategory = categories.find(c => c.slug == categorySlug)
    console.log(currentCategory);

    return (
        <div className='max-w-7xl mx-auto w-full'>
            {/* BreadCrumb */}
            <div className='flex'>
                <Link className='text-blue-500' href={'/'}>Home</Link>
                <span>→</span>
                <p>{currentCategory?.name}</p>
            </div>

            {/* Header */}
            <div className='flex items-center'>
                {/* left */}
                <div>
                    <p className='text-4xl'>{currentCategory?.icon}</p>
                </div>
                {/* right */}
                <div>
                    <p className='text-2xl font-bold'>{currentCategory?.name}</p>
                    <p>{currentCategory?.description}</p>
                </div>
            </div>
            <div className='flex gap-6'>
                <p>{categoryProducts?.length} products found</p>
                <p>Price update today</p>
            </div>

{/* Products */}
            <div className='grid grid-cols-5'>
               {
                categoryProducts.map(product=> <ProductCard key={product._id} product={product} ></ProductCard>)
               }
            </div>


        </div>
    );
};

export default CategoryProducts;