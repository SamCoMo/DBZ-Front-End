import React from "react";
import Select from "..";

interface SelectSpeciesProps {
  reportSelectedSpecies: string;
  handleSelected: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}

const SelectSpecies = ({
  reportSelectedSpecies,
  handleSelected,
}: SelectSpeciesProps) => (
  <Select
    options={[
      { value: "", label: "종을 선택해주세요." },
      { value: "DOG", label: "강아지" },
      { value: "CAT", label: "고양이" },
      { value: "ETC", label: "그 외" },
    ]}
    value={reportSelectedSpecies}
    handleChangeSelect={handleSelected}
  />
);

export default SelectSpecies;
