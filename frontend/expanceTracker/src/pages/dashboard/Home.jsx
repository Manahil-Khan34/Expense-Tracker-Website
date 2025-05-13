import React, { useEffect, useState } from 'react'
import DashboardLayout from '../../components/Layouts/DashboardLayout'
import { useUserAuth } from '../../hooks/useUserAuth';
import axiosInstance from '../../utils/axiosInstance';
import { API_PATHS } from '../../utils/apiPaths';
import { useNavigate } from 'react-router-dom';
import { IoMdCard } from 'react-icons/io';
import InfoCard from '../../components/Cards/InfoCard';
import { LuHandCoins, LuWalletMinimal } from 'react-icons/lu';
import { addThousandSeperator } from '../../utils/helper';
import RecentTransactions from '../../components/Dashboard/RecentTransactions';
import FinanceOverview from '../../components/Dashboard/FinanceOverview';
import ExpanseTransactions from '../../components/Dashboard/ExpanseTransactions';
import Last30DaysExpance from '../../components/Dashboard/last30DaysExpance';
import RecenetIncomeWithChart from '../../components/Dashboard/RecenetIncomeWithChart';
import RecentIncome from '../../components/Dashboard/RecentIncome';

const Home = () => {
  useUserAuth(); // Custom hook to check user authentication

  // console.log("transactions", RecentTransactions);
  const navigate = useNavigate(); // Hook to navigate between routes

  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(false);

  // console.log("last30DaysExpance", dashboardData?.last30DaysExpance)
  const fetchDashboardData = async () => {
    if (loading) return; // Prevent multiple fetches

    setLoading(true);
    try {
      const response = await axiosInstance.get(`${API_PATHS.DASHBOARD.GET_DATA}`
      );

      if (response.data) {
        setDashboardData(response.data);
      }
    }
    catch (error) {
      console.error("Error fetching dashboard data:", error);
    }
    finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboardData();
    // Fetch dashboard data on component mount
    return () => { };
  }, []);



  return (
    <DashboardLayout activeMenu="Dashboard">
      <div className="my-5 mx-auto">
        <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
          <InfoCard
            icon={<IoMdCard />}
            label="Total Balance"
            value={addThousandSeperator(dashboardData?.totalBalance || 0)}
            color="bg-primary"
          />

          <InfoCard
            icon={<LuWalletMinimal />}
            label="Total Income"
            value={addThousandSeperator(dashboardData?.totalIncome || 0)}
            color="bg-orange-500"
          />

          <InfoCard
            icon={<LuHandCoins />}
            label="Total Expense"
            value={addThousandSeperator(dashboardData?.totalExpance
              || 0)}
            color="bg-red-500"
          />

        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">

          <RecentTransactions transactions = { dashboardData?.recentTransection}
          onSeeMore ={() => navigate("/expance")}/>

          <FinanceOverview
          totalBalance={dashboardData?.totalBalance || 0}
            totalIncome={dashboardData?.totalIncome || 0}
            totalExpance={dashboardData?.totalExpance || 0}
            onSeeMore={() => navigate("/expance")} />

          <ExpanseTransactions
            transactions={dashboardData?.last30DaysExpance?.transection || []}
            onSeeMore={() => navigate("/expance")}
          />

          <Last30DaysExpance
          data={dashboardData?.last30DaysExpance?.transection || []} />

        <RecenetIncomeWithChart
        data={dashboardData?.last60DaysIncome?.transection?.slice(0,4) ||[] }
        totalIncome = {dashboardData?.totalIncome || 0 } />

        <RecentIncome
        transections={dashboardData?.last60DaysIncome?.transection || [] }
        onSeeMore={() => navigate("/income")}
        />


        </div>
      </div>
    </DashboardLayout>
  );
};

export default Home;
