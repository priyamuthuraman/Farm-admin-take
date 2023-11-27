import React, { Fragment } from "react";
import Breadcrumb from "../common/breadcrumb";

import {
  Card,
  CardBody,
  CardHeader,
  Col,
  Container,
  Row,
  Button,
} from "reactstrap";
import axiosDefault from "../../service/api.config";
import { getAllOrders } from "../../service/api.url";
import DataTable from "react-data-table-component";
import { writeFile, utils } from "xlsx/xlsx.mjs";
import useWholeSaleOrderQuery from "../../react-query/useGetWholeSaleOrderQuery";
import moment from "moment";
import {Link, useNavigate } from "react-router-dom";
import { wholesale_excel_columns } from "../../function/convertToExcelColumn";

const WholeSaleOrder = () => {
  const { data, isLoading } = useWholeSaleOrderQuery();
  const navigate = useNavigate();

  function onExcelGenerate() {
    let object = wholesale_excel_columns(data);
    let book = utils.book_new();
    let sheet = utils.json_to_sheet(object);
    utils.book_append_sheet(book, sheet, "Sheet 1");
    writeFile(book, "whole_sale.xlsx");
    try {
    } catch (error) {}
  }
  return (
    <Fragment>
      <Breadcrumb title="Whole Sale Order" parent="Sales" />

      <Container fluid={true}>
        <Row>
          <Col sm="12">
            <Card>
              <CardHeader
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <h5>Order Details</h5>
                
            <div className="clearfix"></div>
            <Row>
            <div className="btn-popup pull-right">
              <Link to="/sales/create-order" className="btn btn-secondary">
                Create order
              </Link>
                <Button color="primary" onClick={onExcelGenerate}>
                  Export
                </Button>
            </div>
            </Row>
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
                      name: "Order No",
                      selector: (row, index) => {
                        return row?.order_id || "Not Specified";
                      },
                      style: {
                        textAlign: "center",
                      },
                    },
                    {
                      name: "Invoice No",
                      selector: (row, index) => {
                    
                        return row?.invoice_no || "Not Specified";
                      },
                      style: {
                        textAlign: "center",
                      },
                    },
                    {
                      name: "Address",
                      wrap: true,
                      selector: (row, index) => {
                        return row?.address;
                      },
                      style: {
                        textAlign: "center",
                      },
                    },
                    {
                      name: "Contact No",
                      selector: (row, index) => {
                        return row?.mobile_number;
                      },
                      style: {
                        textAlign: "center",
                      },
                    },
                    {
                      name: "Payment Status",
                      selector: (row, index) => {
                        return row?.generic?.generic_name;
                      },
                      style: {
                        textAlign: "center",
                      },
                    },
                    {
                      name: "State",
                      selector: (row, index) => {
                        return row?.customer?.state?.name;
                      },
                      style: {
                        textAlign: "center",
                      },
                    },
                    {
                      name: "GST No",
                      selector: (row, index) => {
                        return row?.customer?.GST_number;
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
                    {
                      name: "Details",
                      selector: (row, index) => {
                        return (
                          <span
                            style={{
                              color: "blue",
                              textDecoration: "underline",
                              cursor: "pointer",
                            }}
                            onClick={() => {
                              navigate("/sales/wholesale/products", {
                                state: row?.wholesale_order_products ?? [],
                              });
                            }}
                          >
                            View
                          </span>
                        );
                      },
                      style: {
                        textAlign: "center",
                      },
                    },
                  ]}
                  data={data}
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
};

export default WholeSaleOrder;
