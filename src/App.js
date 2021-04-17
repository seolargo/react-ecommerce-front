import React, { useEffect, useState, lazy, Suspense } from "react";
import { Switch, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { auth } from "./firebase";
import { useDispatch } from "react-redux";
import { currentUser } from "./functions/auth";
import { LoadingOutlined } from "@ant-design/icons";
import ReactCursorPosition, { INTERACTIONS } from "react-cursor-position";

const SubUpdate = lazy(() => import("./pages/admin/sub/SubUpdate"));
const ProductCreate = lazy(() => import("./pages/admin/product/ProductCreate"));
const AllProducts = lazy(() => import("./pages/admin/product/AllProducts"));
const Product = lazy(() => import("./pages/Product"));
const CategoryHome = lazy(() => import("./pages/category/CategoryHome"));
const SubHome = lazy(() => import("./pages/sub/SubHome"));
const SideDrawer = lazy(() => import("./components/drawer/SideDrawer"));
const Checkout = lazy(() => import("./pages/Checkout"));
const Cart = lazy(() => import("./pages/Cart"));
const Login = lazy(() => import("./pages/auth/Login"));
const Register = lazy(() => import("./pages/auth/Register"));
const Home = lazy(() => import("./pages/Home"));
const Header = lazy(() => import("./components/nav/Header"));
const RegisterComplete = lazy(() => import("./pages/auth/RegisterComplete"));
const ForgotPassword = lazy(() => import("./pages/auth/ForgotPassword"));
const History = lazy(() => import("./pages/user/History"));
const UserRoute = lazy(() => import("./components/routes/UserRoute"));
const AdminRoute = lazy(() => import("./components/routes/AdminRoute"));
const Password = lazy(() => import("./pages/user/Password"));
const Wishlist = lazy(() => import("./pages/user/Wishlist"));
const AdminDashboard = lazy(() => import("./pages/admin/AdminDashboard"));
const Shop = lazy(() => import("./pages/Shop"));
const CategoryCreate = lazy(() =>
  import("./pages/admin/category/CategoryCreate")
);
const CategoryUpdate = lazy(() =>
  import("./pages/admin/category/CategoryUpdate")
);
const SubCreate = lazy(() => import("./pages/admin/sub/SubCreate"));

const dotenv = require("dotenv");
dotenv.config();

const App = () => {
  const dispatch = useDispatch();
  const [data, setData] = useState([
    { path: window.location.pathname, x: 0, y: 0, time: 0.0, type: 0 },
  ]);

  const [externalIsActive,setExternalIsActive] = useState(false)
  const PositionLabel = (props) => {
    const {
      detectedEnvironment: {
        isMouseDetected = false,
        isTouchDetected = false,
      } = {},
      elementDimensions: { width = 0, height = 0 } = {},
      isActive = false,
      isPositionOutside = false,
      position: { x = 0, y = 0 } = {},
      hoverDelayInMs = 0,
      hoverOffDelayInMs = 0,
      isEnabled = true,
      pressDurationInMs = 500,
      pressMoveThreshold = 5,
      tapDurationInMs = 180,
      tapMoveThreshold = 5,
    } = props;

    setData([
      ...data,
      {
        time: Date.now(),
        path: window.location.pathname,
        x: x,
        y: y,
        type: externalIsActive !== isActive ? 1 : 0,
      },
    ]);
    if(externalIsActive !== isActive){
      setExternalIsActive(isActive);
    }
    return (
      <div className="example__label">
        {`x: ${x}`}
        <br />
        {`y: ${y}`}
        <br />
        {`width:: ${width}`}
        <br />
        {`height: ${height}`}
        <br />
        {`isActive: ${isActive}`}
        <br />
        {`isPositionOutside: ${isPositionOutside ? "true" : "false"}`}
        <br />
        {`isMouseDetected: ${isMouseDetected ? "true" : "false"}`}
        <br />
        {`isTouchDetected: ${isTouchDetected ? "true" : "false"}`}
        <br />
        {`hoverDelayInMs: ${hoverDelayInMs ? "true" : "false"}`}
        {`hoverOffDelayInMs: ${hoverOffDelayInMs}`}
        <br />
        {`isEnabled: ${isEnabled ? "true" : "false"}`}
        <br />
        {`pressDurationInMs: ${pressDurationInMs}`}
        <br />
        {`pressMoveThreshold: ${pressMoveThreshold}`}
        <br />
        {`tapDurationInMs: ${tapDurationInMs}`}
        <br />
        {`tapMoveThreshold: ${tapMoveThreshold}`}
        <br />
      </div>
    );
  };

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      if (user) {
        const idTokenResult = await user.getIdTokenResult();

        currentUser(idTokenResult.token)
          .then((res) => {
            dispatch({
              type: "LOGGED_IN_USER",
              payload: {
                name: res.data.name,
                email: res.data.email,
                token: idTokenResult.token,
                role: res.data.role,
                _id: res.data._id,
              },
            });
          })
          .catch((err) => console.log(err));
      }
    });
    //cleanup
    return () => unsubscribe();
  }, [dispatch]);

  return (
    <ReactCursorPosition
      className="example"
      activationInteractionMouse={INTERACTIONS.CLICK}
    >
      <PositionLabel />
      <Suspense
        fallback={
          <div className="col text-center p-5">
            __ React Redux ECO
            <LoadingOutlined />
            MMERCE __
          </div>
        }
      >
        <Header />
        <SideDrawer />
        <ToastContainer />
        <Switch>
          <Route exact path="/" component={Shop} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/register" component={Register} />
          <Route exact path="/register/complete" component={RegisterComplete} />
          <Route exact path="/forgot/password" component={ForgotPassword} />
          <UserRoute exact path="/user/history" component={History} />
          <UserRoute exact path="/user/password" component={Password} />
          <UserRoute exact path="/user/wishlist" component={Wishlist} />
          <AdminRoute
            exact
            path="/admin/dashboard"
            component={AdminDashboard}
          />
          <AdminRoute exact path="/admin/category" component={CategoryCreate} />
          <AdminRoute
            exact
            path="/admin/category/:slug"
            component={CategoryUpdate}
          />
          <AdminRoute exact path="/admin/sub" component={SubCreate} />
          <AdminRoute exact path="/admin/sub" component={SubUpdate} />
          <AdminRoute exact path="/admin/product" component={ProductCreate} />
          <AdminRoute exact path="/admin/products" component={AllProducts} />
          <Route exact path="/product/:slug" component={Product} />
          <Route exact path="/category/:slug" component={CategoryHome} />
          <Route exact path="/sub/:slug" component={SubHome} />
          <Route exact path="/cart" component={Cart} />
          <UserRoute exact path="/checkout" component={Checkout} />
          <Route exact path="/shop" component={Shop} />
        </Switch>
      </Suspense>
    </ReactCursorPosition>
  );
};

export default App;
