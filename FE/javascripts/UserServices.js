const getUsers = async (page, limit) => {
  try {
    const URI = `http://localhost:3000/api/users?page=${page}&limit=${limit}`;

    const response = await axios.get(URI);

    return response.data;

  } catch (error) {
    console.log("🚀 ~ file: index.html ~ line 63 ~ getUsers ~ error", error)
    return [];
  }
}

const getUser = async (userId) => {
  try {
    const URI = `http://localhost:3000/api/user/${userId}`;

    const response = await axios.get(URI);

    return response.data;

  } catch (error) {
    console.log("🚀 ~ file: index.html ~ line 63 ~ getUsers ~ error", error)
    return [];
  }
}

const deleteUser = async (userId) => {
  try {
    const URI = `http://localhost:3000/api/user/${userId}`;

    const response = await axios.delete(URI);

    return response.data;

  } catch (error) {
    console.log("🚀 ~ file: index.html ~ line 63 ~ deleteUsers ~ error", error)
    return [];
  }
}

const createUser = async (data) => {
  try {
    const URI = `http://localhost:3000/api/user`;

    const response = await axios.post(URI, data);

    return response.data;

  } catch (error) {
    console.log("🚀 ~ file: index.html ~ line 63 ~ deleteUsers ~ error", error)
    return [];
  }
}

const updateUser = async (userId, data) => {
  try {
    const URI = `http://localhost:3000/api/user/${userId}`;

    const response = await axios.put(URI, data);

    return response.data;

  } catch (error) {
    console.log("🚀 ~ file: index.html ~ line 63 ~ updateUser ~ error", error)
    return [];
  }
}

const searchUser = async (query) => {
  try {
    const URI = `http://localhost:3000/api/search?query=${query}`;

    const response = await axios.get(URI);

    return response.data;

  } catch (error) {
    console.log("🚀 ~ file: index.html ~ line 63 ~ updateUser ~ error", error)
    return [];
  }
}