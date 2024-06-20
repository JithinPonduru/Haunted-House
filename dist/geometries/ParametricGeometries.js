import{Curve,Vector3}from"three";import{ParametricGeometry}from"./ParametricGeometry.js";const ParametricGeometries={klein:function(t,s,e){let a,o;s*=Math.PI,t*=2*Math.PI,(s*=2)<Math.PI?(a=3*Math.cos(s)*(1+Math.sin(s))+2*(1-Math.cos(s)/2)*Math.cos(s)*Math.cos(t),o=-8*Math.sin(s)-2*(1-Math.cos(s)/2)*Math.sin(s)*Math.cos(t)):(a=3*Math.cos(s)*(1+Math.sin(s))+2*(1-Math.cos(s)/2)*Math.cos(t+Math.PI),o=-8*Math.sin(s));const n=-2*(1-Math.cos(s)/2)*Math.sin(t);e.set(a,n,o)},plane:function(t,s){return function(e,a,o){const n=e*t,r=a*s;o.set(n,0,r)}},mobius:function(t,s,e){t-=.5;const a=2*Math.PI*s,o=Math.cos(a)*(2+t*Math.cos(a/2)),n=Math.sin(a)*(2+t*Math.cos(a/2)),r=t*Math.sin(a/2);e.set(o,n,r)},mobius3d:function(t,s,e){t*=Math.PI,s*=2*Math.PI;const a=(t*=2)/2;let o=.125*Math.cos(s)*Math.cos(a)-.65*Math.sin(s)*Math.sin(a);const n=.125*Math.cos(s)*Math.sin(a)+.65*Math.sin(s)*Math.cos(a),r=(2.25+o)*Math.sin(t);o=(2.25+o)*Math.cos(t),e.set(o,r,n)}};ParametricGeometries.TubeGeometry=class extends ParametricGeometry{constructor(t,s=64,e=1,a=8,o=!1){const n=s+1,r=t.computeFrenetFrames(s,o),c=r.tangents,i=r.normals,h=r.binormals,M=new Vector3;super((function(s,a,o){a*=2*Math.PI;const r=Math.floor(s*(n-1));t.getPointAt(s,M);const c=i[r],m=h[r],u=-e*Math.cos(a),P=e*Math.sin(a);M.x+=u*c.x+P*m.x,M.y+=u*c.y+P*m.y,M.z+=u*c.z+P*m.z,o.copy(M)}),s,a),this.tangents=c,this.normals=i,this.binormals=h,this.path=t,this.segments=s,this.radius=e,this.segmentsRadius=a,this.closed=o}},ParametricGeometries.TorusKnotGeometry=class extends ParametricGeometries.TubeGeometry{constructor(t=200,s=40,e=64,a=8,o=2,n=3){const r=e,c=a;super(new class extends Curve{getPoint(s,e=new Vector3){const a=e;s*=2*Math.PI;const r=(1+.5*Math.cos(n*s))*Math.cos(o*s),c=(1+.5*Math.cos(n*s))*Math.sin(o*s),i=.5*Math.sin(n*s);return a.set(r,c,i).multiplyScalar(t)}},r,s,c,!0,!1),this.radius=t,this.tube=s,this.segmentsT=e,this.segmentsR=a,this.p=o,this.q=n}},ParametricGeometries.SphereGeometry=class extends ParametricGeometry{constructor(t,s,e){super((function(s,e,a){s*=Math.PI,e*=2*Math.PI;var o=t*Math.sin(s)*Math.cos(e),n=t*Math.sin(s)*Math.sin(e),r=t*Math.cos(s);a.set(o,n,r)}),s,e)}},ParametricGeometries.PlaneGeometry=class extends ParametricGeometry{constructor(t,s,e,a){super((function(e,a,o){const n=e*t,r=a*s;o.set(n,0,r)}),e,a)}};export{ParametricGeometries};