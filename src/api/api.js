const BASEURL = "https://strangers-things.herokuapp.com/2207-FTB-ET-WEB-PT"


export const fetchPosts = async () => {
    try {
    const response = await fetch(`${BASEURL}/posts`, {
        method: 'Post',
        headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ${token}'
 }})
    } catch(error) {
        console.error("Whoops! There was an error fetching the posts.")
    }
};

export const loginUser = async (username, password) => {
    try {
        await fetch(`${BASEURL}/posts/login`, {
            method: "POST",
            headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ${token}'
  },
});
    } catch(error) {
        console.error("Login failed, please try again.")
    }
};

export const registerUser = async (username, password) => {
    try {
        await fetch(`${BASEURL}/posts/register`, {
            method: "POST",
            headers: {
            'Content-Type': 'application/json',
  },
            body: JSON.stringify({
            user: {
                username: username,
                password: password
    }
  })  
});
    } catch(error) {
        console.error("User already exists. Try logging in.")
    }
};

export const createPost = async () => {
    try {
        await fetch(`${BASEURL}/posts`, {
            method: "POST",
            headers: {
              'Content-Type': 'application/json',
              'Authorization': 'Bearer ${token}'
            },
            body: JSON.stringify({
              post: {
                title: "My favorite stuffed animal",
                description: "This is a pooh doll from 1973. It has been carefully taken care of since I first got it.",
                price: "$480.00",
                willDeliver: true
            }
        })
    });
        } catch(error) {
        console.error("Couldn't create post. Try again.")
    }
};

export const deletePost = async (postID, token) => {
    try {
        await fetch(`${BASEURL}/posts/${postID}`, {
            method: "PATCH",
            headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ${token}'
  },
});
    } catch(error) {
        console.error("Delete post failed. Please try again.")
    }
}