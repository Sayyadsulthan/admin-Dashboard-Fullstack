import Product from "../models/Product.js";
import ProductStat from "../models/ProductStat.js";
import Transaction from "../models/Transaction.js";
import getCountryIso3 from "country-iso-2-to-3";

import User from "../models/User.js";

export const getProducts = async (req, res) => {
  try {
    // Fetching ALL THE PRODUCTS FROM DB
    const products = await Product.find();

    // MAKING A PROMISE TO RETURN AN ARRAY WHICH HAS ALL THE PRODUCTS WITH STATS
    const productsWithStats = await Promise.all(
      products.map(async (product) => {
        const stat = await ProductStat.find({
          productId: product._id,
        });

        return {
          ...product._doc,
          stat,
        };
      })
    );

    return res.status(200).json(productsWithStats);
  } catch (err) {
    res.status(404).json({
      message: err.message,
    });
  }
};

export const getCustomers = async (req, res) => {
  try {
    const customers = await User.find({ role: "user" }).select("-password");
    res.status(200).json(customers);
  } catch (error) {
    res.status(404).json({
      message: error.message,
    });
  }
};

export const getTransactions = async (req, res) => {
  try {
    // sort should look like this: {"field": "userId", "sort":"desc"}
    const { page = 1, pageSize = 20, sort = null, search = "" } = req.query;

    // formatted sort should look like { userId : -1 }
    const gerenateSort = () => {
      const sortParsed = JSON.parse(sort);
      const sortFormatted = {
        [sortParsed.field]: (sortParsed.sort = "asc" ? 1 : -1),
      };

      return sortFormatted;
    };
    // if the sort is given then gerenateSort() called else empty object
    const sortFormatted = Boolean(sort) ? gerenateSort() : {};

    //finding the transactions based on some conditions
    const transactions = await Transaction.find({
      $or: [
        { cost: { $regex: new RegExp(search, "i") } },
        { userId: { $regex: new RegExp(search, "i") } },
      ],
    })
      .sort(sortFormatted)
      .skip(page * pageSize)
      .limit(pageSize);

    const total = await Transaction.countDocuments({
      //     name: { $regex: search, $options: "i" },
    });

    res.status(200).json({ transactions, total });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const getGeography = async (req, res) => {
  try {
    const users = await User.find();
    // This has Array returns objects Like [{"IND":35},{"USA":23}]
    const mappedLocations = users.reduce((acc, { country }) => {
      // we have 2Iso country letter now need to convert to 3 in users
      const countryISO3 = getCountryIso3(country);
      // if the country already dosen't exist as key property then set the value to 0
      if (!acc[countryISO3]) {
        acc[countryISO3] = 0;
      }

      acc[countryISO3]++;
      return acc;
    }, {});

    // getting the [{id:"IND", value:35},{id:"USA", value:23}] format to send for geography
    const fomattedLocations = Object.entries(mappedLocations).map(
      ([country, count]) => {
        return { id: country, value: count };
      }
    );

    //sending to response
    return res.status(200).json(fomattedLocations);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
