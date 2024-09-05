import { TBike } from "./bike.interface";
import { Bike } from "./bike.model";

const createBikeIntoDB = async (bikeData: TBike) => {
  const result = await Bike.create(bikeData);
  return result;
};

const getAllBikesFromDB = async () => {
  const result = await Bike.find();
  return result;
};

const updateBikeIntoDB = async (
  id: string,
  updatedBikeData: Partial<TBike>
) => {
  const result = await Bike.findByIdAndUpdate(id, updatedBikeData, {
    new: true,
    runValidators: true,
  });
  return result;
};

const deleteBikeIntoDB = async (id: string) => {
  const result = await Bike.findByIdAndDelete(id);
  return result;
};

export const BikeServices = {
  createBikeIntoDB,
  getAllBikesFromDB,
  updateBikeIntoDB,
  deleteBikeIntoDB,
};
