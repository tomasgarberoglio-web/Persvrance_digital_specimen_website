let grille = 28; let marge = 40; let sound; let amp; let font; let font1; let fft; let textsize = 42

let colorListe = [59,327,277,267]; let colorChoisi = 0;
let colorListeFi = [59,327,277,267]; let colorChoisiFi = 0; 
 // Exemple de couleur en HSL (colorMode(HSL) est activé) :
// fill(h, s, l) -> h: teinte 0-360, s: saturation 0-100, l: luminosité 0-100

let fontListe = []; let FontListe = [];
let caractereChoisi = 0; let fontChoisi = 0; let FontChoisi = 0;
let liste = ['a','b','c','d','e','f','g','h','i','j','k','l','m'];
let Liste = ['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z'];
let chiffres = ['0','1','2','3','4','5','6','7','8','9'];
let chiffreChoisi = 0;
let grille4Size = 28;
let marge4 = 40;
let presetGrille4 = 0;



let Grille = 0;


function preload(){
  sound = loadSound('sound/strudel.mp3');

  font = loadFont('Polices/Persvrance-SymbolesDot.otf');
  font1 = loadFont('Polices/Persvrance-SymbolesCarre.otf');
  font2 = loadFont('Polices/Persvrance-SymbolesCarreFusion.otf');
  font3 = loadFont('Polices/Persvrance-SymbCarreFusion-SemiBold.otf');
  font4 = loadFont('Polices/Persvrance-SymbCarreFusion-Bold.otf');
  font5 = loadFont('Polices/Persvrance-SymbCarreFusion-Black.otf');
  font6 = loadFont('Polices/Persvrance-SymbCarreFusion-BlackPlus.otf');

  Font = loadFont('Polices/Persvrance-Dot.otf');
  Font1 = loadFont('Polices/Persvrance-Carre.otf');
  Font2 = loadFont('Polices/Persvrance-Fusion-Regular.otf');
  Font3 = loadFont('Polices/Persvrance-Fusion-SemiBold.otf');
  Font4 = loadFont('Polices/Persvrance-Fusion-Black.otf');
  Font5 = loadFont('Polices/Persvrance-Carre45-regular.otf');
  Font6 = loadFont('Polices/Persvrance-Carre45Fusion.otf');
  Font7 = loadFont('Polices/Persvrance-Carre45Fusion-SemiBold.otf');
  Font8 = loadFont('Polices/Persvrance-Carre45Fusion-Black.otf');
}

function setup() {
    colorMode(HSL); angleMode(DEGREES); ellipseMode(CENTER); textAlign(CENTER,CENTER);
    createCanvas(windowWidth, windowHeight,WEBGL); frameRate(10);
    // rectMode(CENTER)
    amp = new p5.Amplitude();
    fft = new p5.FFT();
    fontListe = [font, font1, font2, font3, font4, font5, font6];
    FontListe = [Font, Font1, Font2, Font3, Font4, Font5, Font6, Font7, Font8];
}

let zoom =0.009; let temps =0;

function draw() {
   translate(-width/2,-height/2)
//let spectrum = fft.getEnergy();
   background(0)
    let bass, lowMid, mid, highMid, treble;
 fft.analyze();
//ici on obtient que des valeurs entre 0 et 255  

if (Grille === 0) {
  grille1();
} 
else if (Grille === 1) {
  grille2();
} 
else if (Grille === 2) {
  grille3(); 
}
else if (Grille === 3) {        
  grille4();    
}       
}

function mousePressed(){
 let lecture = sound.isPlaying();
 if(lecture == false){
  sound.play()
 }    
}

function keyPressed(){
  if (key === 'a' || key === 'A') {
  Grille++; Grille = Grille % 4;
  }
  if (key === 'f' || key === 'F') {
  fontChoisi++; fontChoisi = fontChoisi % fontListe.length;
  FontChoisi++; FontChoisi = FontChoisi % FontListe.length; 
}
  if(key=='arrowleft' || key=='ArrowLeft'){
   caractereChoisi++; caractereChoisi = caractereChoisi % liste.length;
   }
if(key=='arrowright' || key=='ArrowRight'){
   colorChoisi++; colorChoisi = colorChoisi % colorListe.length;
   colorChoisiFi++; colorChoisiFi = colorChoisiFi % colorListeFi.length;
}
if (Grille === 3 && key === 'ArrowLeft') {
  chiffreChoisi = (chiffreChoisi + 1) % chiffres.length;
}
if (Grille === 3 && (key === 'g' || key === 'G')) {
  presetGrille4++;
  presetGrille4 = presetGrille4 % 3;

  if (presetGrille4 === 0) {
    grille4Size = 28;
    marge4 = 40;
  }

  if (presetGrille4 === 1) {
    grille4Size = 42;
    marge4 = 80;
  }

  if (presetGrille4 === 2) {
    grille4Size = 66;
    marge4 = 120;
  }
}

}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

function grille1(){
 let zoom =0.004; let level = amp.getLevel(); let bass;
 fft.analyze();
 bass = fft.getEnergy("bass");
 let bassConverti = map(bass,0,255,0,1)
 temps = temps+level*0.5;
 let rota= mouseX*0.5+mouseX*0.5
 background(0)
 for (let x = marge; x <width-marge; x+=grille) { for (let y = marge; y<height-marge; y+=grille) {
    //  fill(random(frameCount*1.5)) 
    let seed = x*y; let paramX=zoom*x; let paramY=zoom*y; let noise2d = noise(paramX,paramY,temps)*grille*2
    let treshold = noise(paramX,paramY,temps)
    // let s = noise(seed+frameCount*0.01)*grille*2
    fill(0)
    textSize(noise2d*0.6)
    // ellipse(x,y,noise2d)
    //   textSize(noise2d)
    // textFont(font)
    // text("6",x,y)

    if (treshold > 0.5) {   
    push()
    textFont(fontListe[fontChoisi]); rectMode(CENTER); textAlign(CENTER,CENTER); translate( x-grille/4+21, y-grille/4-5);
    let angle = atan2(mouseY - y, mouseX - x);
    rotateZ(angle);
    //  rotateZ(rota+noise2d*5)
    //   square(0, 0, 25) // carré centré, rotation OK
  
    let hue = (frameCount * 2 + degrees(angle)) % 360;
    fill(hue, 100, 80) 
    text(liste[caractereChoisi],-14,noise2d*0.5)
    pop()
    }
    else if(treshold>0.4){
    push()    
    rectMode(CENTER); textAlign(CENTER,CENTER); translate( x-grille/4+21, y-grille/4-5);
    let angle = atan2(mouseY - y, mouseX - x);
    rotateZ(angle);
    textFont(fontListe[fontChoisi]);
    // textSize(30)
    let hue = (frameCount * 2 + degrees(angle)) % 360;
    fill(hue, 80, 45) 
    text(liste[caractereChoisi],-14,noise2d*0.5)
    pop()
    }
    else{  
    push()   
    rectMode(CENTER); textAlign(CENTER,CENTER);
    translate( x-grille/4+21, y-grille/4-5)
    let angle = atan2(mouseY - y, mouseX - x);
    rotateZ(angle);
    textFont(fontListe[fontChoisi]);
    // textSize(30)
    let hue = (frameCount * 2 + degrees(angle)) % 360;
    fill(hue, 40, 20) 
    text(liste[caractereChoisi],-14,noise2d*0.5)
    pop()
    }
   }
 }
}


function grille2(){
let level = amp.getLevel(); let bass;
fft.analyze();
bass = fft.getEnergy("bass");
let bassConverti = map(bass,0,255,0,1)
temps = temps+level*0.5;
for (let x = marge+60; x <width-marge; x+=grille+80) {
for (let y = marge+60; y<height-marge; y+=grille+80) {
let paramX=x*zoom; let paramY =y*zoom;
//   let paramX=x*zoom;
// let paramY =y*zoom;
strokeWeight(3)
let noise3d = noise(paramX,paramY,temps)*360; let treshold = noise(paramX,paramY,temps)

if(mouseX>200){
  caractereChoisi++; caractereChoisi = caractereChoisi % liste.length;
  colorChoisi++; colorChoisi = colorChoisi % colorListe.length; 
  }
//fill(180,0,noise3d,0.9)
noStroke(); push(); rectMode(CENTER) ;textAlign(CENTER,CENTER) ;translate( x-grille/4+21, y-grille/4-5) ; 
rotateY(mouseX*0.5)
//   rotateX(noise3d)
//   square(0,0,grille-1)
//    circle(grille/2,grille/2,10)
textSize(noise3d*0.2)*bassConverti*10
//  textSize(30)
textFont(fontListe[fontChoisi]);
fill(colorListe[colorChoisi],100,50)
text(liste[caractereChoisi],-16.5,1)
pop()    
  }
 }
}

function grille3(){
let level = amp.getLevel(); let bass; let mid; fft.analyze();
  mid = fft.getEnergy("mid");
  bass = fft.getEnergy("bass");
  let midConverti = map(mid,0,255,0,1); let bassConverti = map(bass,0,255,0,1)
  temps = temps+level*0.5;
  //   for (let x = marge+60; x <width-marge; x+=grille+100) {
  //    for (let y = marge+60; y<height-marge; y+=grille+100) {
  for (let x = marge; x <width-marge; x+=mouseX/10+grille) {
  for (let y = marge; y<height-marge; y+=mouseX/10+grille) {
  let paramX=x*zoom; let paramY =y*zoom;
  //   let paramX=x*zoom;
  // let paramY =y*zoom;
  strokeWeight(3)
  let noise3d = noise(paramX,paramY,temps)*360; let treshold = noise(paramX,paramY,temps)
  //fill(180,0,noise3d,0.9)
  fill(360,100,50)
  noStroke()
textSize(noise3d*0.5)
 if (treshold > 0.5) {   
  push()
  rectMode(CENTER); textAlign(CENTER,CENTER) ; translate( x-grille/4+21, y-grille/4-5)
  //  rotateY(noise3d)
  //   rotateX(noise3d)
  //   square(0,0,grille-1)
  fill(colorListe[colorChoisi], 100, 50) 
  //   circle(-16.5,1,bassConverti*26)
  //  textSize(textsize*bassConverti*2)
  //  textSize(30)
  textFont(fontListe[fontChoisi]);
  //  fill(360,100,50)
  textSize(bassConverti*42)
  text('c',-16.5,1)
  pop()
  if (bassConverti > 0.8) {    
   fontChoisi++; fontChoisi = fontChoisi % fontListe.length; 
  FontChoisi++; FontChoisi = FontChoisi % FontListe.length; 
  
  }    

}
      
 else if(treshold>0.4){
  push()
  rectMode(CENTER); textAlign(CENTER,CENTER); translate( x-grille/4+21, y-grille/4-5)
  //  rotateY(noise3d)
  //   rotateX(noise3d)
  //   square(0,0,grille-1)
  fill(0)
  //    circle(grille/2,grille/2,10)
  textSize(30)
  textFont(fontListe[fontChoisi]);
  //  fill(bassConverti*360,100,50)
  //  fill(60,100,50)

  if (midConverti > 0.5) {    
  fill(327,100,50)
  textSize(42)
  text(Liste[caractereChoisi],-16.5,1)
     caractereChoisi++; caractereChoisi = caractereChoisi % liste.length;
  
  }    

   
  else {
    fill(59,100,50)
  textSize(42)
  text(Liste[caractereChoisi],-16.5,1)
  }
  pop()
}

else{

  fill(277,100,50)
  textSize(42)
 text(Liste[caractereChoisi],-16.5,1)
   
         }
      }
    }
  }

  function grille4(){
    
  let level = amp.getLevel(); let bass;
  fft.analyze();
  bass = fft.getEnergy("bass");
  let bassConverti = map(bass,0,255,0,1)
  temps = temps+level*0.5;
for (let x = marge4; x < width - marge4; x += grille4Size){
for (let y = marge4; y < height - marge4; y += grille4Size) {
  let paramX=x*zoom; let paramY =y*zoom;
  //   let paramX=x*zoom;
  // let paramY =y*zoom;
         strokeWeight(3)
  let noise3d = noise(paramX,paramY,temps)*360; let treshold = noise(paramX,paramY,temps)

  //     if(mouseY>200){
  //    caractereChoisi++; caractereChoisi = caractereChoisi % Liste.length;
  //    caractereChoisi++; caractereChoisi = caractereChoisi % liste.length;
  //    colorChoisi++; colorChoisi = colorChoisi % colorListe.length;
     
  //  }
  // fill(180,0,noise3d,0.9)
  noStroke();
  push()
  rectMode(CENTER); textAlign(CENTER,CENTER) ; translate( x-grille/4+21, y-grille/4-5); 
  // rotateY(mouseX*0.3)
  //   rotateX(noise3d)
  //   square(0,0,grille-1)
  //    circle(grille/2,grille/2,10)
  textSize(noise3d*0.22)
  //  textSize(30)
fill(colorListe[colorChoisi],noise3d,noise3d*0.2)
 textFont(FontListe[FontChoisi]);
   if(mouseX>200){
     caractereChoisi++; caractereChoisi = caractereChoisi % liste.length;
     colorChoisi++; colorChoisi = colorChoisi % colorListe.length;
   }
 // zone 1 → lettres
if (mouseX <= 600) {
  text(Liste[caractereChoisi], -16.5, 1);
}

// zone 2 → chiffres qui changent
else if (mouseX > 600 && mouseX <= 1000) {
  chiffreChoisi++;
  chiffreChoisi = chiffreChoisi % chiffres.length;

  text(chiffres[chiffreChoisi], -16.5, 1);
}

// zone 3 → chiffres figés
else if (mouseX > 1000) {
  fill(colorListeFi[colorChoisiFi],noise3d,noise3d*0.2)
  text(chiffres[chiffreChoisi], -16.5, 1);
  
}


//   if (key === 'c') {
//   textFont(FontListe[FontChoisi]);
//   text(Liste[caractereChoisi],-16.5,1)
// }
//  if (key === 'x') {
//   textFont(fontListe[fontChoisi]);
//   text(liste[caractereChoisi],-16.5,1)
// }
 pop()
}
}
}

