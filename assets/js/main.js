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
 'Let’s keep learning.':'চলুন, শেখা চালিয়ে যাই।','Stay connected':'যোগাযোগ রাখুন','Sharpen your skills. Shape your future.':'দক্ষতা বাড়ান। ভবিষ্যৎ গড়ুন।',
 '100% online · Practical learning · Bangla-friendly experience':'১০০% অনলাইন · ব্যবহারিক শিক্ষা · বাংলা-বান্ধব অভিজ্ঞতা','Learning pathways':'শেখার বিষয়সমূহ','100% Online learning':'১০০% অনলাইন শিক্ষা','Bangladesh-focused':'বাংলাদেশকেন্দ্রিক','Room to grow':'এগিয়ে যাওয়ার সুযোগ','Practical learning':'ব্যবহারিক শিক্ষা','Live & recorded learning pathways':'লাইভ ও রেকর্ডেড ক্লাস','Skills for real-world work':'বাস্তব কাজের উপযোগী দক্ষতা','Certificate on course completion*':'কোর্স সম্পন্ন করলে সনদ*',
 'Explore SCOPE':'SCOPE সম্পর্কে জানুন','Learn what you need to do your best work.':'কাজে আরও ভালো করতে প্রয়োজনীয় দক্ষতা শিখুন।','Choose a pathway that fits your career goals. Current offerings and planned courses are clearly labelled so you always know what is available.':'আপনার ক্যারিয়ার লক্ষ্যের সঙ্গে মানানসই কোর্স বেছে নিন। চালু ও পরিকল্পিত কোর্সগুলো আলাদাভাবে চিহ্নিত করা হয়েছে।',
 'Practical MEAL Training':'প্র্যাকটিক্যাল MEAL প্রশিক্ষণ','Monitoring, Evaluation, Accountability & Learning for NGO and humanitarian professionals.':'এনজিও ও মানবিক সহায়তা খাতের পেশাজীবীদের জন্য মনিটরিং, মূল্যায়ন, জবাবদিহি ও শেখার প্রশিক্ষণ।','View current course ↗':'চলমান কোর্স দেখুন ↗','Computer Skills for Office Work':'অফিসের কাজের জন্য কম্পিউটার দক্ষতা','Practical computer and productivity skills for everyday professional office work.':'দৈনন্দিন পেশাগত কাজের জন্য কম্পিউটার ও উৎপাদনশীলতার ব্যবহারিক দক্ষতা।','MIS for Development Professionals':'উন্নয়ন পেশাজীবীদের জন্য MIS','Understand management information systems, structured data and reporting workflows.':'ম্যানেজমেন্ট ইনফরমেশন সিস্টেম, সাজানো ডেটা ও রিপোর্টিংয়ের কার্যপ্রবাহ সম্পর্কে জানুন।','Data Analytics: Excel & Power BI':'ডেটা অ্যানালিটিক্স: Excel ও Power BI','Turn raw data into clear tables, dashboards and actionable insights.':'কাঁচা ডেটা থেকে পরিষ্কার টেবিল, ড্যাশবোর্ড ও সিদ্ধান্ত-সহায়ক তথ্য তৈরি করুন।','Python & SQL for Data Analysis':'ডেটা বিশ্লেষণে Python ও SQL','An introduction to data preparation and analysis using Python and SQL.':'Python ও SQL দিয়ে ডেটা প্রস্তুত ও বিশ্লেষণের পরিচিতি।','Research Methods: SPSS, R & Report Writing':'গবেষণা পদ্ধতি: SPSS, R ও রিপোর্ট লেখা','Build research skills from study design and analysis to proposal and report writing.':'গবেষণা পরিকল্পনা ও বিশ্লেষণ থেকে প্রস্তাবনা ও রিপোর্ট লেখা পর্যন্ত দক্ষতা গড়ে তুলুন।',
 'Build practical Monitoring, Evaluation, Accountability & Learning skills for NGO and humanitarian work.':'এনজিও ও মানবিক সহায়তা কার্যক্রমে MEAL-এর ব্যবহারিক দক্ষতা গড়ে তুলুন।','Office Skills':'অফিস দক্ষতা','Data Analytics':'ডেটা অ্যানালিটিক্স','Research':'গবেষণা','To be announced':'পরে জানানো হবে','Online':'অনলাইন','Current Course':'চলমান কোর্স','Course details coming soon':'কোর্সের বিস্তারিত শিগগির প্রকাশ করা হবে','Go to registration ↗':'রেজিস্ট্রেশন করতে যান ↗','Explore planned course ↗':'পরিকল্পিত কোর্স দেখুন ↗',
 'A practical, Bangla-medium course designed for NGO and humanitarian professionals, project staff, MEAL/M&E practitioners, and development-sector job seekers.':'এনজিও ও মানবিক সহায়তা খাতের পেশাজীবী, প্রকল্পকর্মী, MEAL/M&E কর্মী ও উন্নয়ন খাতের চাকরিপ্রার্থীদের জন্য বাংলায় পরিচালিত ব্যবহারিক কোর্স।','MEAL frameworks and project indicators':'MEAL কাঠামো ও প্রকল্পের সূচক','Monitoring tools and data collection':'মনিটরিং টুল ও ডেটা সংগ্রহ','Accountability, feedback and learning':'জবাবদিহি, মতামত ও শেখার প্রক্রিয়া','Practical reporting and data use':'ব্যবহারিক রিপোর্টিং ও ডেটার ব্যবহার',
 'Education designed around real careers.':'বাস্তব ক্যারিয়ারকে সামনে রেখে শিক্ষা।','SCOPE stands for School for Career-Oriented Professional Education — an online learning initiative focused on practical skills for Bangladesh’s future professionals.':'SCOPE-এর পূর্ণরূপ School for Career-Oriented Professional Education। এটি বাংলাদেশের ভবিষ্যৎ পেশাজীবীদের ব্যবহারিক দক্ষতা গড়ে তোলার একটি অনলাইন উদ্যোগ।','Help students, job holders and development practitioners build confidence with tools and methods they can apply in professional settings.':'শিক্ষার্থী, চাকরিজীবী ও উন্নয়নকর্মীদের পেশাগত কাজে প্রয়োগযোগ্য টুল ও পদ্ধতি ব্যবহারে আত্মবিশ্বাসী হতে সহায়তা করা।','Our learning pathways span office productivity, Monitoring, Evaluation, Accountability & Learning (MEAL), management information systems, data analytics and research methods.':'আমাদের শেখার বিষয়গুলোর মধ্যে রয়েছে অফিসের কাজ, MEAL, ম্যানেজমেন্ট ইনফরমেশন সিস্টেম, ডেটা অ্যানালিটিক্স ও গবেষণা পদ্ধতি।','Learning pathways mapped to professional tasks and real-world needs.':'পেশাগত কাজ ও বাস্তব প্রয়োজন অনুযায়ী শেখার বিষয়।','Tools, examples and workflows that help learners apply what they learn.':'শেখা বিষয় কাজে প্রয়োগে সহায়ক টুল, উদাহরণ ও কার্যপ্রবাহ।','A platform that can expand as new courses and learning opportunities become available.':'নতুন কোর্স ও শেখার সুযোগ তৈরি হলে সম্প্রসারণযোগ্য একটি প্ল্যাটফর্ম।',
 'For course information, upcoming batches and learning updates, connect with SCOPE through its official Facebook page.':'কোর্সের তথ্য, পরবর্তী ব্যাচ ও শেখার আপডেটের জন্য SCOPE-এর অফিসিয়াল Facebook পেজে যোগাযোগ করুন।','Visit SCOPE on Facebook ↗':'Facebook-এ SCOPE দেখুন ↗','Course questions?':'কোর্স সম্পর্কে প্রশ্ন আছে?','For the current Practical MEAL Training, use the course page to review available details and proceed to the existing registration platform.':'চলমান Practical MEAL Training-এর বিস্তারিত দেখতে এবং বিদ্যমান রেজিস্ট্রেশন প্ল্যাটফর্মে যেতে কোর্স পেজটি দেখুন।','Before registering':'রেজিস্ট্রেশনের আগে','Check the course schedule, fee, format and any requirements listed on the relevant course page. Upcoming courses are not yet accepting registrations.':'কোর্স পেজে দেওয়া সময়সূচি, ফি, পদ্ধতি ও শর্ত দেখে নিন। পরিকল্পিত কোর্সগুলোর রেজিস্ট্রেশন এখনো শুরু হয়নি।',
 'Find your pathway':'আপনার শেখার পথ বেছে নিন','Practical skills. Professional momentum.':'ব্যবহারিক দক্ষতা। পেশাগত অগ্রগতি।','Browse the SCOPE course catalogue. Upcoming courses are marked clearly and are not yet open for registration.':'SCOPE-এর কোর্স তালিকা দেখুন। ভবিষ্যতের কোর্সগুলোর রেজিস্ট্রেশন এখনো চালু হয়নি।','Search courses or skills…':'কোর্স বা দক্ষতা খুঁজুন…','Search courses':'কোর্স খুঁজুন','Filter by category':'বিভাগ অনুযায়ী বাছাই করুন','All categories':'সব বিভাগ','No courses match your search. Try another term or category.':'আপনার অনুসন্ধানের সঙ্গে কোনো কোর্স মেলেনি। অন্য শব্দ বা বিভাগ দিয়ে চেষ্টা করুন।',
 'About the course':'কোর্স সম্পর্কে','What you can expect':'কী শিখতে পারবেন','Who should consider this course?':'কারা এই কোর্সটি করতে পারেন?','Registration and course updates':'রেজিস্ট্রেশন ও কোর্সের আপডেট','Current featured course':'বর্তমান প্রধান কোর্স','3 months':'৩ মাস','Online • Bangla':'অনলাইন • বাংলা','Live sessions':'লাইভ ক্লাস','Course at a glance':'এক নজরে কোর্স','Duration':'মেয়াদ','Course fee':'কোর্স ফি','Delivery':'পদ্ধতি','Language':'ভাষা','Platform':'প্ল্যাটফর্ম','Check the linked registration platform for the latest batch dates, deadlines and instructions.':'পরবর্তী ব্যাচের তারিখ, শেষ সময় ও নির্দেশনার জন্য সংযুক্ত রেজিস্ট্রেশন প্ল্যাটফর্ম দেখুন।','Open course registration platform ↗':'কোর্স রেজিস্ট্রেশন প্ল্যাটফর্ম খুলুন ↗','Register / View details ↗':'রেজিস্ট্রেশন / বিস্তারিত দেখুন ↗','This page links to the existing course registration platform. It does not itself confirm a registration or payment.':'এই পেজটি বিদ্যমান রেজিস্ট্রেশন প্ল্যাটফর্মে নিয়ে যায়। এই পেজ নিজে রেজিস্ট্রেশন বা পেমেন্ট নিশ্চিত করে না।','Keep growing':'এগিয়ে চলুন','Explore the next learning pathway.':'পরবর্তী শেখার বিষয়টি দেখুন।','Other SCOPE courses are planned and will be announced when their details are confirmed.':'SCOPE-এর অন্যান্য কোর্স পরিকল্পনাধীন। বিস্তারিত নিশ্চিত হলে ঘোষণা করা হবে।','Explore course catalogue ↗':'কোর্স তালিকা দেখুন ↗',
 'The registration form is designed, but its Google Sheets connection is not configured yet. Please use the existing registration platform, or ask the site administrator to deploy the Apps Script endpoint.':'রেজিস্ট্রেশন ফর্মটি তৈরি করা হয়েছে, তবে Google Sheets সংযোগ কনফিগার করা হয়নি। অনুগ্রহ করে বিদ্যমান রেজিস্ট্রেশন প্ল্যাটফর্ম ব্যবহার করুন অথবা সাইট অ্যাডমিনিস্ট্রেটরের সঙ্গে যোগাযোগ করুন।','Unable to submit this form.':'ফর্মটি জমা দেওয়া যাচ্ছে না।','Submitting…':'জমা দেওয়া হচ্ছে…','Your form has been sent. Please check with the course team if you need confirmation.':'আপনার ফর্ম পাঠানো হয়েছে। নিশ্চিতকরণ প্রয়োজন হলে কোর্স টিমের সঙ্গে যোগাযোগ করুন।','Submission could not be completed. Please try again or use the existing course registration link.':'ফর্ম জমা দেওয়া যায়নি। আবার চেষ্টা করুন অথবা বিদ্যমান রেজিস্ট্রেশন লিংক ব্যবহার করুন।','Submit registration':'রেজিস্ট্রেশন জমা দিন'

 };
 const normalize=s=>s.replace(/\s+/g,' ').trim();
 const setLang=lang=>{
  body.classList.toggle('bn',lang==='bn');
  if(langBtn){langBtn.textContent=lang==='bn'?'EN':'বাংলা';langBtn.setAttribute('aria-label',lang==='bn'?'Switch to English':'বাংলায় দেখুন');}
  document.documentElement.lang=lang==='bn'?'bn':'en';
  const candidates=$$('a,button,h1,h2,h3,h4,p,li,summary,span,small,b,strong,blockquote,label,option');
  candidates.forEach(el=>{
   if(el.closest('[aria-hidden="true"]'))return;
   if(!el.dataset.scopeOriginalText){el.dataset.scopeOriginalText=normalize(el.textContent);el.dataset.scopeOriginalHtml=el.innerHTML;}
  });
  candidates.forEach(el=>{
   const original=el.dataset.scopeOriginalText;if(!original)return;
   if(el.parentElement?.closest('[data-scope-translated="true"]'))return;
   if(lang==='bn'&&translations[original]){
    el.textContent=translations[original];el.dataset.scopeTranslated='true';
   }else if(lang==='en'&&el.dataset.scopeOriginalHtml!==undefined){
    el.innerHTML=el.dataset.scopeOriginalHtml;delete el.dataset.scopeTranslated;
   }
  });
  $('input[placeholder],input[aria-label],select[aria-label]').forEach(el=>{
   if(el.dataset.scopeOriginalPlaceholder===undefined&&el.hasAttribute('placeholder'))el.dataset.scopeOriginalPlaceholder=el.getAttribute('placeholder');
   if(el.dataset.scopeOriginalAria===undefined&&el.hasAttribute('aria-label'))el.dataset.scopeOriginalAria=el.getAttribute('aria-label');
   if(lang==='bn'){
    const p=el.dataset.scopeOriginalPlaceholder;if(p&&translations[p])el.setAttribute('placeholder',translations[p]);
    const a=el.dataset.scopeOriginalAria;if(a&&translations[a])el.setAttribute('aria-label',translations[a]);
   }else{if(el.dataset.scopeOriginalPlaceholder!==undefined)el.setAttribute('placeholder',el.dataset.scopeOriginalPlaceholder);if(el.dataset.scopeOriginalAria!==undefined)el.setAttribute('aria-label',el.dataset.scopeOriginalAria);}
  });
  if(!document.documentElement.dataset.scopeOriginalTitle)document.documentElement.dataset.scopeOriginalTitle=document.title;
  if(lang==='bn')document.title=({'Courses | SCOPE':'কোর্সসমূহ | SCOPE','About SCOPE':'SCOPE সম্পর্কে','Contact SCOPE':'যোগাযোগ | SCOPE','Practical MEAL Training | SCOPE':'প্র্যাকটিক্যাল MEAL প্রশিক্ষণ | SCOPE'}[document.documentElement.dataset.scopeOriginalTitle]||document.documentElement.dataset.scopeOriginalTitle);
  else document.title=document.documentElement.dataset.scopeOriginalTitle;
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
