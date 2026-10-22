(() => {
 const $=(s,r=document)=>r.querySelector(s), $$=(s,r=document)=>[...r.querySelectorAll(s)];
 const body=document.body;
 const toggle=$('.menu-toggle'), nav=$('.nav-links');
 if(toggle&&nav) toggle.addEventListener('click',()=>{const open=nav.classList.toggle('open');toggle.setAttribute('aria-expanded',String(open));});
 $$('.nav-links a').forEach(a=>a.addEventListener('click',()=>nav?.classList.remove('open')));
 const langBtn=$('.lang-toggle');
 const setLang=lang=>{
  body.classList.toggle('bn',lang==='bn');
  if(langBtn){langBtn.textContent=lang==='bn'?'EN':'বাংলা';langBtn.setAttribute('aria-label',lang==='bn'?'Switch to English':'বাংলায় দেখুন');}
  const translations={
    'Home':'হোম','Courses':'কোর্সসমূহ','About':'আমাদের সম্পর্কে','Current MEAL Course':'বর্তমান MEAL কোর্স','Contact':'যোগাযোগ',
    'Explore courses ↗':'কোর্স দেখুন ↗','Explore courses':'কোর্স দেখুন','Current MEAL training':'বর্তমান MEAL প্রশিক্ষণ',
    'Browse all courses ↗':'সব কোর্স দেখুন ↗','View current course ↗':'বর্তমান কোর্স দেখুন ↗',
    'Open course registration platform ↗':'কোর্স রেজিস্ট্রেশন পেজ খুলুন ↗','Register / View details ↗':'রেজিস্ট্রেশন / বিস্তারিত ↗',
    'Learn • Build • Grow':'শিখুন • দক্ষতা গড়ুন • এগিয়ে যান',
    'Sharpen your skills. Shape your future.':'দক্ষতা বাড়ান। ভবিষ্যৎ গড়ুন।',
    'Stay connected':'যোগাযোগ রাখুন','Find your pathway':'আপনার শেখার পথ বেছে নিন',
    'Practical skills. Professional momentum.':'ব্যবহারিক দক্ষতা। পেশাগত অগ্রগতি।'
  };
  $$('a,button,h1,h2,h3,summary').forEach(el=>{
    if(!el.dataset.originalText)el.dataset.originalText=el.textContent.trim();
    const original=el.dataset.originalText;
    if(lang==='bn' && translations[original])el.textContent=translations[original];
    else if(lang==='en')el.textContent=original;
  });
  try{localStorage.setItem('scope-lang',lang)}catch(e){}
};
 if(langBtn){let initial='en';try{initial=localStorage.getItem('scope-lang')||'en'}catch(e){}setLang(initial);langBtn.addEventListener('click',()=>setLang(body.classList.contains('bn')?'en':'bn'));}
 const observer=('IntersectionObserver'in window)?new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting){e.target.classList.add('visible');observer.unobserve(e.target)}}),{threshold:.12}):null;
 $$('.reveal').forEach(el=>observer?observer.observe(el):el.classList.add('visible'));
 const year=$('[data-year]');if(year)year.textContent=new Date().getFullYear();
 // Populate course cards on pages that provide a course grid.
 const grid=$('[data-course-grid]');
 if(grid&&window.SCOPE_COURSES){
   const search=$('[data-course-search]'),filter=$('[data-course-filter]');
   const render=()=>{
    const q=(search?.value||'').toLowerCase().trim(),cat=filter?.value||'all';
    const list=window.SCOPE_COURSES.filter(c=>(cat==='all'||c.category===cat)&&(`${c.title} ${c.category} ${c.summary}`).toLowerCase().includes(q));
    grid.innerHTML=list.map(c=>`<article class="course-card reveal visible" data-course="${c.id}"><div class="course-icon" aria-hidden="true">${c.icon}</div><div class="meta"><span class="pill">${c.category}</span><span class="pill ${c.status==='soon'?'soon':''}">${c.status==='open'?'Enrollment information':'Coming Soon'}</span></div><h3>${c.title}</h3><p>${c.summary}</p><div class="meta"><span class="pill">${c.duration}</span><span class="pill">${c.fee}</span></div><div class="card-bottom"><a class="text-link" href="${window.location.pathname.includes('/courses/') ? '' : 'courses/'}${c.id}.html">${c.status==='open'?'View course ↗':'Explore planned course ↗'}</a>${c.status==='open'?'<span aria-label="Enrollment information available">●</span>':''}</div></article>`).join('');
    const empty=$('[data-empty-state]');if(empty)empty.classList.toggle('hide',list.length>0);
   };
   search?.addEventListener('input',render);filter?.addEventListener('change',render);render();
 }
 // Course detail pages read their course id from body data attribute.
 const detail=$('[data-course-detail]');
 if(detail&&window.SCOPE_COURSES){
  const c=window.SCOPE_COURSES.find(x=>x.id===detail.dataset.courseDetail);
  if(c){
   const put=(sel,val)=>{const el=$(sel,detail);if(el)el.textContent=val};
   put('[data-title]',c.title);put('[data-summary]',c.description);put('[data-category]',c.category);put('[data-duration]',c.duration);put('[data-fee]',c.fee);put('[data-mode]',c.mode);
   const icon=$('[data-icon]',detail);if(icon)icon.textContent=c.icon;
   const list=$('[data-highlights]',detail);if(list)list.innerHTML=c.highlights.map(x=>`<li>${x}</li>`).join('');
   const soon=c.status==='soon';
   const badge=$('[data-status]',detail);if(badge){badge.textContent=soon?'Coming Soon':'Current Course';badge.classList.toggle('soon',soon)}
   const cta=$('[data-course-cta]',detail);
   if(cta){if(soon){cta.textContent='Course details coming soon';cta.classList.add('disabled');cta.setAttribute('aria-disabled','true');cta.removeAttribute('href')}else{cta.href=c.url;cta.textContent='Go to registration ↗'}}
   const note=$('[data-course-note]',detail);if(note)note.textContent=soon?'This course is planned. Dates, fees and registration will be announced after confirmation.':'The existing course platform contains the current registration information and next steps.';
  }
 }
 // Optional Apps Script registration form. Endpoint is not configured by default.
 const form=$('[data-scope-registration]');
 if(form)form.addEventListener('submit',async e=>{
  e.preventDefault();const status=$('[data-form-status]');const endpoint=window.SCOPE_CONFIG?.appsScriptUrl||'';
  const data=Object.fromEntries(new FormData(form).entries());
  if(!form.reportValidity())return;
  if(data.website){if(status){status.textContent='Unable to submit this form.';status.className='form-status show error'}return;}
  if(!endpoint){if(status){status.textContent='The registration form is designed, but its Google Sheets connection is not configured yet. Please use the existing registration platform, or ask the site administrator to deploy the Apps Script endpoint.';status.className='form-status show error'}return;}
  const submit=$('[type="submit"]',form);if(submit){submit.disabled=true;submit.textContent='Submitting…'}
  try{
    await fetch(endpoint,{method:'POST',mode:'no-cors',headers:{'Content-Type':'application/x-www-form-urlencoded;charset=UTF-8'},body:new URLSearchParams(data).toString()});
    form.reset();if(status){status.textContent='Your form has been sent. Please check with the course team if you need confirmation.';status.className='form-status show success'}
  }catch(err){if(status){status.textContent='Submission could not be completed. Please try again or use the existing course registration link.';status.className='form-status show error'}}
  finally{if(submit){submit.disabled=false;submit.textContent='Submit registration'}}
 });
})();
