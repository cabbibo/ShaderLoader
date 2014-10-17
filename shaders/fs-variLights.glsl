const int lights = @LIGHTS;

uniform vec3 lightPositions[ lights ];
uniform vec3 lightColors[ lights ];

uniform sampler2D t_matcap;

varying vec2 vSEM;
varying vec4 vMPos;
varying vec3 vNorm;
varying vec3 vEye;

void main(){

  vec4 matcap = texture2D( t_matcap , vSEM );

  vec3 tCol = vec3( 0. );

  for( int i = 0; i < lights; i++ ){

    vec3 p = lightPositions[ i ];
    vec3 c = lightColors[ i ];

    vec3 d = vMPos.xyz - p;

    vec3 r = reflect( normalize(d) , normalize(vNorm) );

    float eyeMatch = dot( normalize( vEye) , normalize( r) );

    float dt = max( 0. , dot( normalize(vNorm) , normalize(d) ));

    float val = min( 1. , pow((5. / length( d )),2.) );

    tCol += pow(eyeMatch, 180. )*c;

  }
 
  gl_FragColor = vec4( tCol , 1. ); //vec4( tCol * matcap.xyz , 1. );


}
