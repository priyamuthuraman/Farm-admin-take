import React, { Fragment } from "react";
import Breadcrumb from "../common/breadcrumb";
// import {} from "react-feather"
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Col,
  Container,
  Row,
} from "reactstrap";
import axiosDefault from "../../service/api.config";
import { getAllOrders } from "../../service/api.url";
import DataTable from "react-data-table-component";
import { order_columns } from "../../constants/datatable_columns";
import { useQuery } from "react-query";
import { writeFile, utils } from "xlsx/xlsx.mjs";
import { retail_excel_columns } from "../../function/convertToExcelColumn";

function useGetAllOrdersReactQuery() {
  return useQuery({
    initialData: [],
    queryKey: "getAllOrders",
    queryFn: async () => {
      let resposne = await axiosDefault.get(getAllOrders, {
        headers: {
          authorization: localStorage.getItem("token"),
        },
      });

      return resposne;
    },
    select: (response) => {
      return response.data?.message ?? [];
    },
  });
}

const Orders = () => {
  const { data, isLoading } = useGetAllOrdersReactQuery();

  function onExcelGenerate() {
    let object = retail_excel_columns(data);
    let book = utils.book_new();
    let sheet = utils.json_to_sheet(object);
    utils.book_append_sheet(book, sheet, "Sheet 1");
    writeFile(book, "retail.xlsx");
    try {
    } catch (error) {}
  }
  return (
    <Fragment>
      <Breadcrumb title="Orders" parent="Sales" />

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
                <h5>Manage Order</h5>
                <Button color="primary" onClick={onExcelGenerate}>
                  Export
                </Button>
              </CardHeader>
              <CardBody className="order-datatable">
                <DataTable
                  columns={order_columns}
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

export default Orders;
