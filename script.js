/* Theme toggle: remembers choice, falls back to the system setting */
let saved=null;try{saved=localStorage.getItem('theme')}catch(e){}
root.dataset.theme=saved||(matchMedia('(prefers-color-scheme:dark)').matches?'dark':'light');
$('#theme').onclick=()=>{const t=root.dataset.theme==='dark'?'light':'dark';root.dataset.theme=t;try{localStorage.setItem('theme',t)}catch(e){}};

/* Count-up stats and skill bars: run once when visible */
const io=new IntersectionObserver(es=>es.forEach(e=>{
  if(!e.isIntersecting)return;io.unobserve(e.target);
  const el=e.target;
  if(el.dataset.to){const to=+el.dataset.to,t0=performance.now();
    (function f(t){const p=Math.min((t-t0)/1200,1);el.textContent=Math.round(to*p);if(p<1)requestAnimationFrame(f)})(t0)}
  else el.style.width=el.dataset.level+'%';
}),{threshold:.4});
$$('[data-to],.bar i').forEach(el=>io.observe(el));

/* Project filter + search */
let cat='all';const cards=$$('.card');
function apply(){
  const q=$('#search').value.trim().toLowerCase();let n=0;
  cards.forEach(c=>{
    const ok=(cat==='all'||c.dataset.cat.split(' ').includes(cat))&&(c.dataset.title+' '+c.dataset.tech).toLowerCase().includes(q);
    c.hidden=!ok;if(ok)n++;
  });
  $('#none').style.display=n?'none':'block';
}
$$('.filters button').forEach(b=>b.onclick=()=>{cat=b.dataset.filter;$$('.filters button').forEach(x=>x.setAttribute('aria-pressed',x===b));apply()});
$('#search').oninput=apply;

$('#form').onsubmit=e=>{
  e.preventDefault();$('#ok').hidden=true;
  const okMail=/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test($('#email').value.trim());
  $('#eName').textContent=$('#name').value.trim().length<2?'Enter your name.':'';
  $('#eEmail').textContent=okMail?'':'Enter an email like name@example.com.';
  $('#eMsg').textContent=$('#msg').value.trim().length<10?'Write at least 10 characters.':'';
  if(!$('#eName').textContent&&!$('#eEmail').textContent&&!$('#eMsg').textContent){$('#ok').hidden=false;e.target.reset();$('#count').textContent='0 / 300'}
};
