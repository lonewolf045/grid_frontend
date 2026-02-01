import { Card } from "./ui";

const HowToUse = () => {
  return (
    <Card className="how-to-use-card" padding="large">
      <Card.Header>
        <Card.Title level={3}>How to use it?</Card.Title>
      </Card.Header>
      <Card.Body>
        <ul className="how-to-use-list">
          <li>
            <strong>Login as existing user:</strong>
            <div className="credential-info">
              <div>Username: user_&lt;number&gt;@example.com</div>
              <div>Password: password&lt;number&gt;</div>
              <small>where &lt;number&gt; is in range 0 to 999, all inclusive</small>
            </div>
          </li>
          <li>
            <strong>Sign up as new user:</strong>
            <div>Click on the Sign Up tab and enter your details.</div>
          </li>
        </ul>
      </Card.Body>
    </Card>
  );
};

export default HowToUse;
