import { useEffect, useState } from "react";
import {Link}from "react-router-dom";
import { useNavigate } from "react-router-dom";

import "./Admin.css";
import API_URL from "../api";

import ProductForm from "../components/ProductForm";
import ProductCard from "../components/ProductCard";
import ProductEditModal from "../components/ProductEditModal";
import CategoryManager from "../components/CategoryManager";
import OwnerManager from "../components/OwnerManager";
import AdminDashboard
from "../components/AdminDashboard";
import BusinessSummary
from "../components/BusinessSummary";
import LowStockAlert
from "../components/LowStockAlert";
import OwnerSummary
from "../components/OwnerSummary";

import DashboardSummary
from "../components/DashboardSummary";
import SalesChart
from "../components/SalesChart";

function Admin() {

  const [showForm,
  setShowForm] =
  useState(false);

  const [showFormowners,
  setShowFormowners] =
  useState(false);
  const [showFormcategories,
  setShowFormcategories] =
  useState(false);
  
  const navigate = useNavigate();
  
  const role = localStorage.getItem("role");

  const [products, setProducts] = useState([]);
  const [owners, setOwners] =
  useState([]);
 
  const [editingProduct,
  setEditingProduct] =
  useState(false);

  const [searchText,
  setSearchText] =
  useState("");

  const [selectedCategory,
  setSelectedCategory] =
  useState("ทั้งหมด");
  const [categories,
  setCategories] =
  useState([]);

  const loadProducts = () => {

    fetch(`${API_URL}/products`)
      .then((response) => response.json())
      .then((data) => {

        setProducts(data);

      });

  };

  const loadOwners = () => {

    fetch(
      `${API_URL}/owners`
    )
      .then((res) =>
        res.json()
      )
      .then((data) =>
        setOwners(data)
      );

  };

  const loadCategories =
  () => {

    fetch(
      `${API_URL}/categories`
    )
      .then((res) =>
        res.json()
      )
      .then((data) =>
        setCategories(data)
      );

  };
  useEffect(() => {

    loadProducts();

    loadOwners();

    loadCategories();

  }, []);
  const handleDeleteProduct = async (id) => {

    const confirmDelete =
      window.confirm(
        "ยืนยันการลบสินค้า ?"
      );

    if (!confirmDelete) return;

    try {

      await fetch(
        `${API_URL}/products/${id}`,
        {
          method: "DELETE"
        }
      );

      loadProducts();

    } catch (error) {

      console.error(error);

      alert("ลบสินค้าไม่สำเร็จ");

    }

  };
  const handleChangeImage = async (
    productId
  ) => {

  const input =
    document.createElement(
      "input"
  );

    input.type = "file";

    input.accept =
      "image/*";

    input.onchange =
      async (event) => {

        const file =
          event.target.files[0];

        if (!file) return;

        try {

          const formData =
            new FormData();

          formData.append(
            "file",
            file
          );

          const response =
            await fetch(
              `${API_URL}/products/${productId}/image`,
              {
                method: "PUT",
                body: formData
              }
            );

          if (!response.ok) {

            const error =
              await response.json();

            alert(
              error.detail
            );

            return;

          }

          alert(
            "เปลี่ยนรูปสำเร็จ"
          );

          loadProducts();

        } catch (error) {

          console.error(error);

          alert(
            "เปลี่ยนรูปไม่สำเร็จ"
          );

        }

      };

    input.click();

  };
  const handleLogout = () => {

    localStorage.removeItem("role");

    navigate("/");

  };
  
  
  if (role !== "admin") {

    return (

      <div className="admin-page">

        <h1>
          ไม่มีสิทธิ์เข้าใช้งาน
        </h1>

      </div>

    );

  }

  return (

    <div className="admin-page">

      <h1 className="admin-title">
        ⭐ ระบบจัดการร้านดาวตก
      </h1>
      <DashboardSummary />
      <SalesChart />
      <AdminDashboard
        products={products}
        owners={owners}
        categories={categories}
      />
      <BusinessSummary
        products={products}
      />
      <LowStockAlert
        products={products}
      />
      <OwnerSummary
        products={products}
      />
      <button
        className="gold-button"
        onClick={() =>
          setShowForm(!showForm)
        }
      >
        ➕ เพิ่มสินค้า
      </button>
      <button
        className="gold-button"
        onClick={() =>
          setShowFormowners(!showFormowners)
        }
      >
        ➕ เพิ่มตำแหน่งผู้ใช้งาน
      </button>
      <button
        className="gold-button"
        onClick={() =>
          setShowFormcategories(!showFormcategories)
        }
      >
        ➕ เพิ่ม Category
      </button>
      {
        showForm && (

        <ProductForm
          onClose={() =>
            setShowForm(false)
          }
          onSuccess={() => {
            
            loadProducts();

            setShowForm(false);

          }}
        />
        
        )
      }
      {
        showFormowners && (

        <OwnerManager
          onClose={() =>
            setShowFormowners(false)
          }
          owners={owners}
          reloadOwners={loadOwners}
          onSuccess={() => {

            loadOwners();

            setShowFormowners(false);

          }}
        />
        
        )
      }
      {
        showFormcategories && (

        <CategoryManager
          onClose={() =>
            setShowFormcategories(false)
          }
          categories={categories}
          reloadCategories={loadCategories}
          onSuccess={() => {

            loadCategories();

            setShowFormcategories(false);

          }}
        />
        
        )
      }
     
      <h2 className="section-title">
        รายการสินค้า
      </h2>
      <p className="product-count">

        พบสินค้า

        {" "}

        {

          products.filter(
            (item) =>

              item.name
                .toLowerCase()
                .includes(
                  searchText
                    .toLowerCase()
                )

          ).length

        }

        {" "}

        รายการ

      </p>
      
      
      <input
        type="text"
        placeholder="ค้นหาสินค้า..."
        className="search-input"
        value={searchText}
        onChange={(e) =>
          setSearchText(
            e.target.value
          )
        }
      />
      <select
        className="filter-select"
        value={selectedCategory}
        onChange={(e) =>
          setSelectedCategory(
            e.target.value
          )
        }
      >

        <option value="ทั้งหมด">
          ทั้งหมด
        </option>

        {categories.map((item) => (

          <option
            key={item.id}
            value={item.name}
          >
            {item.name}
          </option>

        ))}

      </select>
      <div className="admin-product-grid">

        {products

        .filter((item) => {

          const matchSearch =

            item.name
              .toLowerCase()
              .includes(
                searchText
                  .toLowerCase()
              );

          const matchCategory =

            selectedCategory ===
            "ทั้งหมด"

            ||

            item.category ===
            selectedCategory;

          return (
            matchSearch &&
            matchCategory
          );

        })

        .map((item) => (

          <ProductCard
            key={item.id}
            item={item}
            onEdit={
              setEditingProduct
            }
            onDelete={
              handleDeleteProduct
            }
            handleChangeImage={
              handleChangeImage
            }
          />

        ))}

      </div>
      <ProductEditModal

        product={editingProduct}

        owners={owners}

        categories={categories}

        onClose={() =>
          setEditingProduct(false)
        }

        onSuccess={loadProducts}

      />
      <button
        className="logout-button"
        onClick={handleLogout}
      >
        Logout
      </button>
      <Link
      to="/cash-deposit"
      >

      <button
      className="gold-button"
      >

      🏦 ฝากเงินเข้าธนาคาร

      </button>

      </Link>

    </div>

  );

}

export default Admin;