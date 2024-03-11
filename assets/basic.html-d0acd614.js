import{_ as n,o as s,c as a,e as o}from"./app-65bcf5b2.js";const t={},e=o(`<h1 id="前端基础知识" tabindex="-1"><a class="header-anchor" href="#前端基础知识" aria-hidden="true">#</a> 前端基础知识</h1><h3 id="什么是闭包-闭包都有哪些用途" tabindex="-1"><a class="header-anchor" href="#什么是闭包-闭包都有哪些用途" aria-hidden="true">#</a> 什么是闭包，闭包都有哪些用途？</h3><p>闭包是一个函数及其绑定的词法作用域引用的组合。闭包可以访问函数外部的作用域。所以理论上 <code>JS</code> 中所有函数都是闭包。闭包主要有以下应用：</p><ol><li>模块化（函数式）编程：函数作为参数，比如 <code>map</code> <code>filter</code>，函数参数创建了一个闭包，可以访问和修改数组中的元素。</li><li>实现私有方法：内部的变量或者方法只能通过返回闭包的函数访问。</li></ol><h3 id="介绍事件循环的原理" tabindex="-1"><a class="header-anchor" href="#介绍事件循环的原理" aria-hidden="true">#</a> 介绍事件循环的原理？</h3><p>事件循环（<code>event loop</code>）可以理解为 <code>JS</code> 代码的执行过程。因为其单线程的特性只能同时执行一个任务，为了实现并发执行，<code>JS</code> 有了事件循环机制。主要工作原理如下：</p><ol><li>同步代码会放在<strong>栈</strong>执行，过程中有异步任务产生时会把该任务放到<strong>任务队列</strong>里</li><li>当执行栈为空时，会依次取出任务队列的任务放到栈中执行。如此循环往复，称为事件循环。</li></ol><p>其中任务队列又为宏任务（<code>macro task</code>）和微任务（<code>micro task</code>）。常见任务如下：</p><p><strong>宏任务</strong>：<code>setTimeout, setInterval, setImmediate</code>。</p><p><strong>微任务</strong>：<code>promise.then, promise.catch, process.nextTick, dom MutationObserver</code>.</p><p>执行栈清空以后会先检查执行 <code>micro task</code>，然后在检查执行 <code>macro task</code>。</p><p><strong>因此微任务比宏任务先执行，并且微任务队列一般只有一个，宏任务队列可以有多个。</strong></p><p><strong>微任务执行过程中产生新的微任务也在当前循环中执行，宏任务则会在下轮事件循环执行。</strong> 如下代码产生新的微任务会导致一直压栈，导致栈溢出：</p><div class="language-typescript line-numbers-mode" data-ext="ts"><pre class="language-typescript"><code><span class="token comment">// 产生新的微任务会执行函数本身 fooMicro 一直入栈 导致栈溢出 页面会卡死</span>
<span class="token keyword">function</span> <span class="token function">fooMicro</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token builtin">Promise</span><span class="token punctuation">.</span><span class="token function">resolve</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">then</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token function">fooMicro</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span> 
<span class="token punctuation">}</span><span class="token punctuation">;</span>

<span class="token comment">// 虽然 fooMacro 会一直入栈 但每次入栈前 执行栈已空 不会导致栈溢出</span>
<span class="token keyword">function</span> <span class="token function">fooMacro</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token function">setTimeout</span><span class="token punctuation">(</span>fooMacro<span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">)</span><span class="token punctuation">;</span> 
<span class="token punctuation">}</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,14),c=[e];function p(i,l){return s(),a("div",null,c)}const r=n(t,[["render",p],["__file","basic.html.vue"]]);export{r as default};
