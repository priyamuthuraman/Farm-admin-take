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
import moment from "moment";
import { rootUrl } from "../service/api.url";
import "./updatebanner.css";
import { AiOutlineClose } from "react-icons/ai";

export default function UpdateBanner({ formik, open, onCloseUpdateModal }) {
  return (
    <Modal isOpen={open} centered={true} toggle={onCloseUpdateModal}>
      <ModalHeader toggle={onCloseUpdateModal}>
        <h5 className="modal-title f-w-600" id="exampleModalLabel2">
          update Banner
        </h5>
      </ModalHeader>
      <ModalBody>
        <Form>
          <FormGroup>
            <Label htmlFor="recipient-name" className="col-form-label">
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
            <Label htmlFor="recipient-name" className="col-form-label">
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
            <Label htmlFor="message-text" className="col-form-label">
              Banner Image :
            </Label>
            {!formik.values.image_path && (
              <Input
                className="form-control"
                id="validationCustom02"
                name="banner_image"
                type="file"
                onChange={(e) => {
                  formik.handleChange(e);
                  formik.setFieldValue("file", e.target.files[0]);
                }}
                value={formik.values.banner_image}
              />
            )}

            {/* {formik.errors.banner_image && (
              <span
                style={{
                  color: "red",
                }}
              >
                {formik.errors.banner_image}
              </span>
            )} */}
          </FormGroup>

          {formik.values.image_path && (
            <div className="image-preview-banner">
              <img src={`${rootUrl}${formik.values.image_path}`} alt="banner" />
              <AiOutlineClose
                size={24}
                onClick={() => {
                  formik.setFieldValue("image_path", "");
                }}
                color="black"
              />
            </div>
          )}

          <FormGroup>
            <Label className="col-xl-3 col-md-4">Description</Label>
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
                    value={moment(formik.values.visible_at).format(
                      "YYYY-MM-DD"
                    )}
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
                    value={moment(formik.values.expire_at).format("YYYY-MM-DD")}
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
          Update
        </Button>
        <Button
          type="button"
          color="secondary"
          onClick={() => onCloseUpdateModal()}
        >
          Close
        </Button>
      </ModalFooter>
    </Modal>
  );
}
