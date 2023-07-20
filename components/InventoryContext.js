import React, { createContext, useReducer, useContext } from "react";

const InventoryContext = createContext();

const inventoryReducer = (state, action) => {
  switch (action.type) {
    case "ADD_PRODUCT":
      return {
        ...state,
        inventory: [...state.inventory, action.payload],
      };
    case "DELETE_PRODUCT":
      return {
        ...state,
        inventory: state.inventory.filter(
          (product, index) => index !== action.payload
        ),
      };
    default:
      return state;
  }
};

export const InventoryProvider = ({ children }) => {
  const [state, dispatch] = useReducer(inventoryReducer, { inventory: [] });

  return (
    <InventoryContext.Provider value={{ state, dispatch }}>
      {children}
    </InventoryContext.Provider>
  );
};

export const useInventory = () => {
  const context = useContext(InventoryContext);
  if (!context) {
    throw new Error("useInventory debe usarse dentro de InventoryProvider");
  }
  return context;
};
