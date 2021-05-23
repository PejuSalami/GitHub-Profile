

let repoContainer = document.getElementById("container-repo");
let nameContainer = document.getElementById("user-p");
let fullNameContainer = document.getElementById("name-p");
let bioContainer = document.getElementById("bioDesc");
let imageUrl = document.getElementById("avatar");


let apiQuery ='{' +
              'user(login: "PejuSalami") {' +
                'avatarUrl(size: 120),' +
              'bio,' +
              'name,' +
                'login,' +
                'repositories(first: 20) {' +
                  'totalCount,' +
                  'nodes {' +
                    'name,' +
                    'url,' +
                    'updatedAt,' +
                    'forkCount,' +
                    'stargazerCount,' +
                    'description,' +
                    'languages(first: 1) {' +
                      'edges {' +
                        'node {' +
                          'name' +
                        '}' +
                      '}' +
                    '}' +
                  '}' +
                '}' +
              '}' +
            '}';



            


function fetchGit(){
    fetch("https://api.github.com/graphql",
    {
      method: "POST",
      headers: {
            'Authorization': 'Bearer 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',
            'Content-Type': 'application/json'
        },

      body: JSON.stringify({
        query: apiQuery
      })
    }
  ).then(res => res.json())
  .then(res => {
    var junk = res.data.user; //save user Object

    fullNameContainer.innerHTML = junk.name;
    bioContainer.innerHTML = junk.bio;
    nameContainer.innerHTML = junk.login;
    imageUrl.src = junk.avatarUrl;


    var amount = junk.repositories.totalCount;
    if(amount < 1){
        //U don't have an repos
    }
    else{
      console.log(junk.repositories);
      junk.repositories.nodes.map((item)=>{
        appendNode(item.url, item.name,item.description,item.stargazerCount,item.languages.edges &&item.languages.edges[0].node.name,item.forkCount,getDaysAgo(item.updatedAt))
      });
    }

    console.log(res.data);
});

}
function getDaysAgo(dDate){
  var today = new Date();
  var datDate = new Date(dDate);
  return Math.round((today - datDate) / (1000 * 3600 * 24));
}

function makeNewRepo(link, name,desc,stars,lang,fork,since){
    var template = '<div class="repos">' +
                    '<div class="repo-1">' +
                        '<h3 class="repo-text">' +
                            '<span class="repo-name"> <a href="'+ link +'"> '+name+' </a></span> <br>' +
                            '<span class="repo-dsc"> '+desc+' </span>' +
                            '<span ><button class="star">&#9734;star</button></span>' +
                        '</h3>' +
                        '<div class="item-contain">' +
                        '<div class="lang-container">' +
                        '<span class="lang-contain">' +
                            '<span class="repo-color"></span>' +
                            '<span class="repo-lang">  '+lang+' </span>' +
                        '</span>' +
        
                        '</div>' +
                        '<div class="stars-container">' +
                        '<span class="stars-contain">' +
                          '<span><i class="fa fa-star-o" aria-hidden="true"></i></span>' +
                            '<span class="repo-stars">  '+stars+' </span>' +
                        '</span>' +
        
                        '</div>' +
                        '<div class="fork-container">' +
                        '<span class="fork-contain">' +
                          '<span><i class="fa fa-code-fork" aria-hidden="true"></i></span>' +
                            '<span class="repo-fork">  '+fork+' </span>' +
                        '</span>' +
                        '<span class="lang-contain">' +
                            '<span class="repo-lang">&nbsp &nbsp &nbsp Updated '+since+' days ago</span>' +
                        '</span>' +
                        '</div>' +
                        '</div>' +
                        
                    '</div>' +
              '</div>' +
        '</div>';
    return template;
}
function appendNode(link, name,desc,stars,lang,fork,since){
    var makeNewDiv = document.createElement("div");
    makeNewDiv.innerHTML = makeNewRepo(link, name,desc,stars,lang,fork,since);

    repoContainer.appendChild(makeNewDiv);
}


fetchGit(); // call fetch
