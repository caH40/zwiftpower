function TdBoolean({ value }) {
  const valueStr = value ? 'Да' : 'Нет';
  return <td>{valueStr}</td>;
}

export default TdBoolean;
