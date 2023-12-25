import mongoose from "mongoose";

const ProductStatSchema = new mongoose.Schema({
  productId: String,
  yearlySalesTotal: Number,
  yearlyTotalSoldUnits: Number,
  Year: Number,
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
});

const ProductStat = mongoose.model("ProductStat", ProductStatSchema);
export default ProductStat;
