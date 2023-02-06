let myjson = {
    "currentUser": {
        "image": {
            "png": "./images/avatars/image-juliusomo.png",
            "webp": "./images/avatars/image-juliusomo.webp"
        },
        "username": "juliusomo"
    },
    "comments": [{
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
            "replies": [{
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


const mainTemplate = document.getElementById('main');
mainTemplate.innerHTML = `${myjson.comments.map(otherUsers).join("")}
  <div class="comment-box-wrapper">
    <div class="comment-box">
      <img src="${myjson.currentUser.image.png}" alt="">
      <textarea name="" placeholder="Add a comment" cols="auto" rows="3"></textarea>
      <button type="submit" class="submit-reply-btn">Send</button>
    </div>
  </div>
`;

function otherUsers(otherUser) {
    return `
    <div class="container">
      <div class="comment-container">
        <div class="comment-wrapper">
          <div class="comment-header">
            <img class="avatar" src="${otherUser.user.image.png}" alt="">
            <p class="user-name">${otherUser.user.username}</p>
            <p class="date-created">${otherUser.createdAt}</p>
          </div>
          <p class="comment-text">${otherUser.content}</p>
          <div class="comment-btns">
            <div class="score-container">
              <img class="score-plus"  src="images/icon-plus.svg">
              <span class="score-value">${otherUser.score}</span>
              <img class="score-less" src="images/icon-minus.svg">
            </div>
            <div class="reply-btn">
              <img src="images/icon-reply.svg">
              Reply
            </div>
          </div>
        </div>
        <div class="new-box"></div>
        <div class="newComment"></div>
      </div>
      ${otherUser.replies.map(function (reply){
        return`
        <div class="reply-container comment-container">
          <div class="reply-wrapper">
            <div class="reply-header">
              <img class="avatar" src="${reply.user.image.png}" alt="">
              <p class="user-name">${reply.user.username}</p>
              <p class="date-created">${reply.createdAt}</p>
            </div>
            <p class="reply-text">${reply.content}</p>
            <div class="reply-btns">
              <div class="score-container">
                <img class="score-plus" src="images/icon-plus.svg">
                <span class="score-value">${reply.score}</span>
                <img class="score-less" src="images/icon-minus.svg">
              </div>
              <div class="reply-btn">
                <img src="images/icon-reply.svg">
                Reply
              </div>
            </div>
          </div>
          <div class="new-box"></div>
          <div class="newComment"></div>
        </div>
        ` 
      }).join("")}
    </div>  
    `
};

const likeBtn = document.querySelectorAll('.score-plus');
const dislikeBtn = document.querySelectorAll('.score-less');
const likesScore = document.querySelectorAll('.score-value');
scorePlus()
scoreLess()

function scorePlus() {
    likeBtn.forEach((like) => {
        like.addEventListener('click', function() {
            let score = like.nextElementSibling;
            score.textContent = parseInt(score.textContent) + 1;
        })
    })
};

function scoreLess() {
    dislikeBtn.forEach((dislike) => {
        dislike.addEventListener('click', function() {
            let score = dislike.previousElementSibling;
            score.textContent = parseInt(score.textContent) - 1;
        })
    })
};

addNewBox()

function addNewBox() {
    const replyBtns = document.querySelectorAll('.reply-btn');
    replyBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            let newBox = btn.closest('.comment-container').querySelector('.new-box')
            newBox.innerHTML = `
        <div class="reply-box-container">
          <div class="reply-box">
            <img src="${myjson.currentUser.image.png}" alt="">
            <textarea name="" placeholder="Add a reply" cols="auto" rows="3"></textarea>
            <button type="submit" class="submit-reply-btn" onclick="Addreply()">Reply</button>
          </div>
        </div>
      `
        })
    })
};

Addreply()

function Addreply() {
    let submitReplyBtns = document.querySelectorAll('.submit-reply-btn');
    submitReplyBtns.forEach(btn => {
        btn.closest(".comment-container").querySelector('.reply-box').style.display = "none";



        let newReply = btn.closest('.comment-container').querySelector('.newComment');

        newReply.innerHTML = `
        <div class="comment-container">
          <div class="comment-wrapper">
            <div class="comment-header">
              <img class="avatar" src="${myjson.currentUser.image.png}" alt="">
              <p class="user-name">${myjson.currentUser.username}</p>
              <p class="date-created">${Date()}</p>
            </div>
            <p class="comment-text">Test</p>
            <div class="comment-btns">
              <div class="score-container">
                <img class="score-plus"  src="images/icon-plus.svg">
                <span class="score-value">0</span>
                <img class="score-less" src="images/icon-minus.svg">
              </div>
              <div class="reply-btn">
                <img src="images/icon-reply.svg">
                Reply
              </div>
            </div>
          </div>
          <div class="reply-box-container">
            <div class="reply-box">
              <img src="${myjson.currentUser.image.png}" alt="">
              <textarea name="" id="txtarea" cols="auto" rows="3"></textarea>
              <button type="submit" class="submit-reply-btn">Reply</button>
            </div>
          </div>
          <div class="newComment"></div>
        </div>
      `
    })
}







// function addComment(e){
//   document.getElementById('commentHere').innerHTML = ` <div class = "comment-container reply-container">
//     <div class = "comment-wrapper reply-wrapper">
//       <div class = "comment-header">
//         <img class = "avatar" src="${myjson.currentUser.image.png}" alt="">
//         <p class = "user-name">${myjson.currentUser.username}</p>
//         <p class = "date-created">${newDate()}</p>
//       </div>
//       <p class = "comment-text">klllll</p>
//       <div id = "btns" claass = "users-comment-btns">
//         <div class = "score">
//           <img class = "score-plus" src="images/icon-plus.svg">
//           <span class = "score-value">0</span>
//           <img class = "score-negative" src="images/icon-minus.svg">
//         </div>
//         <div class="reply-btn">
//           <img src = "images/icon-reply.svg">
//           Reply
//         </div>
//       </div>
//     </div>
//   </div>
//   `;
// }


// const replyComment = document.getElementsByClassName('myreply-container');
// const myreplyBtn = document.querySelectorAll('.reply-btn');



// minBtn.forEach((btn) =>{
//   btn.addEventListener('click', (e)=>{
//     e.target.previousElementSibling.innerHTML = parseInt(e.target.previousElementSibling.innerHTML) - 1;
//   });
// });

// myreplyBtn.forEach(function(btn){
//   btn.addEventListener('click', function(e){   
//     btn.parentElement.parentElement.parentElement.classList.toggle('active');
//   });
// });

// function newDate(){
//   let x = new Date().toLocaleDateString('en-us', { weekday:"long", year:"numeric", month:"short"})
//   return x;
// }
// let myreplyText, myreplyWrapper;
// myreplyText = document.getElementById('txtarea').value;
// myreplyWrapper = document.createElement('div');
// myreplyWrapper.className = "myreply myreply-wrapper";
// const textBox = document.createElement('div');
// textBox.innerHTML = myreplyText;

// const submitReplyBtn = document.createElement('button');
// const editBtn = document.createElement('button');
// const deleteBtn = document.createElement('button');
// submitReplyBtn.className = "submit-reply";
// submitReplyBtn.innerHTML = 'Reply';
// editBtn.className = "edit-reply";
// editBtn.innerHTML = 'Edit';
// deleteBtn.className = "delet-reply";
// deleteBtn.innerHTML = 'Delete';


// myreplyWrapper.append(textBox, submitReplyBtn, editBtn, deleteBtn)
// commentHere.appendChild(myreplyWrapper)