import React from "react";
import BasicInfoForm from "@/forms/BasicInfoForm";

function BasicInformation({ next, setIsFree, currentItem, isEdit, isDraft }) {
  return (
    <div className="mt-5">
      <BasicInfoForm
        setIsFree={setIsFree}
        next={next}
        defaultItem={currentItem}
        isEdit={isEdit}
        isDraft={isDraft}
      />
    </div>
  );
}

export default BasicInformation;
