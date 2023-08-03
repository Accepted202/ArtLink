import InfoDetail from "./commponents/Info/InfoDetail";

interface Data {
  [key: string]: string | number; // 키-값 데이터 타입은 이렇게만 설정해두면 됨
}

function ComponentTest() {
  const userData: Data = {
    realName: "김OO",
    nickName: "abcd",
    phoneNumber: "010-0000-0000",
  };

  // const [userData, setUserData] = useState<UserInfoRes | null>(null);
  // const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
  //   const { name, value } = event.target;
  //   setUserData((prevData) => ({ ...prevData, [name]: value }));
  // };
  return (
    <>
      <h1>ComponentTest</h1>
      {/* <InfoDetail data={userData} /> */}
    </>
  );
}
export default ComponentTest;
