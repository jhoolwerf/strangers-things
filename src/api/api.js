const BASEURL = "https://strangers-things.herokuapp.com/api/2207-FTB-ET-WEB-PT"


const makeHeaders = (token) => {
    const headers = {
        "Content-type": "application/json",
    };
    if (token) {
        headers ["Authorization"] = `Bearer ${token}`;
    }
    return headers;
};

export const callAPI = async (endpointPath, defaultOptions = {}) => {
    const {token, method, body} = defaultOptions;
    const options = {
        headers: makeHeaders(token),
    };
    if (method) {
        options.method = method;
    }
    if (body) {
        options.body = JSON.stringify(body);
    }
    const response = await fetch(`${BASEURL}${endpointPath}`, options);
    const result = await response.json();
    
    return result;
};

export const fetchPosts = async (token) => {
    try {
    const {success, error, data} = await callAPI("/posts", {
        token: token,
 });
    if (success) {
        return {
            error: null,
            posts: data.posts,
        };
    } else {
        return {
            error: error.message,
            posts: [],
        };
    }
    } catch(error) {
        console.error("Whoops! There was an error fetching the posts" + error);
    
    return {
        error: "Failed to load posts",
        posts: [],
    };
    }
};

export const loginUser = async (username, password) => {
    try {
        const {success, error, data} = await callAPI("/users/login", {
            method: "POST",
            body: {
                user: {
                    username,
                    password,
            },
        },
    });
    if (success) {
        return {
            error: null,
            token: data.token,
            message: data.message,
        };
      } else {
        return {
            error: error.message,
            token: null,
            message: null,
        };
      }
    } catch(error) {
        console.error("Login failed, please try again.", error);
        return {
            error: "Login failed.",
            token: null,
            message: null,
        };
    }
};

export const registerUser = async (username, password) => {
    try {
        const {success, error, data} = await callAPI("/users/register", {
            method: "POST",
            body: {
                user: {
                    username,
                    password,
                },
            },     
  });
  if (success) {
    return {
        error: null,
        token: data.token,
        message: data.message,
    };
  }  else {
    return {
        error: error.message,
        token: null,
        message: null,
    };
  }
    } catch(error) {
        console.error("There was an error with registration.", error);
        return {
            error: "Registration failed.",
            token: null,
            message: null,
        };
    }
};

export const getUser = async (token) => {
    try {
        const {success, error, data} = await callAPI("/users/me", {
            token: token,
        });
        if (success) {
            return {
                error: null,
                user: data.user,
            };
        } else {
            return {
                error: error.message,
                user: null,
            };
        }
        } catch (error) {
            console.error("Failer to get user.", error);
            return {
                error: "Failed to get User Information",
                user: null,
            };
        }
};

export const createPost = async (token, title, description) => {
    try {
        // const posting = {
        //     post: post,
        // };
        // if (post) {
        //     posting.post = post;
        // }
        // const { success, error, data } = await callAPI("/posts", {
        //     token: token,
        //     method: "POST",
        //     body: {
        //         post: description,
        //     },
        // });
        if (success) {
            return {
                error: null,
                post: data.post,
            };
        }
     } catch(error) {
        console.error("Couldn't create post. Try again.", error);
            return {
                error: "Failed to creat post.",
                post: null,
            };
}};


export const deletePost = async (token, post_ID) => {
    try {
        const { success, error, data } = await callAPI(`posts/${post_ID}`, {
            method: "DELETE",
            token: token,
        });
        if (success) {
            return {
                error: null,
                data: null,
            };
        } else {
            return {
                error: error.message,
                data: null,
            };
        }
            } catch(error) {
            console.error("Delete post failed. Please try again.", error);
            return {
                error: "Failed to delete post.",
                data: null,
            };
        }
};