//! getting all the necessary tags from the document

let input = document.querySelector("#user"),
  user = document.querySelector(".about-user"),
  warning = document.querySelector(".warning"),
  userDetails = document.querySelector(".user-details");

//! adding a press event to the input so when the user clicks Enter on his/her keyboard, it should perform a function.

input.addEventListener("keypress", (event) => {
  if (event.key === "Enter") {
    // ! if the input value is empty
    if (input.value === "") {
      // ! add the warning class
      warning.classList.add("active");
      // ! and set the innerHTML to this
      warning.innerHTML =
        "<div class='message error'>Please input a user name!</div>";

      // ! after 3000 milliseconds or 3 seconde,
      setTimeout(() => {
        // ! remove the warning class
        warning.classList.remove("active");
      }, 3000);
    } else {
      // ! run the function if the user types in something.
      getUser();
      // ! setting the input to nothing when the user clicks Enter
      input.value = "";
    }
  }
});

// TODO: the function that it should perform when the user types in something and clicks Enter
const getUser = async () => {
  // ! setting whatever the user types to inputValue
  let inputValue = input.value;
  // ! creating the url for easy access
  let url = (await "https://api.github.com/users/") + inputValue;
  // ! adding the warning class when searching for user
  warning.classList.add("active");
  warning.innerHTML = `<div class='message success'>Searching for <span>${inputValue}</span>. Please wait...</div>`;

  // ! setting the time you want it to show
  setTimeout(() => {
    // ! fetching the url that we created before
    fetch(url)
      // ! converting the object into a json
      .then((response) => response.json())
      // ! collecting the data
      .then((data) => {
        // ! setting the innerHTML of the user details
        user.innerHTML = `
      <div class="user-details">
      <div class="top">
        <div class="image-container">
          <a href="${data.html_url}" target='_blank'>
            <img
              src="${data.avatar_url}"
              alt="user"
            />
          </a>
        </div>
      </div>
      <div class="bottom">
        <div class="name">
          <div class="user-name">${
            data.login === null ? "No username" : data.login
          }</div>
          <div class="real-name">${
            data.name === null ? `${data.login} has no name` : data.name
          }</div>
        </div>
        <div class="bio">
          <div class="bio-top">Bio</div>
          <p>${data.bio === null ? `${data.login} has no bio` : data.bio}</p>
        </div>
        <div class="table">
          <div class="card">
            <span class="top-span">Followers</span>
            <span class="bottom-span">${data.followers}</span>
          </div>
          <div class="card">
            <span class="top-span">Following</span>
            <span class="bottom-span">${data.followers}</span>
          </div>
          <div class="card">
            <span class="top-span">Repositories</span>
            <span class="bottom-span">${data.public_repos}</span>
          </div>
        </div>
      </div>
    </div>
      `;
      })
      // ! if theres an error
      .catch(() => {
        // ! alert
        alert("something went wrong");
        // ! and remove the user details
        userDetails.classList.add("active");
      });
  }, 1000);
};
