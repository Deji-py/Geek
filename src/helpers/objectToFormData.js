function objectToFormData(obj, formData = new FormData(), parentKey = "") {
  for (let key in obj) {
    if (obj.hasOwnProperty(key)) {
      const propName = parentKey ? `${parentKey}[${key}]` : key;
      if (typeof obj[key] === "object" && !(obj[key] instanceof File)) {
        objectToFormData(obj[key], formData, propName);
      } else {
        formData.append(propName, obj[key]);
      }
    }
  }
  return formData;
}

export default objectToFormData;
