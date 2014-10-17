
uniform sampler2D t_matcap;

varying vec2 vSEM;

void main(){

  vec4 color = texture2D( t_matcap , vSEM );
  gl_FragColor = color;

}

