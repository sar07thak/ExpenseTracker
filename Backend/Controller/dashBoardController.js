const Income = require("../models/incomeModel");
const Expense = require("../models/expenseModel");
const { Types, isValidObjectId } = require("mongoose");


const getDashBoardData = async ( req , res ) => {
    try{
        const userId = req.user.id;
        const userObjectID = new Types.ObjectId(String(userId));

        // fetch total income and expense

        const totalIncome = await Income.aggregate([
            { $match : { userId : userObjectID } },
            { $group : { _id : null , total : { $sum : "$amount" } } },
        ]);

        console.log("totalIncome" , { totalIncome , userId : isValidObjectId(userId)});

        const totalExpense = await Expense.aggregate([
            { $match : { userId : userObjectID } },
            { $group : { _id : null , total : { $sum : "$amount" } } },
        ]);

        // get income transcation in last 60 days
        const last60DaysIncomeTransactions = await Income.find({
            userId ,
            date : { $gte : new Date(Date.now() - 60*24*60*60*1000)}
        }).sort({ data : -1 })

        // get total income for 60 days
        const incomeLast60Days = last60DaysIncomeTransactions.reduce( ( sum , transaction ) => sum + transaction.amount , 0 );

        // get expense transaction in the last 30 days
        const last30DaysExpenseTransactions = await Income.find({
            userId ,
            date : { $gte : new Date(Date.now() - 30*24*60*60*1000)}
        }).sort({ data : -1 })

        // get total expense for last 30 days 
        const expenseLast30Days = last30DaysExpenseTransactions.reduce( ( sum , transaction ) => sum + transaction.amount , 0 );

        // fetch last 5 transactions ( income + expense ) 
        const lastTransactions = [
            ...(await Income.find({ userId }).sort({ date : -1 }).limit(5)).map(
                (txn) => ({
                    ...txn.toObject(),
                    type : "income",
                })
            ),
            ...((await Expense.find({userId}).sort({date : -1 }).limit(5)).map(
                (txn) => ({
                    ...txn.toObject(),
                    type : "expense",
                })
            ))
        ].sort((a,b) => b.date - a.date); // soer the latest first 


        res.json({
            totalBalance : ( totalIncome[0]?.total || 0 ) - ( totalExpense[0].total || 0 ) ,
            totalIncome : totalIncome[0]?.total || 0 ,
            totalExpenses : totalExpense[0]?.total || 0 , 
            last30DaysExpenses : {
                total : expenseLast30Days , 
                transaction : last30DaysExpenseTransactions ,
            } ,
            last30DaysIncome : {
                total : incomeLast60Days , 
                transaction : last30DaysExpenseTransactions ,
            },
            recentTransactions : lastTransactions
        })

    }catch(err){
        return res.status(500).json({ message: "Internal server error" });
    }
}

module.exports = { 
    getDashBoardData
}