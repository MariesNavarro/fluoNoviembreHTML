int num = 2;
float radious = 50;
ArrayList<PVector> locs;
ArrayList<PVector> vels;
float threshold = 1.0;
float goo = 1.0;

void setup(){
  size(500, 500);
  pixelDensity(2);
  locs = new ArrayList<PVector>();
  vels = new ArrayList<PVector>();
  for(int i = 0; i < num; i++){
    locs.add(new PVector(random(radious, width - radious), random(radious, height - radious)));
    vels.add(new PVector(random(-10, 10), random(-10, 10)));
  }
}

void draw(){
  background(255);
  stroke(255,0,0);
  for(int h = 0; h < height; h++){
    for(int w = 0; w < width; w++){
      PVector p = new PVector(w, h);
      float sum = 0.0;
      for(PVector loc: locs){
        sum += radious / pow(PVector.sub(loc, p).mag(), goo);
      }
      if(sum > threshold){
        point(w, h);
      }
    }
  }
  for(int i = 0; i < num; i++){
    PVector loc = locs.get(i);
    PVector vel = vels.get(i);
    loc.add(vel);
    if(loc.x < radious){
      vel.x *= -1;
      loc.x += vel.x;
    }
    if(loc.x >= width - radious){
      vel.x *= -1;
      loc.x += vel.x;
    }
    if(loc.y < radious){
      vel.y *= -1;
      loc.y += vel.y;
    }
    if(loc.y >= height - radious){
      vel.y *= -1;
      loc.y += vel.y;
    }
  }
}