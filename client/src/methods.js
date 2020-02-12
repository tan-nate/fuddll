export function uniqueObjectIds(array) {
  const objectIds = array.map(object => object.id);
  return array.filter((object, index) => {
    const firstIndex = objectIds.indexOf(object.id);
    return firstIndex === index;
  });
}