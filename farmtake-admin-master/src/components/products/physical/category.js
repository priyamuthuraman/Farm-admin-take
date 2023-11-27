import React, { Fragment, useState } from "react";
import Breadcrumb from "../../common/breadcrumb";
import "react-toastify/dist/ReactToastify.css";
import DataTable from "react-data-table-component";
import { useFormik } from "formik";
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Col,
  Container,
  Form,
  FormGroup,
  Input,
  Label,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  Row,
} from "reactstrap";
import {
  postCategoryUrl,
  getCategoryUrl,
  deleteCategoryUrl,
  rootUrl,
} from "../../../service/api.url";
import { toast } from "react-toastify";
import axiosdefault from "../../../service/api.config";
import { useQuery } from "react-query";
import moment from "moment";

/***
 *
 *
 *
 */

const getCategory = async () => {
  try {
    let getcategory = await axiosdefault.get(getCategoryUrl);
    return getcategory;
  } catch (error) {
    toast.error(error.messsage);
  }
};

const Category = () => {
  const [open, setOpen] = useState(false);

  const [selectedCategoryImage, setSelectedCategoryImage] = useState(null);

  const [deleteCategoryId, setDeleteCategoryId] = useState(null);

  const [openConfirmDialog, setConfirmDialog] = useState(false);

  const { data, refetch } = useQuery("getcategory", getCategory, {
    initialData: [],
  });

  const uploadCategory = async (value) => {
    try {
      let formData = new FormData();
      formData.append("name", value.name);
      formData.append("description", value.description);
      formData.append("category_image", selectedCategoryImage);

      await axiosdefault.post(postCategoryUrl, formData, {
        headers: {
          Accept: "multipart/form-data",
        },
      });

      refetch();
      setOpen(false);
      formik.resetForm();
      toast.success("added!");
    } catch (error) {
      toast.error(error.message);
    }
  };

  const deleteCategory = async () => {
    try {
      await axiosdefault.post(deleteCategoryUrl, { id: deleteCategoryId });
      refetch();
      setConfirmDialog(false);
      toast.success("Deleted!");
    } catch (error) {
      toast.error(error.messsage);
    }
  };

  const onOpenModal = () => {
    setOpen(true);
  };

  const formik = useFormik({
    initialValues: {
      name: "",
      category_image: "",
      description: "",
    },
    onSubmit: uploadCategory,
    validateOnChange: false,
    validateOnBlur: false,
    validate: ({ category_image, description, name }) => {
      const error = {};
      if (!name) {
        error.name = "required name";
      }
      if (!category_image) {
        error.category_image = "required image";
      }
      if (!description) {
        error.description = "required description";
      }
      return error;
    },
  });

  const onCloseModal = () => {
    setOpen(false);
    formik.resetForm();
  };

  return (
    <Fragment>
      <Breadcrumb title="Category" parent="Physical" />
      {/* <!-- Container-fluid starts--> */}
      <Container fluid={true}>
        <Row>
          <Col sm="12">
            <Card>
              <CardHeader>
                <h5>Products Category</h5>
              </CardHeader>
              <CardBody>
                <div className="btn-popup pull-right">
                  <Button
                    type="button"
                    color="primary"
                    onClick={onOpenModal}
                    data-toggle="modal"
                    data-original-title="test"
                    data-target="#exampleModal"
                  >
                    Add Category
                  </Button>
                  <Modal isOpen={open} toggle={onCloseModal}>
                    <ModalHeader toggle={onCloseModal}>
                      <h5
                        className="modal-title f-w-600"
                        id="exampleModalLabel2"
                      >
                        Add Category
                      </h5>
                    </ModalHeader>
                    <ModalBody>
                      <Form>
                        <FormGroup>
                          <Label
                            htmlFor="recipient-name"
                            className="col-form-label"
                          >
                            Category Name :
                          </Label>
                          <Input
                            type="text"
                            name="name"
                            className="form-control"
                            value={formik.values.name}
                            onChange={formik.handleChange}
                          />
                          {formik.errors.name && (
                            <span
                              style={{
                                color: "red",
                              }}
                            >
                              {formik.errors.name}
                            </span>
                          )}
                        </FormGroup>
                        <FormGroup>
                          <Label className="col-xl-3 col-md-4">
                            Description
                          </Label>
                          <Input
                            type="textarea"
                            name="description"
                            className="form-control"
                            onChange={formik.handleChange}
                            value={formik.values.description}
                          />
                          {formik.errors.description && (
                            <span
                              style={{
                                color: "red",
                              }}
                            >
                              {formik.errors.description}
                            </span>
                          )}
                        </FormGroup>
                        <FormGroup>
                          <Label
                            htmlFor="message-text"
                            className="col-form-label"
                          >
                            Category Image :
                          </Label>
                          <Input
                            className="form-control"
                            id="validationCustom02"
                            name="category_image"
                            type="file"
                            onChange={(e) => {
                              formik.handleChange(e);
                              setSelectedCategoryImage(e.target.files[0]);
                            }}
                            value={formik.values.category_image}
                          />
                          {formik.errors.category_image && (
                            <span
                              style={{
                                color: "red",
                              }}
                            >
                              {formik.errors.category_image}
                            </span>
                          )}
                        </FormGroup>
                      </Form>
                    </ModalBody>
                    <ModalFooter>
                      <Button
                        type="button"
                        color="primary"
                        onClick={() => {
                          formik.submitForm();
                        }}
                      >
                        Save
                      </Button>
                      <Button
                        type="button"
                        color="secondary"
                        onClick={() => onCloseModal()}
                      >
                        Close
                      </Button>
                    </ModalFooter>
                  </Modal>

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
                          deleteCategory();
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
                </div>
                <div className="clearfix"></div>
                <div id="basicScenario" className="product-physical">
                  <DataTable
                    data={data?.data?.message}

                    pagination={true}
                    columns={[
                      {
                        name: "id",
                        selector: (row, index) => {
                          return index + 1;
                        },
                        style: {
                          textAlign: "center",
                        },
                      },
                      {
                        name: "name",
                        selector: (row, index) => {
                          return row?.name;
                        },
                        style: {
                          textAlign: "center",
                        },
                      },
                      {
                        name: "image",
                        style: {
                          textAlign: "center",
                        },
                        selector: (row, index) => {
                          return (
                            <img
                              src={`${rootUrl}${row?.category_image}`}
                              width={100}
                            />
                          );
                        },
                      },
                      {
                        name: "description",
                        selector: (row, index) => {
                          return row?.description;
                        },
                        style: {
                          textAlign: "center",
                        },
                      },
                      {
                        name: "createdAt",
                        selector: (row, index) => {
                          return moment(row?.createdAt).format("LL");
                        },
                        style: {
                          textAlign: "center",
                        },
                      },
                      {
                        name: "Action",
                        style: {
                          textAlign: "center",
                        },
                        selector: (row, index) => {
                          return (
                            <div>
                              <span
                                onClick={() => {
                                  setDeleteCategoryId(row?.id);
                                  setConfirmDialog(!openConfirmDialog);
                                }}
                              >
                                <i
                                  className="fa fa-trash"
                                  style={{
                                    width: 35,
                                    fontSize: 20,
                                    padding: 11,
                                    color: "#e4566e",
                                    cursor: "pointer",
                                  }}
                                ></i>
                              </span>
                              {/* <span>
                                <i
                                  // onClick={onOpenModal}
                                  className="fa fa-pencil"
                                  style={{
                                    width: 35,
                                    fontSize: 20,
                                    padding: 11,
                                    color: "rgb(40, 167, 69)",
                                    cursor: "pointer",
                                  }}
                                ></i>
                              </span> */}
                            </div>
                          );
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
      {/* <!-- Container-fluid Ends--> */}
    </Fragment>
  );
};

export default Category;
