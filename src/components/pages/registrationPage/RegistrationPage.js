import { Helmet } from "react-helmet";

import RegistrationForm from "../../registrationForm/RegistrationForm";

const RegistrationPage = () => {
  return (
    <>
      <Helmet>
        <meta
          name="description"
          content="AstroNews information portal"
        />
        <title>Movies: registration</title>
      </Helmet>
      <RegistrationForm/>
    </>
  )
}

export default RegistrationPage;