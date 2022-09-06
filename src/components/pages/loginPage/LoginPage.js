import { Helmet } from "react-helmet";

import LoginForm from "../../loginForm/LoginForm";

const LoginPage = () => {
  return (
    <>
      <Helmet>
        <meta
          name="description"
          content="AstroNews information portal"
        />
        <title>Movies: login</title>
      </Helmet>
      <LoginForm/>
    </>
  )
}

export default LoginPage;