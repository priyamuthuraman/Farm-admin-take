import React, { Fragment, useState, useMemo } from "react";
import Breadcrumb from "./common/breadcrumb";
import "react-toastify/dist/ReactToastify.css";
import MDEditor from "@uiw/react-md-editor";
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
import { toast } from "react-toastify";
import axiosdefault from "../service/api.config";
import {
  getBannerUrl,
  rootUrl,
  postBannerUrl,
  deletebannerUrl,
  updatebannerurl,
} from "../service/api.url";
import { useQuery } from "react-query";
import DataTable from "react-data-table-component";
import moment from "moment";
import { useFormik } from "formik";
import UpdateBanner from "./UpdateBanner";

const getBanner = async () => {
  try {
    let banner_data = await axiosdefault.get(getBannerUrl);
    return banner_data;
  } catch (error) {
    toast.error(error.messsage);
  }
};

/**
 *
 * @returns
 *
 *
 *
 */
function Banner() {
  /**
   *
   */
  const { data, isRefetching, refetch } = useQuery("getbanner", getBanner, {
    initialData: [],
  });

  const [openUpdateModal, setOpenUpdateModal] = useState(false);

  /**
   *
   */
  const upload_banner = async (value) => {
    try {
      let formData = new FormData();
      formData.append("name", value.name);
      formData.append("path", value.path);
      formData.append("description", value.description);
      formData.append("banner_image", selectedbanner);
      formData.append("expire_at", value?.expire_at);
      formData.append("visible_at", value?.visible_at);

      await axiosdefault.post(postBannerUrl, formData, {
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

  /**
   *
   *
   *
   *
   *
   */

  const formik = useFormik({
    initialValues: {
      name: "",
      path: "",
      banner_image: "",
      description: "",
      visible_at: moment(moment.now()).format("YYYY-MM-DD"),
      expire_at: "",
    },
    onSubmit: upload_banner,
    validateOnChange: false,
    validateOnBlur: false,
    validate: ({ banner_image, description, name, path, expire_at }) => {
      const error = {};
      if (!name) {
        error.name = "required name";
      }
      if (!banner_image) {
        error.banner_image = "required image";
      }
      if (!path) {
        error.path = "required path";
      }
      if (!description) {
        error.description = "required description";
      }
      if (!expire_at) {
        error.expire_at = "required expire date";
      }
      return error;
    },
  });
  const update_banner_formik = useFormik({
    initialValues: {
      name: "",
      path: "",
      banner_image: "",
      description: "",
      visible_at: "",
      expire_at: "",
      image_path: "",
      id:"",
      file:""
    },
    onSubmit:async (value) => {
      let formData = new FormData();
      formData.append("name", value.name);
      formData.append("path", value.path);
      formData.append("description", value.description);
      formData.append("new_banner", value?.file);
      formData.append("expire_at", value?.expire_at);
      formData.append("visible_at", value?.visible_at);
      formData.append("id", value?.id);
      
      let response=await axiosdefault.post(updatebannerurl, formData, {
        headers: {
          Accept: "multipart/form-data",
        },
      });

      if(response.status==200){
        refetch()
        setOpenUpdateModal(!openUpdateModal);
        toast.success(response?.data?.message)
      }
    },
    validateOnChange: false,
    validateOnBlur: false,
    validate: ({ banner_image, description, name, path, expire_at }) => {
      const error = {};
      if (!name) {
        error.name = "required name";
      }
      if (!path) {
        error.path = "required path";
      }
      if (!description) {
        error.description = "required description";
      }
      if (!expire_at) {
        error.expire_at = "required expire date";
      }
      return error;
    },
  });

  /**
   *
   */
  const [open, setOpen] = useState(false);
  /***
   *
   *
   */
  const [deleteId, setDeleteId] = useState(null);
  const [openConfirmDialog, setConfirmDialog] = useState(false);
  /**
   *
   */
  const [selectedbanner, setSelectedBanner] = useState(null);
  /**
   *
   */

  const onOpenModal = () => {
    setOpen(true);
  };
  /**
   *
   */
  const onCloseModal = () => {
    formik.resetForm();
    setOpen(false);
  };

  /**
   *
   */

  const onHandleDelete = async (id) => {
    let deleted_banner = await axiosdefault.post(deletebannerUrl, {
      id: parseInt(deleteId),
    });

    refetch();

    toast.success(deleted_banner.data.message);
  };
  /**
   *
   *
   *
   *
   *
   */
  return (
    <Fragment>
      <Breadcrumb title="Banner" parent="Physical" />
      {/* <!-- Container-fluid starts--> */}
      <Container fluid={true}>
        <Row>
          <Col sm="12">
            <Card>
              <CardHeader>
                <h5>Banner</h5>
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
                    Add Banner
                  </Button>

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
                          onHandleDelete();
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
                  <Modal isOpen={open} centered={true} toggle={onCloseModal}>
                    <ModalHeader toggle={onCloseModal}>
                      <h5
                        className="modal-title f-w-600"
                        id="exampleModalLabel2"
                      >
                        Add Banner
                      </h5>
                    </ModalHeader>
                    <ModalBody>
                      <Form>
                        <FormGroup>
                          <Label
                            htmlFor="recipient-name"
                            className="col-form-label"
                          >
                            Banner Name :
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
                          <Label
                            htmlFor="recipient-name"
                            className="col-form-label"
                          >
                            Redirect path :
                          </Label>
                          <Input
                            type="text"
                            name="path"
                            className="form-control"
                            onChange={formik.handleChange}
                            value={formik.values.path}
                          />
                          {formik.errors.path && (
                            <span
                              style={{
                                color: "red",
                              }}
                            >
                              {formik.errors.path}
                            </span>
                          )}
                        </FormGroup>
                        <FormGroup>
                          <Label
                            htmlFor="message-text"
                            className="col-form-label"
                          >
                            Banner Image :
                          </Label>
                          <Input
                            className="form-control"
                            id="validationCustom02"
                            name="banner_image"
                            type="file"
                            onChange={(e) => {
                              formik.handleChange(e);
                              setSelectedBanner(e.target.files[0]);
                            }}
                            value={formik.values.banner_image}
                          />
                          {formik.errors.banner_image && (
                            <span
                              style={{
                                color: "red",
                              }}
                            >
                              {formik.errors.banner_image}
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
                        <Col xl="12">
                          <Row>
                            <Col xl="6">
                              <FormGroup>
                                <Label>Created Date</Label>
                                <Input
                                  type="date"
                                  name="visible_at"
                                  className="form-control"
                                  onChange={formik.handleChange}
                                  value={moment(
                                    formik.values.visible_at
                                  ).format("YYYY-MM-DD")}
                                />
                              </FormGroup>
                            </Col>
                            <Col xl="6">
                              <FormGroup>
                                <Label>Expire Date</Label>
                                <Input
                                  type="date"
                                  name="expire_at"
                                  className="form-control"
                                  onChange={formik.handleChange}
                                  value={moment(formik.values.expire_at).format(
                                    "YYYY-MM-DD"
                                  )}
                                />
                                {formik.errors.expire_at && (
                                  <span
                                    style={{
                                      color: "red",
                                    }}
                                  >
                                    {formik.errors.expire_at}
                                  </span>
                                )}
                              </FormGroup>
                            </Col>
                          </Row>
                        </Col>
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
                </div>
                <div className="clearfix"></div>
                <div id="basicScenario" className="product-physical">
                  <DataTable
                    data={data?.data?.message}
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
                          return row?.banner_name;
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
                              src={`${rootUrl}${row?.image_path}`}
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
                        name: "redirect",
                        selector: (row, index) => {
                          return row?.event_path;
                        },
                        style: {
                          textAlign: "center",
                        },
                      },
                      {
                        name: "visible date",
                        selector: (row, index) => {
                          return row?.visible_at;
                        },
                        style: {
                          textAlign: "center",
                        },
                      },
                      {
                        name: "expire date",
                        selector: (row, index) => {
                          return row?.expire_at;
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
                                  setDeleteId(row?.id);
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
                              <span
                                onClick={() => {
                                  setOpenUpdateModal(!openUpdateModal);
                                  update_banner_formik.setFieldValue(
                                    "name",
                                    row?.banner_name
                                  );
                                  update_banner_formik.setFieldValue(
                                    "path",
                                    row?.event_path
                                  );
                                  update_banner_formik.setFieldValue(
                                    "description",
                                    row?.description
                                  );
                                  update_banner_formik.setFieldValue(
                                    "expire_at",
                                    row?.expire_at
                                  );
                                  update_banner_formik.setFieldValue(
                                    "visible_at",
                                    row?.visible_at
                                  );
                                  update_banner_formik.setFieldValue(
                                    "image_path",
                                    row?.image_path
                                  );
                                  update_banner_formik.setFieldValue(
                                    "id",
                                    row?.id
                                  );
                                }}
                              >
                                <i
                                  className="fa fa-edit"
                                  style={{
                                    width: 35,
                                    fontSize: 20,
                                    padding: 11,
                                    color: "green",
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
        
        <UpdateBanner
          formik={update_banner_formik}
          open={openUpdateModal}
          onCloseUpdateModal={() => {
            setOpenUpdateModal(!openUpdateModal);
            update_banner_formik.resetForm()
          }}
        />
      </Container>
    </Fragment>
  );
}

export default Banner;
