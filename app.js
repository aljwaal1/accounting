
let progress = parseInt(localStorage.getItem('progress')) || 0;

function updateProgress(){
document.getElementById('progress').innerText='التقدم: '+progress+'%';
}
updateProgress();

function loadHome(){
document.getElementById('app').innerHTML=`
<div class='card'><h2>🏠 الرئيسية</h2><p>تابع التعلم</p></div>`;
progress+=2;save();
}

async function loadArticles(){
document.getElementById('app').innerHTML='<div class="card">جاري تحميل المقالات...</div>';

try{
const url="https://acc.explapp.com/feeds/posts/default?alt=json";
const res=await fetch(url);
const data=await res.json();

let posts=data.feed.entry;
let html="<h2>📚 المقالات</h2>";

posts.forEach(p=>{
html+=`<div class='card'><h3>${p.title.$t}</h3>
<button onclick="openArticle(\`${encodeURIComponent(p.content.$t)}\`)">فتح</button></div>`;
});

document.getElementById('app').innerHTML=html;
progress+=5;save();

}catch(e){
document.getElementById('app').innerHTML="<div class='card'>خطأ في تحميل المقالات</div>";
}
}

function openArticle(content){
document.getElementById('app').innerHTML=`
<div class='card'>${decodeURIComponent(content)}
<hr>
<button onclick='loadQuiz()'>🧪 اختبار مرتبط</button>
</div>`;
}

function loadQuiz(){
document.getElementById('app').innerHTML=`
<div class='card'>
<h3>سؤال: ما هو IAS 2؟</h3>
<button onclick='answer(true)'>المخزون</button>
<button onclick='answer(false)'>الأصول الثابتة</button>
</div>`;
}

function answer(correct){
if(correct) progress+=10;
save();
document.getElementById('app').innerHTML+=
`<p>${correct?'✅ صحيح':'❌ خطأ'}</p><button onclick='loadArticles()'>رجوع</button>`;
}

function save(){
localStorage.setItem('progress',progress);
updateProgress();
}
