import React, { Fragment, useEffect, useState, useContext } from "react";
import Breadcrumb from "../../common/breadcrumb";
import "./product.css";
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Col,
  Container,
  FormGroup,
  Input,
  Label,
  Row,
  InputGroupText,
  InputGroup,
} from "reactstrap";
import { toast } from "react-toastify";
import axiosdefault from "../../../service/api.config";
import { useQuery } from "react-query";
import { useFormik } from "formik";
import {
  getCategoryUrl,
  getSubCategoryByIdUrl,
  getAllUnitsUrl,
  postProductUrl,
  updateProducturl,
} from "../../../service/api.url";
import { useLoader } from "../../../hooks/useLoader";
import { useLocation } from "react-router-dom";
import { CustomFormInput } from "../../common/FormInput";

const getCategory = async () => {
  try {
    let response = await axiosdefault.get(getCategoryUrl);
    return response;
  } catch (error) {
    toast.error(error.messsage);
  }
};
const getUnit = async () => {
  try {
    let response = await axiosdefault.get(getAllUnitsUrl);
    return response;
  } catch (error) {
    toast.error(error.messsage);
  }
};

export default function ProductManagement({ isUpdate }) {
  const { state } = useLocation();

  useEffect(() => {
    if (isUpdate) {
      formik.setFieldValue("id", state.id);
      formik.setFieldValue("name", state.name);
      formik.setFieldValue("totalprice", state.actual_price);
      formik.setFieldValue("baseprice", state.base_price);
      formik.setFieldValue("description", state.description);
      formik.setFieldValue("category", state.category_id);
      formik.setFieldValue("subcategory", state.subcategory_id);
      formik.setFieldValue("hsn", state.hsn);
      formik.setFieldValue("quantity", state.quantity);
      formik.setFieldValue("unit", state.unit.id);
      formik.setFieldValue("stock", state.stock);
      formik.setFieldValue("gst", state.gst);
    }
  }, []);

  const addproduct = async (value) => {
    try {
      const formData = new FormData();
      formData.append("name", value.name);
      formData.append("description", value.description);
      formData.append("quantity", value.quantity);
      formData.append("base_price", value.baseprice);
      formData.append("actual_price", value.totalprice);
      formData.append("unit_id", value.unit);
      formData.append("product_image", selectedProductImage.image);
      formData.append("category_id", value.category);
      formData.append("subcategory_id", value.subcategory);
      formData.append("stock", value.stock);
      formData.append("gst", value.gst);
      formData.append("hsn", value.hsn);

      let response = await axiosdefault.post(postProductUrl, formData);

      toast.success("Added");
      formik.resetForm();
      setSelectedProductImage({});
    } catch (error) {
      toast.error(error.message);
    }
  };
  /**
   *
   *
   *
   */
  const updateProduct = async (value) => {
    try {
      const formData = new FormData();
      formData.append("name", value.name);
      formData.append("id", value?.id);
      formData.append("description", value.description);
      formData.append("quantity", value.quantity);
      formData.append("base_price", value.baseprice);
      formData.append("actual_price", value.totalprice);
      formData.append("unit_id", value.unit);
      formData.append("product_image", selectedProductImage.image);
      formData.append("category_id", value.category);
      formData.append("subcategory_id", value.subcategory);
      formData.append("stock", value.stock);
      formData.append("gst", value.gst);
      formData.append("hsn", value.hsn);
      let response = await axiosdefault.post(updateProducturl, formData);
      if (response.status == 200) {
        toast.success("Updated");
      }
    } catch (error) {
      console.log(error);
    }
  };
  /**
   *
   * @param {
   * } event
   */

  const onHandlePriceChange = (event) => {
    const { name, value } = event.target;

    switch (name) {
      case "totalprice":
        var baseprice = value - (formik.values.gst / 100) * value;
        formik.setFieldValue("totalprice", value);
        formik.setFieldValue("baseprice", baseprice);
        break;
      case "gst":
        var baseprice =
          formik.values.totalprice - (value / 100) * formik.values.totalprice;
        formik.setFieldValue("gst", value);
        formik.setFieldValue("baseprice", baseprice);
        break;
      default:
        break;
    }
  };
  /**
   * 

   */
  const formik = useFormik({
    initialValues: {
      name: "",
      category: "",
      subcategory: "",
      quantity: "",
      product_image: "",
      unit: "",
      baseprice: "",
      totalprice: "",
      description: "",
      stock: "",
      gst: 5,
      hsn: "",
      id: "",
    },
    onSubmit: (value) => {
      if (!value?.id) {
        addproduct(value);
      } else {
        updateProduct(value);
      }
    },
    validateOnChange: false,
    validateOnBlur: false,
    validate: ({
      baseprice,
      name,
      category,
      description,
      product_image,
      quantity,
      subcategory,
      totalprice,
      unit,
      stock,
      hsn,
    }) => {
      const error = {};
      if (!name) {
        error.name = "required name";
      }
      if (!baseprice) {
        error.baseprice = "required baseprice";
      }
      if (!category) {
        error.category = "required category";
      }
      if (!description) {
        error.description = "required description";
      }
      if (!product_image) {
        error.product_image = "required product_image";
      }
      if (!quantity) {
        error.quantity = "required quantity";
      }
      if (!subcategory) {
        error.subcategory = "required subcategory";
      }
      if (!totalprice) {
        error.totalprice = "required totalprice";
      }
      if (!unit) {
        error.unit = "required unit";
      }
      if (!stock) {
        error.stock = "required stock";
      }
      if (!hsn) {
        error.hsn = "required HSN code";
      }
      return error;
    },
  });
  /**
   *
   *
   *
   */
  const [subcategorydata, setSubCategoryData] = useState([]);
  const [selectedCategoryId, setSeletectCategoryId] = useState(false);
  const [selectedProductImage, setSelectedProductImage] = useState({
    imageBlob: "",
    image: "",
  });
  const [loading, setLoading] = useContext(useLoader);
  /*
   *
   *
   *
   */

  const getCategoryReactQuery = useQuery("getcategory", getCategory, {
    initialData: [],
  });
  /**
   *
   * @returns
   *
   *
   *
   *
   */
  const getUnitReactQuery = useQuery("getunit", getUnit, {
    initialData: [],
  });
  /**
   *
   * @returns
   */

  const getSubCategoryById = async () => {
    try {
      let response = await axiosdefault.post(getSubCategoryByIdUrl, {
        id: formik.values.category,
      });

      setSubCategoryData(response.data?.message);
    } catch (error) {
      toast.error(error.messsage);
    }
  };
  /**
   *
   *
   *
   *
   */
  useEffect(() => {
    if (formik.values.category) getSubCategoryById();
    /**
     *
     */
  }, [formik.values.category]);

  return (
    <Fragment>
      <Breadcrumb title="Add Products" parent="Digital" />
      <Container fluid={true}>
        <Row className="product-adding">
          <Col xl="6">
            <Card>
              <CardHeader>
                <h5>General</h5>
              </CardHeader>
              <CardBody>
                <div className="digital-add needs-validation">
                  <CustomFormInput
                    onChange={formik.handleChange}
                    type="text"
                    isVisible={true}
                    name="name"
                    isRequired={true}
                    labelName="product name"
                    value={formik.values.name}
                    error={formik.errors.name}
                  />

                  <FormGroup>
                    <Label className="col-form-label">
                      <span>*</span> Categories
                    </Label>
                    <select
                      className="form-select"
                      required=""
                      name="category"
                      value={formik.values.category}
                      onChange={formik.handleChange}
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
                    {formik.errors.category && (
                      <span
                        style={{
                          color: "red",
                        }}
                      >
                        {formik.errors.category}
                      </span>
                    )}
                  </FormGroup>
                  <FormGroup>
                    <Label className="col-form-label">
                      <span>*</span>Sub Categories
                    </Label>
                    <select
                      name="subcategory"
                      onChange={formik.handleChange}
                      className="form-select"
                      value={formik.values.subcategory}
                      required=""
                    >
                      <option value="">--Select--</option>
                      {subcategorydata?.map((result, index) => {
                        return (
                          <option key={index} value={result?.id}>
                            {result?.name}
                          </option>
                        );
                      })}
                    </select>
                    {formik.errors.subcategory && (
                      <span
                        style={{
                          color: "red",
                        }}
                      >
                        {formik.errors.subcategory}
                      </span>
                    )}
                  </FormGroup>

                  <CustomFormInput
                    error={formik.errors.description}
                    isVisible={true}
                    isRequired={false}
                    name="description"
                    type="textarea"
                    onChange={formik.handleChange}
                    labelName="Description"
                    value={formik.values.description}
                  />
                  <CustomFormInput
                    error={formik.errors.baseprice}
                    onChange={formik.handleChange}
                    readOnly={true}
                    isNumber={true}
                    isRequired={true}
                    isVisible={true}
                    name="baseprice"
                    labelName="base Price"
                    type="text"
                    value={formik.values.baseprice}
                  />
                  <span
                    style={{
                      color: "grey",
                    }}
                  >
                    base price will auto populate so field not required
                  </span>
                  <CustomFormInput
                    isVisible={true}
                    labelName="Total Price"
                    onChange={(e) => onHandlePriceChange(e)}
                    name="totalprice"
                    error={formik.errors.totalprice}
                    type="text"
                    isNumber={true}
                    value={formik.values.totalprice}
                    isRequired={true}
                  />
                  <FormGroup>
                    <Label className="col-form-label">
                      <span>*</span> Quantity
                    </Label>
                    <div
                      style={{
                        display: "flex",
                      }}
                    >
                      <Input
                        name="quantity"
                        value={formik.values.quantity}
                        className="form-control"
                        onChange={(e) => {
                          if (e.target.value.match(/^\d*(\.\d+)?$/)) {
                            formik.handleChange(e);
                          }
                        }}
                        id="validationCustom02"
                        type="text"
                        style={{
                          flex: 2,
                        }}
                      />

                      <select
                        className="form-select"
                        name="unit"
                        value={formik.values.unit}
                        onChange={formik.handleChange}
                        style={{
                          flex: 1,
                        }}
                      >
                        <option value="">--Unit--</option>
                        {getUnitReactQuery.data?.data?.message?.map(
                          (result, index) => {
                            return (
                              <option key={index} value={result?.id}>
                                {result?.name + " " + `(${result?.sl_unit})`}
                              </option>
                            );
                          }
                        )}
                      </select>
                    </div>
                    {formik.errors.quantity && (
                      <div
                        style={{
                          color: "red",
                        }}
                      >
                        {formik.errors.quantity}
                      </div>
                    )}
                    {formik.errors.unit && (
                      <span
                        style={{
                          color: "red",
                        }}
                      >
                        {formik.errors.unit}
                      </span>
                    )}
                  </FormGroup>
                </div>
              </CardBody>
            </Card>
          </Col>
          <Col xl="6">
            <Card>
              <CardBody>
                <div className="digital-add needs-validation">
                  <CustomFormInput
                    type="text"
                    error={formik.errors.hsn}
                    onChange={formik.handleChange}
                    name="hsn"
                    isRequired={true}
                    isVisible={true}
                    labelName="HSN Code"
                    value={formik.values.hsn}
                  />
                  <FormGroup>
                    <Label className="col-form-label">
                      <span>*</span> Product GST
                      <span
                        style={{
                          marginLeft: "1rem",
                          color: "black",
                          fontSize: "1rem",
                        }}
                      >
                        ({formik.values.gst}%)
                      </span>
                    </Label>
                    <InputGroup>
                      <Input
                        name="gst"
                        min={0}
                        max={100}
                        value={formik.values.gst}
                        onChange={(e) => onHandlePriceChange(e)}
                        className="range-slider-input"
                        type="range"
                        required=""
                      />
                    </InputGroup>
                  </FormGroup>
                  <FormGroup>
                    <Label className="col-form-label">
                      <span>*</span> Product Stock
                    </Label>
                    <InputGroup>
                      <Input
                        name="stock"
                        value={formik.values.stock}
                        className="form-control"
                        id="validationCustom02"
                        type="text"
                        onChange={(e) => {
                          if (e.target.value.match(/^\d*(\.\d+)?$/)) {
                            formik.handleChange(e);
                          }
                        }}
                        required=""
                      />
                    </InputGroup>
                    {formik.errors.stock && (
                      <span
                        style={{
                          color: "red",
                        }}
                      >
                        {formik.errors.stock}
                      </span>
                    )}
                  </FormGroup>
                  <FormGroup>
                    <Label className="col-form-label pt-0">Product Image</Label>
                    <Input
                      className="form-control"
                      id="validationCustom02"
                      name="product_image"
                      type="file"
                      accept="image"
                      onChange={(e) => {
                        console.log(e);
                        formik.handleChange(e);
                        setSelectedProductImage({
                          image: e.target.files[0],
                          imageBlob: URL.createObjectURL(e.target.files[0]),
                        });
                      }}
                      value={formik.values.product_image}
                    />
                    {formik.errors.product_image && (
                      <span
                        style={{
                          color: "red",
                        }}
                      >
                        {formik.errors.product_image}
                      </span>
                    )}
                  </FormGroup>
                  {selectedProductImage.imageBlob && (
                    <img src={selectedProductImage.imageBlob} width={100} />
                  )}
                  <FormGroup className="mb-0">
                    <div className="product-buttons text-center">
                      <Button
                        type="button"
                        onClick={(e) => {
                          formik.submitForm();
                        }}
                        color="primary"
                      >
                        {isUpdate ? "Update" : "Add"}
                      </Button>
                      <Button
                        onClick={(e) => {
                          formik.resetForm();
                        }}
                        type="button"
                        color="light"
                      >
                        Discard
                      </Button>
                    </div>
                  </FormGroup>
                </div>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    </Fragment>
  );
}


