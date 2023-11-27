import React, { useState, useEffect, Fragment } from "react";
import Breadcrumb from "../common/breadcrumb";
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
import axiosdefault from "../../service/api.config";
import { useFormik } from "formik";
import { UpdateProfileUrl } from "../../service/api.url";
import { useNavigate, useLocation } from "react-router-dom";
import _ from "lodash";
import { useDispatch } from "react-redux";
import { fetchUserThunk } from "../../store/reducers/user";
import useGetStateQuery from "../../react-query/useGetStateQuery";
import useGetCityQuery from "../../react-query/useGetCityQuery";

export default function EditProfile(props) {
  const [state, setState] = useState([]);
  const [city, setCity] = useState([]);

  const StateQuery = useGetStateQuery(setState);
  const cityQuery = useGetCityQuery(setCity);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();

  const formik = useFormik({
    initialValues: {
      first_name: "",
      last_name: "",
      mobile_number: "",
      emailid: "",
      address: "",
      gender_id: "",
      id: "",
      pincode: "",
      company_name: "",
      country: 101,
      state: "",
      city: "",
    },
    onSubmit: async ({
      address,
      first_name,
      gender_id,
      id,
      last_name,
      mobile_number,
      pincode,
    }) => {
      try {
        let response = await axiosdefault.post(
          UpdateProfileUrl,
          {
            id: id,
            address: address,
            gender_id: gender_id,
            first_name: first_name,
            last_name: last_name,
            mobile_number: mobile_number,
            pincode: pincode,
          },
          {
            headers: {
              authorization: localStorage.getItem("token"),
            },
          }
        );

        if (response.data?.statusCode == 200) {
          toast.success(response.data?.message);
          dispatch(fetchUserThunk());
          navigate("/settings/profile", { replace: true });
        } else {
          toast.error(response.data?.message);
        }
      } catch (error) {
        return toast.error(error.response?.data?.message);
      }
    },
    validateOnChange: false,
    validateOnBlur: false,
  });
  /**
   *
   *
   *
   */

  useEffect(() => {
    const { state } = location;
    formik.setFieldValue("first_name", state?.first_name);
    formik.setFieldValue("last_name", state?.last_name);
    formik.setFieldValue("company_name", state?.company_name);
    formik.setFieldValue("id", state?.id);
    formik.setFieldValue("emailid", state?.emailid);
    formik.setFieldValue("mobile_number", state?.mobile_number);
    formik.setFieldValue("pincode", state?.pincode);
    formik.setFieldValue("currency_id", state?.currency_id);
    formik.setFieldValue("address", state?.address);
    formik.setFieldValue("gender_id", state?.gender_id);
    StateQuery.mutateAsync(101);
  }, []);

  useEffect(() => {
    if (formik.values.state) cityQuery.mutateAsync(formik.values.state);
  }, [formik.values.state]);

  /**
   *
   * @returns
   *
   *
   *
   *
   */

  return (
    <Fragment>
      <Breadcrumb title="Edit Profile" />
      <Container fluid={true}>
        <Row className="product-adding">
          <Col xl="6">
            <Card>
              <CardHeader>
                <h5>Edit Profile</h5>
              </CardHeader>
              <CardBody>
                <div className="digital-add needs-validation">
                  <FormGroup>
                    <Label className="col-form-label">First Name</Label>
                    <InputGroup>
                      <Input
                        name="first_name"
                        className="form-control"
                        type="text"
                        value={formik.values.first_name}
                        onChange={formik.handleChange}
                      />
                    </InputGroup>
                  </FormGroup>
                  <FormGroup>
                    <Label className="col-form-label">Last Name</Label>
                    <InputGroup>
                      <Input
                        name="last_name"
                        className="form-control"
                        type="text"
                        value={formik.values.last_name}
                        onChange={formik.handleChange}
                      />
                    </InputGroup>
                  </FormGroup>

                  <FormGroup>
                    <Label className="col-form-label">Phone</Label>
                    <InputGroup>
                      <InputGroupText>+91</InputGroupText>
                      <Input
                        name="mobile_number"
                        value={formik.values.mobile_number}
                        className="form-control"
                        type="text"
                        onChange={(e) => {
                          if (e.target.value.match(/^\d*(\.\d+)?$/)) {
                            formik.handleChange(e);
                          }
                        }}
                      />
                    </InputGroup>
                  </FormGroup>
                  <FormGroup>
                    <Label className="col-form-label">Email</Label>
                    <InputGroup>
                      <Input
                        name="emailid"
                        disabled={true}
                        className="form-control"
                        type="text"
                        value={formik.values.emailid}
                        onChange={formik.handleChange}
                      />
                    </InputGroup>
                  </FormGroup>
                  <FormGroup>
                    <Label className="col-form-label">Address</Label>
                    <textarea
                      value={formik.values.address}
                      name="address"
                      rows="4"
                      cols="12"
                      onChange={formik.handleChange}
                    ></textarea>
                  </FormGroup>
                </div>
              </CardBody>
            </Card>
          </Col>
          <Col xl="6">
            <Card>
              <CardBody>
                <div className="digital-add needs-validation">
                  <FormGroup>
                    <Label className="col-form-label">Gender</Label>
                    <select
                      value={formik.values.gender_id}
                      onChange={formik.handleChange}
                      name="gender_id"
                      className="form-select"
                    >
                      <option value="">--Select--</option>
                      <option value="1003">Male</option>
                      <option value="1005">Female</option>
                    </select>
                  </FormGroup>
                  <FormGroup>
                    <Label className="col-form-label">Country</Label>
                    <select
                      value={formik.values.country}
                      onChange={formik.handleChange}
                      name="country"
                      className="form-select"
                      disabled={true}
                    >
                      <option value="101">India</option>
                    </select>
                  </FormGroup>
                  <FormGroup>
                    <Label className="col-form-label">State</Label>
                    <select
                      value={formik.values.state}
                      onChange={formik.handleChange}
                      name="state"
                      className="form-select"
                    >
                      <option value="">--Select--</option>
                      {state.states?.map((value) => {
                        return <option value={value?.id}>{value.name}</option>;
                      })}
                    </select>
                  </FormGroup>
                  <FormGroup>
                    <Label className="col-form-label">City</Label>
                    <select
                      value={formik.values.city}
                      onChange={formik.handleChange}
                      name="city"
                      className="form-select"
                    >
                      <option value="">--Select--</option>
                      {city.cities?.map((value) => {
                        return <option value={value?.id}>{value.name}</option>;
                      })}
                    </select>
                  </FormGroup>

                  <FormGroup>
                    <Label className="col-form-label">Pincode</Label>
                    <InputGroup>
                      <Input
                        name="pincode"
                        className="form-control"
                        type="text"
                        value={formik.values.pincode}
                        onChange={formik.handleChange}
                      />
                    </InputGroup>
                  </FormGroup>
                  <div className="digital-add needs-validation">
                    <FormGroup className="mb-0">
                      <div className="product-buttons text-center">
                        <Button
                          type="button"
                          onClick={(e) => {
                            formik.submitForm();
                          }}
                          color="primary"
                        >
                          Update
                        </Button>
                        <Button
                          onClick={(e) => {
                            navigate("/settings/profile", { replace: true });
                          }}
                          type="button"
                          color="light"
                        >
                          Cancel
                        </Button>
                      </div>
                    </FormGroup>
                  </div>
                </div>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    </Fragment>
  );
}
