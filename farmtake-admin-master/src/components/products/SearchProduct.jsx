import { useNavigate } from "react-router-dom";
import {
  Card,
  CardHeader,
  Button,
  Input,
  InputGroup,
  InputGroupText,
  ModalFooter,
  ModalHeader,
  Modal,
  FormGroup,
  Label,
  Col,
  CardBody,
  Row,
} from "reactstrap";
import Breadcrumb from "../common/breadcrumb";
import { FaSearch } from "react-icons/fa";
import { useEffect, useRef, useState } from "react";
import { useFormik } from "formik";
import { useQuery } from "react-query";
import { ceil } from "mathjs";
import { toast } from "react-toastify";
import axiosdefault from "../../service/api.config";
import { rootUrl, deleteproductUrl } from "../../service/api.url";
import { Edit, Trash2 } from "react-feather";
import Placeholder from "../../assets/images/product-list/1.jpg";
import "./../../resource/css/pagination.css";
import ReactPaginate from "react-paginate";

const getSearchProduct = async (page, name) => {
  try {
    if (!name) return;
    let response = await axiosdefault.get(
      `/api/product/search?name=${name}&page=${page}`
    );
    return response;
  } catch (error) {
    toast.error(error.messsage);
  }
};

const useSearchProductQuery = ({ page, setTotal, name }) => {
  return useQuery({
    queryKey: ["getsearchproduct", page],
    queryFn: () => getSearchProduct(page, name),
    keepPreviousData: true,
    select: (data) => {
      return {
        data: data?.data?.message?.data,
        count: data?.data?.message?.count,
      };
    },
    refetchOnMount: false,
    enabled: false,
    placeholderData: { data: [], count: 0 },
    onSuccess: (data) => {
      setTotal(ceil(data?.count / 12));
    },
  });
};

export default function SearchProduct() {
  const navigate = useNavigate();
  /**
   *
   *
   */
  const [page, setPage] = useState(0);
  const [total, setTotal] = useState(0);
  const [openConfirmDialog, setConfirmDialog] = useState(false);
  const [selectedproductImage, setSelectedproductImage] = useState(null);
  /**
   *
   */
  const deleteProduct = async () => {
    try {
      await axiosdefault.post(deleteproductUrl, { id: selectedproductImage });
      toast.success("Deleted!");
      setSelectedproductImage(null);
      // getProductReactQuery.refetch();
      search.refetch();
    } catch (error) {
      toast.post(error.message);
    }
  };
  /**
   *
   *
   */

  const searchFormik = useFormik({
    initialValues: {
      name: "",
    },
    onSubmit: () => search.refetch(),
    validate: ({ name }) => {
      const error = {};
      if (!name) {
        error.name = "Required search name";
      }
      if (name.length < 3) {
        error.name = "Required atleast three character";
      }

      return error;
    },
  });

  const search = useSearchProductQuery({
    name: searchFormik.values.name,
    page,
    setTotal,
  });

  return (
    <>
      <Col sm={6}>
        <FormGroup>
          <Breadcrumb title="Search Product" />
          <InputGroup>
            <Input
              sm={2}
              name="name"
              className="form-control w-50"
              id="validationCustom02"
              placeholder="search product"
              type="text"
              value={searchFormik.values.name}
              onChange={searchFormik.handleChange}
            />
            <Button
              onClick={(e) => {
                searchFormik.submitForm();
              }}
            >
              <FaSearch style={{ color: "white" }} />
            </Button>
          </InputGroup>
          {searchFormik.errors.name && (
            <strong
              className="m-2"
              style={{
                color: "red",
              }}
            >
              {searchFormik.errors.name}
            </strong>
          )}
        </FormGroup>
      </Col>
      <Row className="products-admin ratio_asos">
        {search.isFetching ? (
          <>
            <h3>Loading..</h3>
          </>
        ) : (
          search.data?.data?.map((myData, i) => {
            return (
              <Col xl="3" sm="6" key={i}>
                <Card>
                  <div className="products-admin">
                    <CardBody className="product-box">
                      <div className="img-wrapper">
                        <div className="lable-block">
                          <span className="lable3">
                            {myData.quantity + myData.unit.sl_unit}
                          </span>
                        </div>
                        <div className="front">
                          <a className="bg-size">
                            <img
                              alt=""
                              className="img-fluid blur-up bg-img lazyloaded"
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
                          <i>&#8377; {myData.actual_price}</i>
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
          })
        )}
      </Row>
      <div className="pagination-main">
        <ReactPaginate
          pageCount={total}
          className="pagination"
          onPageChange={(page) => {
            setPage(page.selected);

            window.scroll({ behavior: "smooth", top: 0 });
          }}
        />
      </div>
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
    </>
  );
}
