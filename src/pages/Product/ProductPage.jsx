import { useState, useEffect } from "react";
import getAllProducts from "../../services/getAllProducts";
import CardList from "../../components/CardList/CardList";
import Navbar from "../../components/Navbar/Navbar";
import RadioButton from "../../components/RadioButton/RadioButton";

export default function ProductPage() {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const allProducts = getAllProducts();
    setProducts(allProducts);
    setFilteredProducts(allProducts);
  }, []);

  const handleFilterChange = (value) => {
    setSelectedCategory(value);
    filterProducts(value, searchQuery);
  };

  const handleSearch = (query) => {
    setSearchQuery(query);
    filterProducts(selectedCategory, query);
  };

  const filterProducts = (category, query) => {
    const filteredByCategory = category === "all"
      ? products
      : products.filter((product) => product.category.toLowerCase() === category);

    const filteredBySearch = filteredByCategory.filter((product) =>
      product.name.toLowerCase().includes(query.toLowerCase()) ||
      product.category.toLowerCase().includes(query.toLowerCase())
    );

    setFilteredProducts(filteredBySearch);
  };

  return (
    <>
      <Navbar onSearch={handleSearch} />
      <div className="px-24 py-4 gap-4 mt-4 flex-wrap">
        <h3 className="font-medium">Filter</h3>
        <div className="flex gap-2 flex-wrap">
          <RadioButton
            options={[
              { label: "All", value: "all" },
              { label: "Paris", value: "paris" },
              { label: "Pashmina", value: "pashmina" },
            ]}
            defaultValue="all"
            onChange={handleFilterChange}
          />
        </div>
      </div>
      <section className="container px-24 py-4">
        <main className="grid grid-cols-4 gap-4">
          <CardList products={filteredProducts} />
        </main>
      </section>
    </>
  );
}
