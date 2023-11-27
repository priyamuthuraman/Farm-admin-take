import React, { Fragment } from "react";
import "./setting.css";
import designer from "../../assets/images/dashboard/designer.jpg";
import TabsetProfile from "./tabset-profile";
import Breadcrumb from "../common/breadcrumb";
import { Card, CardBody, Col, Container, Media, Row, Button } from "reactstrap";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserThunk, getUser } from "../../store/reducers/user";

import axiosdefault from "../../service/api.config";
import { rootUrl } from "../../service/api.url";
import { toast } from "react-toastify";
const Profile = () => {
  const user = useSelector(getUser);
  const dispatch = useDispatch();
  return (
    <Fragment>
      <Breadcrumb title="Profile" parent="Settings" />
      <Container fluid={true}>
        <Row>
          <Col xl="4">
            <Card>
              <CardBody>
                <div className="profile-details text-center">
                  <div className="profile_container">
                    <div className="profile_img_container">
                      <img
                        src={`${rootUrl}${user?.image}`}
                        alt=""
                        style={{
                          width: "100px",
                          height: "100px",
                          borderRadius: "100%",
                          objectFit: "cover",
                        }}
                        className="img-fluid img-90"
                      />
                      <input
                        type={"file"}
                        alt="profile"
                        onChange={async (e) => {
                          const formData = new FormData();
                          e.preventDefault();

                          if (!e.target.files[0]) return;
                          formData.append("profile_image", e.target.files[0]);
                          let response = await axiosdefault.post(
                            "/api/admin/uploadimage",
                            formData,
                            {
                              headers: {
                                authorization: localStorage.getItem("token"),
                              },
                            }
                          );
                          dispatch(fetchUserThunk());
                          toast.success(response.data?.message);
                        }}
                      />
                    </div>
                  </div>
                  <h5 className="f-w-600 f-16 mb-0">{user?.first_name}</h5>
                  <span>{user?.emailid}</span>
                  {/* <div className="social">
                    <div className="form-group btn-showcase">
                      <Button color="btn social-btn btn-fb d-inline-block">
                        <i className="fa fa-facebook"></i>
                      </Button>
                      <Button color="btn social-btn btn-twitter d-inline-block">
                        <i className="fa fa-google"></i>
                      </Button>
                      <Button color="btn social-btn btn-google d-inline-block me-0">
                        <i className="fa fa-twitter"></i>
                      </Button>
                    </div>
                  </div> */}
                </div>
                <hr />
                {/* <div className="project-status">
                  <h5 className="f-w-600 f-16">Employee Status</h5>
                  <Media>
                    <Media body>
                      <h6>
                        Performance <span className="pull-right">80%</span>
                      </h6>
                      <div className="progress sm-progress-bar">
                        <div
                          className="progress-bar bg-primary"
                          role="progressbar"
                          style={{ width: "90%" }}
                          aria-valuenow="25"
                          aria-valuemin="0"
                          aria-valuemax="100"
                        ></div>
                      </div>
                    </Media>
                  </Media>
                  <Media>
                    <Media body>
                      <h6>
                        Overtime <span className="pull-right">60%</span>
                      </h6>
                      <div className="progress sm-progress-bar">
                        <div
                          className="progress-bar bg-secondary"
                          role="progressbar"
                          style={{ width: "60%" }}
                          aria-valuenow="25"
                          aria-valuemin="0"
                          aria-valuemax="100"
                        ></div>
                      </div>
                    </Media>
                  </Media>
                  <Media>
                    <Media body>
                      <h6>
                        Leaves taken <span className="pull-right">50%</span>
                      </h6>
                      <div className="progress sm-progress-bar">
                        <div
                          className="progress-bar bg-danger"
                          role="progressbar"
                          style={{ width: "50%" }}
                          aria-valuenow="25"
                          aria-valuemin="0"
                          aria-valuemax="100"
                        ></div>
                      </div>
                    </Media>
                  </Media>
                </div> */}
              </CardBody>
            </Card>
          </Col>
          <Col xl="8">
            <Card className="profile-card">
              <CardBody>
                <TabsetProfile />
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    </Fragment>
  );
};

export default Profile;
