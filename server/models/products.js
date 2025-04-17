const data = require("../data/products.json");
const { CustomError, statusCodes } = require("./errors");
const { connect } = require("./supabase");

const TABLE_NAME = "products";

const isAdmin = true;

async function getAll() {
  const list = await connect().from(TABLE_NAME).select("*");
  if (list.error) {
    throw error;
  }

  return {
    items: list.data,
    total: list.count,
  };
}

async function get(id) {
  const { data: item, error } = await connect()
    .from(TABLE_NAME)
    .select("*")
    .eq("id", id);

  if (!item) {
    throw new CustomError("Item not found", statusCodes.NOT_FOUND);
  }
  if (error) {
    throw error;
  }
  return item;
}

async function search(query) {
  const { data: items, error } = await connect()
    .from(TABLE_NAME)
    .select("*")
    .or("title.ilike.%${query}%,description.ilike.%${query}%");

  if (error) {
    throw error;
  }
  return items;
}

async function create(item) {
  if (!isAdmin) {
    throw new CustomError(
      "Sorry, you are not authorized to create a new item.",
      statusCodes.UNAUTHORIZED
    );
  }
  const { data: newItem, error } = await connect()
    .from(TABLE_NAME)
    .insert(item);
  if (error) {
    throw error;
  }
  return newItem;
}

async function update(id, item) {
  if (!isAdmin) {
    throw new CustomError(
      "Sorry, you are not authorized to update this item.",
      statusCodes.UNAUTHORIZED
    );
  }
  const { data: updatedItem, error } = await connect()
    .from(TABLE_NAME)
    .update(item)
    .eq("id", id);
  if (error) {
    throw error;
  }
  return updatedItem;
}

async function remove(id) {
  if (!isAdmin) {
    throw new CustomError(
      "Sorry, you are not authorized to delete this item.",
      statusCodes.UNAUTHORIZED
    );
  }
  const { data: deletedItem, error } = await connect()
    .from(TABLE_NAME)
    .delete()
    .eq("id", id);
  if (error) {
    throw error;
  }
  return deletedItem;
}

async function seed() {
  for (const x of data.items) {
    const newItem = {
      ...x,
      shipping_information: x.shippingInformation,
      shippingInformation: undefined,
      availability_status: x.availabilityStatus,
      availabilityStatus: undefined,
      product_category: x.productCategory,
      productCategory: undefined,
    };
    const { data, error } = await connect().from(TABLE_NAME).insert(x);
    if (error) {
      throw error;
    }
  }

  if (error) {
    throw error;
  }
  return data;
}

module.exports = {
  getAll,
  get,
  create,
  update,
  remove,
  search,
  seed,
};
