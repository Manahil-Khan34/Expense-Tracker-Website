import React, { useEffect, useState } from 'react'
import { useUserAuth } from '../../hooks/useUserAuth';
import DashboardLayout from '../../components/Layouts/DashboardLayout';
import { API_PATHS } from '../../utils/apiPaths';
import toast from 'react-hot-toast';
import axiosInstance from '../../utils/axiosInstance';
import ExpanceOverview from '../../components/Expance/ExpanceOverview';
import Model from '../../components/Model';
import AddExpanceform from '../../components/Expance/AddExpanceform';
import ExpanceList from '../../components/Expance/ExpanceList';
import DeleteAlert from '../../components/DeleteAlert';

function Expance() {
  useUserAuth(); // Custom hook to check user authentication

  const [openAddExpanceModal, setOpenAddExpanceModal] = useState(false);
  
    const [expanceData, setExpanceData] = useState([]);
  
    const [loading, setLoading] = useState(false);
  
    const [openDeleteAlert, setOpenDeleteAlert] = useState({
      show: false,
      data: null,
    })

     // Get All Expance  Details
  const fetchExpanceDetails = async () => {
    if (loading) return;

    setLoading(true);

    try {
      const response = await axiosInstance.get(
        `${API_PATHS.EXPANCE.GET_ALL_EXPANCE}`
      );
      if (response.data) {
        setExpanceData(response.data);
      }
    }
    catch (error) {
      console.log("Somthing went wrong. please try again.", error)
    }
    finally {
      setLoading(false);
    }
  };

  // Handle Add Expance
  const handleAddExpance = async (expance) => {
    const { category, amount, date, icon } = expance;

    // Validation Checks
    if (!category.trim()) {
      toast.error("category is required.");
      return;
    }

    if (!amount || isNaN(amount) || Number(amount) <= 0) {
      toast.error("Amount should be a valid number greater than 0.");
      return;
    }
    if (!date) {
      toast.error("Date is required.");
      return;
    }

    try {
      await axiosInstance.post(API_PATHS.EXPANCE.ADD_EXPANCE, {
        category,
        amount,
        date,
        icon,
      });
      setOpenAddExpanceModal(false);
      toast.success("Expance added successfully");
      fetchExpanceDetails();
    } catch (error) {
      console.error(
        "Error adding Expance:",
        error.response?.data?.message || error.message
      );
    }
  };

    //handle download Expance details
  const handleDownloadExpanceDetails = async () => {
    try{
      const response =await axiosInstance.get(
      API_PATHS.EXPANCE.DOWNLOAD_EXPANCE,
      {
        responseType:"blob",
      }
      );
      // Create a URL foe the blob
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download" , "expance_details.xlsx");
      document.body.appendChild(link);
      link.click();
      link.parentNode.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Error downloaing expance details:", error);
      toast.error("Failed to download expense details.please try again");

    }
   };

    //Delete Expance
const deleteExpance = async (id) => {
  try {
    await axiosInstance.delete(API_PATHS.EXPANCE.DELETE_EXPANCE(id));
    setOpenDeleteAlert({ show: false, data: null });
    toast.success("Expance details deleted successfully");
    fetchExpanceDetails();
  } catch (error) {
    console.error(
      "Error deleting Expance:",
      error.response?.data?.message || error.message
    );
  }
};



  useEffect(() => {
    fetchExpanceDetails();

    return () =>{};
  }, []);
  return (
    <DashboardLayout activeMenu="Expense">
      <div className="my-5 mx-auto">
        <div className="grid grid-cols-1 gap-6">
        <div className="">
          <ExpanceOverview
            transactions={expanceData}
            onExpanceIncome={() => setOpenAddExpanceModal(true)}
          />
        </div>
      </div>

      <ExpanceList
      transections ={expanceData}
      onDelete={(id) => {
        setOpenDeleteAlert({ show: true, data: id});
      }}
      onDownload={handleDownloadExpanceDetails}
      />

    <Model
    isOpen={openAddExpanceModal}
    onClose={() => setOpenAddExpanceModal(false)}
    title="Add Expance">

      <AddExpanceform onAddExpance={handleAddExpance} />
    </Model>

    <Model
        isOpen={openDeleteAlert.show}
        onClose={() => setOpenDeleteAlert({show: false, data:null})}
        title="Delete Expance" >
          <DeleteAlert 
          content="Are you Sure you want to delete expance "
          onDelete={() => deleteExpance(openDeleteAlert.data)}
          />
        </Model>

    </div>
    </DashboardLayout>
  )
}

export default Expance
