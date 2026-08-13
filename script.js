const projects = document.querySelectorAll('.project');
projects.forEach((p,i)=>{
  p.addEventListener('click',()=>{
    alert('Project '+String(i+1).padStart(2,'0')+' — replace this with your project page or gallery.');
  });
});
