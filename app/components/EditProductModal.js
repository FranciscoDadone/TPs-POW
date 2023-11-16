import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { apiUrl } from "../modules/api.modules";

const EditProductModal = ({ productId, title, description, price, image, onUpdate }) => {
  const [showModal, setShowModal] = useState(false);
  const [editedProduct, setEditedProduct] = useState({ title, description, price, image });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedProduct({
      ...editedProduct,
      [name]: value
    });
  };

  const handleCloseModal = () => setShowModal(false);
  const handleShowModal = () => setShowModal(true);

  const handleUpdate = async () => {
    try {
      const response = await fetch(`${apiUrl}/products/${productId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(editedProduct),
      });

      if (response.ok) {
        onUpdate(productId, editedProduct); // Llama a la función onUpdate con el ID del producto y los datos editados
        console.log("Producto actualizado con éxito");
        handleCloseModal(); // Cerrar modal después de actualizar el producto
      } else {
        console.error("Error al actualizar el producto");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div>
      <Button variant="primary" onClick={handleShowModal}>
        Editar Producto
      </Button>

      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Editar Producto</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="formTitle">
              <Form.Label>Nombre</Form.Label>
              <Form.Control
                type="text"
                placeholder="Nombre del producto"
                name="title"
                value={editedProduct.title}
                onChange={handleInputChange}
              />
            </Form.Group>
            <Form.Group controlId="formDescription">
              <Form.Label>Descripción</Form.Label>
              <Form.Control
                as="textarea"
                placeholder="Descripción del producto"
                name="description"
                value={editedProduct.description}
                onChange={handleInputChange}
              />
            </Form.Group>
            <Form.Group controlId="formPrice">
              <Form.Label>Precio</Form.Label>
              <Form.Control
                type="number"
                placeholder="Precio del producto"
                name="price"
                value={editedProduct.price}
                onChange={handleInputChange}
              />
            </Form.Group>
            <Form.Group controlId="formImage">
              <Form.Label>URL de la Imagen</Form.Label>
              <Form.Control
                type="text"
                placeholder="URL de la imagen del producto"
                name="image"
                value={editedProduct.image}
                onChange={handleInputChange}
              />
            </Form.Group>
            {/* Otros campos del formulario */}
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Cerrar
          </Button>
          <Button variant="primary" onClick={handleUpdate}>
            Guardar Cambios
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default EditProductModal;
