const eventDate = new Date("2026-09-11T08:00:00-04:00").getTime();
function updateCountdown(){
  const distance=Math.max(0,eventDate-Date.now());
  const values={
    days:Math.floor(distance/86400000),
    hours:Math.floor((distance%86400000)/3600000),
    minutes:Math.floor((distance%3600000)/60000),
    seconds:Math.floor((distance%60000)/1000)
  };
  Object.entries(values).forEach(([id,value])=>{
    const el=document.getElementById(id);
    if(el) el.textContent=String(value).padStart(id==="days"?3:2,"0");
  });
}
updateCountdown();setInterval(updateCountdown,1000);

const menu=document.querySelector(".main-nav");
const toggle=document.querySelector(".menu-toggle");
toggle.addEventListener("click",()=>{
  const open=menu.classList.toggle("open");
  toggle.setAttribute("aria-expanded",String(open));
});
menu.querySelectorAll("a").forEach(a=>a.addEventListener("click",()=>{
  menu.classList.remove("open");toggle.setAttribute("aria-expanded","false");
}));

const details={
 golf:{title:"Friday Golf Outing",body:"Add the confirmed course, tee time, participant fee, sponsorship packages, transportation, dress expectations, and registration deadline."},
 welcome:{title:"Welcome Reception",body:"Add the confirmed venue, arrival time, program outline, attire, parking information, and guest policy."},
 family:{title:"Family Cookout + Basketball Game",body:"Add the confirmed location, start and end times, family activities, food details, basketball format, parking, and weather plan."},
 banquet:{title:"45th Anniversary Banquet",body:"Add the banquet venue, reception time, dinner program, attire, honorees, seating process, accessibility information, and ticket deadline."},
 sunday:{title:"Sunday Worship, Farewell Fellowship + Symposium",body:"Add the worship location and time, farewell fellowship details, and the professional symposium venue, speakers, topics, and evening schedule."}
};
const dialog=document.getElementById("event-dialog");
const content=document.getElementById("dialog-content");
document.querySelectorAll("[data-modal]").forEach(btn=>btn.addEventListener("click",()=>{
  const item=details[btn.dataset.modal];
  content.innerHTML=`<p class="eyebrow">Event Details</p><h2>${item.title}</h2><p>${item.body}</p>`;
  dialog.showModal();
}));
document.querySelector(".dialog-close").addEventListener("click",()=>dialog.close());
dialog.addEventListener("click",e=>{if(e.target===dialog)dialog.close()});
