import mongoose from "mongoose";

const OverallStatSchema = new mongoose.Schema(
  {
    totalCustomers: Number,
    yearlySalesTotal: Number,
    yearlyTotalSoldUnits: Number,
    year: Number,
    monthlyData: [
      {
        month: String,
        totalSales: Number,
        totalUnits: Number,
      },
    ],
    dailyData: [
      {
        date: String,
        totalSales: Number,
        totalUnits: Number,
      },
    ],
    salesByCategory: {
      type: Map, //key will be the string like "shoes"
      of: Number, // value will be number
    },
  },
  {
    timestamps: true,
  }
);

const OverallStat = mongoose.model("OverallStat", OverallStatSchema);

export default OverallStat;
