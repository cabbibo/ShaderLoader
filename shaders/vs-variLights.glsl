
varying vec2 vSEM;
varying vec4 vMPos;
varying vec3 vNorm;
varying vec3 vEye;
varying vec3 vCam;

$semLookup

void main(){

   
  vec4 vMPos = modelMatrix * vec4( position, 1.0 );
  vec4 mvPos = modelViewMatrix * vec4( position, 1.0 );
  
  vEye = normalize( mvPos.xyz );
  vNorm = normalize( normalMatrix * normal);

  
  vCam = cameraPosition;

  vSEM = semLookup( vEye , vNorm );

  gl_Position = projectionMatrix * mvPos;
  

}
