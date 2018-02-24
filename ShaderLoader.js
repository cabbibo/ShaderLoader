
  // Shader Loader will Load any shader you want,
  // And be able to add in large functions ( such as noise )
  // with regex inside the shader
  function ShaderLoader( pathToShaders , pathToChunks ){

    this.fragmentShaders    = {};
    this.vertexShaders      = {};
    this.simulationShaders  = {};

    this.fs = this.fragmentShaders;
    this.vs = this.vertexShaders;
    this.ss = this.simulationShaders;

    this.pathToShaders    = pathToShaders || "/" ;
    this.pathToChunks     = pathToChunks || pathToShaders;

    this.shaderChunks = {};

    this.shadersLoaded = 0;
    this.shadersToLoad = 0;

    this.loader = new THREE.FileLoader();

  }



  /*
   
     Loads in a shader chunk when told to by
     onShaderLoaded.

     it is important to know that the title of the
     chunk needs to be the same as the reference in the shader

     AKA, if I use:

     $simplexNoise

     I will need to create a file in the pathToChunks directory
     called

     simplexNoise.js


  */
  ShaderLoader.prototype.loadShaderChunk = function( type ){

    var path = this.pathToChunks + "/" + type + ".glsl";

    var self = this;

    self.loader.load(path,
      function( data ){
        self.onChunkLoaded( data, type );
      },
      function( xhr ){
        // on progress
      },
      function( error ){
        console.log( 'ERROR: Unable to Load Shader' + path );
        self.onChunkLoaded( " NO SHADER LOADED " , type );
      }
    );

  }
  
  ShaderLoader.prototype.onChunkLoaded = function( chunk , title ){

    this.shaderChunks[title] = chunk;
    
  }
  
  /*
  
     This function Loads a shader with whatever title/
     type we prefer. 

  */
  ShaderLoader.prototype.load = function( shader , title , type ){
 
    var self = this;

    this._beginLoad(  shader , title , type );

    self.loader.load(self.pathToShaders +"/" + shader + ".glsl",
      function(data){
        self.onShaderLoaded( data, title, type );
      }
    );

  }

  /*
   
     Once a Shader is loaded, check to see if there are any extra chunks 
     we need to find and pull in. 

     Will recall itself, until the chunk has been loaded in

  */
  ShaderLoader.prototype.onShaderLoaded = function( shaderText , title , type ){

    var finalShader = shaderText;
    
    var readyToLoad = true;


    var array = finalShader.split( "$" );

    for( var i = 1; i < array.length; i++ ){

      var chunkName = array[i].split("\n")[0];

      if( this.shaderChunks[chunkName] ){

        var tmpShader = finalShader.split( "$" + chunkName );

        finalShader = tmpShader.join( this.shaderChunks[chunkName] );

      }else{

        readyToLoad = false;
        this.loadShaderChunk( chunkName );

      }

    }

    if( readyToLoad ){    
     
      if( type == 'vertex' ){
        this.vertexShaders[ title ] = finalShader;
      }else if( type == 'fragment' ){
        this.fragmentShaders[ title ] = finalShader;
      }else if( type == 'simulation' ){
        this.simulationShaders[ title ] = finalShader;
      }

      this._endLoad( finalShader , title , type );

    }else{

      var self = this;
      setTimeout( function(){
        self.onShaderLoaded( finalShader , title , type )
      }, 300 );

    }

  }


  // might add something later...
  ShaderLoader.prototype._beginLoad = function(  shader , title , type  ){
    this.shadersToLoad ++;
    this.beginLoad( shader , title , type  );
  }
  
  ShaderLoader.prototype._endLoad = function( shaderText , title , type ){
    this.shadersLoaded ++;

    if( this.shadersLoaded == this.shadersToLoad ){
      this.shaderSetLoaded();
    }
    
    this.endLoad( shaderText , title , type  );

  }


  ShaderLoader.prototype.setValue = function( shader , name , value ){

    //console.log( name , value );

    var a = '@'+name;
    //console.log( a );
   
    var replaced = false;

    var newStr = shader.replace( a , function(token){replaced = true; return value;}); 

    console.log( 'replaced' , replaced );
    return newStr;
  
  }

  ShaderLoader.prototype.shaderSetLoaded = function(){}
  ShaderLoader.prototype.endLoad = function(){}
  ShaderLoader.prototype.beginLoad = function(){}
