import { useFormik } from "formik";
import React, { Fragment, useState } from "react";
import { Tabs, TabList, TabPanel, Tab } from "react-tabs";
import { Button, Col, Form, FormGroup, Input, Label, Row } from "reactstrap";
import { MENUITEMS } from "../../constants/menu";
import { addAdminUrl } from "../../service/api.url";
import axiosDefault from "../../service/api.config";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import loadash from "lodash";
let roles = [];

const TabsetUser = () => {
  const [selectedProfileImage, setSelectedProfileImage] = useState({
    imageBlob: "",
    image: "",
  });

  const navigate = useNavigate();
  /**
   *
   * @param {*} e
   */
  function remove_permission(e) {
    const { value, name } = e.target;
    roles = roles.filter((element, i) => {
      return element != value;
    });
  }
  /**
   *
   * @param {*} e
   */

  function add_permission(e) {
    const { value, name } = e.target;
    roles.push(value);
  }
  /**
   *
   *
   *
   *
   *
   *
   */
  const userFormik = useFormik({
    initialValues: {
      firstname: "",
      lastname: "",
      email: "",
      password: "",
      confirmpassword: "",
      profile_image: "",
    },
    validateOnChange: false,
    validateOnBlur: false,
    onSubmit: async ({
      confirmpassword,
      email,
      firstname,
      lastname,
      password,
      profile_image,
    }) => {
      // c, last_name, email_id, password, menu_privileges_ids
      try {
        const formData = new FormData();

        formData.append("first_name", firstname);
        formData.append("last_name", lastname);
        formData.append("email_id", email);
        formData.append("password", password);
        formData.append("menu_privileges_ids", roles.join(","));
        formData.append("profile_image", selectedProfileImage.image);

        let response = await axiosDefault.post(addAdminUrl, formData);

        if (response.data?.statusCode == 401) {
          return toast.error(response.data?.message);
        }

        navigate("/dashboard");

        userFormik.resetForm();
        toast.success("created");
      } catch (error) {
        toast.error(error.message);
      }
    },
    validate: ({
      confirmpassword,
      email,
      firstname,
      lastname,
      password,
      profile_image,
    }) => {
      const error = {};
      if (!confirmpassword) {
        error.confirmpassword = "Required confirm password";
      }
      if (!email) {
        error.email = "Required email";
      }
      if (!firstname) {
        error.firstname = "Required firstname";
      }
      if (!lastname) {
        error.lastname = "Required lastname";
      }
      if (!password) {
        error.password = "Required password";
      }

      if (password != confirmpassword) {
        error.confirmpassword = "password did not match";
      }

      if (!profile_image) {
        error.profile_image = "Required image";
      }

      return error;
    },
  });

  return (
    <Fragment>
      <Tabs>
        <TabList className="nav nav-tabs tab-coupon">
          <Tab className="nav-link">Account</Tab>
          {/* <Tab className="nav-link">Permission</Tab> */}
        </TabList>
        <TabPanel>
          <Form className="needs-validation user-add" noValidate="">
            <h4>Account Details</h4>
            <FormGroup className="row">
              <Label className="col-xl-3 col-md-4">
                <span>*</span> First Name
              </Label>
              <div className="col-xl-8 col-md-7">
                <Input
                  className="form-control"
                  id="validationCustom0"
                  type="text"
                  name="firstname"
                  onChange={userFormik.handleChange}
                  value={userFormik.values.firstname}
                />
                {userFormik.errors.firstname && (
                  <strong
                    className="m-2"
                    style={{
                      color: "red",
                    }}
                  >
                    {userFormik.errors.firstname}
                  </strong>
                )}
              </div>
            </FormGroup>
            <FormGroup className="row">
              <Label className="col-xl-3 col-md-4">
                <span>*</span> Last Name
              </Label>
              <div className="col-xl-8 col-md-7">
                <Input
                  className="form-control"
                  id="validationCustom1"
                  type="text"
                  name="lastname"
                  onChange={userFormik.handleChange}
                  value={userFormik.values.lastname}
                />
                {userFormik.errors.lastname && (
                  <strong
                    className="m-2"
                    style={{
                      color: "red",
                    }}
                  >
                    {userFormik.errors.lastname}
                  </strong>
                )}
              </div>
            </FormGroup>
            <FormGroup className="row">
              <Label className="col-xl-3 col-md-4">
                <span>*</span> Email
              </Label>
              <div className="col-xl-8 col-md-7">
                <Input
                  className="form-control"
                  id="validationCustom2"
                  type="email"
                  name="email"
                  onChange={userFormik.handleChange}
                  value={userFormik.values.email}
                />
                {userFormik.errors.email && (
                  <strong
                    className="m-2"
                    style={{
                      color: "red",
                    }}
                  >
                    {userFormik.errors.email}
                  </strong>
                )}
              </div>
            </FormGroup>
            <FormGroup className="row">
              <Label className="col-xl-3 col-md-4">
                <span>*</span> Password
              </Label>
              <div className="col-xl-8 col-md-7">
                <Input
                  className="form-control"
                  id="validationCustom3"
                  type="password"
                  name="password"
                  value={userFormik.values.password}
                  onChange={userFormik.handleChange}
                />
                {userFormik.errors.password && (
                  <strong
                    className="m-2"
                    style={{
                      color: "red",
                    }}
                  >
                    {userFormik.errors.password}
                  </strong>
                )}
              </div>
            </FormGroup>
            <FormGroup className="row">
              <Label className="col-xl-3 col-md-4">
                <span>*</span> Confirm Password
              </Label>
              <div className="col-xl-8 col-md-7">
                <Input
                  className="form-control"
                  id="validationCustom4"
                  type="password"
                  name="confirmpassword"
                  value={userFormik.values.confirmpassword}
                  onChange={userFormik.handleChange}
                />
                {userFormik.errors.confirmpassword && (
                  <strong
                    className="m-2"
                    style={{
                      color: "red",
                    }}
                  >
                    {userFormik.errors.confirmpassword}
                  </strong>
                )}
              </div>
            </FormGroup>
            <FormGroup className="row">
              <Label className="col-xl-3 col-md-4">
                <span>*</span> Profile Image
              </Label>
              <div className="col-xl-8 col-md-7">
                <Input
                  className="form-control"
                  type="file"
                  name="profile_image"
                  value={userFormik.values.profile_image}
                  onChange={(e) => {
                    userFormik.handleChange(e);
                    setSelectedProfileImage({
                      image: e.target.files[0],
                      imageBlob: URL.createObjectURL(e.target.files[0]),
                    });
                  }}
                />
                {selectedProfileImage.imageBlob && (
                  <img src={selectedProfileImage.imageBlob} width={100} />
                )}
                {userFormik.errors.profile_image && (
                  <strong
                    className="m-2"
                    style={{
                      color: "red",
                    }}
                  >
                    {userFormik.errors.profile_image}
                  </strong>
                )}
              </div>
            </FormGroup>
          </Form>
        </TabPanel>
  
      </Tabs>
      <div className="pull-right">
        <Button
          type="button"
          color="primary"
          onClick={() => {
            userFormik.submitForm();
          }}
        >
          Save
        </Button>
      </div>
    </Fragment>
  );
};

export default TabsetUser;


      // <TabPanel>
      //     <Form className="needs-validation user-add" noValidate="">
      //       <div className="permission-block">
      //         <div className="attribute-blocks">
      //           {/* <h5 className="f-w-600 mb-3">Product Related Permission </h5> */}
      //           {MENUITEMS.map((value, index) => {
      //             if (value?.privilege) {
      //               return (
      //                 <Row key={index}>
      //                   <Col xl="3" sm="4">
      //                     <Label className="form-label">{value.name}</Label>
      //                   </Col>
      //                   <Col xl="9" sm="8">
      //                     <FormGroup className="m-checkbox-inline mb-0 custom-radio-ml d-flex radio-animated">
      //                       <Label className="d-block">
      //                         <Input
      //                           className="radio_animated"
      //                           type="radio"
      //                           name={value.id}
      //                           value={value.id}
      //                           onChange={add_permission}
      //                         />
      //                         Allow
      //                       </Label>
      //                       <Label className="d-block">
      //                         <Input
      //                           className="radio_animated"
      //                           type="radio"
      //                           name={value.id}
      //                           value={value.id}
      //                           onChange={remove_permission}
      //                           defaultChecked
      //                         />
      //                         Deny
      //                       </Label>
      //                     </FormGroup>
      //                   </Col>
      //                 </Row>
      //               );
      //             }
      //           })}
      //         </div>
      //       </div>
      //     </Form>
      //   </TabPanel>