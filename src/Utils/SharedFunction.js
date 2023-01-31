export function checkCountFirstTimeValue(id, list) {
  var value = 0;
  if (list.length > 0) {
    var index = list.findIndex((x) => x.id === id);
    if (index !== -1) {
      value = list[index].count;
    } else {
      value = 0;
    }
  }
  return value;
}

export function updateItem(id, itemAttributes, list) {
  var data = [];
  var index = list.findIndex((x) => x.id === id);
  if (index === -1) {
    // handle error
    data = [...list, {id: id, count: itemAttributes.count}];
  } else {
    data = [
      ...list.slice(0, index),
      Object.assign({}, list[index], itemAttributes),
      ...list.slice(index + 1),
    ];
  }
  return data;
}

export function updateServiceData(list, id) {
  var data = [];
  var index = list.findIndex((x) => x.id === id);
  if (index === -1) {
    // handle error
  } else {
    data = [
      ...list.slice(0, index),
      Object.assign({}, list[index], {checked: !list[index].checked}),
      ...list.slice(index + 1),
    ];
  }
  return data;
}
