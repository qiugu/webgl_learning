export {
  vec2, vec3, vec4,
  mat2, mat3, mat4,
  quat
} from './math';

interface IOptions {
  id: string | HTMLCanvasElement;
}

interface WebGLCtx extends WebGLRenderingContext {
  program: WebGLProgram
}

export default class Processer {

  public gl: WebGLCtx;

  constructor(options: IOptions) {
    const { id } = options;

    let gl: WebGLRenderingContext | null = null;

    if (typeof id === 'string') {
      const canvas = document.getElementById(id) as HTMLCanvasElement;
      if (canvas) {
        gl = canvas.getContext('webgl');
      } else {
        throw new Error('selector id' + id + 'is not exist');
      }
    }
    else if (id instanceof HTMLCanvasElement) {
      gl = id.getContext('webgl');
    }
    
    if (gl) {
      this.gl = gl as WebGLCtx;
    } else {
      throw new Error('gl context is not exist!');
    }
  }

  private loadShader(type: number, source: string) {
    const gl = this.gl;
    const shader = gl.createShader(type) as WebGLShader;

    gl.shaderSource(shader, source);
    gl.compileShader(shader);

    if(!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
      console.error(`shader compile failed: ${gl.getShaderInfoLog(shader)}`);
      gl.deleteShader(shader);
      return null;
    }

    return shader;
  }

  public createProgram(vs: string, fs: string): WebGLProgram | null {
    const gl = this.gl;
    const vertexShader = this.loadShader(gl.VERTEX_SHADER, vs);
    const fragmentShader = this.loadShader(gl.FRAGMENT_SHADER, fs);

    if (vertexShader === null || fragmentShader === null) {
      throw new Error('load shader failed');
    }

    const program = gl.createProgram() as WebGLProgram;

    gl.attachShader(program, vertexShader);
    gl.attachShader(program, fragmentShader);
    gl.linkProgram(program);

    if(!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      console.error(`program created failed: ${gl.getProgramInfoLog(program)}`);
      gl.deleteProgram(program);
      return null;
    }

    gl.useProgram(program);
    gl.program = program;

    return program;
  }
}
