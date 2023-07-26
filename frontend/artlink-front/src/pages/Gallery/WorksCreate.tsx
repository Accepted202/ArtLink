// import React from 'react';
import ProfileBox from "../../commponents/Base/ProfileBox";
import ArtworkInputInfoTable from "../../commponents/InfoTable/ArtworkInputInfoTable.tsx";
import "./Detail.css";

function WorksCreate() {
  return (
    <div className="detail-container">
      <ProfileBox></ProfileBox>
      <ArtworkInputInfoTable></ArtworkInputInfoTable>
    </div>
  );
}
export default WorksCreate;
