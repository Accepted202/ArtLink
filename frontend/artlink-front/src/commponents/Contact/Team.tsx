import Styles from "./Team.module.css";
import TeamMember from "./TeamMember";

function Team() {
  const teamMembers = Array.from({ length: 6 }, (_, index) => (
    <div key={index + 1} className={Styles.teamMember}>
      <TeamMember pk={index + 1} />
    </div>
  ));

  return (
    <>
      <div className={Styles.title1}>PROJECT Team</div>
      <div className={Styles.title2}>202 Accepted</div>
      <div className={Styles.teamInfo}>{teamMembers}</div>
    </>
  );
}

export default Team;
