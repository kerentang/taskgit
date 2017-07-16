function Vue () {
	this.el=obj.el;
	this.data=obj.data;

	this.updateView(this.render(this.el));
}

Vue.prototype.render=function(tp1){
	var tokens=this.tokenize(document.querySelector(tp1).innerHTML);
	var ret=[];
	tokens.forEach(function(token){
		if(token.type==='text'){
			ret.push('"'+token.expr+'"');
		}else{
			ret.push(Util.addPerfix());
		}
	})
}