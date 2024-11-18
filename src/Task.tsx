import React, { useState, useEffect } from "react";
import axios from "axios";

const apiUrl = "https://localhost:44312/api/Expense";

interface Item {
  expenseId: number;
  name: string;
  description: string;
  category: Category;
  amount: number;
  createDate: Date;
  updatedDate: Date;
}

enum Category {
  Food,
  Transportation,
  Housing,
  Utilities,
  Entertainment,
  Healthcare,
  Clothing,
  PersonalCare,
  Education,
  Miscellaneous,
}

const ItemCrud: React.FC = () => {
  const [items, setItems] = useState<Item[]>([]);
  const [newItem, setNewItem] = useState<string>("");
  const [editingItem, setEditingItem] = useState<number | null>(null);
  const [editingText, setEditingText] = useState<string>("");

  // Fetch items on component load
  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
    try {
      const response = await axios.get<Item[]>(apiUrl);
      setItems(response.data);
    } catch (error) {
      console.error("Error fetching items:", error);
    }
  };

  const createItem = async () => {
    if (!newItem) return;
    try {
      const response = await axios.post<Item>(apiUrl, { name: newItem });
      setItems([...items, response.data]);
      setNewItem("");
    } catch (error) {
      console.error("Error creating item:", error);
    }
  };

  return (
    <div>
      {/* Create new item */}
      <input
        type="text"
        placeholder="New Item"
        value={newItem}
        onChange={(e) => setNewItem(e.target.value)}
      />
      <button onClick={createItem}>Add Item</button>

      <ul>
        {items.map((item) => (
          <li key={item.expenseId}>
            {item.name} | {item.description} | {Category[item.category]} |{" "}
            {item.amount}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ItemCrud;
