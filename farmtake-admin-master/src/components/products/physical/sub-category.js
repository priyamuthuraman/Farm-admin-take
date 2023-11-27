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
  getCategoryUrl,
  deleteCategoryUrl,
  rootUrl,
  getSubCatetgoryUrl,
  postSubCatetgoryUrl,
  deleteSubCatetgoryUrl,
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
    let response = await axiosdefault.get(getCategoryUrl);
    return response;
  } catch (error) {
    toast.error(error.messsage);
  }
};
/**
 *
 * @returns
 *
 *
 */
const getSubCategory = async () => {
  try {
    let response = await axiosdefault.get(getSubCatetgoryUrl);
    return response;
  } catch (error) {
    toast.error(error.messsage);
  }
};
/**
 *
 * @returns
 */

function SubCategory() {
  const [open, setOpen] = useState(false);

  const [selectedSubCategoryImage, setSelectedSubCategoryImage] =
    useState(null);

  const [deleteSubCategoryId, setDeleteSubCategoryId] = useState(null);

  const [openConfirmDialog, setConfirmDialog] = useState(false);

  const getCategoryReactQuery = useQuery("getcategory", getCategory, {
    initialData: [],
  });
  const getSubCategoryReactQuery = useQuery("getsubcategory", getSubCategory, {
    initialData: [],
  });

  const uploadSubCategory = async (value) => {
    try {
      let formData = new FormData();
      formData.append("name", value.name);
      formData.append("description", value.description);
      formData.append("subcategory_image", selectedSubCategoryImage);
      formData.append("category_id", value.category_id);

      await axiosdefault.post(postSubCatetgoryUrl, formData, {
        headers: {
          Accept: "multipart/form-data",
        },
      });

      getSubCategoryReactQuery.refetch();
      setOpen(false);
      formik.resetForm();
      toast.success("added!");
    } catch (error) {
      toast.error(error.message);
    }
  };

  const deleteSubCategory = async () => {
    try {
      await axiosdefault.post(deleteSubCatetgoryUrl, {
        id: deleteSubCategoryId,
      });
      getSubCategoryReactQuery.refetch();
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
      subcategory_image: "",
      description: "",
      category_id: "",
    },
    onSubmit: uploadSubCategory,
    validateOnChange: false,
    validateOnBlur: false,
    validate: ({ subcategory_image, description, name, category_id }) => {
      const error = {};
      if (!name) {
        error.name = "required name";
      }
      if (!subcategory_image) {
        error.subcategory_image = "required image";
      }
      if (!description) {
        error.description = "required description";
      }
      if (!category_id) {
        error.category_id = "required category";
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
      <Breadcrumb title="Sub-Category" parent="Physical" />
      {/* <!-- Container-fluid starts--> */}
      <Container fluid={true}>
        <Row>
          <Col sm="12">
            <Card>
              <CardHeader>
                <h5>Products sub Category</h5>
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
                    Add Sub-Category
                  </Button>
                  <Modal isOpen={open} toggle={onCloseModal}>
                    <ModalHeader toggle={onCloseModal}>
                      <h5
                        className="modal-title f-w-600"
                        id="exampleModalLabel2"
                      >
                        Add Sub-Category
                      </h5>
                    </ModalHeader>
                    <ModalBody>
                      <Form>
                        <FormGroup>
                          <Label
                            htmlFor="recipient-name"
                            className="col-form-label"
                          >
                            sub-Category Name :
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
                          <Label className="col-form-label">
                            <span>*</span> Categories
                          </Label>
                          <select
                            onChange={formik.handleChange}
                            value={formik.values.category_id}
                            className="form-select"
                            name="category_id"
                            required=""
                          >
                            <option value="">--Select--</option>
                            {getCategoryReactQuery.data?.data?.message?.map(
                              (result, index) => {
                                return (
                                  <option key={index} value={result?.id}>
                                    {result?.name}
                                  </option>
                                );
                              }
                            )}
                          </select>
                          {formik.errors.category_id && (
                            <span
                              style={{
                                color: "red",
                              }}
                            >
                              {formik.errors.category_id}
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
                            sub-Category Image :
                          </Label>
                          <Input
                            className="form-control"
                            id="validationCustom02"
                            name="subcategory_image"
                            type="file"
                            onChange={(e) => {
                              formik.handleChange(e);
                              setSelectedSubCategoryImage(e.target.files[0]);
                            }}
                            value={formik.values.subcategory_image}
                          />
                          {formik.errors.subcategory_image && (
                            <span
                              style={{
                                color: "red",
                              }}
                            >
                              {formik.errors.subcategory_image}
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
                          deleteSubCategory();
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
                    data={getSubCategoryReactQuery?.data?.data?.message}
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
                        name: "category",
                        selector: (row, index) => {
                          return row?.category?.name;
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
                              src={`${rootUrl}${row?.subcategory_image}`}
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
                                  setDeleteSubCategoryId(row?.id);
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
}

export default SubCategory;
