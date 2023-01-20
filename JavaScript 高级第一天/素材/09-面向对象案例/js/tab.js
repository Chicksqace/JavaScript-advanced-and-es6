var that;
class Tab{
    constructor(id){
        // 获取元素
        that=this;
        this.main=document.querySelector(id);
        
        this.add=this.main.querySelector('.tabadd')
        // li 的父元素
        this.ul=this.main.querySelector('.fisrstnav ul:first-child')
        // section的父元素
        this.fsection=this.main.querySelector('.tabscon');
        this.init()
    }
    init(){
        // 只要执行一次，就会调用最新的
        this.updateNode();
        // init 初始化操作让相关的元素绑定事件
        this.add.onclick=this.addTab;
        for(var i=0;i<this.lis.length;i++){
            this.lis[i].index=i;
            this.lis[i].onclick=this.toggleTab;
            this.remove[i].onclick=this.removeTab;
            this.spans[i].ondblclick = this.editTab;
            this.sections[i].ondblclick = this.editTab;

        }
    }
    // 获取所有的小li和section
    updateNode(){
        
        this.lis=this.main.querySelectorAll('li')
        this.sections=this.main.querySelectorAll('section');
        this.remove=this.main.querySelectorAll('.icon-guanbi')
        this.spans = this.main.querySelectorAll('.fisrstnav li span:first-child');
        
    }
    // 1.切换功能
    toggleTab(){
        // console.log(this.index);
        that.clearClass()
        this.className='liactive';
        that.sections[this.index].className='conactive'
    }
    // clearClass this指向的是that 也就是实例化对象
    clearClass(){
        for(var i=0;i<this.lis.length;i++){
        this.lis[i].className='';
        this.sections[i].className='';
        }
    }
    // 2.添加功能
    addTab(){
        that.clearClass()
        //创建li元素和section元素
        var random=Math.random();
        var li='<li class="liactive"><span>新选项卡</span><span class="iconfont icon-guanbi"></span></li>';
        var section='<section class="conactive">测试'+random+'</section>'
        // 追加父元素
        that.ul.insertAdjacentHTML('beforeend',li)
        that.fsection.insertAdjacentHTML('beforeend',section)
        that.init()
    }
    // 3.删除功能
    removeTab(e){
        e.stopPropagation();
        var index=this.parentNode.index;
        console.log(index);
        // remove()方法可以直接删除指定的元素
        that.lis[index].remove();
        that.sections[index].remove();
        that.init();
        // 当我们删除的不是选中状态的li的时候，原本的状态
        if(document.querySelector('.liactive')) return;//return了就是不执行后面的代码
        // 当我们点击了选中状态的这个li的时候，让它前一个li处于选中状态
        index--;
        // 手动调用我们点击事件，不需要鼠标触发
        that.lis[index]&&that.lis[index].click();
        that.sections[index].click();
    }
    // 4.修改功能
    editTab(){
        var str=this.innerHTML;
        // 双击禁止选中文字
        window.getSelection ? window.getSelection().removeAllRanges() : document.selection.empty();
        this.innerHTML='<input tpye="text"/>'
        var input=this.children[0]
        input.value=str
        input.select();//文本框里面的文字处于选定状态
        // 当我们离开文本框就把文本框里面的值给span
        input.onblur=function(){
            input.parentNode.innerHTML=this.value;
        }
         // 按下回车也可以把文本框里面的值给span
         input.onkeyup = function(e) {
            if (e.keyCode === 13) {
                // 手动调用表单失去焦点事件  不需要鼠标离开操作
                this.blur();
            }
        }
    }
}
new Tab('#tab');
