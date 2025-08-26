// export const BASE_URL = "http://127.0.0.1:7000";

export const BASE_URL = import.meta.env.VITE_BASE_URL || "http://127.0.0.1:7000";

// utils/apiPaths.js
export const API_PATHS = {
  AUTH: {
  LOGIN: "/api/v1/auth/login",
  REGISTER: "/api/v1/auth/register",
  GET_USER_INFO: "/api/v1/auth/getUser",
  },
  DASHBOARD:{
    GET_DATA: "/api/v1/dashboard/get",
  },
  INCOME:{
    ADD_INCOME: "/api/v1/income/add",
    GET_ALL_INCOME: "/api/v1/income/get",
    DELETE_INCOME: (incomeId) => `/api/v1/income/${incomeId}`,
    DOWNLOAD_INCOME: `/api/v1/income/downloadexcel`,
  },
    EXPANCE:{
        ADD_EXPANCE: "/api/v1/expance/add",
        GET_ALL_EXPANCE: "/api/v1/expance/get",
        DELETE_EXPANCE: (expanceId) => `/api/v1/expance/${expanceId}`,
        DOWNLOAD_EXPANCE:`/api/v1/expance/downloadexcel`,
    },
   IMAGE:{
    UPLOAD_IMAGE: "/api/v1/auth/upload-image",
}
};

