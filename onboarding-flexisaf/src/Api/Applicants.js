  const API = "http://localhost:3001";

  export const getApplicants = async () => {
    const response = await fetch(`${API}/applicants`);
    return response.json();
  };

  export const createApplicant = async (data) => {
    const response = await fetch(`${API}/applicants`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)  
    });

    return response.json();
  };

  export const updateApplicant = async (id, data) => {
    const response = await fetch(`${API}/applicants/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    });

    return response.json();
  };