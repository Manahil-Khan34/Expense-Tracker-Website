const xlsx = require('xlsx');

const User = require('../models/User.js');

const Income = require('../models/Income.js');

// Add Income Source
exports.addIncome = async (req, res) => {

    const userId = req.user._id;

    try {
        const { icon, source, amount, date } = req.body;

        // Validation: Check for missing fields
        if (!source || !amount || !date) {
            return res.status(400).json({ message: 'Please fill all fields' });
        }

        // Create new income source
        const newIncome = await Income.create({
            userId,
            icon,
            source,
            amount,
            date: new Date(date),
        });
     await newIncome.save(); 
     res.status(200).json(newIncome);
    }
    catch (error) {
        res.status(500).json({message:"server Erro  r"});
    }
}

// Add All Income Source
exports.getAllIncomes = async (req, res) => {

    const userId = req.user._id;

    try {
        const incomes = await Income.find({ userId }).sort({ date: -1 });
        res.status(200).json(incomes);
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }

}

// delete Income Source
exports.deleteIncome = async (req, res) => {
      
    const userId = req.user._id;
    

    try {
        await Income.findOneAndDelete(req.params.id );
        
        res.json({ message: 'Income source deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
};

// Download Income Source in Excel Format
exports.downloadIncomeExcel = async (req, res) => {

    const userId = req.user.id;
try{
    const income = await Income.find({ userId }).sort({ date: -1 });

    // prepare data for excel
    const data = income.map((item) => ({
        Source: item.source,
        Amount: item.amount,
        Date: item.date,
    }));

    const wb = xlsx.utils.book_new();
    const ws = xlsx.utils.json_to_sheet(data);
    xlsx.utils.book_append_sheet(wb, ws, 'Income');
    xlsx.writeFile(wb, 'income_details.xlsx');
    res.download('income_details.xlsx')
}
catch (error) {
    res.status(500).json({ message: 'Server Error' });

}
};



