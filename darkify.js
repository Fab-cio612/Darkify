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

//if in light mode turn every element into dark mode
if (getTextDarkness() > 0){
  document.body.querySelectorAll('*').forEach(el => {
    //change colors
    let color = getComputedStyle(el).color;
    let bgColor = getComputedStyle(el).backgroundColor;

    if(el.style.color) {
      if(isDark(color)) el.style.color = getOppositeColor(color);
    }else {
      el.style.color = '#ffffff'
    }
    if(el.style.backgroundColor) {
      if(!isDark(bgColor)) el.style.backgroundColor = getOppositeColor(bgColor);
    }else {
      el.style.backgroundColor = '#121212';
    }
    //remove shadows
    el.style.boxShadow = "none";

    //change border
    let [firstPart, borderColor] = getComputedStyle(el).border.split('rgb');
    if(borderColor) el.style.border = `${firstPart} ${getOppositeColor(borderColor)}`;
  });
}