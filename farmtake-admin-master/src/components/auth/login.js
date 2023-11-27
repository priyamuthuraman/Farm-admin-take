import React, { Fragment } from "react";
import LoginTabset from "./loginTabset";
import { ArrowLeft } from "react-feather";
import Slider from "react-slick";
import stats from "../../assets/images/dashboard/stats.png";
import "../../assets/scss/slick.scss";
import "../../assets/scss/slick-theme.scss";
import Logo from "../../assets/images/dashboard/logo1.png";
import { Card, CardBody, Col, Container, Row } from "reactstrap";

const Login = () => {
  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    arrows: false,
  };
  return (
    <Fragment>
      <div className="page-wrapper">
        <div className="authentication-box">
          <Container>
            <Row
              style={{
                display: "flex",
                flexDirection: "column",
              }}
            >
              <img
                style={{
                  display: "inline-flex",
                  marginBottom: "15px",
                }}
                src={Logo}
                className="w-25 h-25"
              />
              <Col className="col-md-8 p-0 m-auto card-center">
                <Card className="tab2-card">
                  <CardBody>
                    <LoginTabset />
                  </CardBody>
                </Card>
              </Col>
            </Row>
            {/* <a
              href="https://multikart-react.vercel.app/"
              target="_blank"
              rel="noreferrer"
              className="btn btn-primary back-btn"
            >
              <ArrowLeft />
              back
            </a> */}
          </Container>
        </div>
      </div>
    </Fragment>
  );
};

export default Login;
