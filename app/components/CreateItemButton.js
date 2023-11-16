import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { apiUrl } from "../modules/api.modules";

const CreateProductButton = ({ setData, data }) => {
    const [showModal, setShowModal] = useState(false);
    const [newProduct, setNewProduct] = useState({
        title: '',
        description: '',
        price: '',
        image: '',
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewProduct({
            ...newProduct,
            [name]: name === "images" ? value.split(",") : value
        });
    };

    const handleCloseModal = () => setShowModal(false);
    const handleShowModal = () => setShowModal(true);

    const createProduct = async () => {
        try {
            const response = await fetch(`${apiUrl}/products`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(newProduct),
            });

            if (response.ok) {
                const newData = await response.json();
                setData([...data, newData]);
                console.log("Producto creado con éxito");
                handleCloseModal(); // Cerrar modal después de crear el producto
            } else {
                console.error("Error al crear el producto");
            }
        } catch (error) {
            console.error("Error:", error);
        }
    };

    return (
        <div>
            <Button variant="primary" onClick={handleShowModal}>
                Crear Producto
            </Button>

            <Modal show={showModal} onHide={handleCloseModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Crear Nuevo Producto</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group controlId="formTitle">
                            <Form.Label>Nombre</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Nombre del producto"
                                name="title"
                                value={newProduct.title}
                                onChange={handleInputChange}
                            />
                        </Form.Group>
                        <Form.Group controlId="formDescription">
                            <Form.Label>Descripción</Form.Label>
                            <Form.Control
                                as="textarea"
                                placeholder="Descripción del producto"
                                name="description"
                                value={newProduct.description}
                                onChange={handleInputChange}
                            />
                        </Form.Group>
                        <Form.Group controlId="formPrice">
                            <Form.Label>Precio</Form.Label>
                            <Form.Control
                                type="number"
                                placeholder="Precio del producto"
                                name="price"
                                value={newProduct.price}
                                onChange={handleInputChange}
                            />
                        </Form.Group>
                        <Form.Group controlId="formImage">
                            <Form.Label>URL de la Imagen</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="URL de la imagen del producto"
                                name="image"
                                value={newProduct.image}
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
                    <Button variant="primary" onClick={createProduct}>
                        Crear
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};

export default CreateProductButton;
