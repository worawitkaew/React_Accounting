import { useState, useEffect } from "react";
import "./Cashier.css";
function Cashier() {

  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);

  const loadProducts = () => {

    fetch("http://localhost:8000/products")
      .then((response) => response.json())
      .then((data) => {

        setProducts(data);

      });

  };

  useEffect(() => {

    loadProducts();

  }, []);

  const addToCart = (product) => {

    const existingItem = cart.find(
      (item) => item.id === product.id
    );

    if (existingItem) {

      const updatedCart = cart.map((item) =>

        item.id === product.id
          ? {
              ...item,
              quantity: item.quantity + 1
            }
          : item

      );

      setCart(updatedCart);

    } else {

      setCart([
        ...cart,
        {
          ...product,
          quantity: 1
        }
      ]);

    }

  };

  const totalAmount = cart.reduce(

    (total, item) =>

      total + (item.sell_price * item.quantity),

    0

  );

  const handleCheckout = () => {

    if (cart.length === 0) {

      alert("ยังไม่มีสินค้าในตะกร้า");

      return;
    }

    const items = cart.map((item) => ({
      product_id: item.id,
      quantity: item.quantity
    }));

    fetch("http://localhost:8000/checkout", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        items: items
      })
    })
      .then((response) => response.json())
      .then((data) => {

        if (data.success === false) {

            alert(data.message);

            return;
        }

        alert(
            `ขายสำเร็จ\nกำไร ${data.profit} บาท`
        );

        setCart([]);

        loadProducts();

        })
      .catch((error) => {

        console.error(error);

        alert("เกิดข้อผิดพลาด");

      });

  };

  return (

  <div className="cashier-page">

    <h1 className="cashier-title">
      ⭐ เครื่องคิดเงินร้านดาวตก
    </h1>

    <div className="cashier-layout">

      <div className="product-section">

        <h2>สินค้า</h2>

        {products.map((item) => (

          <div
            key={item.id}
            className="product-card"
          >

            <h3>
              {item.name}
            </h3>

            <p>
              ราคา {item.sell_price} บาท
            </p>

            <p>
              คงเหลือ {item.stock} ชิ้น
            </p>

            <button
              className="add-button"
              onClick={() => addToCart(item)}
            >
              เพิ่มเข้าตะกร้า
            </button>

          </div>

        ))}

      </div>

      <div className="cart-section">

        <h2>ตะกร้าสินค้า</h2>

        {cart.length === 0 && (

          <p>
            ยังไม่มีสินค้า
          </p>

        )}

        {cart.map((item) => (

          <div
            key={item.id}
            className="cart-card"
          >

            <h3>
              {item.name}
            </h3>

            <p>
              จำนวน {item.quantity}
            </p>

            <p>
              รวม {item.quantity * item.sell_price} บาท
            </p>

          </div>

        ))}

        <div className="total-box">

          <h2>
            ยอดรวม
          </h2>

          <h1>
            {totalAmount} บาท
          </h1>

        </div>

        <button
          className="checkout-button"
          onClick={handleCheckout}
        >
          ยืนยันการขาย
        </button>

      </div>

    </div>

  </div>

  );
}
export default Cashier;