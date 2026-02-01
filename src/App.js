import React, { Component, Suspense, lazy } from "react";
import { Routes, Route, MemoryRouter as Router } from "react-router-dom";
import axios from "axios";
import NavigationWrapper from "./components/NavigationWrapper";
import { LoadingSpinner } from "./components/ui";
import Context from "./Context";
import { API_ENDPOINTS } from "./constants";
import "./App.css";

// Lazy load components for better performance
const AddProduct = lazy(() => import("./components/AddProduct"));
const Cart = lazy(() => import("./components/Cart"));
const Login = lazy(() => import("./components/Login"));
const FrontPage = lazy(() => import("./components/FrontPage"));
const ProductLabel = lazy(() => import("./components/ProductLabel"));
const ProductType = lazy(() => import("./components/ProductType"));
const ProductList = lazy(() => import("./components/ProductList"));
const ProductDeal = lazy(() => import("./components/ProductDeal"));
const SmartBag = lazy(() => import("./components/SmartBag"));
const SmartBagProducts = lazy(() => import("./components/SmartBagProducts"));
const OrderHistory = lazy(() => import("./components/OrderHistory"));
const OrderTable = lazy(() => import("./components/OrderTable"));
const SignUp = lazy(() => import("./components/SignUp"));

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: null,
      cart: {},
      products: [],
      isLoading: true,
      error: null
    };
    this.navigate = null;
  }
  
  async componentDidMount() {
    let user = localStorage.getItem("user");
    let cart = localStorage.getItem("cart");

    try {
      this.setState({ isLoading: true });
      const products = await axios.get(API_ENDPOINTS.FRONTPAGE);
      console.log("API Response:", products);
      user = user ? JSON.parse(user) : null;
      cart = cart ? JSON.parse(cart) : {};
      this.setState({ 
        user, 
        products: products.data, 
        cart, 
        isLoading: false,
        error: null 
      });
    } catch (error) {
      console.error("Failed to fetch products:", error);
      // Set default state even if API fails
      user = user ? JSON.parse(user) : null;
      cart = cart ? JSON.parse(cart) : {};
      this.setState({ 
        user, 
        products: [], 
        cart, 
        isLoading: false,
        error: "Failed to load products. Please refresh the page." 
      });
    }
  }
  
  login = async (email, password) => {
    const res = await axios
      .post(API_ENDPOINTS.LOGIN, { email, password })
      .catch((res) => {
        return { status: 401, message: "Unauthorized" };
      });

    if (res.status === 202) {
      let response = JSON.parse(res.config.data);
      const { email } = response;
      response = JSON.parse(res.request.response);
      console.log("Login response:", response);
      const user_id = response.user_id;
      
      try {
        const newRes = await axios.get(
          API_ENDPOINTS.SMARTBAG(user_id)
        );
        const orderRes = await axios.get(
          API_ENDPOINTS.ORDERS(user_id)
        );
        
        console.log("SmartBag API Response:", newRes.data);
        console.log("Orders API Response:", orderRes.data);
        
        const user = {
          user_id,
          email,
          smartbag: newRes.data,
          orderHis: orderRes.data,
          accessLevel: 1,
        };

        this.setState({ user });
        localStorage.setItem("user", JSON.stringify(user));
        return true;
      } catch (apiError) {
        console.error("Error fetching user data:", apiError);
        
        // Create user with empty smartbag if API calls fail
        const user = {
          user_id,
          email,
          smartbag: {},
          orderHis: [],
          accessLevel: 1,
        };
        
        this.setState({ user });
        localStorage.setItem("user", JSON.stringify(user));
        return true;
      }
    } else {
      return false;
    }
  };

  signup = async (email, password) => {
    const res = await axios
      .post(API_ENDPOINTS.SIGNUP, {
        email,
        password,
      })
      .catch((res) => {
        return { status: 401, message: "Unauthorized" };
      });
    if (res.status === 201) {
      this.navigate("/login");
      return true;
    } else {
      return false;
    }
  };

  logout = (e) => {
    e.preventDefault();
    this.navigate("/products");
    this.setState({ user: null, cart: {}, smartbag: {} });
    localStorage.removeItem("user");
    localStorage.removeItem("cart");
  };

  addToCart = (cartItem) => {
    let cart = this.state.cart;
    if (cart[cartItem.id]) {
      cart[cartItem.id].amount += cartItem.amount;
    } else {
      cart[cartItem.id] = cartItem;
    }
    if (cart[cartItem.id].amount > cart[cartItem.id].product.stock) {
      cart[cartItem.id].amount = cart[cartItem.id].product.stock;
    }
    localStorage.setItem("cart", JSON.stringify(cart));
    this.setState({ cart });
  };

  removeFromCart = (cartItemId) => {
    let cart = this.state.cart;
    delete cart[cartItemId];
    localStorage.setItem("cart", JSON.stringify(cart));
    this.setState({ cart });
  };

  clearCart = () => {
    let cart = {};
    localStorage.removeItem("cart");
    this.setState({ cart });
  };

  checkout = () => {
     if (!this.state.user) {
       this.navigate("/login");                                                                                                                                                                              
       return;
     }

    // const cart = this.state.cart;

    // const products = this.state.products.map((p) => {
    //   if (cart[p.name]) {
    //     p.stock = p.stock - cart[p.name].amount;

    //     axios.put(API_ENDPOINTS.PRODUCTS(p.id), { ...p });
    //   }
    //   return p;
    // });

    // this.setState({ products });
    // this.clearCart();
    this.setState({cart: {}})
  };

  addProduct = (product, callback) => {
    let products = this.state.products.slice();
    products.push(product);
    this.setState({ products }, () => callback && callback());
  };

  setNavigate = (navigate) => {
    this.navigate = navigate;
  };

  render() {
    const { isLoading, error } = this.state;

    // Show loading spinner while app is initializing
    if (isLoading) {
      return (
        <div className="app-loading" role="status" aria-live="polite">
          <div className="app-loading-content">
            <LoadingSpinner size="large" text="Loading Bhanumati ka Pitara..." />
            <span className="sr-only">Loading application, please wait...</span>
          </div>
        </div>
      );
    }

    // Show error state if initial load failed
    if (error) {
      return (
        <div className="app-error" role="alert" aria-live="assertive">
          <div className="app-error-content">
            <h2>Something went wrong</h2>
            <p>{error}</p>
            <button 
              onClick={() => window.location.reload()}
              aria-label="Refresh the page to try again"
            >
              Refresh Page
            </button>
          </div>
        </div>
      );
    }

    return (
      <Context.Provider
        value={{
          ...this.state,
          removeFromCart: this.removeFromCart,
          addToCart: this.addToCart,
          login: this.login,
          addProduct: this.addProduct,
          clearCart: this.clearCart,
          checkout: this.checkout,
          signup: this.signup,
          logout: this.logout,
        }}
      >
        <Router>
          {/* Skip to main content link for accessibility */}
          <a href="#main-content" className="skip-to-main">
            Skip to main content
          </a>
          <NavigationWrapper setNavigate={this.setNavigate}>
            <main id="main-content" role="main">
              <Suspense 
                fallback={
                  <div className="route-loading">
                    <LoadingSpinner size="large" text="Loading page..." />
                  </div>
                }
              >
                <Routes>
                  <Route path="/" element={<FrontPage />} />
                  <Route path="/login" element={<Login />} />
                  <Route path="/cart" element={<Cart />} />
                  <Route path="/add-product" element={<AddProduct />} />
                  <Route path="/products" element={<FrontPage />} />
                  <Route path="/labels/:maj/*" element={<ProductLabel />} />
                  <Route path="/labels/:maj/:min/*" element={<ProductType />} />
                  <Route path="/labels/:maj/:min/:type" element={<ProductList />} />
                  <Route path="/deal/:maj" element={<ProductDeal />} />
                  <Route path="/smart-bag" element={<SmartBag />} />
                  <Route path="/smartbag/:maj" element={<SmartBagProducts />} />
                  <Route path="/order-history" element={<OrderHistory />} />
                  <Route path="/orderHis/:key" element={<OrderTable />} />
                  <Route path="/signup" element={<SignUp />} />
                </Routes>
              </Suspense>
            </main>
          </NavigationWrapper>
        </Router>
      </Context.Provider>
    );
  }
}
