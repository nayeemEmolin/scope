(() => {
 const $=(s,r=document)=>r.querySelector(s), $$=(s,r=document)=>[...r.querySelectorAll(s)];
 const body=document.body;
 const toggle=$('.menu-toggle'), nav=$('.nav-links');
 if(toggle&&nav) toggle.addEventListener('click',()=>{const open=nav.classList.toggle('open');toggle.setAttribute('aria-expanded',String(open));});
 $$('.nav-links a').forEach(a=>a.addEventListener('click',()=>nav?.classList.remove('open')));
 const langBtn=$('.lang-toggle');
 const translations={
 'Home':'হোম','Courses':'কোর্সসমূহ','About':'আমাদের সম্পর্কে','Current MEAL Course':'বর্তমান MEAL কোর্স','Contact':'যোগাযোগ',
 'Explore courses ↗':'কোর্স দেখুন ↗','Explore courses':'কোর্স দেখুন','Current MEAL training':'বর্তমান MEAL প্রশিক্ষণ','Browse all courses ↗':'সব কোর্স দেখুন ↗','Learn • Build • Grow':'শিখুন • দক্ষতা গড়ুন • এগিয়ে যান',
 'Skills for your next chapter.':'আপনার আগামী অধ্যায়ের জন্য দক্ষতা গড়ুন।','Build practical skills for your next opportunity — from office productivity and data to research and humanitarian work.':'পরবর্তী সুযোগের জন্য ব্যবহারিক দক্ষতা গড়ে তুলুন—অফিসের কাজ, ডেটা বিশ্লেষণ, গবেষণা ও মানবিক সহায়তা কার্যক্রমে।',
 'YOUR NEXT CHAPTER':'আপনার পরবর্তী অধ্যায়','Learn with purpose.':'লক্ষ্য নিয়ে শিখুন।','Skills · Practice · Progress':'দক্ষতা · অনুশীলন · অগ্রগতি','01 / LEARN':'০১ / শিখুন','Build a strong foundation':'শক্ত ভিত্তি তৈরি করুন','02 / APPLY':'০২ / প্রয়োগ করুন','Turn knowledge into practice':'জ্ঞানকে কাজে প্রয়োগ করুন',
 'Current featured course':'বর্তমানে চালু কোর্স','Make your MEAL skills practical.':'MEAL দক্ষতাকে বাস্তব কাজে প্রয়োগ করুন।','The SCOPE approach':'SCOPE-এর শেখার পদ্ধতি','Less theory alone. More skills you can use.':'শুধু তত্ত্ব নয়—বাস্তবে কাজে লাগানোর দক্ষতা।',
 'Frequently asked':'সাধারণ জিজ্ঞাসা','A few useful answers.':'কিছু প্রয়োজনীয় উত্তর।','Find your pathway':'আপনার শেখার পথ বেছে নিন','Practical skills. Professional momentum.':'ব্যবহারিক দক্ষতা। পেশাগত অগ্রগতি।',
 'Search courses or skills…':'কোর্স বা দক্ষতা খুঁজুন…','All categories':'সব বিভাগ','Coming Soon':'শিগগির আসছে','Enrollment information':'ভর্তির তথ্য','Explore planned course ↗':'পরিকল্পিত কোর্স দেখুন ↗','View course ↗':'কোর্স দেখুন ↗','No courses match your search. Try another term or category.':'আপনার খোঁজের সঙ্গে কোনো কোর্স মেলেনি। অন্য শব্দ বা বিভাগ দিয়ে খুঁজুন।',
 'About the course':'কোর্স সম্পর্কে','What you can expect':'যা শিখতে পারবেন','Who should consider this course?':'কারা এই কোর্সটি করতে পারেন?','Registration and course updates':'রেজিস্ট্রেশন ও কোর্সের আপডেট',
 '3 months':'৩ মাস','Online • Live classes':'অনলাইন • সরাসরি ক্লাস','Online • Bangla':'অনলাইন • বাংলা','Live sessions':'লাইভ সেশন',
 'Our purpose':'আমাদের উদ্দেশ্য','Education designed around real careers.':'বাস্তব ক্যারিয়ারকে সামনে রেখে শিক্ষা।','Career-oriented':'ক্যারিয়ারভিত্তিক','Practical by design':'ব্যবহারিকভাবে তৈরি','Growth-minded':'উন্নয়নমুখী',
 'Let’s keep learning.':'চলুন, শেখা চালিয়ে যাই।','Stay connected':'যোগাযোগ রাখুন','Sharpen your skills. Shape your future.':'দক্ষতা বাড়ান। ভবিষ্যৎ গড়ুন।'
 };
 const normalize=s=>s.replace(/\\s+/g,' ').trim();
 const setLang=lang=>{
  body.classList.toggle('bn',lang==='bn');
  if(langBtn){langBtn.textContent=lang==='bn'?'EN':'বাংলা';langBtn.setAttribute('aria-label',lang==='bn'?'Switch to English':'বাংলায় দেখুন');}
  document.documentElement.lang=lang==='bn'?'bn':'en';
  const candidates=$$('a,button,h1,h2,h3,h4,p,li,summary,span,small,b,strong,blockquote,label,option');
  candidates.forEach(el=>{if(el.closest('[aria-hidden="true"]'))return;if(!el.dataset.scopeOriginalText)el.dataset.scopeOriginalText=normalize(el.textContent);});
  candidates.forEach(el=>{
   const original=el.dataset.scopeOriginalText;if(!original)return;
   if(el.parentElement?.closest('[data-scope-translated="true"]'))return;
   if(lang==='bn'&&translations[original]&&!el.children.length){el.textContent=translations[original];el.dataset.scopeTranslated='true';}
   else if(lang==='en'&&el.dataset.scopeOriginalText!==undefined&&!el.children.length){el.textContent=original;delete el.dataset.scopeTranslated;}
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
    const empty=$('[data-empty-state]');if(empty)empty.classList.toggle('hide',list.length>0);if(body.classList.contains('bn'))setLang('bn');
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
