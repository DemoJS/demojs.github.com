---
layout: default
title: DEMOJS 2013 - June, 28, 29, 30 
---
<h1>DemoJS 2013</h1>
<nav>
<ul>
	<li>
		<a href="#index">Front page</a>
	</li>
	<li>
		<a href="#demoparty"></a>
	</li>
	<li>
		<a href="#schedule"></a>
	</li>
	<li>
		<a href="#tips"></a>
	</li>
	<li>
		<a href="#come"></a>
	</li>
	<li>
		<a href="#compos"></a>
	</li>
	<li>
		<a href="#about"></a>
	</li>
</ul>
</nav>

<div role="main">

<section>
<hgroup>
<a id="index"></a>
{% capture index %}
  {% include index.md %}
{% endcapture %}
{{ index | markdownify }}
</hgroup>
</section>

<section>
<hgroup>
<a id="demoparty"></a>
{% capture demoparty %}
  {% include demoparty.md %}
{% endcapture %}
{{ demoparty | markdownify }}
</hgroup>
</section>

<section>
<hgroup>
<a id="schedule"></a>
{% capture schedule %}
  {% include schedule.md %}
{% endcapture %}
{{ schedule | markdownify }}
</hgroup>
</section>

<section>
<hgroup>
<a id="tips"></a>
{% capture tips %}
  {% include tips.md %}
{% endcapture %}
{{ tips | markdownify }}
</hgroup>
</section>

<section>
<hgroup>
<a id="come"></a>
{% capture come %}
  {% include come.md %}
{% endcapture %}
{{ come | markdownify }}
</hgroup>
</section>

<section>
<hgroup>
<a id="compos"></a>
{% capture compos %}
  {% include compos.md %}
{% endcapture %}
{{ compos | markdownify }}
</hgroup>
</section>

<section>
<hgroup>
<a id="about"></a>
{% capture about %}
  {% include about.md %}
{% endcapture %}
{{ about | markdownify }}
</hgroup>
</section>

<section>
<hgroup>
<a id="sponsors"></a>
{% capture sponsors %}
  {% include sponsors.md %}
{% endcapture %}
{{ sponsors | markdownify }}
</hgroup>
</section>
</div>

<footer>

</footer>

</div>
</body>
</html>
