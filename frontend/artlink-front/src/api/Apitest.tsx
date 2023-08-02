import React, { useEffect, useState } from "react";
import { fetchSample, Sample } from "./TestApi";
// 해당 컴포넌트는 api통신 테스트입니다. get요청이고 post요청일시 datatosend변수로 매개변수를 전달하면 됩니다.

const Apitest: React.FC = () => {
  const [sampleData, setSampleData] = useState<Sample[]>([]);
  const getData = async () => {
    try {
      const data = await fetchSample();
      console.log(data);
      setSampleData(data);
    } catch (error) {
      console.error("Error fetching sample data:", error);
    }
  };
  useEffect(() => {
    console.log("이펙 트");
    void getData(); // 데이터를 가져오는 함수를 호출합니다.
  }, []);

  return (
    <>
      <h1>Apitest</h1>
      <p>환율정보를 불러오는 API 테스트 (상태 : 성공)</p>
      <p>API 구조를 참고하세요.</p>
      <hr />
      <div>
        {/* 가져온 데이터를 화면에 렌더링 */}
        {sampleData.map((item) => (
          <div key={item.name}>
            <p>Name: {item.name}</p>
            <p>Rate: {item.rate}</p>
            <p>Timestamp: {item.timestamp}</p>
          </div>
        ))}
      </div>
    </>
  );
};
export default Apitest;
