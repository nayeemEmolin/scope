(() => {
  const canvas=document.getElementById('universe-canvas');
  if(!canvas)return;
  const host=canvas.parentElement,ctx=canvas.getContext('2d',{alpha:true});
  if(!ctx)return;
  const reduce=window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const coarse=window.matchMedia('(pointer: coarse)').matches;
  const dpr=Math.min(window.devicePixelRatio||1,1.5);
  let width=0,height=0,raf=0,last=0;
  const particles=[],count=coarse?30:54;
  const rand=(a,b)=>a+Math.random()*(b-a);
  function resize(){
    const rect=host.getBoundingClientRect();width=rect.width;height=rect.height;
    canvas.width=Math.round(width*dpr);canvas.height=Math.round(height*dpr);
    ctx.setTransform(dpr,0,0,dpr,0,0);particles.length=0;
    const cx=width*.5,cy=height*.49,limit=Math.min(width,height)*.46;
    for(let i=0;i<count;i++){
      const angle=rand(0,Math.PI*2),radius=rand(55,limit);
      const speed=Math.sqrt(1150/Math.max(radius,50));
      particles.push({x:cx+Math.cos(angle)*radius,y:cy+Math.sin(angle)*radius,
        vx:-Math.sin(angle)*speed,vy:Math.cos(angle)*speed,r:rand(.65,1.5),
        hue:Math.random()>.72?169:210,phase:rand(0,Math.PI*2)});
    }
    draw(0);
  }
  function draw(time){
    ctx.clearRect(0,0,width,height);const cx=width*.5,cy=height*.49;
    const dt=reduce?0:Math.min((time-last)/1000||0,.025);last=time;
    for(const p of particles){
      if(dt){
        const dx=cx-p.x,dy=cy-p.y,dist2=dx*dx+dy*dy+900;
        const a=190/dist2;p.vx+=dx*a*dt;p.vy+=dy*a*dt;
        p.vx*=.999;p.vy*=.999;p.x+=p.vx*dt*18;p.y+=p.vy*dt*18;
        const dx2=p.x-cx,dy2=p.y-cy,limit=Math.min(width,height)*.47;
        if(dx2*dx2+dy2*dy2>limit*limit||!Number.isFinite(p.x+p.y)){
          const angle=rand(0,Math.PI*2),radius=rand(55,limit*.8),speed=Math.sqrt(1150/Math.max(radius,50));
          p.x=cx+Math.cos(angle)*radius;p.y=cy+Math.sin(angle)*radius;p.vx=-Math.sin(angle)*speed;p.vy=Math.cos(angle)*speed;
        }
      }
      const alpha=.22+.32*(.5+.5*Math.sin(time*.00035+p.phase));
      ctx.beginPath();ctx.arc(p.x,p.y,p.r,0,Math.PI*2);
      ctx.fillStyle=p.hue===169?'rgba(22,184,166,'+alpha+')':'rgba(23,105,194,'+alpha+')';ctx.fill();
    }
    if(!reduce)raf=requestAnimationFrame(draw);
  }
  const observer=new IntersectionObserver(entries=>{
    if(entries[0].isIntersecting&&!reduce&&!raf){last=performance.now();raf=requestAnimationFrame(draw);}
    else if(!entries[0].isIntersecting&&raf){cancelAnimationFrame(raf);raf=0;}
  },{threshold:.05});observer.observe(host);
  if('ResizeObserver'in window)new ResizeObserver(resize).observe(host);else window.addEventListener('resize',resize,{passive:true});
  document.addEventListener('visibilitychange',()=>{if(document.hidden&&raf){cancelAnimationFrame(raf);raf=0;}else if(!document.hidden&&!reduce&&raf===0&&host.getBoundingClientRect().bottom>0){last=performance.now();raf=requestAnimationFrame(draw);}});
  resize();
})();