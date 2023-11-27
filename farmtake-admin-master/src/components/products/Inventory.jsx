import { Fragment, useState, useCallback, useEffect } from "react";
import {
  Container,
  Card,
  CardHeader,
  CardBody,
  Row,
  Col,
  Button,
  Input,
} from "reactstrap";
import Breadcrumb from "../common/breadcrumb";
import { ArrowUp, ArrowDown } from "react-feather";
import DataTable from "react-data-table-component";
import { useProductInventoryQuery } from "../../react-query/useProductInventoryQuery";
import { UpdateProductStockUrl } from "../../service/api.url";
import axiosDefault from "../../service/api.config";

export default function Inventory(props) {
  const [totalRecords, setTotalRecord] = useState(0);
  const [record, setRecord] = useState([]);
  const [limit, setLimit] = useState(10);
  const [offset, setOffset] = useState(0);
  const [sorting, setSorting] = useState({ stock: "ASC", name: "ASC" });
  const { mutateAsync } = useProductInventoryQuery(setTotalRecord, setRecord);

  useEffect(() => {
    mutateAsync({ limit, offset });
  }, [limit, offset]);

  async function handleChange(e) {
    await axiosDefault.post(UpdateProductStockUrl, {
      stock: e.target.value,
      id: e.target.id,
    });
  }
  return (
    <Fragment>
      <Breadcrumb title="Inventory" parent="Physical" />
      {/* <!-- Container-fluid starts--> */}
      <Container fluid={true}>
        <Row>
          <Col sm="12">
            <Card>
              <CardHeader>
                <h5>Products Inventory</h5>
              </CardHeader>
              <CardBody>
                <div id="basicScenario" className="product-physical">
                  <DataTable
                    paginationServer={true}
                    data={record}
                    pagination={true}
                    onChangePage={(e) => setOffset((e - 1) * limit)}
                    onChangeRowsPerPage={(e) => setLimit(e)}
                    onRowClicked={(row) => {}}
                    paginationTotalRows={totalRecords}
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
                          return row?.name;
                        },
                        style: {
                          textAlign: "center",
                        },
                      },
                      {
                        name: "HSN Code",
                        selector: (row, index) => {
                          return row?.hsn || "-- --";
                        },
                        style: {
                          textAlign: "center",
                        },
                      },
                      {
                        name: "Base Price",
                        selector: (row, index) => {
                          return row?.base_price;
                        },
                        style: {
                          textAlign: "center",
                        },
                      },
                      {
                        name: "Total price",
                        selector: (row, index) => {
                          return row?.actual_price;
                        },
                        style: {
                          textAlign: "center",
                        },
                      },
                      {
                        name: "GST Percentage",
                        selector: (row, index) => {
                          return `${row?.gst}%`;
                        },
                        style: {
                          textAlign: "center",
                        },
                      },
                      {
                        name: "stock",
                        reorder: true,
                        selector: (row, index) => {
                          return (
                            <Input
                              type="number"
                              id={row?.id}
                              defaultValue={row?.stock}
                              onChange={handleChange}
                            />
                          );
                        },
                        style: {
                          textAlign: "center",
                        },
                      },
                    ]}
                  />
                </div>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    </Fragment>
  );
}
