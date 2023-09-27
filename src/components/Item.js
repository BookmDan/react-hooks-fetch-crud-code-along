import React from "react";

function Item({ item, onToggleIsInCart, onDelete }) {
  const handleToggleIsInCart = () => {
    onToggleIsInCart(item.id)
  }

  const handleDelete = () => {
    onDelete(item.id)
  }
  return (
    <li className={item.isInCart ? "in-cart" : ""}>
      <span>{item.name}</span>
      <span className="category">{item.category}</span>
      <button
        className={item.isInCart ? "remove" : "add"}
        onClick={handleToggleIsInCart}
      >
        {item.isInCart ? "Remove From" : "Add to"} Cart
      </button>
      <button className="remove" onClick={handleDelete}>Delete</button>
    </li>
  );
}

export default Item;
