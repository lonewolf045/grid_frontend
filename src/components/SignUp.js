import React, { Component } from "react";
import { Navigate } from "react-router-dom";
import withContext from "../withContext";
import HowToUse from "./HowToUse";
import Layout from "./layout/Layout";
import { Card, Input, Button } from "./ui";
import "./Auth.css";

class SignUp extends Component {
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

  signup = async (e) => {
    e.preventDefault();

    const { username, password } = this.state;
    if (!username || !password) {
      return this.setState({ error: "Fill all fields!" });
    }

    this.setState({ isLoading: true, error: "" });

    try {
      const signedUp = await this.props.context.signup(username, password);
      if (!signedUp) {
        this.setState({ error: "Sign up failed. Please try again." });
      }
    } catch (error) {
      this.setState({ error: "Sign up failed. Please try again." });
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
                <Card.Title level={2}>Sign Up</Card.Title>
                <Card.Description>
                  Create a new account to start shopping
                </Card.Description>
              </Card.Header>
              
              <Card.Body>
                <form onSubmit={this.signup} className="auth-form">
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
                      placeholder="Create a password"
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
                      {isLoading ? 'Creating Account...' : 'Create Account'}
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
      <Navigate to="/login" replace />
    );
  }
}

export default withContext(SignUp);