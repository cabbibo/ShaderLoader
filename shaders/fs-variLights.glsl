const int lights = @LIGHTS;

uniform vec3 lightPositions[ lights ];
uniform vec3 lightColors[ lights ];

uniform sampler2D t_matcap;

varying vec2 vSEM;
varying vec4 vMPos;
varying vec3 vNorm;
varying vec3 vEye;
varying vec3 vCam;


void main(){

  vec4 matcap = texture2D( t_matcap , vSEM );

  vec3 tCol = vec3( 0. );

  for( int i = 0; i < lights; i++ ){

    vec3 lightDir = normalize( lightPositions[ i ] - vMPos.xyz );
    vec3 camDir = normalize( vCam - vMPos.xyz );

    vec3 c = lightColors[ i ];


    vec3 r = reflect( normalize(lightDir) , normalize(vNorm) );

    float eyeMatch =max( 0.  ,dot(normalize( camDir) , normalize( -r) ));

    tCol += pow(eyeMatch, 100. )*c;

  }
 
  gl_FragColor = vec4( tCol , 1. ); //vec4( tCol * matcap.xyz , 1. );


}
