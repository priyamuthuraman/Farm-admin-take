import React, { Fragment, useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import { Card, CardBody, CardHeader, Col, Row, Container } from "reactstrap";
import Breadcrumb from "../common/breadcrumb";
import { useNavigate, useLocation } from "react-router-dom";
import { whole_sale_products_column } from "../../constants/datatable_columns";
import moment from "moment";

export default function WholeSaleProducts(props) {
  const [product, setProduct] = useState([]);
  const navigate = useNavigate();
  const location = useLocation();
  useEffect(() => {
    setProduct(location?.state);
  }, []);
  return (
    <Fragment>
      <Breadcrumb title="Whole Sale Order" parent="Sales" />

      <Container fluid={true}>
        <Row>
          <Col sm="12">
            <Card>
              <CardHeader>
                <h5>Ordered products</h5>
              </CardHeader>
              <CardBody className="order-datatable">
                <DataTable
                  columns={[
                    {
                      name: "Sl No",
                      selector: (row, index) => {
                        return index + 1;
                      },
                      style: {
                        textAlign: "center",
                      },
                    },
                    {
                      name: "Product Name",
                      selector: (row, index) => {
                        return row?.product?.name;
                      },
                      style: {
                        textAlign: "center",
                      },
                    },
                    {
                      name: "Quantity",
                      wrap: true,
                      selector: (row, index) => {
                        return row?.quantity;
                      },
                      style: {
                        textAlign: "center",
                      },
                    },
                    {
                      name: "GST",
                      selector: (row, index) => {
                        return (
                          <>
                            <span>&#8377;</span>
                            {row?.gst}
                          </>
                        );
                      },
                      style: {
                        textAlign: "center",
                      },
                    },
                    {
                      name: "IGST",
                      selector: (row, index) => {
                        return   <>
                        <span>&#8377;</span>
                        {row?.igst}
                      </>;
                      },
                      style: {
                        textAlign: "center",
                      },
                    },
                    {
                      name: "CGST",
                      selector: (row, index) => {
                        return   <>
                        <span>&#8377;</span>
                        {row?.cgst}
                      </>;
                      },
                      style: {
                        textAlign: "center",
                      },
                    },
                    {
                      name: "SGST",
                      selector: (row, index) => {
                        return   <>
                        <span>&#8377;</span>
                        {row?.sgst}
                      </>;
                      },
                      style: {
                        textAlign: "center",
                      },
                    },
                    {
                      name: "Ordered At",
                      selector: (row, index) => {
                        return moment(row?.createdAt).format("LL");
                      },
                      style: {
                        textAlign: "center",
                      },
                    },
                  ]}
                  data={product}
                  paginationPerPage={10}
                  pagination={true}
                  expandOnRowClicked={true}
                />
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    </Fragment>
  );
}

// {
//            "id": 8,
//            "whole_sale_order_id": 18,
//            "product_id": 97,
//            "base_price": 371,
//            "actual_price": 390,
//            "quantity": 500,
//            "gst": 5,
//            "igst": 19,
//            "cgst": "9.5",
//            "sgst": 10,
//            "isActive": 1,
//            "isDeleted": 0,
//            "createdAt": "2023-03-17T08:45:38.000Z",
//            "updatedAt": "2023-03-17T08:45:38.000Z",
//            "product": {
//                "id": 97,
//                "name": "Farmtake Elite Coconut Oil",
//                "orginal_image": "/storage/product/2f022c5e56e24c71bb1d175b008b9dcf.jpeg",
//                "description": "Farmtake Elite Coconut Oil",
//                "quantity": 1,
//                "base_price": 371,
//                "actual_price": 390,
//                "category_id": 12,
//                "stock": 200,
//                "subcategory_id": 26,
//                "gst": 5,
//                "hsn": "15131100",
//                "unit_id": 1002,
//                "isActive": 1,
//                "isDeleted": 0,
//                "createdAt": "2023-03-17T03:42:40.000Z",
//                "updatedAt": "2023-03-17T03:42:40.000Z"
//            }
//        }
