import SignUp from "../../commponents/Entrance/Form/SignUpForm";
import MainLogo from "../../commponents/Base/MainLogo";
import MarginTop100 from "../../commponents/EditCss/MarginTop100";
import MarginTopInput from "../../commponents/EditCss/MaginTopInput";

function Signup() {
  return (
    <>
      <MarginTop100 />
      <MainLogo />
      <SignUp />
      <MarginTopInput value={150}/>
    </>
  );
}
export default Signup;
