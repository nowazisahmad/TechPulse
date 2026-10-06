import MarqueeText from "react-marquee-text";

const Marquee = ({ products }) => {

    console.log(products);
    return (
        <div className='bg-base-300'>
            <MarqueeText direction='right' duration={10}>
                {
                    products.map(product => (
                        <div   key={product?._id}>
                            <p className='mr-12'>●{product?.name}</p>
                        </div>
                    ))
                }
            </MarqueeText>
        </div>
    );
};

export default Marquee;