varying vec3 vNorm;
varying vec3 vPos;
varying float vDisplacement;

void main(){


  gl_FragColor = vec4( vDisplacement , .5 , .5 , 1.0 );

}
