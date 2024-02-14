// script.js

function submitPost() {
    const postText = document.getElementById("postText").value;

    if (postText.trim() !== "") {
        fetch("/api/posts", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ text: postText }),
        })
            .then((response) => response.json())
            .then((newPost) => {
                // Add the new post to the post list on the page
                const postList = document.getElementById("postList");
                const postElement = document.createElement("div");
                postElement.className = "post";
                postElement.innerText = newPost.text;
                postList.appendChild(postElement);

                // Clear the textarea after posting
                document.getElementById("postText").value = "";
            })
            .catch((error) => {
                console.error("Error posting:", error);
            });
    }
}

// Load existing posts on page load
window.addEventListener("load", () => {
    fetch("/api/posts")
        .then((response) => response.json())
        .then((posts) => {
            const postList = document.getElementById("postList");
            posts.forEach((post) => {
                const postElement = document.createElement("div");
                postElement.className = "post";
                postElement.innerText = post.text;
                postList.appendChild(postElement);
            });
        })
        .catch((error) => {
            console.error("Error fetching posts:", error);
        });
});
