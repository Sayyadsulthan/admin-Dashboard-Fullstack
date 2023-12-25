import User from "../models/User.js";
import OverallStat from "../models/OverllStat.js";
import Transaction from "../models/Transaction.js";

export const getUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id).select("-password");

    res.status(200).json(user);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

export const getDashboardStats = async (req, res) => {
  try {
    // harcoded values
    const currentMonth = "November";
    const currentYear = 2021;
    const currentDay = "2021-11-13";

    /*Recent Transactions 50 */
    const transactions = await Transaction.find()
      .limit(50)
      .sort({ createdOn: -1 });

    /*Overall Stat from which has current year*/
    const overallStats = await OverallStat.find({ year: currentYear });

    /* Grabbing the data from overallStats[0] */
    const {
      totalCustomers,
      yearlyTotalSoldunits,
      yearlySalesTotal,
      monthlyData,
      salesByCategory,
    } = overallStats[0];

    // getting the stats[] of current month
    const thisMonthStats = overallStats[0].monthlyData.find(
      ({ month }) => month === currentMonth
    );
    // getting the stats[] of current day
    const todayStats = overallStats[0].dailyData.find(
      ({ date }) => date === currentDay
    );

    res.status(200).json({
      totalCustomers,
      yearlyTotalSoldunits,
      yearlySalesTotal,
      monthlyData,
      salesByCategory,
      thisMonthStats,
      todayStats,
      transactions,
    });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
