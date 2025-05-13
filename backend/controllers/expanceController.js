const xlsx = require('xlsx');

const User = require('../models/User.js');

// controllers/expanceController.js
const Expance = require('../models/Expance.js');

exports.addExpance = async (req, res) => {
  const userId = req.user.id;
  try {
    const { icon, category, amount, date } = req.body;

    // Validation: all fields required
    if (!category || !amount || !date) {
      return res.status(400).json({ message: 'Please fill all fields' });
    }

    // Create and save in one step
    const newExpance = new Expance({
      userId,
      icon,
      category,
      amount,
      date: new Date(date),
    });

    await newExpance.save();  // Save the new expance to the database

    // Find the user and update their expance list
    res.status(200).json(newExpance);

  }
   catch (error) {
    
    res.status(500).json({ message: 'Server error', detail: error.message });
  }
};


// Add All Expance Source
exports.getAllExpances = async (req, res) => {

    const userId = req.user.id;

    try {
        const expances = await Expance.find({ userId }).sort({ date: -1 });
        res.status(200).json(expances);
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }

}

// delete Expance Source
exports.deleteExpance = async (req, res) => {
      
    const userId = req.user._id;
    
    try {
        await Expance.findOneAndDelete(req.params.id );
        
        res.json({ message: 'Expance source deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
};

// Download Expance Source in Excel Format
exports.downloadExpanceExcel = async (req, res) => {

    const userId = req.user.id;
try{
    const expance = await Expance.find({ userId }).sort({ date: -1 });

    // prepare data for excel
    const data = expance.map((item) => ({
        Category: item.category,
        Amount: item.amount,
        Date: item.date,
    }));

    const wb = xlsx.utils.book_new();
    const ws = xlsx.utils.json_to_sheet(data);
    xlsx.utils.book_append_sheet(wb, ws, 'expance');
    xlsx.writeFile(wb, 'expance_details.xlsx');
    res.download('expance_details.xlsx')
}
catch (error) {
    res.status(500).json({ message: 'Server Error' });

}
};



