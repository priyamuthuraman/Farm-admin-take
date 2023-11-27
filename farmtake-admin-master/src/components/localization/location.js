import React, { Fragment, useEffect, useState } from "react";
import Breadcrumb from "../common/breadcrumb";
import {
  Card,
  CardBody,
  CardHeader,
  Col,
  Container,
  Row,
  FormGroup,
  Label,
  Button,
  Modal,
  ModalFooter,
  ModalHeader,
  Form,
  ModalBody,
  Input,
} from "reactstrap";
import DataTable from "react-data-table-component";
import { deleteLocationUrl, addLocationUrl } from "../../service/api.url";
import axiosDefault from "../../service/api.config";
import { useQuery } from "react-query";
import moment from "moment";
import { toast } from "react-toastify";
import { useFormik } from "formik";

// const useGetStateQueryData = (setStateData) => {
//   return useQuery({
//     queryKey: "getState",
//     queryFn: async () => {
//       // Default india id currently support
//       let response = await axiosDefault.get(`/api/location/get/10000`);

//       return response;
//     },

//     select: (data) => {
//       return data?.data?.message;
//     },

//     onSuccess: (data) => {
//       setStateData(data);
//     },
//   });
// };

// const useGetCityQueryData = (stateId, setCityData) => {
//   return useQuery({
//     queryKey: "getCity",
//     queryFn: async () => {
//       let response = await axiosDefault.get(`/api/location/get/${stateId}`);
//       return response;
//     },
//     select: (data) => {
//       return data?.data?.message;
//     },
//     refetchOnMount: false,
//     refetchOnWindowFocus: false,
//     staleTime: 10000000,
//     enabled: false,
//     onSuccess: (data) => {
//       setCityData(data);
//     },
//   });
// };

export default function Location() {
  /**
   *
   *
   */

  return <div>Ellam pochi</div>;

  // const [stateData, setStateData] = useState([]);
  // const [stateId, setStateId] = useState("");
  // const [cityData, setCityData] = useState([]);
  // const [openConfirmDialog, setConfirmDialog] = useState(false);
  // const [deleteLocationId, setDeleteLocationId] = useState(null);
  // const stateDataQuery = useGetStateQueryData(setStateData);
  // const cityDataQuery = useGetCityQueryData(stateId, setCityData);
  // /**
  //  *
  //  */
  // const [openAddStateDialog, setAddStateDialog] = useState(false);
  // const [openAddCityDialog, setAddCityDialog] = useState(false);
  // /**
  //  *
  //  *
  //  *
  //  */
  // useEffect(() => {
  //   if (stateId) cityDataQuery.refetch();
  // }, [stateId]);

  // /**
  //  *
  //  *
  //  *
  //  */
  // const addStateFormik = useFormik({
  //   initialValues: {
  //     statename: "",
  //     flag: "STATE",
  //     parentlocationid: 10000,
  //   },
  //   validateOnChange: false,
  //   validateOnBlur: false,
  //   validate: ({ statename }) => {
  //     const error = {};

  //     if (!statename) {
  //       error.statename = "required state";
  //     }

  //     return error;
  //   },

  //   onSubmit: async ({ flag, parentlocationid, statename }) => {
  //     try {
  //       await axiosDefault.post(addLocationUrl, {
  //         parentlocationid: parentlocationid,
  //         locationflag: flag,
  //         locationname: statename,
  //       });
  //       toast.success("Added");
  //       stateDataQuery.refetch();
  //       setAddStateDialog(false);
  //     } catch (error) {
  //       toast.error(error.message);
  //     }
  //   },
  // });
  // /**
  //  *
  //  *
  //  *
  //  */
  // const addCityFormik = useFormik({
  //   initialValues: {
  //     cityname: "",
  //     flag: "CITY",
  //     parentlocationid: "",
  //   },
  //   validateOnChange: false,
  //   validateOnBlur: false,
  //   onSubmit: async ({ cityname, flag, parentlocationid }) => {
  //     try {
  //       await axiosDefault.post(addLocationUrl, {
  //         parentlocationid: parentlocationid,
  //         locationflag: flag,
  //         locationname: cityname,
  //       });
  //       toast.success("Added");
  //       cityDataQuery.refetch();
  //       addCityFormik.resetForm();
  //       setAddCityDialog(false);
  //     } catch (error) {
  //       toast.error(error.message);
  //     }
  //   },
  //   validate: ({ cityname, flag, parentlocationid }) => {
  //     const error = {};
  //     if (!cityname) {
  //       error.cityname = "required cityname";
  //     }

  //     if (!parentlocationid) {
  //       error.parentlocationid = "required state id";
  //     }

  //     return error;
  //   },
  // });

  // /**
  //  *
  //  *
  //  *
  //  */

  // const deleteLocation = async () => {
  //   try {
  //     let resposne = await axiosDefault.post(deleteLocationUrl, {
  //       id: deleteLocationId,
  //     });

  //     setConfirmDialog(false);
  //     stateDataQuery.refetch();
  //     cityDataQuery.refetch();
  //     toast.success(resposne.data?.data?.message);
  //   } catch (error) {
  //     toast.error(error.messsage);
  //   }
  // };
  // /**
  //  *
  //  *
  //  *
  //  */

  // return (
  //   <Fragment>
  //     <Breadcrumb title="Location" parent="Localization" />
  //     <Container fluid={true}>
  //       <Row>
  //         <Col sm="12">
  //           <Card>
  //             <CardBody>
  //               <div
  //                 style={{
  //                   width: "100%",
  //                   display: "flex",
  //                   justifyContent: "flex-end",
  //                   alignItems: "center",
  //                   marginBottom: "1rem",
  //                   gap: "1rem",
  //                 }}
  //               >
  //                 <FormGroup
  //                   style={{
  //                     marginBottom: "0px",
  //                   }}
  //                   className="w-25"
  //                 >
  //                   {/* <Label className="col-form-label">Country</Label> */}
  //                   <select
  //                     className="form-select"
  //                     disabled={true}
  //                     required=""
  //                     value={10000} // default id for india check in db
  //                     name="country"
  //                   >
  //                     <option value={10000}>India</option>
  //                   </select>
  //                 </FormGroup>
  //                 <Button
  //                   type="button"
  //                   color="primary"
  //                   data-toggle="modal"
  //                   data-original-title="test"
  //                   data-target="#exampleModal"
  //                   className="h-25"
  //                   onClick={() => setAddStateDialog(true)}
  //                 >
  //                   Add State
  //                 </Button>
  //               </div>
  //               <div
  //                 id="basicScenario"
  //                 className="product-list translation-list"
  //               >
  //                 <DataTable
  //                   data={stateData}
  //                   pagination={true}
  //                   columns={[
  //                     {
  //                       name: "id",
  //                       selector: (row, index) => {
  //                         return index + 1;
  //                       },
  //                       style: {
  //                         textAlign: "center",
  //                       },
  //                     },
  //                     {
  //                       name: "State Name",
  //                       selector: (row, index) => {
  //                         return row?.locationName;
  //                       },
  //                       style: {
  //                         textAlign: "center",
  //                       },
  //                     },
  //                     {
  //                       name: "createdAt",
  //                       style: {
  //                         textAlign: "center",
  //                       },
  //                       selector: (row, index) => {
  //                         return moment(row?.createdAt).format("LL");
  //                       },
  //                     },
  //                     {
  //                       name: "Action",
  //                       style: {
  //                         textAlign: "center",
  //                       },

  //                       selector: (row, index) => {
  //                         return (
  //                           <div>
  //                             <span
  //                               onClick={() => {
  //                                 setDeleteLocationId(row?.locationId);
  //                                 setConfirmDialog(!openConfirmDialog);
  //                               }}
  //                             >
  //                               <i
  //                                 className="fa fa-trash"
  //                                 style={{
  //                                   width: 35,
  //                                   fontSize: 20,
  //                                   padding: 11,
  //                                   color: "#e4566e",
  //                                   cursor: "pointer",
  //                                 }}
  //                               ></i>
  //                             </span>
  //                           </div>
  //                         );
  //                       },
  //                     },
  //                   ]}
  //                 />
  //               </div>
  //             </CardBody>
  //           </Card>
  //         </Col>
  //       </Row>
  //     </Container>

  //     <Container fluid={true}>
  //       <Row>
  //         <Col sm="12">
  //           <Card>
  //             <CardBody>
  //               <div
  //                 style={{
  //                   width: "100%",
  //                   display: "flex",
  //                   justifyContent: "flex-end",
  //                   alignItems: "center",
  //                   marginBottom: "1rem",
  //                   gap: "1rem",
  //                 }}
  //               >
  //                 <FormGroup
  //                   style={{
  //                     marginBottom: "0px",
  //                   }}
  //                   className="w-25"
  //                 >
  //                   <select
  //                     className="form-select"
  //                     required=""
  //                     name="state"
  //                     onChange={(e) => {
  //                       setStateId(e.target.value);
  //                     }}
  //                   >
  //                     <option value="">--Select--</option>
  //                     {stateData.map((data, i) => {
  //                       return (
  //                         <option value={data?.locationId} key={i}>
  //                           {data?.locationName}
  //                         </option>
  //                       );
  //                     })}
  //                   </select>
  //                 </FormGroup>
  //                 <Button
  //                   type="button"
  //                   color="primary"
  //                   data-toggle="modal"
  //                   data-original-title="test"
  //                   data-target="#exampleModal"
  //                   className="h-25"
  //                   onClick={() => setAddCityDialog(true)}
  //                 >
  //                   Add City
  //                 </Button>
  //               </div>

  //               <div
  //                 id="basicScenario"
  //                 className="product-list translation-list"
  //               >
  //                 <DataTable
  //                   data={cityData}
  //                   pagination={true}
  //                   columns={[
  //                     {
  //                       name: "id",
  //                       selector: (row, index) => {
  //                         return index + 1;
  //                       },
  //                       style: {
  //                         textAlign: "center",
  //                       },
  //                     },
  //                     {
  //                       name: "City Name",
  //                       selector: (row, index) => {
  //                         return row?.locationName;
  //                       },
  //                       style: {
  //                         textAlign: "center",
  //                       },
  //                     },
  //                     {
  //                       name: "createdAt",
  //                       style: {
  //                         textAlign: "center",
  //                       },
  //                       selector: (row, index) => {
  //                         return moment(row?.createdAt).format("LL");
  //                       },
  //                     },
  //                     {
  //                       name: "Action",
  //                       style: {
  //                         textAlign: "center",
  //                       },

  //                       selector: (row, index) => {
  //                         return (
  //                           <div>
  //                             <span
  //                               onClick={() => {
  //                                 setDeleteLocationId(row?.locationId);
  //                                 setConfirmDialog(!openConfirmDialog);
  //                               }}
  //                             >
  //                               <i
  //                                 className="fa fa-trash"
  //                                 style={{
  //                                   width: 35,
  //                                   fontSize: 20,
  //                                   padding: 11,
  //                                   color: "#e4566e",
  //                                   cursor: "pointer",
  //                                 }}
  //                               ></i>
  //                             </span>
  //                           </div>
  //                         );
  //                       },
  //                     },
  //                   ]}
  //                 />
  //               </div>
  //             </CardBody>
  //           </Card>
  //         </Col>
  //       </Row>
  //     </Container>
  //     {/**
  //      *
  //      *
  //      *
  //      *
  //      *
  //      */}
  //     <Modal
  //       isOpen={openConfirmDialog}
  //       toggle={() => {
  //         setConfirmDialog(!openConfirmDialog);
  //       }}
  //     >
  //       <ModalFooter>
  //         <Button
  //           type="button"
  //           color="primary"
  //           onClick={() => {
  //             deleteLocation();
  //             setConfirmDialog(false);
  //           }}
  //         >
  //           Delete
  //         </Button>
  //         <Button
  //           type="button"
  //           color="secondary"
  //           onClick={() => {
  //             setConfirmDialog(false);
  //           }}
  //         >
  //           Close
  //         </Button>
  //       </ModalFooter>
  //     </Modal>
  //     {/**
  //      *
  //      *
  //      *
  //      *
  //      *
  //      */}
  //     <Modal
  //       isOpen={openAddStateDialog}
  //       toggle={() => {
  //         setAddStateDialog(!openAddStateDialog);
  //       }}
  //     >
  //       <ModalHeader toggle={() => setAddStateDialog(!openAddStateDialog)}>
  //         <h5 className="modal-title f-w-600" id="exampleModalLabel2">
  //           Add State
  //         </h5>
  //       </ModalHeader>
  //       <ModalBody>
  //         <Form>
  //           <FormGroup>
  //             <Label htmlFor="recipient-name" className="col-form-label">
  //               state Name :
  //             </Label>
  //             <Input
  //               type="text"
  //               name="statename"
  //               className="form-control"
  //               value={addStateFormik.values.statename}
  //               onChange={addStateFormik.handleChange}
  //             />
  //             {addStateFormik.errors.statename && (
  //               <strong
  //                 style={{
  //                   color: "red",
  //                 }}
  //               >
  //                 {addStateFormik.errors.statename}
  //               </strong>
  //             )}
  //           </FormGroup>
  //           <FormGroup>
  //             <Label htmlFor="recipient-name" className="col-form-label">
  //               country Name :
  //             </Label>
  //             <select
  //               className="form-select"
  //               disabled={true}
  //               required=""
  //               value={10000} // default id for india check in db
  //               name="country"
  //             >
  //               <option value={10000}>India</option>
  //             </select>
  //           </FormGroup>
  //         </Form>
  //       </ModalBody>
  //       <ModalFooter>
  //         <Button
  //           type="button"
  //           color="primary"
  //           onClick={() => {
  //             addStateFormik.submitForm();
  //           }}
  //         >
  //           Save
  //         </Button>
  //         <Button
  //           type="button"
  //           color="secondary"
  //           onClick={() => {
  //             setAddStateDialog(false);
  //             addStateFormik.resetForm();
  //           }}
  //         >
  //           Close
  //         </Button>
  //       </ModalFooter>
  //     </Modal>
  //     {/**
  //      *
  //      *
  //      *
  //      *
  //      *
  //      */}
  //     <Modal
  //       isOpen={openAddCityDialog}
  //       toggle={() => setAddCityDialog(!openAddCityDialog)}
  //     >
  //       <ModalHeader toggle={() => setAddCityDialog(!openAddCityDialog)}>
  //         <h5 className="modal-title f-w-600" id="exampleModalLabel2">
  //           Add city
  //         </h5>
  //       </ModalHeader>
  //       <ModalBody>
  //         <Form>
  //           <FormGroup>
  //             <Label htmlFor="recipient-name" className="col-form-label">
  //               city Name :
  //             </Label>
  //             <Input
  //               type="text"
  //               name="cityname"
  //               value={addCityFormik.values.cityname}
  //               onChange={addCityFormik.handleChange}
  //               className="form-control"
  //             />
  //             {addCityFormik.errors.cityname && (
  //               <strong
  //                 style={{
  //                   color: "red",
  //                 }}
  //               >
  //                 {addCityFormik.errors.cityname}
  //               </strong>
  //             )}
  //           </FormGroup>
  //           <FormGroup>
  //             <select
  //               className="form-select"
  //               value={addCityFormik.values.parentlocationid}
  //               required=""
  //               name="parentlocationid"
  //               onChange={addCityFormik.handleChange}
  //             >
  //               <option value="">--Select--</option>
  //               {stateData.map((data, i) => {
  //                 return (
  //                   <option value={data?.locationId} key={i}>
  //                     {data?.locationName}
  //                   </option>
  //                 );
  //               })}
  //             </select>
  //             {addCityFormik.errors.parentlocationid && (
  //               <strong
  //                 style={{
  //                   color: "red",
  //                 }}
  //               >
  //                 {addCityFormik.errors.parentlocationid}
  //               </strong>
  //             )}
  //           </FormGroup>
  //         </Form>
  //       </ModalBody>
  //       <ModalFooter>
  //         <Button
  //           type="button"
  //           color="primary"
  //           onClick={() => {
  //             addCityFormik.submitForm();
  //           }}
  //         >
  //           Save
  //         </Button>
  //         <Button
  //           type="button"
  //           color="secondary"
  //           onClick={() => {
  //             setAddCityDialog(false);
  //             addCityFormik.resetForm();
  //           }}
  //         >
  //           Close
  //         </Button>
  //       </ModalFooter>
  //     </Modal>
  //   </Fragment>
  // );
}
