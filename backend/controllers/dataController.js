const dataModel = require("../models/dataModel");

exports.getItems = async (req, res) => {
     try {
    const data = await dataModel.find();
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch questions' });
  }
};