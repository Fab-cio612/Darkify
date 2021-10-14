//check if already dark mode
//if most of the text is in a dark color we can assume it's light mode
function getTextDarkness() {
  let textEls = [
    ...document.getElementsByTagName("h1"),
    ...document.getElementsByTagName("h2"),
    ...document.getElementsByTagName("h3"),
    ...document.getElementsByTagName("h4"),
    ...document.getElementsByTagName("h5"),
    ...document.getElementsByTagName("h6"),
    ...document.getElementsByTagName("p"),
    ...document.getElementsByTagName("span")
  ];
  
  //number that will be used to measure how "dark" the text is overall
  let darkness = 0;
  
  textEls.forEach(c => {
    darkness = isDark(getComputedStyle(c).color) ? darkness + 1 : darkness - 1;
  });
  
  return darkness;
}

function applyDarkMode(el){
  let computedStyle = getComputedStyle(el);

  //change colors
  if(el.style.color){
    el.style.color = getOppositeColor(computedStyle.color);
  }else {
    el.style.color = '#ffffff'
  }

  if(el.style.backgroundColor){
    el.style.backgroundColor = getOppositeColor(computedStyle.backgroundColor);
  }else {
    el.style.backgroundColor = '#121212';
  }
   //remove shadows
   el.style.boxShadow = "none";

   //change border
   let [firstPart, borderColor] = computedStyle.border.split('rgb');
   if(borderColor) el.style.border = `${firstPart} ${getOppositeColor(borderColor)}`;

   //repeat for children
   for(let c of el.children){
     applyDarkMode(c);
   }
}

//if in light mode turn every element into dark mode
if (getTextDarkness() > 0){
  applyDarkMode(document.getElementsByTagName('body')[0]);
}