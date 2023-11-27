import React, { Fragment } from "react";
import { Route, Routes } from "react-router-dom";
import App from "../components/app";
import Banner from "../components/Banner";
import Datatable from "../components/common/datatable";
import Createcoupons from "../components/coupons/create-coupons";
import ListCoupons from "../components/coupons/list-coupons";
import Dashboard from "../components/dashboard";
import Invoice from "../components/invoice";
import Rates from "../components/localization/rates";
import Taxes from "../components/localization/taxes";
import Location from "../components/localization/location";
import Media from "../components/media/media";
import Createmenu from "../components/menus/create-menu";
import Listmenu from "../components/menus/list-menu";
import Createpage from "../components/pages/create-page";
import ListPages from "../components/pages/list-page";
import ProductManagement from "../components/products/digital/digital-add-pro";
import Digitalcategory from "../components/products/digital/digital-category";
import Digitalprolist from "../components/products/digital/digital-pro-list";
import Digitalsubcategory from "../components/products/digital/digital-sub-category";
import Addproduct from "../components/products/physical/add-product";
import Category from "../components/products/physical/category";
import Productdetail from "../components/products/physical/product-detail";
import Productlist from "../components/products/physical/product-list";
import Subcategory from "../components/products/physical/sub-category";
import SearchProduct from "../components/products/SearchProduct";
import Reports from "../components/reports/report";
import Orders from "../components/sales/orders";
import Transactionsales from "../components/sales/transactions-sales";
import Profile from "../components/settings/profile";
import Createuser from "../components/users/create-user";
import ListOfRetailUser from "../components/users/list-user";
import Createvendors from "../components/vendors/create.vendors";
import Listvendors from "../components/vendors/list-vendors";
import AuthProvider from "../components/auth/AuthProvider";
import EditProfile from "../components/settings/EditProfile";
import CreateCustomer from "../components/users/create-customer";
import Inventory, {
  getInitialPropsForInventory,
} from "../components/products/Inventory";
import WholeSaleCustomer from "../components/users/wholesalelist";
import BillGenerate from "../components/sales/GenerateBill";
import WholeSaleOrder from "../components/sales/WholeSaleOrder";
import WholeSaleProducts from "../components/sales/WholeSaleProducts";
import UpdateCustomer from "../components/users/update-customer";
import CreateOrdersWholeSale from "../components/sales/CreateOrdersWholeSale";


const LayoutRoutes = () => {
  return (
    <Fragment>
      <Routes>
        <Route element={<App />}>
          <Route path={`${process.env.PUBLIC_URL}/`} element={<Dashboard />} />
          <Route
            path={`${process.env.PUBLIC_URL}/dashboard`}
            element={<Dashboard />}
          />
          <Route
            path={`${process.env.PUBLIC_URL}/banner`}
            element={<Banner />}
          />
      
          <Route
            path={`${process.env.PUBLIC_URL}/products/physical/category`}
            element={<Category />}
          />
          <Route
            path={`${process.env.PUBLIC_URL}/products/physical/sub-category`}
            element={<Subcategory />}
          />
          <Route
            path={`${process.env.PUBLIC_URL}/products/physical/product-list`}
            element={<Productlist />}
          />
          <Route
            path={`${process.env.PUBLIC_URL}/products/physical/product-detail`}
            element={<Productdetail />}
          />
          <Route
            path={`${process.env.PUBLIC_URL}/products/physical/add-product`}
            element={<Addproduct />}
          />

          <Route
            path={`${process.env.PUBLIC_URL}/products/digital/digital-category`}
            element={<Digitalcategory />}
          />
          <Route
            path={`${process.env.PUBLIC_URL}/products/digital/digital-sub-category`}
            element={<Digitalsubcategory />}
          />
          <Route
            path={`${process.env.PUBLIC_URL}/products/digital/digital-product-list`}
            element={<Digitalprolist />}
          />
          <Route
            path={`${process.env.PUBLIC_URL}/products/add`}
            element={<ProductManagement />}
          />

          <Route
            path={`${process.env.PUBLIC_URL}/sales/orders`}
            element={<Orders />}
          />
          <Route
            path={`${process.env.PUBLIC_URL}/sales/wholesale`}
            element={<WholeSaleOrder />}
          />
      
          <Route
            path={`${process.env.PUBLIC_URL}/search/product`}
            element={<SearchProduct />}
          />
          <Route
            path={`${process.env.PUBLIC_URL}/sales/transactions`}
            element={<Transactionsales />}
          />

          <Route
            path={`${process.env.PUBLIC_URL}/coupons/list-coupons`}
            element={<ListCoupons />}
          />
          <Route
            path={`${process.env.PUBLIC_URL}/coupons/create-coupons`}
            element={<Createcoupons />}
          />

          <Route
            path={`${process.env.PUBLIC_URL}/pages/list-page`}
            element={<ListPages />}
          />
          <Route
            path={`${process.env.PUBLIC_URL}/pages/create-page`}
            element={<Createpage />}
          />

          <Route path={`${process.env.PUBLIC_URL}/media`} element={<Media />} />

          <Route
            path={`${process.env.PUBLIC_URL}/menus/list-menu`}
            element={<Listmenu />}
          />
          <Route
            path={`${process.env.PUBLIC_URL}/menus/create-menu`}
            element={<Createmenu />}
          />

          <Route
            path={`${process.env.PUBLIC_URL}/users/retail`}
            element={<ListOfRetailUser />}
          />
          <Route
            path={`${process.env.PUBLIC_URL}/users/create-user`}
            element={<Createuser />}
          />
          <Route
            path={`${process.env.PUBLIC_URL}/users/createcustomer`}
            element={<CreateCustomer />}
          />
          <Route
            path={`${process.env.PUBLIC_URL}/users/updatecustomer`}
            element={<UpdateCustomer />}
          />

          <Route
            path={`${process.env.PUBLIC_URL}/vendors/list_vendors`}
            element={<Listvendors />}
          />
          <Route
            path={`${process.env.PUBLIC_URL}/vendors/create-vendors`}
            element={<Createvendors />}
          />

          <Route
            path={`${process.env.PUBLIC_URL}/localization/transactions`}
            element={<Location />}
          />
          <Route
            path={`${process.env.PUBLIC_URL}/localization/currency-rates`}
            element={<Rates />}
          />
          <Route
            path={`${process.env.PUBLIC_URL}/localization/taxes`}
            element={<Taxes />}
          />

          <Route
            path={`${process.env.PUBLIC_URL}/reports/report`}
            element={<Reports />}
          />

          <Route
            path={`${process.env.PUBLIC_URL}/settings/profile`}
            element={<Profile />}
          />

          <Route
            path={`${process.env.PUBLIC_URL}/invoice`}
            element={<Invoice />}
          />

          <Route
            path={`${process.env.PUBLIC_URL}/data-table`}
            element={<Datatable />}
          />
          <Route
            path={`${process.env.PUBLIC_URL}/products/edit-product`}
            element={<ProductManagement isUpdate={true} />}
          />
          <Route
            path={`${process.env.PUBLIC_URL}/profile/edit`}
            element={<EditProfile />}
          />
          <Route
            path={`${process.env.PUBLIC_URL}/product/inventory`}
            element={<Inventory />}
          />
          <Route
            path={`${process.env.PUBLIC_URL}/users/wholesale`}
            element={<WholeSaleCustomer />}
          />
                    <Route
            path={`${process.env.PUBLIC_URL}/sales/wholesale/products`}
            element={<WholeSaleProducts />}
          />
          <Route
            path={`${process.env.PUBLIC_URL}/sales/billgenerate`}
            element={<BillGenerate />}
          />
          <Route
            path={`${process.env.PUBLIC_URL}/sales/create-order`}
            element={<CreateOrdersWholeSale />}
          />

        </Route>  
      </Routes>
    </Fragment>
  );
};

export default LayoutRoutes;
