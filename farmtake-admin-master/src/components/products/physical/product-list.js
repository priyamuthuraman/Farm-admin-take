import React, { Fragment, useState } from "react";
import Breadcrumb from "../../common/breadcrumb";
import data from "../../../assets/data/physical_list";
import ReactPaginate from "react-paginate";
import { Edit, Trash2 } from "react-feather";
import "../../../resource/css/pagination.css";

import {
  Button,
  Card,
  CardBody,
  Col,
  Container,
  Modal,
  Row,
  ModalFooter,
  ModalHeader,
} from "reactstrap";
import {
  getProductUrl,
  rootUrl,
  deleteproductUrl,
} from "../../../service/api.url";
import axiosdefault from "../../../service/api.config";
import { useQuery } from "react-query";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { ceil } from "mathjs";

const getProduct = async (page) => {
  try {
    let response = await axiosdefault.get(`/api/product/page/${page}`);
    return response;
  } catch (error) {
    toast.error(error.messsage);
  }
};

function useGetProductDataQuery({ page, setTotalCount, getProduct }) {
  return useQuery({
    queryKey: ["getpagination", page],
    queryFn: () => getProduct(page),
    select: (data) => {
      return {
        data: data?.data?.message.data,
        count: data?.data?.message.count,
      };
    },
    keepPreviousData: true,
    onSuccess: (data) => {
      setTotalCount(ceil(data.count / 12));
    },
  });
}

/**
 * 
 * @returns 



 */
const Product_list = () => {
  const navigate = useNavigate();

  /**
   *
   *
   */
  const [openConfirmDialog, setConfirmDialog] = useState(false);
  const [selectedproductImage, setSelectedproductImage] = useState(null);
  const [totalCount, setTotalCount] = useState(0);
  const [page, setPage] = useState(0);
  const getProductReactQuery = useGetProductDataQuery({
    page: page,
    getProduct: getProduct,
    setTotalCount: setTotalCount,
  });

  const deleteProduct = async () => {
    try {
      await axiosdefault.post(deleteproductUrl, { id: selectedproductImage });
      toast.success("Deleted!");
      setSelectedproductImage(null);
      getProductReactQuery.refetch();
    } catch (error) {
      toast.post(error.message);
    }
  };

  return (
    <Fragment>
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
              deleteProduct();
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
      <Breadcrumb title="Product List" parent="Physical" />
      <Container fluid={true}>
        <Button
          type="button"
          color="primary"
          onClick={(e) => {
            navigate("/search/product");
          }}
          style={{
            marginBottom: "1rem",
          }}
          data-toggle="modal"
          data-original-title="test"
          data-target="#exampleModal"
        >
          search product
        </Button>
        <Row className="products-admin ratio_asos">
          {getProductReactQuery.data?.data?.map((myData, i) => {
            return (
              <Col xl="3" sm="6" key={i}>
                <Card>
                  <div className="products-admin">
                    <CardBody className="product-box">
                      <div className="img-wrapper">
                        <div className="lable-block">
                          {/* {moment(now()).diff(myData.createdAt, "minutes") <=
                            60 && } */}
                          <span className="lable3">
                            {myData.quantity + myData.unit.sl_unit}
                          </span>
                          {myData.stock == 0 && (
                            <span className="lable4">OUT OF STOCK</span>
                          )}
                        </div>
                        <div className="front">
                          <a className="bg-size">
                            <img
                              alt=""
                              className="img-fluid blur-up bg-img lazyloaded"
                              style={{
                                width: "250px",
                                height: "250px",
                                objectFit: "cover",
                              }}
                              src={`${rootUrl}${myData.orginal_image}`}
                            />
                          </a>
                          <div className="product-hover">
                            <ul>
                              <li>
                                <Button
                                  onClick={() => {
                                    navigate("/products/edit-product", {
                                      state: myData,
                                    });
                                  }}
                                  color="btn"
                                  type="button"
                                >
                                  <Edit className="editBtn" />
                                </Button>
                              </li>
                              <li>
                                <Button
                                  onClick={() => {
                                    setSelectedproductImage(myData?.id);
                                    setConfirmDialog(true);
                                  }}
                                  color="btn"
                                  type="button"
                                >
                                  <Trash2 className="deleteBtn" />
                                </Button>
                              </li>
                            </ul>
                          </div>
                        </div>
                      </div>
                      <div className="product-detail">
                        <div className="rating">
                          <i className="fa fa-star"></i>
                          <i className="fa fa-star"></i>
                          <i className="fa fa-star"></i>
                          <i className="fa fa-star"></i>
                          <i className="fa fa-star"></i>
                        </div>
                        <a>
                          <h6>{myData.name}</h6>
                        </a>
                        {/* <a>
                          <h6>category : {myData.category.name}</h6>
                        </a> */}
                        <h4>
                          <i>&#8377; {myData.actual_price}</i>{" "}
                          <del>&#8377; {myData.base_price}</del>
                        </h4>
                        {/* <ul className="color-variant">
                          <li className="bg-light0"></li>
                          <li className="bg-light1"></li>
                          <li className="bg-light2"></li>
                        </ul> */}
                        <p>{myData.description}</p>
                      </div>
                    </CardBody>
                  </div>
                </Card>
              </Col>
            );
          })}
        </Row>
        <div className="pagination-main">
          <ReactPaginate
            pageCount={totalCount}
            className="pagination"
            onPageChange={(page) => {
              setPage(page.selected);

              window.scroll({ behavior: "smooth", top: 0 });
            }}
          />
        </div>
      </Container>
    </Fragment>
  );
};

export default Product_list;
