import React, { useState, useEffect } from "react";
import ItemForm from "./ItemForm";
import Filter from "./Filter";
import Item from "./Item";

function ShoppingList() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [items, setItems] = useState([]);
  const [error, setError] = useState(null)
  // const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchItems();
  }, [])

  // function handleSubmit(e) {
  //   e.preventDefault();
  //   const itemData = {
  //     name: name,
  //     category: category,
  //     isInCart: false,
  //   };

  //   fetch("http://localhost:4000/items", {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //     body: JSON.stringify(itemData),
  //   })
  //     .then((r) => r.json())
  //     .then((newItem) => console.log(newItem));
  // }

  
  const fetchItems = () => {
    fetch("http://localhost:4000/items")
      .then((r) => r.json())
      .then((items) => {
        setItems(items)
        // setLoading(false)
      })
      .catch((e) => {
        console.error("Error fetching data: ", e)
        setError("Error fetching data. Please try again later.")
        // setLoading(false)
      })
  }

  function handleToggleIsInCart(itemId) {
    // Update the isInCart status for the item with the specified itemId
    setItems((prevItems) =>
      prevItems.map((item) =>
        item.id === itemId ? { ...item, isInCart: !item.isInCart } : item
      )
    );
  }

  function handleAddItem(newItem) {
    // console.log("In ShoppingList:", newItem)
    setItems([...items, newItem])
  }

  function handleDeleteItem(itemId) {
    console.log('Deleting item with ID:', itemId);
    // Remove the item with the specified itemId from the list
    setItems((prevItems) => prevItems.filter((item) => item.id !== itemId));
  }

  function handleCategoryChange(category) {
    setSelectedCategory(category);
  }

  const itemsToDisplay = items.filter((item) => {
    if (selectedCategory === "All") return true;
    return item.category === selectedCategory;
  });


  return (
    <div className="ShoppingList">
      <ItemForm onAddItem={handleAddItem} />
      <Filter
        category={selectedCategory}
        onCategoryChange={handleCategoryChange}
      />
      {error &&<div className="error-message">{error}</div>}
      <ul className="Items">
        {itemsToDisplay.map((item) => (
          <div key={item.id}>
            <Item
              key={item.id}
              item={item}
              onToggleIsInCart={handleToggleIsInCart}
              onDelete={handleDeleteItem}
            />
            {/* <button onClick={() => handleDeleteItem(item.id)}>Delete</button> */}
          </div>
        ))}
      </ul>
    </div>
  );
}

export default ShoppingList;
