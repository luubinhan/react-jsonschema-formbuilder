const onlyText = (value) => {
  if (!value) {
    return 'Can\'t empty';
  }
  if (!/^[a-z\d\-_\s]+$/i.test(value)) {
    return 'Can\'t included special character';
  }
  return false;
};

export default onlyText;
