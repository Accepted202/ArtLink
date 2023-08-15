import ContactInfo from "../../commponents/Contact/ContactInfo";
import Team from "../../commponents/Contact/Team";
import Styles from "./Contact.module.css";

// import React from 'react';
function Contact() {
  return (
    <>
      <hr />
      <div className={Styles.container}>
        <Team />
        <ContactInfo />
      </div>
      <hr />
    </>
  );
}
export default Contact;
