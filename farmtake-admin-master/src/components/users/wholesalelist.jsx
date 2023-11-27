import { Fragment, useState, useEffect } from "react";
import {
  Badge,
  Card,
  CardBody,
  CardHeader,
  Container,
  Modal,
  ModalFooter,
  Button,
} from "reactstrap";
import PlaceHolder from "../../assets/images/placeholder.png";
import DataTable from "react-data-table-component";
import { toast } from "react-toastify";
import axiosDefault from "../../service/api.config";
import Breadcrumb from "../common/breadcrumb";
import { Link } from "react-router-dom";
import { rootUrl } from "../../service/api.url";
import useGetWholeCustomerQuery from "../../react-query/useGetWholeSaleQuery";

export default function WholeSaleCustomer(props) {
  const [userData, setUserData] = useState([]);
  const [deleteUserId, setDeleteUserId] = useState(null);
  const [openConfirmDialog, setConfirmDialog] = useState(false);
  /**
   *
   */

  const wholeCustomerQuery = useGetWholeCustomerQuery(setUserData);
  //   [
  //     {
  //         "id": 9,
  //         "name": "Rojith p",
  //         "customer_code": "eefaf",
  //         "address": "no:19/14 1st street nethaji nagar",
  //         "contact_number": 9094730085,
  //         "status_id": 1009,
  //         "email_id": "rojith.zigainfotech@gmail.com",
  //         "description": "awdawd",
  //         "GST_number": "awdawd",
  //         "isActive": 1,
  //         "isDeleted": 0,
  //         "state_id": 4035,
  //         "country_id": 101,
  //         "city_id": 131517,
  //         "createdAt": "2023-03-14T07:49:25.000Z",
  //         "updatedAt": "2023-03-14T07:49:25.000Z"
  //     }
  // ]
  return (
    <Fragment>
      <Modal
        isOpen={openConfirmDialog}
        toggle={() => {
          setConfirmDialog(!openConfirmDialog);
        }}
      >
        <ModalFooter>
          <Button
            type="button"
            color="primary"
            onClick={() => {
              //    deleteUser();
              setConfirmDialog(false);
            }}
          >
            Delete
          </Button>
          <Button
            type="button"
            color="secondary"
            onClick={() => {
              setConfirmDialog(false);
            }}
          >
            Close
          </Button>
        </ModalFooter>
      </Modal>
      <Breadcrumb title="Whole Sale Customer" parent="Users" />
      <Container fluid={true}>
        <Card>
          <CardHeader>
            <h5>User Details</h5>
          </CardHeader>
          <CardBody>
            <div className="btn-popup pull-right">
              <Link to="/users/createcustomer" className="btn btn-secondary">
                Create User
              </Link>
            </div>
            <div className="clearfix"></div>
            <div
              id="batchDelete"
              className="category-table user-list order-table coupon-list-delete"
            >
              <DataTable
                pagination={true}
                columns={[
                  {
                    name: "Sl.No",
                    selector: (row, index) => {
                      return index + 1;
                    },
                    style: {
                      textAlign: "center",
                    },
                  },
                  {
                    name: "Name",
                    selector: (row, index) => {
                      return row?.name;
                    },
                    style: {
                      textAlign: "center",
                    },
                  },
                  {
                    name: "Email",
                    selector: (row, index) => {
                      return row?.email_id;
                    },
                    style: {
                      textAlign: "center",
                    },
                  },
                  {
                    name: "Contact",
                    selector: (row, index) => {
                      return row?.contact_number;
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
                    name: "GST No",
                    selector: (row, index) => {
                      return row?.GST_number;
                    },
                    style: {
                      textAlign: "center",
                    },
                  },
                  {
                    name: "City",
                    selector: (row, index) => {
                      return row?.city?.name;
                    },
                    style: {
                      textAlign: "center",
                    },
                  },
                  {
                    name: "State",
                    selector: (row, index) => {
                      return row?.state?.name;
                    },
                    style: {
                      textAlign: "center",
                    },
                  },
                  {
                    name: "Country",
                    selector: (row, index) => {
                      return row?.country?.name;
                    },
                    style: {
                      textAlign: "center",
                    },
                  },

                  // {
                  //   name: "Action",
                  //   selector: (row, index) => {
                  //     return (
                  //       <div>
                  //         <span
                  //           onClick={() => {
                  //             setDeleteUserId(row?.id);
                  //             setConfirmDialog(true);
                  //           }}
                  //         >
                  //           <i
                  //             className="fa fa-trash"
                  //             style={{
                  //               width: 35,
                  //               fontSize: 20,
                  //               padding: 11,
                  //               color: "#e4566e",
                  //               cursor: "pointer",
                  //             }}
                  //           ></i>
                  //         </span>
                  //       </div>
                  //     );
                  //   },
                  //   style: {
                  //     textAlign: "center",
                  //     display: "flex",
                  //     justifyContent: "center",
                  //     alignItems: "center",
                  //   },
                  // },
                ]}
                data={userData}
              />
            </div>
          </CardBody>
        </Card>
      </Container>
    </Fragment>
  );
}
