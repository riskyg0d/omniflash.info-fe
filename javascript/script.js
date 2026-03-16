const API = "https://web-production-2a20d.up.railway.app/api/news";

async function loadNews(){

showLoading(true)

try{

const res = await fetch(`${API}/latest`);
const news = await res.json();

renderNews(news)
renderTicker(news)

}catch(e){

document.getElementById("news-container").innerHTML="Error loading news"

}

showLoading(false)

}

function renderNews(news){

const container=document.getElementById("news-container")
container.innerHTML=""

news.forEach(n=>{

const card=document.createElement("div")
card.className="news-card"

card.innerHTML=`
<h3>${n.title}</h3>
<p>Source: ${n.source}</p>
<a href="${n.url}" target="_blank">Read full article</a>
`

container.appendChild(card)

})

}

function renderTicker(news){

const ticker=document.getElementById("ticker")

const breaking = news
.filter(n => n.breaking)
.map(n => "🔴 " + n.title)

const normal = news
.filter(n => !n.breaking)
.map(n => n.title)

const all = [...breaking, ...normal]

ticker.innerText = all.join("   •   ")

}

async function searchNews(){

const keyword=document.getElementById("searchInput").value

showLoading(true)

const res=await fetch(`${API}/search?keyword=${keyword}`)
const news=await res.json()

renderNews(news)

showLoading(false)

}

document.getElementById("categoryFilter").addEventListener("change",async function(){

const category=this.value

if(category===""){
loadNews()
return
}

showLoading(true)

const res=await fetch(`${API}/category/${category}`)
const news=await res.json()

renderNews(news)

showLoading(false)

})

function showLoading(show){

document.getElementById("loading").style.display=show?"block":"none"

}
document.getElementById("sortFilter").addEventListener("change", async function(){

const sort=this.value

const res=await fetch(`${API}/${sort}`)
const news=await res.json()

renderNews(news)
renderTicker(news)

})

loadNews()

setInterval(loadNews,60000)
