import React from "react";
import HeaderTitle from "@/components/common/HeaderTitle";
import Input from "@/components/common/Input";
import DaumPostcode from "react-daum-postcode";

const AddressSearch = () => {
  const handleComplete = (data) => {
    console.log(data);
  };

  return (
    <div>
      <DaumPostcode onComplete={handleComplete} />
    </div>
  );
};

const CreateReportPage = () => {
  return (
    <div>
      <HeaderTitle title="게시글 작성" />
      <div>사진</div>
      <div>
        <p>제목</p>
        <Input type="text" placeholder="제목을 입력해주세요" />
      </div>
      <div>
        <p>종</p>
        <Input type="select" placeholder="종을 선택해주세요" />
      </div>
      <div>
        <p>실종 위치</p>
        <AddressSearch />
        <p></p>
      </div>
    </div>
  );
};

export default CreateReportPage;
