Blob [] blobs = new Blob[1];

void setup() {
  background(51);
  size(1200, 980);
  for (int i = 0; i<blobs.length; i++) {
    blobs[i] = new Blob(random(width), random(height));
  }
}

void draw() {
  
  loadPixels();
  for (int x = 0; x < width; x++) {
    for (int y = 0; y < height; y++) {
      int i = x + y * width;
      float sum = 0;
      for (Blob b : blobs) {
        float d = dist(x, y, b.pos.x, b.pos.y); 
        sum += 200 * b.r/d;
      }
       pixels[i] = color(sum,0, sum);
    }
  }
  updatePixels();
  for (Blob b : blobs) {
    b.update();
  }
}