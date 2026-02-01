import React, { Component } from "react";
import { Navigate } from "react-router-dom";
import withContext from "../withContext";
import HowToUse from "./HowToUse";
import Layout from "./layout/Layout";
import { Card, Input, Button } from "./ui";
import "./Auth.css";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      isLoading: false,
      error: ""
    };
  }

  handleChange = e => this.setState({ [e.target.name]: e.target.value, error: "" });

  login = async (e) => {
    e.preventDefault();

    const { username, password } = this.state;
    if (!username || !password) {
      return this.setState({ error: "Fill all fields!" });
    }

    this.setState({ isLoading: true, error: "" });

    try {
      const loggedIn = await this.props.context.login(username, password);
      if (!loggedIn) {
        this.setState({ error: "Invalid Credentials" });
      }
    } catch (error) {
      this.setState({ error: "Login failed. Please try again." });
    } finally {
      this.setState({ isLoading: false });
    }
  };

  render() {
    const { isLoading } = this.state;

    return !this.props.context.user ? (
      <Layout>
        <div className="auth-page">
          <div className="auth-container">
            <Card className="auth-card" padding="large">
              <Card.Header>
                <Card.Title level={2}>Login</Card.Title>
                <Card.Description>
                  Sign in to your account to continue shopping
                </Card.Description>
              </Card.Header>
              
              <Card.Body>
                <form onSubmit={this.login} className="auth-form">
                  <div className="form-group">
                    <Input
                      label="Email"
                      type="email"
                      name="username"
                      value={this.state.username}
                      onChange={this.handleChange}
                      placeholder="Enter your email"
                      required
                      fullWidth
                      disabled={isLoading}
                    />
                  </div>
                  
                  <div className="form-group">
                    <Input
                      label="Password"
                      type="password"
                      name="password"
                      value={this.state.password}
                      onChange={this.handleChange}
                      placeholder="Enter your password"
                      required
                      fullWidth
                      disabled={isLoading}
                    />
                  </div>
                  
                  {this.state.error && (
                    <div className="error-message">
                      {this.state.error}
                    </div>
                  )}
                  
                  <div className="form-actions">
                    <Button
                      type="submit"
                      variant="primary"
                      size="large"
                      fullWidth
                      loading={isLoading}
                      disabled={isLoading}
                    >
                      {isLoading ? 'Signing In...' : 'Sign In'}
                    </Button>
                  </div>
                </form>
              </Card.Body>
            </Card>
            
            <HowToUse />
          </div>
        </div>
      </Layout>
    ) : (
      <Navigate to="/products" replace />
    );
  }
}

export default withContext(Login);