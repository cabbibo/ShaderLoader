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
var vertShader  = shaders.load( 'vert.glsl' , 'VERT'  , 'vertex'      );
var fragShader  = shaders.load( 'frag.glsl' , 'FRAG'  , 'fragment'    );
var simShader   = shaders.load( 'sim.glsl'  , 'SIM'   , 'simulation'  );
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

Shorthand
----

If you are as lazy as me, you hate writing fragmentShader possibly even more than I do. Because of this, there is some shorthand. Also it makes for neatly aligned vertical lines

```
// After code is loaded

var vert = shaders.vs.VERT;
var frag = shaders.fs.FRAG;
var sim  = shaders.ss.SIM;

```


Using Shader Chunks
----

When creating a shader, you can add function defines that come from different files. It is important to note that ShaderLoader will look for the shader in the 'pathToChunks' directory. 

```
// Inside frag.glsl
varying vec3 vPos;

// Will look for simplex.glsl in the 'pathToChunks' directory
$simplex

void main(){

  float noise = simplex( vPos );
  gl_FragColor = vec4( noise , 1.0 );

}
```

Replacing Text Inside Shaders
----

Sometimes when you have a shader, you will want to replace text, so that the shader knows a bit more about the actual object it is working with. This is especially important when you are doing simulations, so that each particle knows about every other particle. Because you cannot use uniforms to change the length of for loops in glsl, you need to specifically define it. To do this, all you need to do is provide a 'hook' inside of your shader using the '@' symbol

```
// Inside sim.glsl
const int size  = @SIZE;

```

Than, later in your code, when you know what you want the size to be, change it by using:

```
var st = 1;
var s = shaders.setValue( shaders.ss.SIM , 'SIZE' , st );
```

Remember that because of the fact that you need a '.' for floats, you may have to do something such as


```
  
// Inside sim.glsl
const float size  = @SIZE;

// Inside index.html
var st = 1 + ".";
var s = shaders.setValue( shaders.ss.SIM , 'SIZE' , st );

```

If you have any ideas on how to make this better, let me know!!!




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

shaders.load( 'frag.glsl' , 'FRAGMORTION' , 'fragment'    );
shaders.load( 'vert.glsl' , 'VERTICAL'    , 'vertex'      );
shaders.load( 'sim.glsl'  , 'SIMULACRA'   , 'simulation'  );

// All Our Fancy Scene Stuff
function init(){}
```
