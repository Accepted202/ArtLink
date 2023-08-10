import Styles from "./Team.module.css";

interface MarginTopInputProps {
  pk: number;
}
interface MemberInfo {
  [key: number]: {
    name: string;
    role: string;
    comment: string;
  };
}
const memberInfo: MemberInfo = {
  1: {
    name: "김수현",
    role: "<장고, 스프링 서버 개발 / Docker 관리>",
    comment: "납작 복숭아 아이스티 킬러",
  },
  2: {
    name: "김진현",
    role: "<스프링 서버 개발>",
    comment: "*축* 삼성전자 MX 사업부 취뽀 *축*",
  },
  3: {
    name: "박건희 / Team Leader",
    role: "<임베디드 Iot 개발>",
    comment: "다음번에도 꼭 팀장을 하겠습니다",
  },
  4: {
    name: "배정원",
    role: "<웹 프론트 및 키오스트 개발>",
    comment: "프론트 개쉽누 ㅋ",
  },
  5: {
    name: "조재웅",
    role: "<기획 총괄 및 임베디드 Iot 개발>",
    comment: "역삼 is my Home",
  },
  6: {
    name: "조준하",
    role: "<웹 프론트 개발>",
    comment: "반갑습니다",
  },
};

const TeamMember: React.FC<MarginTopInputProps> = ({ pk }) => {
  return (
    <>
      <img
        src={`src/assets/team/member${pk}.png`}
        alt=""
        className={Styles.teamImg}
      />
      <div className={Styles.infoName}>{memberInfo[pk].name}</div>
      <div className={Styles.infoRole}>{memberInfo[pk].role}</div>
      <div className={Styles.infoComment}>{memberInfo[pk].comment}</div>
    </>
  );
};

export default TeamMember;
