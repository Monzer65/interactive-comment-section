let myjson = {
    "currentUser": {
      "image": { 
        "png": "./images/avatars/image-juliusomo.png",
        "webp": "./images/avatars/image-juliusomo.webp"
      },
      "username": "juliusomo"
    },
    "comments": [
      {
        "id": 1,
        "content": "Impressive! Though it seems the drag feature could be improved. But overall it looks incredible. You've nailed the design and the responsiveness at various breakpoints works really well.",
        "createdAt": "1 month ago",
        "score": 12,
        "user": {
          "image": { 
            "png": "./images/avatars/image-amyrobson.png",
            "webp": "./images/avatars/image-amyrobson.webp"
          },
          "username": "amyrobson"
        },
        "replies": []
      },
      {
        "id": 2,
        "content": "Woah, your project looks awesome! How long have you been coding for? I'm still new, but think I want to dive into React as well soon. Perhaps you can give me an insight on where I can learn React? Thanks!",
        "createdAt": "2 weeks ago",
        "score": 5,
        "user": {
          "image": { 
            "png": "./images/avatars/image-maxblagun.png",
            "webp": "./images/avatars/image-maxblagun.webp"
          },
          "username": "maxblagun"
        },
        "replies": [
          {
            "id": 3,
            "content": "If you're still new, I'd recommend focusing on the fundamentals of HTML, CSS, and JS before considering React. It's very tempting to jump ahead but lay a solid foundation first.",
            "createdAt": "1 week ago",
            "score": 4,
            "replyingTo": "maxblagun",
            "user": {
              "image": { 
                "png": "./images/avatars/image-ramsesmiron.png",
                "webp": "./images/avatars/image-ramsesmiron.webp"
              },
              "username": "ramsesmiron"
            }
          },
          {
            "id": 4,
            "content": "I couldn't agree more with this. Everything moves so fast and it always seems like everyone knows the newest library/framework. But the fundamentals are what stay constant.",
            "createdAt": "2 days ago",
            "score": 2,
            "replyingTo": "ramsesmiron",
            "user": {
              "image": { 
                "png": "./images/avatars/image-juliusomo.png",
                "webp": "./images/avatars/image-juliusomo.webp"
              },
              "username": "juliusomo"
            }
          }
        ]
      }
    ]
  }

  function scoreValue(score){
    return score;
  };

function usersComments(usersComment){
  return`
    <div class = "comment-container">
      <div class = "comment-wrapper">
        <div class = "comment-header">
          <img class = "avatar" src="${usersComment.user.image.png}" alt="">
          <p class = "user-name">${usersComment.user.username}</p>
          <p class = "date-created">${usersComment.createdAt}</p>
        </div>
        <p class = "comment-text">${usersComment.content}</p>
        <div id = "btns" claass = "users-comment-btns">
          <div class = "score">
            <img class = "score-plus" src="images/icon-plus.svg">
            <span class = "score-value">${scoreValue(usersComment.score)}</span>
            <img class = "score-negative" src="images/icon-minus.svg">
          </div>
          <div class = "reply-btn">
            <img src = "images/icon-reply.svg">
            Reply
          </div>
        </div>
      </div>
    </div>
    ${usersComment.replies.map(function (replying){
        return`
        <div class = "comment-container reply-container">
          <div class = "comment-wrapper reply-wrapper">
            <div class = "comment-header">
              <img class = "avatar" src="${replying.user.image.png}" alt="">
              <p class = "user-name">${replying.user.username}</p>
              <p class = "date-created">${replying.createdAt}</p>
            </div>
            <p class = "comment-text">${replying.content}</p>
            <div id = "btns" claass = "users-comment-btns">
              <div class = "score">
                <img class = "score-plus" src="images/icon-plus.svg">
                <span class = "score-value">${scoreValue(replying.score)}</span>
                <img class = "score-negative" src="images/icon-minus.svg">
              </div>
              <div class = "reply-btn">
                <img src = "images/icon-reply.svg">
                Reply
              </div>
            </div>
          </div>
        </div>
        ` 
      }).join("")}
    `
  };


const maindiv = document.getElementById('main');
maindiv.innerHTML = `${myjson.comments.map(usersComments).join("")}`;

const plusBtn = document.querySelectorAll('.score-plus');
const minBtn = document.querySelectorAll('.score-negative');

plusBtn.forEach((btn) =>{
  btn.addEventListener('click', ()=>{
    btn.nextElementSibling.innerHTML = parseInt(btn.nextElementSibling.innerHTML) + 1;
  });
});

minBtn.forEach((btn) =>{
  btn.addEventListener('click', ()=>{
    btn.previousElementSibling.innerHTML = parseInt(btn.previousElementSibling.innerHTML) - 1;

  });
});

