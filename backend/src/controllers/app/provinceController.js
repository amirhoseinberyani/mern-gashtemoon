const Province = require("../../models/Province");
const County = require("../../models/County");

exports.getProvinces = function (req, res, next) {
  let { id, SearchQuery } = req.query;
  var conditions = {};

  if (
    !(
      id == undefined ||
      id == "undefined" ||
      id == null ||
      id == "" ||
      id == "null"
    )
  ) {
    conditions._id = id;
  }
  if (
    !(
      SearchQuery == undefined ||
      SearchQuery == "undefined" ||
      SearchQuery == "" ||
      SearchQuery == null
    )
  ) {
    conditions.name_en = { $regex: ".*" + SearchQuery + ".*" };
  }
  try {
    Province.find()
      .where(conditions)
      .exec((err, doc) => {
        if (err) {
          return res.status(500).json({ message: "email server Error", err });
        }
        return res.status(200).json({ message: "seccess", lists: doc });
      });
  } catch (e) {
    return res.status(500).json({ message: "server Error" });
  }
};

exports.getManagedCities = async function (req, res, next) {
  try {
    // Fetch all provinces
    const provinces = await Province.find().exec();

    // For each province, find corresponding cities
    const provincesWithCities = await Promise.all(provinces.map(async (province) => {
      const cities = await County.find({ provinceId: province._id }).exec(); // Get cities for the province
      return {
        ...province.toObject(), // Convert Mongoose document to plain object
        cities,                // Add cities to the province object
      };
    }));

    res.status(200).json({ lists: provincesWithCities }); // Send the modified provinces with cities as response
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' }); // Handle errors
  }
};

exports.getCounties = function (req, res, next) {
  var conditions = {};
  let { ProvinceId, id } = req.query;

  if (
    !(
      ProvinceId == undefined ||
      ProvinceId == "undefined" ||
      ProvinceId == null ||
      ProvinceId == "" ||
      ProvinceId == "null"
    )
  ) {
    conditions.provinceId = ProvinceId;
  }

  if (
    !(
      id == undefined ||
      id == "undefined" ||
      id == null ||
      id == "" ||
      id == "null"
    )
  ) {
    conditions._id = id;
  }

  try {
    County.find()
      .where(conditions)
      .exec((err, doc) => {
        if (err) {
          return res.status(500).json({ message: "email server Error", err });
        }
        return res.status(200).json({ message: "success", lists: doc });
      });
  } catch (e) {
    return res.status(500).json({ message: "server Error" });
  }
};
