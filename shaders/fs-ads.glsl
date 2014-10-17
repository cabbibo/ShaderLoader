
  uniform vec3 ambientLightColor;
  uniform vec3 diffuseLightColor;
  uniform vec3 specularLightColor;

  uniform vec3 ambientMaterialColor;
  uniform vec3 diffuseMaterialColor;
  uniform vec3 specularMaterialColor;

  uniform vec3 lightPosition;
  uniform float shininess;

  varying vec3 vNorm;
  varying vec3 vPos;

  vec3 ADSLightModel( vec3 norm , vec3 pos , vec3 cameraPos ){


    // seting up light vectors
    vec3 normv = normalize( norm );
    vec3 lightv = normalize( lightPosition - pos );
    vec3 viewv = normalize( cameraPos - pos );
    vec3 halfv = normalize( normalize( lightPosition ) + normalize( cameraPos )); 

    vec3 reflectionv = reflect( -lightv , norm );


    // Setting up colors
    vec3 ambientColor = ambientLightColor * ambientMaterialColor;
    vec3 diffuseColor = diffuseLightColor * diffuseMaterialColor;
    vec3 specularColor = specularLightColor * specularMaterialColor;
    
    // Manipulation 
    diffuseColor *= max( 0.0 , dot( lightv , norm ));

    specularColor *= pow( max( 0.0 , dot( normv , halfv ) ),shininess) ;


    return clamp( diffuseColor + ambientColor + specularColor , 0.0 , 1.0 );

  }

  void main(){

    vec3 color = ADSLightModel( vNorm , vPos , cameraPosition );
    gl_FragColor = vec4( color , 1.0 );

  }

