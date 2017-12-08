class Blob{
  PVector pos;
  PVector vel;
  float r;
  Blob(float x, float y){
    pos = new PVector(x,y);
    vel = PVector.random2D();
    vel.mult(random(2,5));
    r = 40;
  }
  
  void update(){
    pos.add(vel);
    if(pos.x > width || pos.x < 0){
      vel.x *= -1;
    }
    if(pos.y > height || pos.y < 0){
      vel.y *= -1;
    }
  }
}