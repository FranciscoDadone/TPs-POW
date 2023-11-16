import React from 'react';
import { Button, Row, Col } from 'react-bootstrap';

const Pagination = ({ totalPages, currentPage, onPageChange }) => {
  return (
    <Row>
      <Col>
        {Array.from({ length: totalPages }, (_, index) => index + 1).map((page) => (
          <Button
            key={page}
            onClick={() => onPageChange(page)}
            variant={page === currentPage ? 'primary' : 'outline-primary'}
          >
            {page}
          </Button>
        ))}
      </Col>
    </Row>
  );
};

export default Pagination;
