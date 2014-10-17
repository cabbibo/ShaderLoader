varying vec2 vSEM;

$semLookup

void main(){

 
  vec4 mvPos = modelViewMatrix * vec4( position, 1.0 );
  
  
  vec3 eye = normalize( mvPos.xyz );
  vec3 norm = normalize(normalMatrix * normal);
  
  vSEM = semLookup( eye , norm );

  gl_Position = projectionMatrix * mvPos;

}


