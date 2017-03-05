window.FPS = 30;
window.WIDTH = 800;
window.HEIGHT = 600;

window.INTERVAL = parseInt(1000 / window.FPS);
window.WAIT_FRAME = parseInt(4500 / window.INTERVAL);
window.PLAYER_HIT_SAFE_FRAME = parseInt(3000 / window.INTERVAL); 

window.NORTH = 0;
window.SOUTH = 1;
window.WEST = 2;
window.EAST = 3;
window.CENTER = 4;

window.RED = 0;
window.CRI = 1;
window.VIOLET = 2;
window.PLAYER_OFFSET_Y = 0;
window.PLAYER_GENDER = "male";

window.is_draw_rect = false;