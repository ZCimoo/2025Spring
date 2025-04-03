const data = require("../data/products.json");
const { CustomError, statusCodes } = require("./errors");
async function getAll() {
  return data;
}

async function get(id) {
  const item = data.items.find((item) => item.id == id);
  if (!item) {
    throw new CustomError("Item not found", statusCodes.NOT_FOUND);
  }
  return item;
}

async function create(item) {
  if (!isAdmin) {
    throw new CustomError(
      "Sorry, you are not authorized to create a new item.",
      statusCodes.UNAUTHORIZED
    );
  }
  const newItem = {
    id: data.items.length + 1,
    ...item,
  };
  data.items.push(newItem);
  return newItem;
}

async function update(id, item) {
  const index = data.items.findIndex((item) => item.id == id);
  if (index === -1) return null;
  const updatedItem = {
    ...data[index], //takes every property of the object and copies all properties from original object and adds new properties
    ...item,
  };
  data[index] = updatedItem; //stores new item at that location
  return updatedItem;
}

async function remove(id) {
  const index = data.items.findIndex((item) => item.id == id);
  if (index === -1) return null;
  const deletedItem = data[index];
  data.items.splice(index, 1); //removes the item from the array
  return deletedItem;
}

module.exports = {
  getAll,
  get,
  create,
  update,
  remove,
};
