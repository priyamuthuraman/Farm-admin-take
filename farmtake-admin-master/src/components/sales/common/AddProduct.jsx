import { Fragment, useEffect } from "react";
import { Label, Input, InputGroup, Row, Col, FormGroup } from "reactstrap";
import { X } from "react-feather";
import "./addproduct.css";

export default function AddProductWholeSaleCustomer({
  onDelete,
  index,
  formik,
  product = [],
  isOutSideCustomer,
}) {
  useEffect(() => {
    let response = product.find(
      (value) => value.id == formik.values.product[index].product_id
    );
    if (!response) {
      formik.setFieldValue(`product[${index}].base_price`, "");
      formik.setFieldValue(`product[${index}].gst`, "");
      formik.setFieldValue(`product[${index}].actual_price`, "");
    } else {
      formik.setFieldValue(
        `product[${index}].base_price`,
        response?.base_price
      );
      formik.setFieldValue(`product[${index}].gst`, response?.gst);
      formik.setFieldValue(
        `product[${index}].actual_price`,
        response?.actual_price
      );
      formik.setFieldValue(
        `product[${index}].igst`,
        response?.actual_price - response?.base_price
      );
      formik.setFieldValue(
        `product[${index}].cgst`,
        (response?.actual_price - response?.base_price) / 2
      );
      formik.setFieldValue(
        `product[${index}].sgst`,
        (response?.actual_price - response?.base_price) / 2
      );
    }
  }, [formik.values.product[index].product_id]);
  return (
    <Fragment>
      <Col
        xl="12"
        style={{
          border: "1px dotted grey",
          margin: "1rem 0rem",
          padding: "0.5rem",
          position: "relative",
        }}
      >
        <X className="close-btn" onClick={onDelete} />
        <Row>
          <FormGroup className="col-3">
            <Label className="col-form-label">Product Name</Label>
            <InputGroup>
              <select
                name={`product[${index}].product_id`}
                value={formik.values.product[index].product_id}
                onChange={formik.handleChange}
                className="form-control"
              >
                <option>--select--</option>
                {product?.map((value, i) => {
                  return (
                    <option key={i} value={value?.id}>
                      {value?.name}
                    </option>
                  );
                })}
              </select>
            </InputGroup>
          </FormGroup>
          <FormGroup className="col-3">
            <Label className="col-form-label">Base Price<i>(&#x20B9;)</i></Label>
            <InputGroup>
              <Input
                name={`product[${index}].base_price`}
                type="text"
                value={formik.values.product[index].base_price}
                onChange={formik.handleChange}
              />
            </InputGroup>
          </FormGroup>
          <FormGroup className="col-3">
            <Label className="col-form-label">Quantity</Label>
            <InputGroup>
              <Input
                name={`product[${index}].quantity`}
                value={formik.values.product[index].quantity}
                type="text"
                onChange={formik.handleChange}
              />
            </InputGroup>
          </FormGroup>
          <FormGroup className="col-3">
            <Label className="col-form-label">Total Price<i>(&#x20B9;)</i></Label>
            <InputGroup>
              <Input
                name={`product[${index}].actual_price`}
                value={formik.values.product[index].actual_price}
                type="text"
                onChange={formik.handleChange}
              />
            </InputGroup>
          </FormGroup>
          <FormGroup className="col-3">
            <Label className="col-form-label">
              GST<i>(&#x20B9;)</i>
            </Label>
            <InputGroup>
              <Input
                name={`product[${index}].gst`}
                value={formik.values.product[index].gst}
                type="text"
                onChange={formik.handleChange}
              />
            </InputGroup>
          </FormGroup>
          {!isOutSideCustomer ? (
            <FormGroup className="col-3">
              <Label className="col-form-label">IGST<i>(&#x20B9;)</i></Label>
              <InputGroup>
                <Input
                  name={`product[${index}].igst`}
                  value={formik.values.product[index].igst}
                  type="text"
                  onChange={formik.handleChange}
                />
              </InputGroup>
            </FormGroup>
          ) : (
            <>
              <FormGroup className="col-3">
                <Label className="col-form-label">SGST<i>(&#x20B9;)</i></Label>
                <InputGroup>
                  <Input
                    name={`product[${index}].sgst`}
                    value={formik.values.product[index].sgst}
                    type="text"
                    onChange={formik.handleChange}
                  />
                </InputGroup>
              </FormGroup>
              <FormGroup className="col-3">
                <Label className="col-form-label">CGST<i>(&#x20B9;)</i></Label>
                <InputGroup>
                  <Input
                    name={`product[${index}].cgst`}
                    value={formik.values.product[index].cgst}
                    type="text"
                    onChange={formik.handleChange}
                  />
                </InputGroup>
              </FormGroup>
            </>
          )}
        </Row>
      </Col>
    </Fragment>
  );
}
