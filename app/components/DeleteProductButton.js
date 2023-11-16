import React from 'react';
import { Button } from 'react-bootstrap';
import { apiUrl } from "../modules/api.modules";

const DeleteProductButton = ({ productId, onDelete }) => {
  const handleDelete = async () => {
    try {
      const response = await fetch(`${apiUrl}/products/${productId}`, {
        method: "DELETE",
      });

      if (response.ok) {
        onDelete(productId); // Llama a la función onDelete con el ID del producto eliminado
        console.log("Producto eliminado con éxito");
      } else {
        console.error("Error al eliminar el producto");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <Button variant="danger" onClick={handleDelete}>
      Eliminar Producto
    </Button>
  );
};

export default DeleteProductButton;
