import { Helmet } from "react-helmet";
import { NavLink } from "react-router-dom";

import RegistrationForm from "../../registrationForm/RegistrationForm";

import './registrationPage.scss';

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