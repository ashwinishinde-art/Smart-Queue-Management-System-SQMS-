import API from "./api";

const getToken = () => sessionStorage.getItem("token");

const getAuthHeaders = () => ({
  Authorization: `Bearer ${getToken()}`,
});

export const getDashboardStats = async () => {
  const response = await API.get("/admin/dashboard", {
    headers: getAuthHeaders(),
  });

  return response.data;
};

export const getAllQueues = async () => {
  const response = await API.get("/queues", {
    headers: getAuthHeaders(),
  });

  return response.data;
};

export const createQueue = async (queueData) => {
  const response = await API.post("/queues", queueData, {
    headers: getAuthHeaders(),
  });

  return response.data;
};

export const callNextStudent = async (queueId) => {
  const response = await API.post(
    `/admin/queues/${queueId}/call-next`,
    {},
    {
      headers: getAuthHeaders(),
    }
  );

  return response.data;
};

export const completeStudent = async (queueId) => {
  const response = await API.post(
    `/admin/queues/${queueId}/complete`,
    {},
    {
      headers: getAuthHeaders(),
    }
  );

  return response.data;
};

export const pauseQueue = async (queueId) => {
  const response = await API.post(
    `/admin/queues/${queueId}/pause`,
    {},
    {
      headers: getAuthHeaders(),
    }
  );

  return response.data;
};

export const resumeQueue = async (queueId) => {
  const response = await API.post(
    `/admin/queues/${queueId}/resume`,
    {},
    {
      headers: getAuthHeaders(),
    }
  );

  return response.data;
};

export const closeQueue = async (queueId) => {
  const response = await API.post(
    `/admin/queues/${queueId}/close`,
    {},
    {
      headers: getAuthHeaders(),
    }
  );

  return response.data;
};
