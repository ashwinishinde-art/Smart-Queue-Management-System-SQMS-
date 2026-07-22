import API from "./api";

// Get all joinable queues for the user dropdown
export const getAllQueues = async () => {
  const token = sessionStorage.getItem("token");

  const response = await API.get("/queues", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const allQueues = response.data?.queues || [];
  const joinableQueues = allQueues.filter((queue) => queue.status === "open");

  return {
    ...response.data,
    queues: joinableQueues,
  };
};

// Join a queue
export const joinQueue = async (queueId) => {
  const token = sessionStorage.getItem("token");

  const response = await API.post(
    `/queues/${queueId}/join`,
    {},
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data;
};

// Get all active queues of the logged-in user
export const getMyActiveQueues = async () => {
  const token = sessionStorage.getItem("token");

  const response = await API.get("/queues/my-active", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};

// Get queue status
export const getQueueStatus = async (queueId) => {
  const token = sessionStorage.getItem("token");

  const response = await API.get(`/queues/${queueId}/status`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};

// Leave queue
export const leaveQueue = async (queueId) => {
  const token = sessionStorage.getItem("token");

  const response = await API.post(
    `/queues/${queueId}/leave`,
    {},
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data;
};

// Get Queue History
export const getQueueHistory = async () => {
  const token = sessionStorage.getItem("token");

  const response = await API.get("/queues/history", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};

// Get student queue stats
export const getUserQueueStats = async () => {
  const token = sessionStorage.getItem("token");

  const response = await API.get("/queues/stats", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};

// Get user notifications
export const getNotifications = async () => {
  const token = sessionStorage.getItem("token");

  const response = await API.get("/queues/notifications", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};

// Mark notifications as read
export const markNotificationsAsRead = async () => {
  const token = sessionStorage.getItem("token");

  const response = await API.patch(
    "/queues/notifications/read",
    {},
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data;
};
