let myObj = {
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

function addComment(){
  let commentText = document.getElementById('text-area').value;
    if(commentText == ""){
      return
    }
  let commentWrapper = document.createElement('div');
      commentWrapper.className = "comment-wrapper";
      commentWrapper.innerHTML = `
        <div class="container" id="container">
          <div class="score-container">
            <img class="score-plus"  src="images/icon-plus.svg" onclick="">
            <span class="score-value">0</span>
            <img class="score-less" src="images/icon-minus.svg" onclick="scoreLess()">
          </div>
          <div class="comment-wrapper">
            <div class="comment-header">
              <div class="user-info">
                <img class="avatar" src="${myObj.currentUser.image.png}" alt="">
                <p class="user-name">${myObj.currentUser.username}</p>
                <p class="you">You</p>
                <p class="date-created">${getdate()}</p>
              </div>
              <div class=edit-delete-btns>
                <div class="delete-btn">
                  <img src="images/icon-delete.svg">
                  Delete
                </div>
                <div class="edit-btn" id="edit-btn">
                  <img src="images/icon-edit.svg">
                  Edit
                </div>
              </div>
            </div>
            <div class="comment-text">
              <p id="text" contenteditable="false">${commentText}</p>
            </div>     
            <div class="update-btn"></div>        
          </div>
        </div>`;
  let mainDiv = document.getElementById('main');
      mainDiv.appendChild(commentWrapper);
  deleteComment();
  updateComment();
  editComment();
  scoreUp();
  scoreDown();
};
// document.getElementById('send-comment-btn').addEventListener('click', function(){
//   addComment()
// })

function editComment(){

  let editBtns = document.querySelectorAll('.edit-btn')
  editBtns.forEach(btn => {
    btn.addEventListener('click', function(){
      let editableText = btn.closest('.comment-wrapper').querySelector('#text')
      editableText.contentEditable = true
      editableText.style.border = "1px solid hsl(212, 24%, 26%)"
      editableText.style.cursor = "pointer"
      const updateBtn =  btn.closest('.comment-wrapper').querySelector('.update-btn')
      updateBtn.innerHTML = 'Update'
      updateBtn.style.display = "block"
    })
  });
}

function updateComment(){
  let updateBtns = document.querySelectorAll('.update-btn')
  updateBtns.forEach(btn => {
    btn.addEventListener('click', function(){
      let editableText = btn.closest('.comment-wrapper').querySelector('#text')
      editableText.contentEditable = false;
      editableText.style.border = "none" 
      editableText.style.cursor = "initial"      
      btn.style.display = "none"
    })
  });
}

function deleteComment(){
  let deleteBtns = document.querySelectorAll('.delete-btn');
  deleteBtns.forEach(btn => {
    btn.addEventListener('click', function(){
      let modal = document.createElement('div');
      modal.className = 'modal'
      modal.innerHTML = `
      <div class="overlay">
      <p><strong>Delete comment</strong></p>
      <p>Are you sure you want to delete this commen? this will remove the comment and can't be undone.</p>
      <div class="modal-btns">
      <button class="cancel">No, Cancel</button>
      <button class="delete">Yes, Delete</button>
      </div>
      </div>
    `;
    btn.closest('.container').append(modal);
    btn.closest('.container').classList.add('active')
    noCancel()
    yesDelete()
  })
});
}


function noCancel(){
  let noCancelBtns = document.querySelectorAll('.cancel');
    noCancelBtns.forEach(btn => {
      btn.addEventListener('click', function(){
        btn.closest('.container').classList.remove('active')
      })  
    })
};

function yesDelete(){
  let yesDeleteBtns = document.querySelectorAll('.delete');
    yesDeleteBtns.forEach(btn => {
      btn.addEventListener('click', function(){
        btn.closest('.container').classList.remove('active')
        btn.closest('.container').remove()
      })  
    })
};

function getdate(){
  var today = new Date();
  var day = String(today.getDate()).padStart(2, '0');
  var month = String(today.getMonth() + 1).padStart(2, '0'); 
  var year = today.getFullYear();
  today = year + '/' + month + '/' + day;
  return today;
};

let commentsList = []
for(let {id, content, createdAt, score, replyingTo, user, replies} of myObj.comments){
  commentsList.push(`
  <div class="wrapper">
    <div class="container">
      <div class="score-container">
        <img class="score-plus"  src="images/icon-plus.svg">
        <span class="score-value">${score}</span>
        <img class="score-less" src="images/icon-minus.svg">
      </div>
      <div class="comment-wrapper">
        <div class="comment-header">
          <div class="user-info">
            <img class="avatar" src="${user.image.png}" alt="">
            <p class="user-name">${user.username}</p>
            <p class="date-created">${createdAt}</p>
          </div>
          <div class="reply-btn">
            <img src="images/icon-reply.svg">
            Reply
          </div>
        </div>
        <div class="comment-text">
          <p id="text" contenteditable="false">${content}</p>
        </div>      
        <div class="update-btn"></div>        
      </div>
    </div>
    <div class="new-box"></div>
    <div class="replyList">${replies.map(replyList).join("")}</div>
    <div class="newComment"></div>
  </div>  
  `
  )

};


// function replyList(reply) {
//   return `
//   <div class="reply-wrapper wrapper">
//     <div class="container">
//       <div class="score-container">
//         <img class="score-plus"  src="images/icon-plus.svg">
//         <span class="score-value">${reply.score}</span>
//         <img class="score-less" src="images/icon-minus.svg">
//       </div>
//       <div class="comment-wrapper">
//         <div class="comment-header">
//           <div class="user-info">
//             <img class="avatar" src="${reply.user.image.png}" alt="">
//             <p class="user-name">${reply.user.username}</p>
//             <p class="date-created">${reply.createdAt}</p>
//           </div>
//           <div class="reply-btn" id="reply-btn">
//             ${currentUserReply(reply)}
//           </div>
//         </div>
//         <div class="comment-text">
//           <p id="text" contenteditable="false"><span class="reply-to">@${reply.replyingTo}</span> ${reply.content}</p>
//         </div>     
//         <div class="update-btn"></div>        
//       </div>
//     </div>
//     <div class="new-box"></div>
//     <div class="newComment"></div>
//   </div>
//   ` 
// };

function replyList(reply){ 
  if(reply.id == 4){
    return`
    <div class="reply-wrapper wrapper mm">
    <div class="container">
      <div class="score-container">
        <img class="score-plus"  src="images/icon-plus.svg">
        <span class="score-value">${reply.score}</span>
        <img class="score-less" src="images/icon-minus.svg">
      </div>
      <div class="comment-wrapper">
        <div class="comment-header">
          <div class="user-info">
            <img class="avatar" src="${reply.user.image.png}" alt="">
            <p class="user-name">${reply.user.username}</p>
            <p class="date-created">${reply.createdAt}</p>
          </div>
          <div class="reply-btn" id="reply-btn">
          <div class=edit-delete-btns>
          <div class="delete-btn">
            <img src="images/icon-delete.svg">
            Delete
          </div>
          <div class="edit-btn" id="edit-btn">
            <img src="images/icon-edit.svg">
            Edit
          </div>
        </div>
          </div>
        </div>
        <div class="comment-text">
          <p id="text" contenteditable="false"><span class="reply-to">@${reply.replyingTo}</span> ${reply.content}</p>
        </div>     
        <div class="update-btn"></div>        
      </div>
    </div>
    <div class="new-box"></div>
  </div>
`
  }else{
    return`
    <div class="reply-wrapper wrapper">
    <div class="container">
      <div class="score-container">
        <img class="score-plus"  src="images/icon-plus.svg">
        <span class="score-value">${reply.score}</span>
        <img class="score-less" src="images/icon-minus.svg">
      </div>
      <div class="comment-wrapper">
        <div class="comment-header">
          <div class="user-info">
            <img class="avatar" src="${reply.user.image.png}" alt="">
            <p class="user-name">${reply.user.username}</p>
            <p class="date-created">${reply.createdAt}</p>
          </div>
          <div class="reply-btn" id="reply-btn">
          <div class="reply-btn">
          <img src="images/icon-reply.svg">
          Reply
        </div>
          </div>
        </div>
        <div class="comment-text">
          <p id="text" contenteditable="false"><span class="reply-to">@${reply.replyingTo}</span> ${reply.content}</p>
        </div>     
        <div class="update-btn"></div>        
      </div>
    </div>
    <div class="new-box"></div>
    <div class="newComment"></div>
  </div>
    `

  }
  
};
// scoreUp()
// scoreDown()
let commentsListTemplate = document.getElementById('comments-list');
commentsListTemplate.innerHTML = commentsList.join("") ;


addNewBox()
function addNewBox() {
  const replybtns = document.querySelectorAll('.reply-btn')
  replybtns.forEach(btn =>{
    btn.addEventListener('click', function(){
      let newBox = document.createElement('div')
      newBox.innerHTML=`
        <div class="reply-box-container">
          <div class="reply-box">
            <img src="${myObj.currentUser.image.png}" alt="">
            <textarea name="" placeholder="Add a reply" cols="auto" rows="3"></textarea>
            <button type="submit" class="submit-reply-btn">Reply</button>
          </div>
        </div>
      `
      btn.closest('.wrapper').querySelector('.new-box').innerHTML = newBox.innerHTML
      Addreply()
    })
  });
}

function Addreply() {
  let submitReplyBtns = document.querySelectorAll('.submit-reply-btn');
      submitReplyBtns.forEach(btn => {
        btn.addEventListener('click', function(){
          let replyText = btn.closest('.reply-box').querySelector('textarea').value;
          if(replyText == ""){
            return
          }else{
            btn.closest(".reply-box-container").style.display = "none";
            let repwrapper = document.createElement('div')
            repwrapper.innerHTML =`
            <div class="reply-wrapper wrapper">
              <div class="container">
                <div class="score-container">
                  <img class="score-plus"  src="images/icon-plus.svg">
                  <span class="score-value">0</span>
                  <img class="score-less" src="images/icon-minus.svg">
                </div>
                <div class="comment-wrapper">
                  <div class="comment-header">
                    <div class="user-info">
                      <img class="avatar" src="${myObj.currentUser.image.png}" alt="">
                      <p class="user-name">${myObj.currentUser.username}</p>
                      <p class="date-created">${getdate()}</p>
                    </div>
                    <div class="reply-btn" id="reply-btn">
                      <div class=edit-delete-btns>
                        <div class="delete-btn">
                          <img src="images/icon-delete.svg">
                          Delete
                        </div>
                        <div class="edit-btn" id="edit-btn">
                          <img src="images/icon-edit.svg">
                          Edit
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="comment-text">
                    <p id="text" contenteditable="false"><span class="reply-to">@${btn.closest('.wrapper').querySelector('.user-name').innerHTML}</span> ${replyText}</p>
                  </div>     
                  <div class="update-btn"></div>        
                </div>
              </div>
            </div>
            `
            btn.closest('.wrapper').append(repwrapper)
            deleteComment()
            updateComment()
            editComment()
            // scoreUp()
            // scoreDown()
          }
          
        })
      })
}


function scoreUp() {
  const likeBtns = document.querySelectorAll('.score-plus');
  likeBtns.forEach(like => {
    like.addEventListener('click', function scorePlus() {
      let score = like.closest('.score-container').querySelector('.score-value');
      let dislike = like.closest('.score-container').querySelector('.score-less');
      score.innerHTML = parseInt(score.innerHTML) +1
      like.removeEventListener('click', scorePlus)
      dislike.addEventListener('click', function(){
        like.addEventListener('click', scorePlus)       
      })
    });
  });
};

function scoreDown() {
  const dislikeBtns = document.querySelectorAll('.score-less');
  dislikeBtns.forEach(dislike => {
    dislike.addEventListener('click', function scoreLess() {
      let score = dislike.closest('.score-container').querySelector('.score-value');
      let like = dislike.closest('.score-container').querySelector('.score-plus')
      score.innerHTML = parseInt(score.innerHTML) -1
      dislike.removeEventListener('click', scoreLess)
      like.addEventListener('click', function(){
        dislike.addEventListener('click', scoreLess)
      })
    });
  });
};
scoreUp()
scoreDown()