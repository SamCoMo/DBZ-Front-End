import React, { ChangeEvent, useState } from 'react';

const ImageUpload: React.FC = () => {
  // 이미지 파일 상태 관리
  const [selectedImage, setSelectedImage] = useState<string | ArrayBuffer | null>(null);

  // 파일 선택 이벤트 핸들러
  const handleImageChange = (event: ChangeEvent<HTMLInputElement>) => {
    // 사용자가 선택한 파일
    const file = event.target.files?.[0];

    if (file) {
      // 파일을 이미지 URL로 변환하여 상태에 설정
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div>
      {/* 이미지 업로드 인터페이스 */}
      <input
        type="file"
        accept="image/*" // 이미지 파일만 선택 가능하도록 설정
        onChange={handleImageChange}
      />

      {/* 선택된 이미지 미리보기 */}
      {selectedImage && (
        <img src={selectedImage as string} alt="Selected" style={{ maxWidth: '100%', maxHeight: '200px' }} />
      )}
    </div>
  );
};

export default ImageUpload;
