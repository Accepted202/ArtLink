// import React from 'react';
import ProfileBox from "../../commponents/Base/ProfileBox";
import InputInfoTable from "../../commponents/InfoTable/InputInfoTable.tsx";
import styles from "./WorksCreate.module.css";

function WorksCreate() {
  return (
    <div className={styles.container}>
      <ProfileBox></ProfileBox>
      <InputInfoTable></InputInfoTable>
    </div>
  );
}
export default WorksCreate;
