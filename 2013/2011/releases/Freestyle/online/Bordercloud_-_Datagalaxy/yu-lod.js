var imageObjWaiting=null;var canvas=null;var canvas_legend=null;var ctx=null;var ctx_tooltip=null;var rotation=0;var processusWaiting=null;var messageWaiting="Waiting...";var graph=null;var datasetSelected=null;var doc_datasets=null;var doc_links=null;var requestGetDatasetJson=null;var requestGetLinksetJson=null;function init_lod(g,b){imageObjWaiting=document.getElementById("canvas-image-wait");canvas=document.getElementById("lod");canvas_legend=document.getElementById("lod_legend");canvas_tooltip=document.getElementById("lod_tooltip");var e=document.getElementById("logohtml");var f=document.getElementById("logo");var a=document.body.clientHeight-10;var d=document.body.clientWidth;canvas.setAttribute("width",d);canvas.setAttribute("height",a);canvas_legend.setAttribute("width",d);canvas_legend.setAttribute("height",a);canvas_tooltip.setAttribute("width",d);canvas_tooltip.setAttribute("height",a);f.style.position="fixed";f.style.top=a-200;f.style.left=10;f.style.zIndex="3";e.style.position="fixed";e.style.top=a-70;e.style.left=10;e.style.zIndex="3";ctx=canvas.getContext("2d");ctx_tooltip=canvas_tooltip.getContext("2d");var c=new LegendeLOD(canvas_legend);c.draw();processusWaiting=setInterval(waiting,20);requestGetDatasetJson=g;requestGetLinksetJson=b;download_datasets()}document.onmousemove=function(h){if(graph!=null){var l,g;if(h.layerX||h.layerX==0){l=h.layerX;g=h.layerY}else{if(h.offsetX||h.offsetX==0){l=h.offsetX;g=h.offsetY}}var c=null;if(graph.datasetArray.length==0){return}ctx_tooltip.clearRect(0,0,1500,1000);for(var d=0;d<graph.datasetArray.length;d++){var b=graph.datasetArray[d];var a=b.x;var j=b.y;var m=Math.pow(Math.abs(a-l),2)+Math.pow(Math.abs(j-g),2);var e=Math.pow(b.meta.circleRadius,2);if(Math.pow(b.meta.circleRadius,2)>=Math.pow(Math.abs(a-l),2)+Math.pow(Math.abs(j-g),2)){c=b;var f=new ToolTipLOD(ctx_tooltip,b.meta.label,a,j,b.meta.circleRadius,"Arial 16px",16,"#000000");f.draw();break}}}if(c!=null){document.body.style.cursor="pointer";datasetSelected=c}else{document.body.style.cursor="default";datasetSelected=null}};document.onclick=function(a){if(datasetSelected!=null){window.open(datasetSelected.meta.iri,"_blank")}};function download_datasets(){var req=new XMLHttpRequest();req.open("GET",requestGetDatasetJson,true);req.onreadystatechange=function(aEvt){if(req.readyState==4){if(req.status==200||req.status==0){if(req.responseText==""){messageWaiting="Error : The domain in the query is different of Web site...";return}doc_datasets=eval("("+req.responseText+")");messageWaiting="Reading the datasets...";download_links()}else{messageWaiting="Error loading page"}}};req.send(null)}function download_links(){var req=new XMLHttpRequest();req.open("GET",requestGetLinksetJson,true);req.onreadystatechange=function(aEvt){if(req.readyState==4){if(req.status==200||req.status==0){if(req.responseText==""){messageWaiting="Error : The domain in the query is different of Web site...";return}doc_links=eval("("+req.responseText+")");messageWaiting="Reading the links...";init_graph()}else{messageWaiting="Error loading page"}}};req.send(null)}function waiting(){var e=ctx.canvas.width/2;var b=ctx.canvas.height/2;var c=65;var d=65;var a=e-c/2;var f=b-d/2;ctx.clearRect(0,0,ctx.canvas.width,ctx.canvas.height);ctx.save();ctx.translate(e,b);rotation-=2;ctx.rotate(rotation*Math.PI/64);ctx.drawImage(imageObjWaiting,-c/2,-d/2);ctx.restore();ctx.textAlign="center";ctx.textBaseline="middle";ctx.fillStyle="#474754";ctx.font="30px arial";ctx.fillText(messageWaiting,e,b+d/2+50)}function init_graph(){clearInterval(processusWaiting);graph=new GraphLOD("http://en.sparql.pro/wiki/Special:URIResolver/DBpedia");for(var e=0;e<doc_datasets.results.bindings.length;e++){var b=doc_datasets.results.bindings[e];var g=b.numberOfTriples!=null?b.numberOfTriples.value:0;graph.addDataset(new DatasetLOD(b.dataset.value,b.label.value,b.dataset.value,g,b.typeDataset.value))}for(var e=0;e<doc_links.results.bindings.length;e++){var b=doc_links.results.bindings[e];var f=graph.containsDataset(b.subset.value);var d=graph.containsDataset(b.target.value);if(f!=-1&&d!=-1){graph.addConnection(f,d,b.triples.value)}}var c=new Springs(canvas,false);c.setGraphLOD(graph);c.start()}function GraphLOD(a){this.datasetArray=[];this.connectionArray=[];this.iriDatasetCenter=a}GraphLOD.prototype.addDataset=function(a){var c=this.datasetArray.push({})-1;var b=this.datasetArray[c];b.meta=a;return c};GraphLOD.prototype.containsDataset=function(b){var a=this.datasetArray.length;while(a--){if(this.datasetArray[a].meta.iri===b){return a}}return -1};GraphLOD.prototype.addConnection=function(b,f,e){var a=0;for(var c=DatasetLOD.legendArrow.length-1;c>=0;c--){var d=DatasetLOD.legendArrow[c];if(e>=d[0]){a=d[2];break}}this.connectionArray.push([this.datasetArray[b],this.datasetArray[f],a])};function Springs(a,b){this.canvas=a;this.ctx=a.getContext("2d");this.frame=0;this.graph=new GraphLOD();this.gravity=b}Springs.prototype.start=function(){var a=this;this.interval=setInterval(function(){a.draw()},100)};Springs.prototype.stop=function(){clearInterval(this.interval)};Springs.prototype.reset=function(){this.setGraphLOD(this.graph)};Springs.prototype.setGraphLOD=function(d){this.graph=d;var c=this.ctx.canvas.width;var a=this.ctx.canvas.height;if(this.graph.datasetArray.length==0){return}this.stop();this.frame=1;var g=this.ctx.canvas.width/2;var f=this.ctx.canvas.height/2;for(var b=0;b<this.graph.datasetArray.length;b++){var e=this.graph.datasetArray[b];e.x=b+g;e.y=b+f;e.lines=e.meta.setContext(this.ctx);if(this.graph.iriDatasetCenter==e.meta.iri){this.graph.datasetArray[b].x=this.ctx.canvas.width/2;this.graph.datasetArray[b].y=this.ctx.canvas.height/2;if(this.gravity){this.graph.datasetArray[b].y=this.ctx.canvas.height/8}}}};Springs.prototype.recalc=function(){var d=this.ctx.canvas.width;var s=this.ctx.canvas.height;var c=Math.log(this.frame+1)*100;this.frame++;k=400;if(this.frame>=400000){this.stop()}for(var o=0;o<this.graph.datasetArray.length;o++){var q=this.graph.datasetArray[o];q.vx=0;if(this.gravity){q.vy=10}else{q.vy=0}q.x+=q.vx;q.y+=q.vy;for(var i=0;i<this.graph.datasetArray.length;i++){if(o==i){continue}var r=this.graph.datasetArray[i];var f=q.x-r.x;var b=q.y-r.y;var l=Math.pow(f*f+b*b,0.5);if(l==0){continue}var g=k*k/(l*l*c);q.vx+=f*g;q.vy+=b*g}}for(var j=0;j<this.graph.connectionArray.length;j++){var m=this.graph.connectionArray[j];var f=m[0].x-m[1].x;var b=m[0].y-m[1].y;var l=Math.pow(f*f+b*b,0.5);if(l==0){continue}var g=l*l/k/c;var a=f*g;var p=b*g;m[0].vx-=a;m[0].vy-=p;m[1].vx+=a;m[1].vy+=p}for(var o=0;o<this.graph.datasetArray.length;o++){var q=this.graph.datasetArray[o];if(this.graph.iriDatasetCenter==q.meta.iri){continue}var l=q.vx*q.vx+q.vy*q.vy;var n=10;if(this.frame>20){n=0.8}if(l>n*n){l=Math.pow(l,0.5);q.vx*=n/l;q.vy*=n/l}q.x+=q.vx;q.y+=q.vy}for(var o=0;o<this.graph.datasetArray.length;o++){var q=this.graph.datasetArray[o];if(this.graph.iriDatasetCenter==q.meta.iri){continue}var h=q.meta.circleRadius;if(q.x<=h){q.x=h}else{if(q.x>=d-h){q.x=d-h}}if(q.y<=h){q.y=h}else{if(q.y>=s-h){q.y=s-h}}}};Springs.prototype.draw=function(){this.width=this.ctx.canvas.width;this.height=this.ctx.canvas.height;for(var f=0;f<5;f++){this.recalc()}this.ctx.clearRect(0,0,this.width,this.height);if(this.graph.datasetArray.length==0){return}for(var f=0;f<this.graph.connectionArray.length;f++){var b=this.graph.connectionArray[f];var l=b[0].x;var h=b[0].y;var r=b[1].x;var q=b[1].y;var p=new arrowLOD(this.ctx,l,h,b[0].meta.circleRadius,r,q,b[1].meta.circleRadius,b[2],"#474754");p.draw()}for(var f=0;f<this.graph.datasetArray.length;f++){var d=this.graph.datasetArray[f];var o=d.x;var m=d.y;var n=d.meta.label;var a=new circleLOD(this.ctx,o,m,d.meta.circleRadius,d.meta.circleColor,d.meta.circleColorBorder);a.draw();var t=d.meta.lines;var s=d.meta.lines.length;if(s>0){var g=(t[0][3]+t[0][4]);var c=m-(g/2)*(d.meta.lines.length-1);for(var e=0;e<t.length;e++){var n=new LabelLOD(this.ctx,t[e][0],o,c+g*e,t[0][1],t[0][2]);n.draw()}}}};function DatasetLOD(e,c,d,a,b){this.iri=e;this.label=c;this.link=d;this.nbTriple=a;this.iriCategory=b;this.category="";this.circleRadius=70;this.circleColor="#FFF0B5";this.circleColorBorder="#44E2CA";this.textPolice=DatasetLOD.textPolice;this.textSize=DatasetLOD.textSize;this.textColor=DatasetLOD.textColor;this.lines=null;this.setContext=function(g){for(var j=DatasetLOD.legendDatasetSize.length-1;j>=0;j--){var h=DatasetLOD.legendDatasetSize[j];if(this.nbTriple>=h[0]){this.circleRadius=h[2];break}}var l=DatasetLOD.legendCategory;for(var j=0;j<l.length;j++){var f=l[j];if(this.iriCategory==f[0]){this.circleColor=f[2];this.circleColorBorder=f[3];this.category=f[1];break}}this.lines=Tools.getLinesReduce(g,this.label,this.circleRadius-3,this.textPolice,this.textSize,this.textColor)}}DatasetLOD.textPolice="Arial";DatasetLOD.textSize=16;DatasetLOD.textColor="#000000";DatasetLOD.legendCategory=[["http://en.sparql.pro/wiki/Special:URIResolver/Category:Media","Media","#E6EEFE","#5192D6"],["http://en.sparql.pro/wiki/Special:URIResolver/Category:Geographic","Geographic","#FFF0B5","#C59E79"],["http://en.sparql.pro/wiki/Special:URIResolver/Category:Publications","Publications","#E4FED3","#30DC7D"],["http://en.sparql.pro/wiki/Special:URIResolver/Category:User_generated_content","User-generated content","#FFECDF","#FF845F"],["http://en.sparql.pro/wiki/Special:URIResolver/Category:Government","Government","#C5FFEB","#44E2CA"],["http://en.sparql.pro/wiki/Special:URIResolver/Category:Cross_domain","Cross-domain","#E8F8F5","#829991"],["http://en.sparql.pro/wiki/Special:URIResolver/Category:Life_sciences","Life sciences","#F9DDE6","#EC91C4"],];DatasetLOD.legendDatasetSize=[[0,"< 100 000",15],[100000,"1 000 000 - 100 000",25],[1000000,"1 000 000 - 10 000 000",35],[10000000,"> 10 000 000",45],];DatasetLOD.legendArrow=[[0,"< 100 000",2],[100000,"1 000 000 - 100 000",3],[10000000,"> 1 000 000",4],];function Tools(){}Tools.getLinesReduce=function(l,b,c,f,a,d){var g=Tools.getCalcGoodStyle(l,b,c,f,a);var j=[];if(g>9){var m=Tools.getLines(l,b,c,f,g);var h=m.length;for(var e=0;e<h;e++){j.push([m[e],""+g+"px "+f,d,g,g/3])}}return j};Tools.getCalcGoodStyle=function(l,c,f,e,a){var m=Tools.getLines(l,c,f*2,e,a);var j=m.length;l.font=""+a+"px "+e;var g=[];for(var d=0;d<j;d++){g[d]=l.measureText(m[d]).width;if(g[d]>f*2){return Tools.getCalcGoodStyle(l,c,f,e,a-1)}}var h=(a+(a/3));var b=(j*h)/2;for(var d=0;d<j;d++){if(Math.sqrt(Math.pow(f,2)-Math.pow(Math.abs(b-h*d),2))*2<g[d]){return Tools.getCalcGoodStyle(l,c,f,e,a-1)}}return a};Tools.getLines=function(m,d,e,h,a){m.font=""+a+"px "+h;var j=0;var l=d.split(" ");var c="";var n=[];var b=l.length;var g="";for(var f=0;f<b;f++){j=m.measureText(c+g+l[f]).width;if(j>e&&c!=""){n.push(c);c=l[f]}else{c+=g+l[f]}g=" "}n.push(c);return n};function ToolTipLOD(c,f,b,h,a,g,e,d){this.ctx=c;this.label=f;this.x=b;this.y=h;this.radius=a;this.sizePolice=e;this.textStyle=g;this.color=d;this.draw=function(){var t=0;var z=0;var C=0;var q=0;var v=0;var F="12px Arial";var x="(click to see the examples)";var E=20;this.ctx.font=this.textStyle;var r=this.ctx.measureText(f).width;this.ctx.font=F;var j=this.ctx.measureText(x).width;C=j>r?j:r;v=this.sizePolice;q=v;var y=20;var o={x:y,y:0};var n={x:o.x+C,y:o.y};var m={x:n.x+y,y:y};var l={x:m.x,y:m.y+q};var J={x:n.x,y:l.y+y};var I={x:o.x,y:J.y};var H={x:0,y:l.y};var G={x:0,y:y};var A=this.ctx.canvas.width;var w=this.ctx.canvas.height;var i=false;var D=false;var u=false;var s=false;if((this.x+this.radius+E+C)<A){D=true}else{if((this.x-this.radius+E-C)>0){i=true}else{if((this.y-this.radius+E-q)>0){u=true}else{if((this.y+this.radius+E+q)<w){s=true}}}}var p=false;if(!p&&(D||i)){if((this.y-this.radius+E-q)>0){p=true}else{if((this.y+this.radius+E+q)<w){p=true}}}if(!p&&(u||i)){if((this.x+this.radius+E+C)<s){p=true}else{if((this.x-this.radius+E-C)>0){p=true}}}if(!p){xtooltip=this.x;ytooltip=this.y}else{if(D){t=this.x+this.radius+E;z=this.y-q/2}else{if(i){t=this.x-this.radius+E-C;z=this.y-q/2}else{if(u){t=this.x-C/2;z=this.y-this.radius+E-q}else{if(s){t=this.x-C/2;z=this.y+this.radius+E}}}}}var B=this.ctx;B.save();B.translate(t,z);B.fillStyle="#fefefe";B.lineWidth=1;B.beginPath();B.moveTo(o.x,o.y);B.lineTo(n.x,n.y);B.quadraticCurveTo(m.x,n.y,m.x,m.y);B.lineTo(l.x,l.y);B.quadraticCurveTo(l.x,J.y,J.x,J.y);B.lineTo(I.x,I.y);B.quadraticCurveTo(H.x,I.y,H.x,H.y);B.lineTo(G.x,G.y);B.quadraticCurveTo(G.x,o.y,o.x,o.y);B.closePath();B.shadowOffsetX=5;B.shadowOffsetY=5;B.shadowBlur=4;B.shadowColor="#AAAAAA";B.fill();B.shadowColor="transparent";B.strokeStyle="#000000";B.stroke();B.textAlign="center";B.textBaseline="middle";B.fillStyle=d;B.font=this.textStyle;B.fillText(this.label,y+C/2,(q/2)+y);B.font=F;B.fillText(x,y+C/2,v+y+10);B.restore()}}function LabelLOD(b,d,a,f,e,c){this.ctx=b;this.label=d;this.x=a;this.y=f;this.textStyle=e;this.color=c;this.draw=function(){b.textAlign="center";b.textBaseline="middle";b.fillStyle=c;b.font=this.textStyle;b.fillText(this.label,this.x,this.y)}}function LegendeLOD(a){this.canvas=a;this.draw=function(){var u=this.canvas.getContext("2d");var t=230;var r=500;var m=this.canvas.width-t;var j=this.canvas.height-r;var p=t;var b=230;var c=m;var s=j;this.drawLegendCategory(u,c,s,p,b);var h=t;var i=120;var o=m;var w=s+b;this.drawLegendDatasetSize(u,o,w,h,i);var n=t;var g=100;var f=m;var l=w+i;this.drawLegendArrow(u,f,l,n,g);var q=t;var e=35;var v=m;var d=l+g;this.drawCopyright(u,v,d,q,e)};this.drawLegendCategory=function(o,m,l,c,n){var g=19;var j=13;var h=14;var d=m+(c/3)*2;var e=d+20;o.textAlign="end";o.textBaseline="middle";o.fillStyle="#474754";o.font="bold 12px arial";for(var f=0;f<DatasetLOD.legendCategory.length;f++){var p=l+g*(f+1)+j*f;o.fillText(DatasetLOD.legendCategory[f][1],d,p)}for(var f=0;f<DatasetLOD.legendCategory.length;f++){var p=l+g*(f+1)+j*f;var b=new circleLOD(o,e,p,h,DatasetLOD.legendCategory[f][2],DatasetLOD.legendCategory[f][3],false);b.draw()}};this.drawCopyright=function(m,i,h,d,l){imageObj=document.getElementById("canvas-image-bysa");var e=80;var f=28;var b=h+l-f/2;var c=h+l-f;m.textAlign="start";m.textBaseline="middle";m.fillStyle="#000000";m.font="bold 12px arial";var j="By BorderCloud";var g=m.measureText(j).width;m.fillText(j,i,b);m.drawImage(imageObj,i+g+10,c)};this.drawLegendDatasetSize=function(p,m,l,c,o){var n=m+c-115;var e=l+o+5;var f=m+c-70;var d=l+o;for(var g=DatasetLOD.legendDatasetSize.length-1;g>=0;g--){var j=d-DatasetLOD.legendDatasetSize[g][2];var b=new circleLOD(p,f,j,DatasetLOD.legendDatasetSize[g][2],"#E6E6E6","#515151",false);b.draw()}p.textAlign="end";p.textBaseline="middle";p.fillStyle="#474754";p.font="bold 14px arial";p.fillText("Nb Triples :",n,l+20);p.font="bold 12px arial";for(var g=DatasetLOD.legendDatasetSize.length-1;g>=0;g--){var h=e-(DatasetLOD.legendDatasetSize[g][2]*2)+12;p.fillText(DatasetLOD.legendDatasetSize[g][1],n,h)}};this.drawLegendArrow=function(r,l,h,c,q){var o=l+c-115;var j=h+20;r.textAlign="end";r.textBaseline="middle";r.fillStyle="#474754";r.font="bold 14px arial";r.fillText("Nb Links :",o,j);var b=20;var p=o+b;var n=j+b;var g=p+50;var f=n;var e=5;r.textAlign="end";r.textBaseline="middle";r.fillStyle="#474754";r.font="bold 12px arial";for(var d=0;d<DatasetLOD.legendArrow.length;d++){j=2+n;r.fillText(DatasetLOD.legendArrow[d][1],o,j+b*d)}for(var d=0;d<DatasetLOD.legendArrow.length;d++){var m=new arrowLOD(r,p,n+b*d,0,g,f+b*d,0,DatasetLOD.legendArrow[d][2],"#474754");m.draw()}}}function circleLOD(c,f,e,a,d,b,g){this.ctx=c;this.centerX=f;this.centerY=e;this.radius=a;this.color=d;this.colorBorder=b;this.withShadow=g==null?true:g;this.draw=function(){var h=1.5;var i=this.ctx;i.fillStyle=this.color;i.beginPath();i.arc(this.centerX,this.centerY,this.radius-h,0,Math.PI*2,true);i.closePath();if(this.withShadow){i.shadowColor="#bbbbbb";i.shadowBlur=10;i.shadowOffsetX=4;i.shadowOffsetY=4}else{i.shadowColor="transparent"}i.fill();i.shadowColor="transparent";i.strokeStyle=this.colorBorder;i.lineWidth=h;i.beginPath();i.arc(this.centerX,this.centerY,this.radius-(h/2),0,Math.PI*2,true);i.closePath();i.stroke()}}function arrowLOD(j,i,h,g,f,d,e,c,a,b){this.ctx=j;this.to_x=f;this.to_y=d;this.from_x=i;this.from_y=h;this.dimension=b==null?c*4:b;this.lineWidth=c;this.color=a;this.from_space=g;this.to_space=e;this.draw=function(){var l=this.ctx;if(this.from_space==0&&this.to_space==0){this.drawArrowSimple(this.from_x,this.from_y,this.to_x,this.to_y)}else{var o=new Complex(this.from_x-this.to_x,this.from_y-this.to_y);o.$scale(this.from_space/o.norm());var n=new Complex(this.from_x-o.x,this.from_y-o.y);var o=new Complex(this.to_x-this.from_x,this.to_y-this.from_y);o.$scale(this.to_space/o.norm());var m=new Complex(this.to_x-o.x,this.to_y-o.y);this.drawArrowSimple(n.x,n.y,m.x,m.y)}};this.drawArrowSimple=function(s,q,o,m){var l=this.ctx;var r=new Complex(o-s,m-q);r.$scale(this.dimension/r.norm());var n=new Complex(o-r.x,m-r.y);var p=new Complex(o-r.x,m-r.y);normal=new Complex(-r.y/2,r.x/2),v1=p.add(normal),v2=p.$add(normal.$scale(-1));l.fillStyle=this.color;l.strokeStyle=this.color;l.lineWidth=this.lineWidth;l.lineWidth=this.lineWidth;l.beginPath();l.moveTo(s,q);l.lineTo(n.x,n.y);l.stroke();l.beginPath();l.moveTo(v1.x,v1.y);l.lineTo(v2.x,v2.y);l.lineTo(o,m);l.closePath();l.fill()}}var Complex=function(a,b){this.x=a;this.y=b;this.getc=function(){return this},this.getp=function(c){return this.toPolar(c)},this.set=function(d){d=d.getc(true);this.x=d.x;this.y=d.y},this.setc=function(c,d){this.x=c;this.y=d},this.setp=function(d,c){this.x=Math.cos(d)*c;this.y=Math.sin(d)*c},this.clone=function(){return new Complex(this.x,this.y)},this.toPolar=function(e){var c=this.norm();var d=Math.atan2(this.y,this.x);if(d<0){d+=Math.PI*2}if(e){return{theta:d,rho:c}}return new Polar(d,c)},this.norm=function(){return Math.sqrt(this.squaredNorm())},this.squaredNorm=function(){return this.x*this.x+this.y*this.y},this.add=function(c){return new Complex(this.x+c.x,this.y+c.y)},this.prod=function(c){return new Complex(this.x*c.x-this.y*c.y,this.y*c.x+this.x*c.y)},this.conjugate=function(){return new Complex(this.x,-this.y)},this.scale=function(c){return new Complex(this.x*c,this.y*c)},this.equals=function(d){return this.x==d.x&&this.y==d.y},this.$add=function(c){this.x+=c.x;this.y+=c.y;return this},this.$prod=function(e){var c=this.x,d=this.y;this.x=c*e.x-d*e.y;this.y=d*e.x+c*e.y;return this},this.$conjugate=function(){this.y=-this.y;return this},this.$scale=function(c){this.x*=c;this.y*=c;return this},this.$div=function(f){var c=this.x,e=this.y;var d=f.squaredNorm();this.x=c*f.x+e*f.y;this.y=e*f.x-c*f.y;return this.$scale(1/d)}};