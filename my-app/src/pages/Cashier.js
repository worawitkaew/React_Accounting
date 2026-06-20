import { useState, useEffect } from "react";

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
    <div>

      <h1>เครื่องคิดเงินร้านดาวตก</h1>

      <h2>รายการสินค้า</h2>

      {products.map((item) => (

        <div key={item.id}>

          <p>
            {item.name}
            {" | ขาย "}
            {item.sell_price}
            {" บาท | คงเหลือ "}
            {item.stock}
          </p>

          <button
            onClick={() => addToCart(item)}
          >
            เพิ่มเข้าตะกร้า
          </button>

          <hr />

        </div>

      ))}

      <h2>ตะกร้าสินค้า</h2>

      {cart.map((item) => (

        <div key={item.id}>

          <p>

            {item.name}

            {" | ขาย "}
            {item.sell_price}

            {" | จำนวน "}
            {item.quantity}

            {" | รวม "}
            {item.sell_price * item.quantity}

            {" บาท"}

          </p>

        </div>

      ))}

      <hr />

      <h3>
        ยอดสุทธิ : {totalAmount} บาท
      </h3>

      <button
        onClick={handleCheckout}
      >
        ยืนยันการขาย
      </button>

    </div>
  );
}

export default Cashier;