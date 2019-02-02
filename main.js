const allPosts = [];
<<<<<<< HEAD
// const Promise = require("bluebird");
// const AppDAO = require("./dao");
// const UserRepository = require("./UserRepository");
// const blogEntryRepository = require("./blogEntryRepository");
=======
const allPostsContainer = document.getElementById("all-posts-container");
>>>>>>> 1a1baff70dd27b717cdcaa27df64e9f04fdb86c6

function BlogPost(id, title, author, createdOn, body, tags) {
  this.id = id;
  this.title = title;
  this.author = author;
  this.createdOn = createdOn;
  this.body = body;
  this.tags = tags;
}

BlogPost.prototype.render = function(parent, summary) {
  const singlePostDiv = document.createElement("div");
  singlePostDiv.className = "post-container";

  this.renderTitle(singlePostDiv);
  this.renderAuthor(singlePostDiv);
  this.renderCreatedOn(singlePostDiv);
  this.renderBody(singlePostDiv, summary);
  this.renderTags(singlePostDiv);

  parent.appendChild(singlePostDiv);
};

BlogPost.prototype.renderTitle = function(parent) {
  const anchorTitle = document.createElement("a");
  anchorTitle.href = "#";
  const title = document.createElement("h2");
  title.dataset.id = this.id;
  anchorTitle.className = "clickable-title";
  title.className = "post-title";
  title.textContent = this.title;
  anchorTitle.appendChild(title);
  parent.appendChild(anchorTitle);
  anchorTitle.addEventListener("click", handleTitleClick);
};

BlogPost.prototype.renderAuthor = function(parent) {
  const anchorAuthor = document.createElement("a");
  anchorAuthor.href = "#";
  const author = document.createElement("div");
  author.dataset.author = this.author;
  anchorAuthor.className = "clickable-author";
  author.className = "post-author";
  author.textContent = `${this.author}`;
  anchorAuthor.appendChild(author);
  parent.appendChild(anchorAuthor);
  anchorAuthor.addEventListener("click", getAuthorClickHandlerForPost(this));
};

BlogPost.prototype.showUserAuthorsName = function(parent) {
  const showAuthorName = document.createElement("div");
  showAuthorName.dataset.author = this.author;
  showAuthorName.id = "show-now";
  showAuthorName.className = "show-author-name";
  showAuthorName.textContent = `Showing all posts by: ${this.author}`;
  parent.appendChild(showAuthorName);
};

BlogPost.prototype.renderTags = function(parent) {
  const tags = document.createElement("span");
  tags.className = "post-tags";
  tags.textContent = `Key Words: ${this.tags}`;
  parent.appendChild(tags);
};

BlogPost.prototype.renderCreatedOn = function(parent) {
  const createdOn = document.createElement("span");
  createdOn.className = "date-created";
  const formattedDate = renderDate(this.createdOn);
  createdOn.textContent = `Publish Date: ${formattedDate}`;
  parent.appendChild(createdOn);
};

BlogPost.prototype.renderBody = function(parent, summary) {
  const body = document.createElement("div");
  const bodyToRender = summary === true ? this.summmaryBody() : this.body;
  body.className = "post-body";
  const md = window.markdownit();
  const result = md.render(bodyToRender);
  body.innerHTML = result;
  parent.appendChild(body);
};

BlogPost.prototype.summmaryBody = function() {
  return this.body
    .split(" ")
    .slice(0, 51)
    .join(" ")
    .concat("...");
};

function renderDate(date) {
  const datePieces = date.split("-");
  const [year, month, day] = datePieces;
  return `${month} - ${day} - ${year}`;
}

function createNewBlog() {
  data.forEach(function(element) {
    const newBlog = new BlogPost(
      element.id,
      element.title,
      element.author,
      element.createdOn,
      element.body,
      element.tags
    );
    allPosts.push(newBlog);
  });
}

function renderAllPosts() {
  allPosts.forEach(function(post) {
    post.render(allPostsContainer, true);
  });
}
function renderSinglePost() {
  const post = allPosts[0];
  const homePageWrap = document.getElementById("home-page-wrap");
  post.render(homePageWrap, false);
}

const header = document.querySelector("header");

function handleNav(event) {
  const path = event.target.dataset.path;
  hideAll();
  const currentPage = document.getElementById(path);
  currentPage.classList.remove("hidden");
}
function hideAll() {
  const pages = document.querySelectorAll(".page");
  pages.forEach(function(page) {
    page.classList.add("hidden");
  });
}

function handleTitleClick(event) {
  const id = event.target.dataset.id;
  const currentPost = allPosts.find(function(post) {
    return id === post.id;
  });
  removePosts();

  currentPost.render(allPostsContainer, false);

  const link = document.getElementById("back");
  link.classList.remove("hidden");
  link.addEventListener("click", handleBackToAllPosts);
}

function removePosts() {
  const posts = document.querySelectorAll(".all-posts-page .post-container");
  posts.forEach(function(post) {
    post.remove();
  });
}

function getAuthorClickHandlerForPost(post) {
  return function handleAuthorCick(event) {
    const author = event.target.dataset.author;
    const postsByAuthor = allPosts.filter(function(post) {
      return author === post.author;
    });
    removePosts();

    postsByAuthor.forEach(function(post) {
      post.render(allPostsContainer, true);
    });
    const authorDiv = document.getElementById("authorName");
    authorDiv.classList.remove("hidden");
    post.showUserAuthorsName(authorDiv);

    const link = document.getElementById("back");
    link.classList.remove("hidden");
    link.addEventListener("click", handleBackToAllPosts);
  };
}

function handleBackToAllPosts() {
  const link = document.getElementById("back");
  removePosts();
  renderAllPosts();
  link.classList.add("hidden");

  removeAuthName();
}

function removeAuthName() {
  const authNameRemoved = document.getElementById("show-now");
  authNameRemoved.remove();
}

header.addEventListener("click", handleNav);

createNewBlog();
renderAllPosts();
renderSinglePost();

// contact page form

function submitForm(event) {
  event.preventDefault();
  var formIsValid = validateForm(event);
  if (!formIsValid) {
    return false;
  }
  renderUserInputAll(event);
}

function validateForm(event) {
  var userNameIsValid = validateUserName(event);
  if (!userNameIsValid) {
    return false;
  }

  var emailIsValid = validateEmail(event);
  if (!emailIsValid) {
    return false;
  }

  var passwordIsValid = validatePassword(event);
  if (!passwordIsValid) {
    return false;
  } else {
    return true;
  }
}

var userform = document.querySelector("form");
userform.addEventListener("submit", submitForm);

function renderUserInputEach(value) {
  var printParent = document.getElementById("contact-print-user-info");
  var eachInputField = document.createElement("div");
  eachInputField.textContent = value;
  printParent.appendChild(eachInputField);
}

function renderUserInputAll(event) {
  var firstLineContent = ` Thank you ${
    event.target.username.value
  } for creating an account.`;
  var secondLineContent = `The Email you have provided is: ${
    event.target.email.value
  }`;

  renderUserInputEach(firstLineContent);
  renderUserInputEach(secondLineContent);
}

function validateUserName(event) {
  var username = event.target.username.value;

  if (!username.match(/^[\w\W\d]+$/)) {
    alert("User Name field is empty");
    return false;
  }
  if (username.length < 10) {
    alert("User Name must be minimum 10 characters/digits");
    return false;
  }

  return true;
}

function validateEmail(event) {
  var emailID = event.target.email.value;
  var atpos = emailID.indexOf("@");
  var dotpos = emailID.lastIndexOf(".");

  if (atpos < 1 || dotpos - atpos < 2) {
    alert("Please enter correct email ID");
    return false;
  }
  return true;
}

function validatePassword(event) {
  var verifyPswd = event.target.password.value;
  var confirmPswd = event.target.confirm_password.value;

  if (verifyPswd.length < 8) {
    alert("Password must be minimum 8 characters.");
    return false;
  }

  if (confirmPswd.length < 8) {
    alert("Confirm Password must be minimum 8 characters.");
    return false;
  }
  if (verifyPswd === confirmPswd) {
    return true;
  } else {
    alert("Please verify Password and Confirm Password match");
    return false;
  }
}

// function main() {
//   const dao = new AppDAO('./database.sqlite3')
//   const blogProjectData =  { name: 'Learning Journal Sqlite Tutorial'}
//   const userRepo = new UserRepository(dao)
//   const blogEntryRepo = new blogEntryRepository(dao)
//   let userId

//   userRepo.createTable()
//   .then(() => blogEntryRepo.createTable())
//   .then (() => userRepo.createTable(blogProjectData.name))
//   .then ((data) => {
//     userId = data.id
//     const blogEntries = [
//       {
//         title: 'testBlog1',
//         body: 'this is a test blog entry body',
//         author: 'test author',
//         date: '01/19/2019',
//         tags: 'red'
//       },
//       {
//         title: 'testBlog2',
//         body: 'this is a test blog 2 entry body',
//         author: 'test author 2',
//         date: '01/19/2019-2',
//         tags: 'red-2'
//       }
//     ]
//     return Promise.all(blogEntries.map((blogEntry) => {
//       const { title, body, author, date, tags }
//       return blogEntryRepo.create(title, body, author, date, tags) }
//     ))

//   })
//   .then(() => userRepo.getById(author)
//   .then ((userId) => {
//     console.log (`\nRetrieved user from database`)
//     console.log(`user id = ${userId.id}`)
//     console.log(`user name = ${userId.username}`)
//     return userRepo.getBlogEntries(user.id)
//   })
//   .then((blogEntries) => {
//     console.log('\nRetrieved blog entries from database')
//     return new Promise ((resolve, reject) => {
//       blogEntries.forEach((blogEntry) => {
//         console.log('blog id = ${blog.id}')
//         console.log('blog title = ${blog.title}')
//         console.log('blog body = ${blog.body}')
//         console.log('blog author = ${blog.author}')
//         console.log('blog date = ${blog.date}')
//         console.log('blog tags = ${blog.tags}')

//       })
//     })

//     resolve('success')

//   })

//   .catch((err) => {
//     console.log('Error: ')
//     console.log(JSON.stringify(err))
//   })

// }

// main()
