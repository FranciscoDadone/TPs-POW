import React, { useState, useEffect } from "react";
import { Col, Row, Card, Button, DropdownButton, Dropdown, Form } from 'react-bootstrap';
import { apiUrl } from "../modules/api.modules";
import { useFetch } from "../operations/useFetch";
import CreateProductButton from "./CreateItemButton";
import DeleteProductButton from "./DeleteProductButton";
import EditProductModal from "./EditProductModal";
import Pagination from "./Pagination";
export default function Items() {
  const PAGE_SIZE = 5;
  const { data: initialData, isLoading } = useFetch(`${apiUrl}/products`);
  const [data, setData] = useState([]);
  const [orderBy, setOrderBy] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);



  useEffect(() => {
    setData(initialData);
  }, [initialData]);

  const handleSort = (order) => {
    const sortedData = [...data];

    if (order === "asc") {
      sortedData.sort((a, b) => a.price - b.price);
    } else if (order === "desc") {
      sortedData.sort((a, b) => b.price - a.price);
    }

    setData(sortedData);
    setOrderBy(order);
  };

  const handleFilter = (category) => {
    setSelectedCategory(category);
    const filteredData = initialData.filter(item => {
      if (category === 'Caro') {
        return item.price > 1000;
      }
      else if (category === 'Barato') {
        return item.price < 500;
      }
      else {
        return item.category === category;
      }
    });

    setData(filteredData);
  };

  const clearFilters = () => {
    setSelectedCategory('');
    setData(initialData);
  };

  const handleDelete = (productId) => {
    const updatedData = data.filter(product => product.id !== productId);
    setData(updatedData);
  };

  const handleUpdate = (productId, updatedProduct) => {
    const updatedData = data.map(product =>
      product.id === productId ? { ...product, ...updatedProduct } : product
    );
    setData(updatedData);
  };

  const handleSearch = (e) => {
    const searchValue = e.target.value.toLowerCase();
    setSearchTerm(searchValue);
    const searchedProducts = initialData.filter(product =>
      product.title.toLowerCase().includes(searchValue)
    );
    setData(searchedProducts);
  };


  const getCurrentPageData = () => {
    const startIndex = (currentPage - 1) * PAGE_SIZE;
    const endIndex = startIndex + PAGE_SIZE;
    return data.slice(startIndex, endIndex);
  };

  const totalPages = Math.ceil(data.length / PAGE_SIZE);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };



  return (
    <>
      <Row>
        <Col>
          <Form.Control
            type="text"
            placeholder="Buscar producto..."
            value={searchTerm}
            onChange={handleSearch}
          />

        </Col>
      </Row>
      <DropdownButton id="dropdown-basic-button" title="Filtrar por">
        <Dropdown.Item onClick={() => handleSort("asc")}>Precio: Menor a Mayor</Dropdown.Item>
        <Dropdown.Item onClick={() => handleSort("desc")}>Precio: Mayor a Menor</Dropdown.Item>
        <Dropdown.Item onClick={() => handleFilter("Caro")}>Precio mayor a 1000</Dropdown.Item>
        <Dropdown.Item onClick={() => handleFilter("Barato")}>Precio menor a 1000</Dropdown.Item>
        <Dropdown.Item onClick={clearFilters}>Limpiar filtros</Dropdown.Item>
      </DropdownButton>
      <CreateProductButton setData={setData} data={data}></CreateProductButton>

      <Row>
        {getCurrentPageData().map((item) => (
          <Card style={{ width: '10rem' }} key={item.id}>
            <Card.Img variant="top" src={item.images} />
            <Card.Body>
              <Card.Title>{item.title}</Card.Title>
              <Card.Footer>
                <small className="text-muted">Precio: ${item.price}</small>
                <Button variant="danger">
                  <DeleteProductButton productId={item.id} onDelete={handleDelete} />
                </Button>
                <Button variant="primary">
                  <EditProductModal
                    productId={item.id}
                    title={item.title}
                    description={item.description}
                    price={item.price}
                    image={item.image}
                    onUpdate={handleUpdate}
                  />
                </Button>
              </Card.Footer>
              <Button variant="primary">Go somewhere</Button>
            </Card.Body>
          </Card>
        ))}
        <Pagination
          totalPages={totalPages}
          currentPage={currentPage}
          onPageChange={handlePageChange}
        />
      </Row>
    </>
  );
}
