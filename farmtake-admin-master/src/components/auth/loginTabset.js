import React, { Fragment } from "react";
import { Tabs, TabList, TabPanel, Tab } from "react-tabs";
import { User, Unlock } from "react-feather";
import { useNavigate } from "react-router-dom";
import { Button, Form, FormGroup, Input, Label } from "reactstrap";
import { useFormik } from "formik";
import { loginAdmin, rootUrl } from "../../service/api.url";
import axiosDefault from "../../service/api.config";
import { toast } from "react-toastify";
import { useCookies } from "react-cookie";
const LoginTabset = () => {
  const history = useNavigate();
  const [cookies, setCookie, removeCookie] = useCookies(["token"]);
  const loginformik = useFormik({
    initialValues: {
      emailid: "",
      password: "",
    },
    validateOnChange: false,
    validateOnBlur: false,
    validate: ({ emailid, password }) => {
      const error = {};
      if (!emailid) {
        error.emailid = "required email";
      }
      if (!password) {
        error.password = "required password";
      }

      return error;
    },
    onSubmit: async ({ emailid, password }) => {
      try {
        let response = await axiosDefault.post(loginAdmin, {
          emailid: emailid,
          password: password,
        });

        localStorage.setItem("token",response.data.message)

        // setCookie("token", response.data.message, {
        //   expires: new Date(Date.now() + 60 * 24 * 60 * 60),
        //   secure: true,
        //   path: "/",
        // });
        

        history("/dashboard", { replace: true });

        toast.success("success");
      } catch (error) {
        toast.error(error.response.data?.message);
      }
    },
  });

  const clickActive = (event) => {
    document.querySelector(".nav-link").classList.remove("show");
    event.target.classList.add("show");
  };

  const routeChange = () => {
    history(`${process.env.PUBLIC_URL}/dashboard`);
  };
  return (
    <div>
      <Fragment>
        <Tabs>
          <TabList className="nav nav-tabs tab-coupon">
            <Tab className="nav-link" onClick={(e) => clickActive(e)}>
              <User />
              Login
            </Tab>
            <Tab className="nav-link" onClick={(e) => clickActive(e)}>
              <Unlock />
              Forgot password
            </Tab>
          </TabList>

          <TabPanel>
            <Form className="form-horizontal auth-form">
              <FormGroup>
                <Input
                  required=""
                  name="emailid"
                  type="email"
                  className="form-control"
                  onChange={loginformik.handleChange}
                  placeholder="Enter your email"
                  id="exampleInputEmail1"
                />
                {loginformik.errors.emailid && (
                  <span
                    style={{
                      color: "red",
                      marginLeft: "1rem",
                    }}
                  >
                    {loginformik.errors.emailid}
                  </span>
                )}
              </FormGroup>
              <FormGroup>
                <Input
                  required=""
                  name="password"
                  type="password"
                  className="form-control"
                  placeholder="Password"
                  onChange={loginformik.handleChange}
                />
                {loginformik.errors.password && (
                  <span
                    style={{
                      color: "red",
                      marginLeft: "1rem",
                    }}
                  >
                    {loginformik.errors.password}
                  </span>
                )}
              </FormGroup>
              <div className="form-terms">
                <div className="custom-control custom-checkbox me-sm-2">
                  <Label className="d-block">
                    <Input
                      className="checkbox_animated"
                      id="chk-ani2"
                      type="checkbox"
                    />
                    Reminder Me
                    {/* <span className="pull-right">
                      <a href="/#" className="btn btn-default forgot-pass p-0">
                        lost your password
                      </a>
                    </span> */}
                  </Label>
                </div>
              </div>
              <div className="form-button">
                <Button
                  color="primary"
                  onClick={() => loginformik.submitForm()}
                >
                  Login
                </Button>
              </div>
              {/* <div className="form-footer">
                <span>Or Login up with social platforms</span>
                <ul className="social">
                  <li>
                    <a href="/#">
                      <i className="icon-facebook"></i>
                    </a>
                  </li>
                  <li>
                    <a href="/#">
                      <i className="icon-twitter-alt"></i>
                    </a>
                  </li>
                  <li>
                    <a href="/#">
                      <i className="icon-instagram"></i>
                    </a>
                  </li>
                  <li>
                    <a href="/#">
                      <i className="icon-pinterest-alt"></i>
                    </a>
                  </li>
                </ul>
              </div> */}
            </Form>
          </TabPanel>
          <TabPanel>
            <Form className="form-horizontal auth-form">
              <FormGroup>
                <Input
                  required=""
                  name="email"
                  type="email"
                  className="form-control"
                  placeholder="Enter your email"
                  id="exampleInputEmail12"
                />
              </FormGroup>
              {/* <FormGroup>
                <Input
                  required=""
                  name="login[password]"
                  type="password"
                  className="form-control"
                  placeholder="Password"
                />
              </FormGroup>
              <FormGroup>
                <Input
                  required=""
                  name="login[password]"
                  type="password"
                  className="form-control"
                  placeholder="Confirm Password"
                />
              </FormGroup> */}
              {/* <div className="form-terms">
                <div className="custom-control custom-checkbox me-sm-2">
                  <Label className="d-block">
                    <Input
                      className="checkbox_animated"
                      id="chk-ani2"
                      type="checkbox"
                    />
                    I agree all statements in{" "}
                    <span>
                      <a href="/#">Terms &amp; Conditions</a>
                    </span>
                  </Label>
                </div>
              </div> */}
              <div className="form-button">
                <Button
                  color="primary"
                  type="submit"
                  onClick={() => routeChange()}
                >
                  Reset
                </Button>
              </div>
            </Form>
          </TabPanel>
        </Tabs>
      </Fragment>
    </div>
  );
};

export default LoginTabset;
