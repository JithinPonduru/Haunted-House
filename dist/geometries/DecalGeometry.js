import{BufferGeometry,Float32BufferAttribute,Matrix4,Vector3}from"three";class DecalGeometry extends BufferGeometry{constructor(t,o,e,r){super();const n=[],s=[],i=[],u=new Vector3,l=new Matrix4;l.makeRotationFromEuler(e),l.setPosition(o);const p=new Matrix4;function c(o,e,r){e.applyMatrix4(t.matrixWorld),e.applyMatrix4(p),r.transformDirection(t.matrixWorld),o.push(new DecalVertex(e.clone(),r.clone()))}function a(t,o){const e=[],n=.5*Math.abs(r.dot(o));for(let r=0;r<t.length;r+=3){let s,i,u,l,p=0;const c=t[r+0].position.dot(o)-n>0,a=t[r+1].position.dot(o)-n>0,f=t[r+2].position.dot(o)-n>0;switch(p=(c?1:0)+(a?1:0)+(f?1:0),p){case 0:e.push(t[r]),e.push(t[r+1]),e.push(t[r+2]);break;case 1:if(c&&(s=t[r+1],i=t[r+2],u=h(t[r],s,o,n),l=h(t[r],i,o,n)),a){s=t[r],i=t[r+2],u=h(t[r+1],s,o,n),l=h(t[r+1],i,o,n),e.push(u),e.push(i.clone()),e.push(s.clone()),e.push(i.clone()),e.push(u.clone()),e.push(l);break}f&&(s=t[r],i=t[r+1],u=h(t[r+2],s,o,n),l=h(t[r+2],i,o,n)),e.push(s.clone()),e.push(i.clone()),e.push(u),e.push(l),e.push(u.clone()),e.push(i.clone());break;case 2:c||(s=t[r].clone(),i=h(s,t[r+1],o,n),u=h(s,t[r+2],o,n),e.push(s),e.push(i),e.push(u)),a||(s=t[r+1].clone(),i=h(s,t[r+2],o,n),u=h(s,t[r],o,n),e.push(s),e.push(i),e.push(u)),f||(s=t[r+2].clone(),i=h(s,t[r],o,n),u=h(s,t[r+1],o,n),e.push(s),e.push(i),e.push(u))}}return e}function h(t,o,e,r){const n=t.position.dot(e)-r,s=n/(n-(o.position.dot(e)-r));return new DecalVertex(new Vector3(t.position.x+s*(o.position.x-t.position.x),t.position.y+s*(o.position.y-t.position.y),t.position.z+s*(o.position.z-t.position.z)),new Vector3(t.normal.x+s*(o.normal.x-t.normal.x),t.normal.y+s*(o.normal.y-t.normal.y),t.normal.z+s*(o.normal.z-t.normal.z)))}p.copy(l).invert(),function(){let o=[];const e=new Vector3,p=new Vector3;if(!0===t.geometry.isGeometry)return void console.error("THREE.DecalGeometry no longer supports THREE.Geometry. Use BufferGeometry instead.");const h=t.geometry,f=h.attributes.position,m=h.attributes.normal;if(null!==h.index){const t=h.index;for(let r=0;r<t.count;r++)e.fromBufferAttribute(f,t.getX(r)),p.fromBufferAttribute(m,t.getX(r)),c(o,e,p)}else for(let t=0;t<f.count;t++)e.fromBufferAttribute(f,t),p.fromBufferAttribute(m,t),c(o,e,p);o=a(o,u.set(1,0,0)),o=a(o,u.set(-1,0,0)),o=a(o,u.set(0,1,0)),o=a(o,u.set(0,-1,0)),o=a(o,u.set(0,0,1)),o=a(o,u.set(0,0,-1));for(let t=0;t<o.length;t++){const e=o[t];i.push(.5+e.position.x/r.x,.5+e.position.y/r.y),e.position.applyMatrix4(l),n.push(e.position.x,e.position.y,e.position.z),s.push(e.normal.x,e.normal.y,e.normal.z)}}(),this.setAttribute("position",new Float32BufferAttribute(n,3)),this.setAttribute("normal",new Float32BufferAttribute(s,3)),this.setAttribute("uv",new Float32BufferAttribute(i,2))}}class DecalVertex{constructor(t,o){this.position=t,this.normal=o}clone(){return new this.constructor(this.position.clone(),this.normal.clone())}}export{DecalGeometry,DecalVertex};