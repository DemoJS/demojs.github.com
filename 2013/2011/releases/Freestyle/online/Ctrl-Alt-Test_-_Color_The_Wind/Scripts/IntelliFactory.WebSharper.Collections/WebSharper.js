(function()
{
 var global=this;
 var Add,ArrayModule,BalancedTree,Branch,Build,Class,Collections,Compare,Contains,Core,Dictionary_2,DistinctBy,Enumerate,Equals,FSharpList_1,FSharpMap_2,FSharpSet_1,Filter,Fold,ForAll,Hash,Head,Lookup,Map,MapModule,NewError,NewRecord,NewUnion,OfSeq,Pair_2,Partition,Pick,Rebuild,Remove,Runtime,SeqModule,SetModule,SortInPlaceBy,ToArray,Tupled,__12,__13,__14,__18,__19,__2,__3,__4,__5,__6,__7;
 IntelliFactory.WebSharper.Runtime.Declare({IntelliFactory:{WebSharper:{Collections:{SetModule:{},"Pair`2":{},MapModule:{},"FSharpSet`1":{},"FSharpMap`2":{},"Dictionary`2":{},BalancedTree:{}}}}});
 Collections=function()
 {
  return IntelliFactory.WebSharper.Collections;
 };
 (function()
 {
  return IntelliFactory.WebSharper;
 });
 Class=function()
 {
  return IntelliFactory.WebSharper.Runtime.Class;
 };
 Runtime=function()
 {
  return IntelliFactory.WebSharper.Runtime;
 };
 __2=function(tree)
 {
  var _this=this;
  var _,__1,c,matchValue;
  matchValue={$:0};
  if(matchValue.$==1)
   {
    c=matchValue.$0;
    _=[];
    __1=void c.apply(_this,_);
   }
  __1;
  _this.tree=tree;
 };
 FSharpSet_1=function()
 {
  return IntelliFactory.WebSharper.Collections["FSharpSet`1"];
 };
 Add=function()
 {
  return IntelliFactory.WebSharper.Collections.BalancedTree.Add;
 };
 BalancedTree=function()
 {
  return IntelliFactory.WebSharper.Collections.BalancedTree;
 };
 Contains=function()
 {
  return IntelliFactory.WebSharper.Collections.BalancedTree.Contains;
 };
 __3=function()
 {
  var _this=this;
  var _,__1;
  _=_this.tree;
  if(_==null)
   {
    __1=0;
   }
  else
   {
    __1=_.Count;
   }
  return __1;
 };
 __4=function()
 {
  var _this=this;
  return _this.tree==null;
 };
 __5=function()
 {
  var _this=this;
  return _this.tree;
 };
 ForAll=function()
 {
  return IntelliFactory.WebSharper.Core.SeqModule.ForAll;
 };
 SeqModule=function()
 {
  return IntelliFactory.WebSharper.Core.SeqModule;
 };
 Core=function()
 {
  return IntelliFactory.WebSharper.Core;
 };
 Head=function()
 {
  return IntelliFactory.WebSharper.Core.SeqModule.Head;
 };
 Enumerate=function()
 {
  return IntelliFactory.WebSharper.Collections.BalancedTree.Enumerate;
 };
 Remove=function()
 {
  return IntelliFactory.WebSharper.Collections.BalancedTree.Remove;
 };
 ToArray=function()
 {
  return IntelliFactory.WebSharper.Core.SeqModule.ToArray;
 };
 Hash=function()
 {
  return IntelliFactory.WebSharper.Core.Hashing.Hash;
 };
 (function()
 {
  return IntelliFactory.WebSharper.Core.Hashing;
 });
 __6=function(other)
 {
  var _this=this;
  var _;
  if(_this.get_Count()===other.get_Count())
   {
    _=IntelliFactory.WebSharper.Core.SeqModule.ForAll2(function(x)
    {
     return function(y)
     {
      return IntelliFactory.WebSharper.Core.Equality.Equals(x,y);
     };
    },_this,other);
   }
  else
   {
    _=false;
   }
  return _;
 };
 (function()
 {
  return IntelliFactory.WebSharper.Core.SeqModule.ForAll2;
 });
 (function(x)
 {
  return function(y)
  {
   return IntelliFactory.WebSharper.Core.Equality.Equals(x,y);
  };
 });
 Equals=function()
 {
  return IntelliFactory.WebSharper.Core.Equality.Equals;
 };
 (function()
 {
  return IntelliFactory.WebSharper.Core.Equality;
 });
 __7=function(other)
 {
  var _this=this;
  return IntelliFactory.WebSharper.Core.SeqModule.CompareWith(function(e1)
  {
   return function(e2)
   {
    return IntelliFactory.WebSharper.Core.Comparison.Compare(e1,e2);
   };
  },_this,other);
 };
 (function()
 {
  return IntelliFactory.WebSharper.Core.SeqModule.CompareWith;
 });
 (function(e1)
 {
  return function(e2)
  {
   return IntelliFactory.WebSharper.Core.Comparison.Compare(e1,e2);
  };
 });
 Compare=function()
 {
  return IntelliFactory.WebSharper.Core.Comparison.Compare;
 };
 (function()
 {
  return IntelliFactory.WebSharper.Core.Comparison;
 });
 FSharpMap_2=function()
 {
  return IntelliFactory.WebSharper.Collections["FSharpMap`2"];
 };
 NewRecord=function()
 {
  return IntelliFactory.WebSharper.Runtime.NewRecord;
 };
 Pair_2=function()
 {
  return IntelliFactory.WebSharper.Collections["Pair`2"];
 };
 Map=function()
 {
  return IntelliFactory.WebSharper.Core.SeqModule.Map;
 };
 Tupled=function()
 {
  return IntelliFactory.WebSharper.Runtime.Tupled;
 };
 NewError=function()
 {
  return IntelliFactory.WebSharper.Runtime.NewError;
 };
 Dictionary_2=function()
 {
  return IntelliFactory.WebSharper.Collections["Dictionary`2"];
 };
 ArrayModule=function()
 {
  return IntelliFactory.WebSharper.Core.ArrayModule;
 };
 SortInPlaceBy=function()
 {
  return IntelliFactory.WebSharper.Core.ArrayModule.SortInPlaceBy;
 };
 __12=function(x)
 {
  return x;
 };
 Build=function()
 {
  return IntelliFactory.WebSharper.Collections.BalancedTree.Build;
 };
 DistinctBy=function()
 {
  return IntelliFactory.WebSharper.Core.SeqModule.DistinctBy;
 };
 Lookup=function()
 {
  return IntelliFactory.WebSharper.Collections.BalancedTree.Lookup;
 };
 Rebuild=function()
 {
  return IntelliFactory.WebSharper.Collections.BalancedTree.Rebuild;
 };
 __13=function(source)
 {
  return IntelliFactory.WebSharper.Core.SeqModule.ToArray(source);
 };
 __14=function(data)
 {
  return IntelliFactory.WebSharper.Collections.BalancedTree.Build(data,0,data.length-1);
 };
 Branch=function()
 {
  return IntelliFactory.WebSharper.Collections.BalancedTree.Branch;
 };
 NewUnion=function()
 {
  return IntelliFactory.WebSharper.Runtime.NewUnion;
 };
 FSharpList_1=function()
 {
  return IntelliFactory.WebSharper.Core["FSharpList`1"];
 };
 MapModule=function()
 {
  return IntelliFactory.WebSharper.Collections.MapModule;
 };
 __18=function(data)
 {
  return IntelliFactory.WebSharper.Collections.BalancedTree.OfSeq(data);
 };
 OfSeq=function()
 {
  return IntelliFactory.WebSharper.Collections.BalancedTree.OfSeq;
 };
 __19=function(t)
 {
  return new IntelliFactory.WebSharper.Collections["FSharpMap`2"](t);
 };
 Pick=function()
 {
  return IntelliFactory.WebSharper.Core.SeqModule.Pick;
 };
 Partition=function()
 {
  return IntelliFactory.WebSharper.Core.ArrayModule.Partition;
 };
 Fold=function()
 {
  return IntelliFactory.WebSharper.Core.SeqModule.Fold;
 };
 Filter=function()
 {
  return IntelliFactory.WebSharper.Core.SeqModule.Filter;
 };
 SetModule=function()
 {
  return IntelliFactory.WebSharper.Collections.SetModule;
 };
 (Collections())["FSharpSet`1"]=(Class())(__2,null,{Add:function(x)
 {
  var _this=this;
  return new(FSharpSet_1())((Add())(x,_this.tree));
 },Contains:function(v)
 {
  var _this=this;
  return(Contains())(v,_this.tree);
 },get_Count:__3,get_IsEmpty:__4,get_Tree:__5,IsProperSubsetOf:function(s)
 {
  var _this=this;
  var _;
  if(_this.IsSubsetOf(s))
   {
    _=_this.get_Count()<s.get_Count();
   }
  else
   {
    _=false;
   }
  return _;
 },IsProperSupersetOf:function(s)
 {
  var _this=this;
  var _;
  if(_this.IsSupersetOf(s))
   {
    _=_this.get_Count()>s.get_Count();
   }
  else
   {
    _=false;
   }
  return _;
 },IsSubsetOf:function(s)
 {
  var _this=this;
  return(ForAll())(function(arg00)
  {
   return s.Contains(arg00);
  },_this);
 },IsSupersetOf:function(s)
 {
  var _this=this;
  return(ForAll())(function(arg00)
  {
   return _this.Contains(arg00);
  },s);
 },get_MaximumElement:function()
 {
  var _this=this;
  var _;
  _=_this.tree;
  return(Head())((Enumerate())(true,_));
 },get_MinimumElement:function()
 {
  var _this=this;
  var _;
  _=_this.tree;
  return(Head())((Enumerate())(false,_));
 },Remove:function(v)
 {
  var _this=this;
  return new(FSharpSet_1())((Remove())(v,_this.tree));
 },GetEnumerator:function()
 {
  var _this=this;
  var _,__1;
  _=_this.tree;
  __1=(Enumerate())(false,_);
  return __1.GetEnumerator();
 },GetHashCode:function()
 {
  var _this=this;
  var _;
  _=(ToArray())(_this);
  return -1741749453+(Hash())(_);
 },Equals:__6,CompareTo:__7});
 (Collections())["FSharpMap`2"]=(Class())(__2,null,{get_Tree:__5,Add:function(k,v)
 {
  var _this=this;
  var _,__1;
  __1=_this.tree;
  _=function(t)
  {
   return(Add())((NewRecord())(Pair_2(),{Key:k,Value:v}),t);
  };
  return new(FSharpMap_2())(_(__1));
 },ContainsKey:function(k)
 {
  var _this=this;
  var _,__1;
  __1=_this.tree;
  _=function(t)
  {
   return(Contains())((NewRecord())(Pair_2(),{Key:k,Value:undefined}),t);
  };
  return _(__1);
 },get_Count:__3,get_IsEmpty:__4,get_Item:function(k)
 {
  var _this=this;
  var _,__1,matchValue;
  matchValue=_this.TryFind(k);
  if(matchValue.$==0)
   {
    _=new Error("The given key was not present in the dictionary.");
    throw _;
   }
  else
   {
    __1=matchValue.$0;
   }
  return __1;
 },Remove:function(k)
 {
  var _this=this;
  var _,__1;
  __1=_this.tree;
  _=function(src)
  {
   return(Remove())((NewRecord())(Pair_2(),{Key:k,Value:undefined}),src);
  };
  return new(FSharpMap_2())(_(__1));
 },TryFind:function(k)
 {
  var _this=this;
  var _,__1,__8,__9;
  __1=_this.tree;
  _=function(t)
  {
   return(BalancedTree()).TryFind((NewRecord())(Pair_2(),{Key:k,Value:undefined}),t);
  };
  __9=_(__1);
  __8=function(option)
  {
   return(Core()).OptionModule.Map(function(kv)
   {
    return kv.Value;
   },option);
  };
  return __8(__9);
 },GetEnumerator:function()
 {
  var _this=this;
  var _,__10,__9,s;
  _=_this.tree;
  __10=(Enumerate())(false,_);
  __9=function(source)
  {
   return(Map())(function(kv)
   {
    var __1,__8;
    __1=kv.Key;
    __8=kv.Value;
    return{Key:__1,Value:__8};
   },source);
  };
  s=__9(__10);
  return s.GetEnumerator();
 },GetHashCode:function()
 {
  var _this=this;
  var _;
  _=(ToArray())(_this);
  return(Hash())(_);
 },Equals:__6,CompareTo:__7});
 (Collections())["Pair`2"]=(Class())(null,null,{CompareTo:function(other)
 {
  var _this=this;
  var _,__1;
  _=_this.Key;
  __1=other.Key;
  return(Compare())(_,__1);
 },Equals:function(other)
 {
  var _this=this;
  return(Equals())(_this.Key,other.Key);
 },GetHashCode:function()
 {
  var _this=this;
  var _;
  _=_this.Key;
  return(Hash())(_);
 }});
 (Collections())["Dictionary`2"]=(Class())(function(init_1,equals,hash_1)
 {
  var _this=this;
  return((Tupled())(function(tupledArg)
  {
   var _,_1,__1,__10,__8,__9,c,enumerator,hash,init,matchValue,x,x_1,x_2;
   init=tupledArg[0];
   hash=tupledArg[2];
   matchValue={$:0};
   if(matchValue.$==1)
    {
     c=matchValue.$0;
     _=[];
     __1=void c.apply(_this,_);
    }
   __1;
   _this.hash=hash;
   _this.count=0;
   _this.data={};
   enumerator=init.GetEnumerator();
   try
   {
    while(enumerator.MoveNext())
     {
      x=enumerator.get_Current();
      __8=_this.data;
      x_1=x.Key;
      __9=_this.hash(x_1);
      __10=x.Value;
      __8[__9]=__10;
     }
   }
   finally
   {
    enumerator.Dispose();
   }
   _1;
  }))([init_1,equals,hash_1]);
 },null,{Add:function(k,v)
 {
  var _this=this;
  var _,__10,__11,__8,__9,h;
  h=_this.hash(k);
  _=_this.data;
  if(_.hasOwnProperty(h))
   {
    __8=function(message)
    {
     var __1,msg;
     msg="key"+": "+message;
     __1=(NewError())("ArgumentException",msg);
     throw __1;
    };
    __11=__8("An item with the same key has already been added.");
   }
  else
   {
    __9=_this.data;
    __10={Key:k,Value:v};
    __9[h]=__10;
    __11=_this.count=_this.count+1;
   }
  return __11;
 },Clear:function()
 {
  var _this=this;
  _this.data={};
  return _this.count=0;
 },ContainsKey:function(k)
 {
  var _this=this;
  var _,__1;
  __1=_this.hash(k);
  _=_this.data;
  return _.hasOwnProperty(__1);
 },get_Item:function(k)
 {
  var _this=this;
  var _,__1,k_1;
  k_1=_this.hash(k);
  _=_this.data;
  if(_.hasOwnProperty(k_1))
   {
    __1=_this.data[k_1].Value;
   }
  else
   {
    __1=(Dictionary_2()).notPresent();
   }
  return __1;
 },set_Item:function(k,v)
 {
  var _this=this;
  var _,__1,__8,__9,h;
  h=_this.hash(k);
  _=_this.data;
  if(!_.hasOwnProperty(h))
   {
    __1=_this.count=_this.count+1;
   }
  __1;
  __8=_this.data;
  __9={Key:k,Value:v};
  return __8[h]=__9;
 },Remove:function(k)
 {
  var _this=this;
  var _,__1,__8,h;
  h=_this.hash(k);
  _=_this.data;
  if(_.hasOwnProperty(h))
   {
    __1=_this.data;
    delete __1[h];
    _this.count=_this.count-1;
    __8=true;
   }
  else
   {
    __8=false;
   }
  return __8;
 },GetEnumerator:function()
 {
  var _this=this;
  var _,__1,s;
  __1=_this.data;
  _=Runtime();
  s=(ArrayModule()).Map((Tupled())(function(tuple)
  {
   return tuple[1];
  }),(Runtime()).Fields.call(_,__1));
  return s.GetEnumerator();
 }});
 (FSharpSet_1()).ofSeq=function(s)
 {
  var a;
  a=(ToArray())(s);
  (SortInPlaceBy())(__12,a);
  return(Build())(a,0,a.length-1);
 };
 (FSharpMap_2()).fromSeq=function(s)
 {
  var a;
  a=(ToArray())((SeqModule()).Delay(function()
  {
   return(SeqModule()).Collect((Tupled())(function(matchValue)
   {
    var _,k,v;
    v=matchValue[1];
    k=matchValue[0];
    _=(NewRecord())(Pair_2(),{Key:k,Value:v});
    return[_];
   }),(DistinctBy())((Tupled())(function(tuple)
   {
    return tuple[0];
   }),s));
  }));
  (SortInPlaceBy())(__12,a);
  return(Build())(a,0,a.length-1);
 };
 (Dictionary_2()).notPresent=function()
 {
  var _;
  _=(NewError())("KeyNotFoundException","The given key was not present in the dictionary.");
  throw _;
 };
 (Dictionary_2()).eq=function(a,b)
 {
  return(Equals())(a,b);
 };
 (BalancedTree()).OfSeq=function(data)
 {
  var _,__1;
  _=(ToArray())((DistinctBy())(__12,data));
  __1=(ArrayModule()).SortBy(__12,_);
  return(Build())(__1,0,__1.length-1);
 };
 (BalancedTree()).Remove=function(k,src)
 {
  var _,__1,__10,__11,__15,__16,__17,__8,__9,patternInput,spine,t;
  patternInput=(Lookup())(k,src);
  t=patternInput[0];
  spine=patternInput[1];
  if(t==null)
   {
    __17=src;
   }
  else
   {
    if(t.Right==null)
     {
      __16=(Rebuild())(spine,t.Left);
     }
    else
     {
      if(t.Left==null)
       {
        __15=(Rebuild())(spine,t.Right);
       }
      else
       {
        _=t.Left;
        __1=t.Right;
        __8=(SeqModule()).Append((Enumerate())(false,_),(Enumerate())(false,__1));
        __9=__13(__8);
        __11=__14(__9);
        __10=function(t_1)
        {
         return(Rebuild())(spine,t_1);
        };
        __15=__10(__11);
       }
      __16=__15;
     }
    __17=__16;
   }
  return __17;
 };
 (BalancedTree()).Contains=function(v,t)
 {
  return!(((Lookup())(v,t))[0]==null);
 };
 (BalancedTree()).Add=function(x,t)
 {
  return(BalancedTree()).Put(function()
  {
   return __12;
  },x,t);
 };
 (BalancedTree()).TryFind=function(v,t)
 {
  var _,x;
  x=((Lookup())(v,t))[0];
  if(x==null)
   {
    _={$:0};
   }
  else
   {
    _={$:1,$0:x.Node};
   }
  return _;
 };
 (BalancedTree()).Lookup=function(k,t)
 {
  var _,__1,__8,loop,matchValue,spine,t_1;
  spine=[];
  t_1=t;
  loop=true;
  while(loop)
   {
    if(t_1==null)
     {
      loop=false;
     }
    else
     {
      _=t_1.Node;
      matchValue=(Compare())(k,_);
      if(matchValue===0)
       {
        loop=false;
       }
      else
       {
        if(matchValue===1)
         {
          __1=[true,t_1.Node,t_1.Left];
          spine.unshift(__1);
          t_1=t_1.Right;
         }
        else
         {
          __8=[false,t_1.Node,t_1.Right];
          spine.unshift(__8);
          t_1=t_1.Left;
         }
       }
     }
   }
  return[t_1,spine];
 };
 (BalancedTree()).Put=function(combine,k,t)
 {
  var _,patternInput,spine,t_1;
  patternInput=(Lookup())(k,t);
  t_1=patternInput[0];
  spine=patternInput[1];
  if(t_1==null)
   {
    _=(Rebuild())(spine,(Branch())(k,null,null));
   }
  else
   {
    _=(Rebuild())(spine,(Branch())((combine(t_1.Node))(k),t_1.Left,t_1.Right));
   }
  return _;
 };
 (BalancedTree()).Rebuild=function(spine,t)
 {
  var h,t_1;
  h=function(x)
  {
   var _;
   if(x==null)
    {
     _=0;
    }
   else
    {
     _=x.Height;
    }
   return _;
  };
  t_1=t;
  (Runtime()).Iterate(0,spine.length-1,function(i)
  {
   var _,__1,__10,__8,__9,l,m,m_1,matchValue,r,x,x_1;
   matchValue=spine[i];
   if(matchValue[0])
    {
     x=matchValue[1];
     l=matchValue[2];
     if(h(t_1)>h(l)+1)
      {
       if(h(t_1.Left)===h(t_1.Right)+1)
        {
         m=t_1.Left;
         _=(Branch())(m.Node,(Branch())(x,l,m.Left),(Branch())(t_1.Node,m.Right,t_1.Right));
        }
       else
        {
         _=(Branch())(t_1.Node,(Branch())(x,l,t_1.Left),t_1.Right);
        }
       __1=_;
      }
     else
      {
       __1=(Branch())(x,l,t_1);
      }
     __10=__1;
    }
   else
    {
     x_1=matchValue[1];
     r=matchValue[2];
     if(h(t_1)>h(r)+1)
      {
       if(h(t_1.Right)===h(t_1.Left)+1)
        {
         m_1=t_1.Right;
         __8=(Branch())(m_1.Node,(Branch())(t_1.Node,t_1.Left,m_1.Left),(Branch())(x_1,m_1.Right,r));
        }
       else
        {
         __8=(Branch())(t_1.Node,t_1.Left,(Branch())(x_1,t_1.Right,r));
        }
       __9=__8;
      }
     else
      {
       __9=(Branch())(x_1,t_1,r);
      }
     __10=__9;
    }
   t_1=__10;
  });
  return t_1;
 };
 (BalancedTree()).Branch=function(node,left,right)
 {
  var _,__1,__10,__11,__8,__9;
  if(left==null)
   {
    _=0;
   }
  else
   {
    _=left.Height;
   }
  __8=_;
  if(right==null)
   {
    __1=0;
   }
  else
   {
    __1=right.Height;
   }
  __9=__1;
  if(left==null)
   {
    __10=0;
   }
  else
   {
    __10=left.Count;
   }
  if(right==null)
   {
    __11=0;
   }
  else
   {
    __11=right.Count;
   }
  return{Node:node,Left:left,Right:right,Height:1+(__8>__9?__8:__9),Count:1+__10+__11};
 };
 (BalancedTree()).Build=function(data,min,max)
 {
  var _,center,left,right,sz;
  sz=max-min+1;
  if(sz<=0)
   {
    _=null;
   }
  else
   {
    center=(min+max)/2<<0;
    left=(Build())(data,min,center-1);
    right=(Build())(data,center+1,max);
    _=(Branch())(data[center],left,right);
   }
  return _;
 };
 (BalancedTree()).Enumerate=function(flip,t_2)
 {
  var gen;
  gen=(Tupled())(function(tupledArg)
  {
   var _,__1,__8,other,spine,spine_1,t,t_1;
   t=tupledArg[0];
   spine=tupledArg[1];
   if(t==null)
    {
     if(spine.$==1)
      {
       t_1=spine.$0[0];
       spine_1=spine.$1;
       other=spine.$0[1];
       _={$:1,$0:[t_1,[other,spine_1]]};
      }
     else
      {
       _={$:0};
      }
     __8=_;
    }
   else
    {
     if(flip)
      {
       __1=gen([t.Right,(NewUnion())(FSharpList_1(),1,[t.Node,t.Left],spine)]);
      }
     else
      {
       __1=gen([t.Left,(NewUnion())(FSharpList_1(),1,[t.Node,t.Right],spine)]);
      }
     __8=__1;
    }
   return __8;
  });
  return(SeqModule()).Unfold(gen,[t_2,(NewUnion())(FSharpList_1(),0)]);
 };
 (MapModule()).Map=function(f,m)
 {
  var _,__1,__10,__8,__9;
  _=m.get_Tree();
  __8=(Enumerate())(false,_);
  __1=function(source)
  {
   return(Map())(function(kv)
   {
    return(NewRecord())(Pair_2(),{Key:kv.Key,Value:(f(kv.Key))(kv.Value)});
   },source);
  };
  __9=__1(__8);
  __10=__18(__9);
  return __19(__10);
 };
 (MapModule()).TryPick=function(f,m)
 {
  var _;
  _=function(source)
  {
   return(SeqModule()).TryPick(function(kv)
   {
    return(f(kv.Key))(kv.Value);
   },source);
  };
  return _(m);
 };
 (MapModule()).TryFindKey=function(f,m)
 {
  var _;
  _=function(source)
  {
   return(SeqModule()).TryFind(function(kv)
   {
    return(f(kv.Key))(kv.Value);
   },source);
  };
  return _(m);
 };
 (MapModule()).TryFind=function(k,m)
 {
  return m.TryFind(k);
 };
 (MapModule()).ToSeq=function(m)
 {
  var _,__1,__8;
  _=m.get_Tree();
  __8=(Enumerate())(false,_);
  __1=function(source)
  {
   return(Map())(function(kv)
   {
    return[kv.Key,kv.Value];
   },source);
  };
  return __1(__8);
 };
 (MapModule()).Pick=function(f,m)
 {
  var _;
  _=function(source)
  {
   return(Pick())(function(kv)
   {
    return(f(kv.Key))(kv.Value);
   },source);
  };
  return _(m);
 };
 (MapModule()).Partition=function(f,m)
 {
  var _,__1,__10,__8,__9,patternInput,x,y;
  _=m.get_Tree();
  __8=(ToArray())((Enumerate())(false,_));
  __1=function(array)
  {
   return(Partition())(function(kv)
   {
    return(f(kv.Key))(kv.Value);
   },array);
  };
  patternInput=__1(__8);
  y=patternInput[1];
  x=patternInput[0];
  __9=(Build())(x,0,x.length-1);
  __10=(Build())(y,0,y.length-1);
  return[new(FSharpMap_2())(__9),new(FSharpMap_2())(__10)];
 };
 (MapModule()).OfArray=function(a)
 {
  var _,__1,__8;
  _=function(source)
  {
   return(Map())((Tupled())(function(tupledArg)
   {
    var k,v;
    k=tupledArg[0];
    v=tupledArg[1];
    return(NewRecord())(Pair_2(),{Key:k,Value:v});
   }),source);
  };
  __1=_(a);
  __8=__18(__1);
  return __19(__8);
 };
 (MapModule()).Iterate=function(f,m)
 {
  var _;
  _=function(source)
  {
   return(SeqModule()).Iterate(function(kv)
   {
    return(f(kv.Key))(kv.Value);
   },source);
  };
  return _(m);
 };
 (MapModule()).ForAll=function(f,m)
 {
  var _;
  _=function(source)
  {
   return(ForAll())(function(kv)
   {
    return(f(kv.Key))(kv.Value);
   },source);
  };
  return _(m);
 };
 (MapModule()).FoldBack=function(f,m,s_1)
 {
  var _,__1,__8;
  _=m.get_Tree();
  __8=(Enumerate())(true,_);
  __1=function(source)
  {
   return(Fold())(function(s)
   {
    return function(kv)
    {
     return((f(kv.Key))(kv.Value))(s);
    };
   },s_1,source);
  };
  return __1(__8);
 };
 (MapModule()).Fold=function(f,s_1,m)
 {
  var _,__1,__8;
  _=m.get_Tree();
  __8=(Enumerate())(false,_);
  __1=function(source)
  {
   return(Fold())(function(s)
   {
    return function(kv)
    {
     return((f(s))(kv.Key))(kv.Value);
    };
   },s_1,source);
  };
  return __1(__8);
 };
 (MapModule()).FindKey=function(f,m)
 {
  var __1;
  __1=function(source)
  {
   return(Pick())(function(kv)
   {
    var _;
    if((f(kv.Key))(kv.Value))
     {
      _={$:1,$0:kv.Key};
     }
    else
     {
      _={$:0};
     }
    return _;
   },source);
  };
  return __1(m);
 };
 (MapModule()).Filter=function(f,m)
 {
  var _,__1,__10,__11,__8,__9;
  _=m.get_Tree();
  __8=(Enumerate())(false,_);
  __1=function(source)
  {
   return(Filter())(function(kv)
   {
    return(f(kv.Key))(kv.Value);
   },source);
  };
  __9=__1(__8);
  __10=__13(__9);
  __11=__14(__10);
  return __19(__11);
 };
 (MapModule()).Exists=function(f,m)
 {
  var _;
  _=function(source)
  {
   return(SeqModule()).Exists(function(kv)
   {
    return(f(kv.Key))(kv.Value);
   },source);
  };
  return _(m);
 };
 (SetModule()).Partition=function(f,a)
 {
  var _,__1,patternInput,x,y;
  patternInput=(Partition())(f,(ToArray())(a));
  y=patternInput[1];
  x=patternInput[0];
  _=(OfSeq())(x);
  __1=(OfSeq())(y);
  return[new(FSharpSet_1())(_),new(FSharpSet_1())(__1)];
 };
 (SetModule()).FoldBack=function(f,a,s_1)
 {
  var _;
  _=a.get_Tree();
  return(Fold())(function(s)
  {
   return function(x)
   {
    return(f(x))(s);
   };
  },s_1,(Enumerate())(true,_));
 };
 (SetModule()).Filter=function(f,s)
 {
  var _,__1;
  _=(ToArray())((Filter())(f,s));
  __1=(Build())(_,0,_.length-1);
  return new(FSharpSet_1())(__1);
 };
}());
