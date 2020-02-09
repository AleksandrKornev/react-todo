export function recordStorage(name, data) {
  try {
    data = JSON.stringify(data);
  } catch(e) {
    throw new Error(e);
  }
  
  localStorage.setItem(name, data);
  return true;
}


export function readStorage(name) {
  let data = localStorage.getItem(name);
  try {
    data = JSON.parse(data);
  } catch(e) {
    throw new Error(e);
  }

  return data;
}