const { Buildings, BuildingInputs } = require("../models");

const example = {
  buildingId: 62,
  title: "testNew",
  power: 100,
  BuildingInputs: [
    {
      direction: "input",
      amount: 20,
      type: "pipe",
    },
  ],
};

exports.getBuildings = async (req, res, next) => {
  try {
    const buildings = await Buildings.findAll({
      include: { all: true },
      order: [["updatedAt", "DESC"]],
    });
    res.status(200).json({ data: buildings });
  } catch (error) {
    console.log("error", error);
    res.status(500).json({ error: error });
  }
};

exports.newBuilding = async (req, res, next) => {
  try {
    const result = await Buildings.create(req.body, {
      include: [
        {
          association: Buildings.BuildingInputs,
        },
      ],
    });
    res.status(201).json({ data: result });
  } catch (error) {
    res.status(400).json({ error });
  }
};

exports.editBuilding = async (req, res, next) => {
  try {
    const newBuilding = req.body;
    const id = newBuilding.buildingId;
    const success = await BuildingInputs.destroy({
      where: {
        building: id,
      },
    });
    console.log("success", success);
    const result = await Buildings.update(req.body, {
      where: { buildingId: id },
    });
    const buildingInputs = newBuilding.BuildingInputs.map(input => ({
      ...input,
      building: id,
    }));
    await BuildingInputs.bulkCreate(buildingInputs);
    res.json(result);
  } catch (error) {
    console.log(error);
    res.status(400).json(error);
  }
};

exports.deleteBuilding = async (req, res, next) => {
  try {
    const { buildingId } = req.body;
    const result = await Buildings.destroy({
      where: {
        buildingId,
      },
    });
    console.log("result", result);
    if (result === 1) return res.status(200).json({ success: true });
    res.status(404).json({ success: false });
  } catch (error) {
    res.status(400).json({ error });
  }
};
