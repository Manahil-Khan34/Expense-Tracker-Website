const Income = require('../models/Income.js');
const Expance = require('../models/Expance.js');

const {isValidObjectId , Types} = require('mongoose');

//Dashboard data
exports.getDashboardData = async (req, res) => {
    const userId = req.user.id;
    try {
        // Validate userId
        
        const userObjectId = new Types.ObjectId(userId);
        

        //fetching all expances and income
        const totalIncome = await Income.aggregate([
            { $match: { userId: userObjectId } },
            { $group: { _id: null, total: { $sum: '$amount' } } }, 
        ]);
        console.log("totalIncome" , {totalIncome, userId: isValidObjectId(userId)});

      const totalExpance = await Expance.aggregate([
            { $match: { userId: userObjectId } },
            { $group: { _id: null, total: { $sum: '$amount' } } },
      ]);

      //Get  income Transection on last 60 days
      const last60DaysIncomeTransection = await Income.find({
        userId,
        date:{$gte: new Date(Date.now() - 60 * 24 * 60 * 60 * 1000) },
      }).sort({ date: -1 });

      //Get total income for last 60 days
        const incomeLast60Days = last60DaysIncomeTransection. reduce(
            (sum,transection) => sum + transection.amount, 0
        );

        //Get expance Transection on last 30 days
        const last30DaysExpanceTransection = await Expance.find({
            userId,
            date:{$gte: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000) },
        }).sort({ date: -1 });


        //get total expance for last 30 days
        const expanceLast30Days = last30DaysExpanceTransection.reduce(
            (sum, transection) => sum + transection.amount, 0
        );


        //Fetch last 5 transection (income + expance)
        const lastTransection = [
            ...(await Income.find({ userId }).sort({ date: -1 }).limit(5)).map((txn) => ({
                ...txn.toObject(),
                type: 'income',
            })
        ),
        ...(await Expance.find({ userId }).sort({ date: -1 }).limit(5)).map(
            (txn) => ({
            ...txn.toObject(),
            type: 'expance',
        })
    ),
        ] .sort((a, b) => b.date - a.date)  //sort latest first 

        //final response
        res.json ({
            totalBalance :
            (totalIncome[0]?.total || 0) - (totalExpance[0]?.total || 0),
            totalIncome: totalIncome[0]?.total || 0,
            totalExpance: totalExpance[0]?.total || 0,
            last30DaysExpance:{
                total: expanceLast30Days,
                transection: last30DaysExpanceTransection,
            },
            last60DaysIncome:{
                total: incomeLast60Days,
                transection: last60DaysIncomeTransection,
            },
            recentTransection: lastTransection,
        });
    } catch (error) { 
        
        res.status(500).json({ message: 'Server error', detail: error.message });
        
        
        }
};

