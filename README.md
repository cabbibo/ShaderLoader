ShaderLoader
=====

A Utility to help you keep your shaders in seperate files. 
Please open an issue if you see bugs / how to make things better!

If you make something using this, hit me up at isaaclandoncohen@gmail.com , or via twitter @Cabbibo

Also helps to keep long utility functions, such as simplex noise
out of shader files.

Basic Usage
=====

Include the neccesary scripts. Currently ShaderLoader uses jquery for AJAX calls. Sorry about that...

```
<script src="path/to/ShaderLoader.js"></script>
<script src="path/to/jquery.min.js"></script>
```

Initialize the ShaderLoader:

```
var pathToShaders = 'path/to/shaders';
var pathToChunks  = 'path/to/chunks';
var shaders = new ShaderLoader( pathToShaders , pathToChunks );
```

Create your shaders!

```
var vertShader  = shaders.load( 'vert.js' , 'VERT'  , 'vertex'      );
var fragShader  = shaders.load( 'frag.js' , 'FRAG'  , 'fragment'    );
var simShader   = shaders.load( 'sim.js'  , 'SIM'   , 'simulation'  );
```


Once they are loaded they will become part of the `shaders` object,

```
var vert  = shaders.vertexShaders.VERT;
var frag  = shaders.fragmentShaders.FRAG;
var sim   = shaders.simulationShaders.SIM;
```

NOW GO MAKE SOME PRETTY SHIT!

More Info
=====

Using Shader Chunks
----

When creating a shader, you can add function defines that come from different files. It is important to note that ShaderLoader will look for the shader in the 'pathToChunks' directory. 

```
// Inside frag.js
varying vec3 vPos;

// Will look for simplex.js in the 'pathToChunks' directory
$simplex

void main(){

  float noise = simplex( vPos );
  gl_FragColor = vec4( noise , 1.0 );

}
```



Loading
----

ShaderLoader will call a `beginLoad` and `endLoad` at the beginning and ending 
every shader load. Thus, if you've got a loading bar, you can rewrite these
functions, to do what you need for your loading needs.

Remember that you can also access the total number of shaders that the ShaderLoader 
has loaded by accessing the `shadersLoaded` attribute.

Additionally, everytime a new shader is loaded, the attribute `shadersToLoad` is incremented.

As well, if you want to, there is a function called `shaderSetLoaded` that you can change, 
which is called called when `this.shadersToLoad == this.shadersLoaded` .
This function works perfectly if you are loading all your shaders at once, but can get a bit hairy
if you are doing tso in different parts of your program

For example, if I want to wait until all the shaders are loaded to initialize my scene, I might do the following:

```
var shaders = new ShaderLoader( 'pathTo/Shaders' , 'pathTo/Chunks' );

shaders.shaderSetLoaded = function(){
  init();
}

shaders.load( 'frag.js' , 'FRAGMORTION' , 'fragment'    );
shaders.load( 'vert.js' , 'VERTICAL'    , 'vertex'      );
shaders.load( 'sim.js'  , 'SIMULACRA'   , 'simulation'  );

// All Our Fancy Scene Stuff
function init(){}
```
