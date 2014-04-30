varying vec3 vNorm;
varying vec3 vPos;
varying float vDisplacement;

$simplex

void main(){

  float displacement = snoise( position );

  vPos = position * ( 1. + .3 * displacement );
  vNorm = normal;
  vDisplacement = displacement;

  vec4 mvPos = modelViewMatrix * vec4( vPos , 1.0 );
  gl_Position = projectionMatrix * mvPos;

}
