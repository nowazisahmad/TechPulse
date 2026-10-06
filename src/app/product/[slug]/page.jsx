
import Image from "next/image";
import baseUrl from "../../../services/baseUrl";

const getSingleProduct = async (slug) => {
  const res = await fetch(`${baseUrl}/api/products/${slug}`, {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch product");
  }

  const data = await res.json();

  return data?.data ?? data;
};

const ProductDetails = async ({ params }) => {
  const { slug } = await params;

  const product = await getSingleProduct(slug);

  return (
    <div className="container mx-auto px-4 py-10">
      {/* Product Overview */}
      <div className="grid gap-8 md:grid-cols-2">
        {/* Image */}
        <div className="flex h-[450px] items-center justify-center rounded-xl bg-base-200 p-8">
          <Image
            src={product?.image}
            alt={product?.name || "Product image"}
            width={600}
            height={600}
            className="h-full w-full object-contain"
          />
        </div>

        {/* Product Info */}
        <div>
          <div className="mb-3 flex items-center gap-3">
            <span className="badge badge-primary">
              {product?.category}
            </span>

            <span className="text-sm text-gray-500">
              {product?.brand}
            </span>
          </div>

          <h1 className="text-3xl font-bold">
            {product?.name}
          </h1>

          <p className="mt-4 text-gray-500">
            {product?.description}
          </p>

          {/* Price */}
          <div className="mt-6">
            <div className="flex items-center gap-4">
              <span className="text-4xl font-bold">
                ৳{product?.currentPrice?.toLocaleString()}
              </span>

              {product?.previousPrice && (
                <span className="text-lg text-gray-400 line-through">
                  ৳{product?.previousPrice?.toLocaleString()}
                </span>
              )}
            </div>

            <span className="text-sm text-gray-500">
              {product?.unit}
            </span>

            <div className="mt-3">
              <span className="badge badge-success">
                ↓ {Math.abs(product?.trendPercent ?? 0)}%
              </span>
            </div>
          </div>

          {/* Stores */}
          <div className="mt-8">
            <h2 className="mb-3 text-xl font-semibold">
              Available Stores
            </h2>

            <div className="space-y-3">
              {product?.stores?.map((store) => (
                <div
                  key={store?.name}
                  className="flex items-center justify-between rounded-lg border p-4"
                >
                  <div>
                    <p className="font-semibold">{store?.name}</p>
                    <p className="text-sm text-gray-500">
                      ৳{store?.price?.toLocaleString()}
                    </p>
                  </div>

                  <a
                    href={store?.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-sm btn-primary"
                  >
                    Visit Store
                  </a>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Specifications */}
      <div className="mt-12">
        <h2 className="mb-5 text-2xl font-bold">
          Specifications
        </h2>

        <div className="overflow-x-auto rounded-xl border">
          <table className="table">
            <tbody>
              <tr>
                <td className="font-semibold">Cores</td>
                <td>{product?.specs?.cores}</td>
              </tr>

              <tr>
                <td className="font-semibold">Threads</td>
                <td>{product?.specs?.threads}</td>
              </tr>

              <tr>
                <td className="font-semibold">Base Clock</td>
                <td>{product?.specs?.baseClock}</td>
              </tr>

              <tr>
                <td className="font-semibold">Boost Clock</td>
                <td>{product?.specs?.boostClock}</td>
              </tr>

              <tr>
                <td className="font-semibold">Socket</td>
                <td>{product?.specs?.socket}</td>
              </tr>

              <tr>
                <td className="font-semibold">TDP</td>
                <td>{product?.specs?.tdp}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Price History */}
      <div className="mt-12">
        <h2 className="mb-5 text-2xl font-bold">
          Price History
        </h2>

        <div className="space-y-3">
          {product?.priceHistory?.map((item) => (
            <div
              key={item?.date}
              className="flex items-center justify-between rounded-lg border p-4"
            >
              <span>{item?.date}</span>

              <span className="font-semibold">
                ৳{item?.price?.toLocaleString()}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;