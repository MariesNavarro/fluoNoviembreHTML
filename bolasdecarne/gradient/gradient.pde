void setup(){
  size(1200, 980);
}

void draw(){
  background(51);
  loadPixels();
  for(int x = 0; x < width; x++){
    for(int y = 0; y < height; y++){
      int i = x + y * width;
      pixels[i] = color(x,0,y);
    }
  }
  updatePixels();
}