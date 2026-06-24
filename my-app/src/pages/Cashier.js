import { useState, useEffect } from "react";
import "./Cashier.css";
import API_URL from "../api";
function Cashier() {

  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const [searchText,
  setSearchText] =
  useState("");
  const [paymentMethod,
  setPaymentMethod] =
  useState("cash");
  const [slipImage,
  setSlipImage] =
  useState(null);

  const loadProducts = () => {

    fetch(`${API_URL}/products`)
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
  const increaseQuantity =
    (productId) => {

    const updatedCart =


    cart.map((item) => {

      if (
        item.id === productId
      ) {

        if (
          item.quantity >=
          item.stock
        ) {

          alert(
            "สินค้าในสต๊อกไม่พอ"
          );

          return item;

        }

        return {

          ...item,

          quantity:
            item.quantity + 1

        };

      }

      return item;

    });


  setCart(updatedCart);

  };
  const decreaseQuantity =
    (productId) => {

    const updatedCart =

    
    cart
      .map((item) => {

        if (
          item.id === productId
        ) {

          return {

            ...item,

            quantity:
              item.quantity - 1

          };

        }

        return item;

      })

      .filter(
        (item) =>
          item.quantity > 0
      );
    

    setCart(updatedCart);

    };

const removeFromCart =
(productId) => {

const updatedCart =

  cart.filter(

    (item) =>

      item.id !== productId

  );

  setCart(updatedCart);

  };
  const totalAmount = cart.reduce(

    (total, item) =>

      total + (item.sell_price * item.quantity),

    0

  );

  const handleCheckout =
    async () => {

    if (
    cart.length === 0
    ) {

    alert(
      "ยังไม่มีสินค้าในตะกร้า"
    );

    return;

    }

    if (
    paymentMethod ===
    "transfer"
    &&
    !slipImage
    ) {

    alert(
      "กรุณาแนบสลิปการโอนเงิน"
    );

    return;

    }

    let slipFilename = "";

    const items =
    cart.map(
    (item) => ({
    product_id:
    item.id,

        quantity:
          item.quantity
      })
    );

    if (
    paymentMethod ===
    "transfer"
    ) {

    const formData =
      new FormData();

    formData.append(
      "file",
      slipImage
    );

    const uploadResponse =
      await fetch(
        `${API_URL}/upload-slip`,
        {
          method: "POST",
          body: formData
        }
      );

    const uploadData =
      await uploadResponse.json();

    slipFilename =
      uploadData.filename;

    }
    fetch(`${API_URL}/checkout`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        items: items,
        payment_method:paymentMethod,
        slip_image: slipFilename

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
        <input
        type="text"
        placeholder="ค้นหาสินค้า..."
        value={searchText}
        onChange={(e) =>
        setSearchText(
        e.target.value
        )
        }
        />
        {products

        .filter(
        (item) =>

        item.stock > 0

        )

        .filter(
        (item) =>

        item.name
          .toLowerCase()
          .includes(
            searchText
              .toLowerCase()
          )

        )

        .map((item) => (

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

          <div
            className="quantity-box"
          >

            <button
              className="qty-button"
              onClick={() =>
                decreaseQuantity(
                  item.id
                )
              }
            >
              -
            </button>

            <span>
              {item.quantity}
            </span>

            <button
              className="qty-button"
              onClick={() =>
                increaseQuantity(
                  item.id
                )
              }
            >
              +
            </button>

          </div>

          <p>
            รวม {item.quantity * item.sell_price} บาท
          </p>

          <button
            className="remove-button"
            onClick={() =>
              removeFromCart(
                item.id
              )
            }
          >
            ลบออก
          </button>

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

        <div className="payment-box">

        <h3>
          วิธีชำระเงิน
        </h3>

        <select
          value={paymentMethod}
          onChange={(e) =>
            setPaymentMethod(
              e.target.value
            )
          }
        >

          <option value="cash">
            เงินสด
          </option>

          <option value="transfer">
            โอนเงิน
          </option>

        </select>

        </div>

        {
          paymentMethod ===
          "transfer" && (

          <input
            type="file"
            accept="image/*"
            onChange={(e) =>
              setSlipImage(
                e.target.files[0]
              )
            }
          />
          )
        } 

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