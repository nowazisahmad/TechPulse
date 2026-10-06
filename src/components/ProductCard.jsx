import Image from "next/image";
import Link from "next/link";

const ProductCard = ({ product }) => {
    console.log(product);
  return (
    <div className="card bg-base-100 shadow-md border border-base-200">
      {/* Image */}
      <figure className="h-56 bg-base-200 p-4">
        <Image
          height={600}
          width={600}
          src={product?.image}
          alt={product?.name }
          className="h-full w-full object-contain"
        />
      </figure>

      <div className="card-body">
        {/* Brand & Trend */}
        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-500">
            {product?.brand || "Unknown Brand"}
          </span>

          <span
            className={`badge ${
              product?.trend === "down"
                ? "badge-success"
                : "badge-error"
            }`}
          >
            {product?.trend === "down" ? "↓" : "↑"}{" "}
            {Math.abs(product?.trendPercent ?? 0)}%
          </span>
        </div>

        {/* Product Name */}
        <h2 className="card-title text-lg">
          {product?.name || "Product Name"}
        </h2>

        {/* Description */}
        <p className="text-sm text-gray-500 line-clamp-2">
          {product?.description || "No description available."}
        </p>

        {/* Price */}
        <div className="mt-2">
          <div className="flex items-center gap-3">
            <span className="text-2xl font-bold">
              ৳{product?.currentPrice?.toLocaleString() || "0"}
            </span>

            {product?.previousPrice && (
              <span className="text-sm text-gray-400 line-through">
                ৳{product?.previousPrice?.toLocaleString()}
              </span>
            )}
          </div>

          <span className="text-xs text-gray-500">
            {product?.unit || "per piece"}
          </span>
        </div>

        {/* Action */}
        <div className="card-actions mt-3">
          <Link href={`/product/${product?.slug}`}><button className="btn btn-primary w-full">
            View Details
          </button></Link>
        </div>
      </div>
    </div>
  );
};

export default ProductCard