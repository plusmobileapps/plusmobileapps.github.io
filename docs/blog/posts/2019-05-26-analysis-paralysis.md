---
title: Build What You Need, Not What Yout Want - Avoiding Analysis Paralysis
date:
  created: 2019-05-26
---

# Build What You Need, Not What Yout Want - Avoiding Analysis Paralysis

![](/assets/images/analysis-paralysis.jpg)

<!-- more -->

I joined the professional world of developing in the year of 2018 and ever since I started I had aspirations of creating a blog to share the ideas and concepts I have learned with others. Some of the features I was looking for to make this blog that could provide a good user experience were the following: 

* Accessible to everyone 
* Usable on desktop or mobile
* Generate articles from my notes taken in Markdown - supporting photos, gifs, and embedded youtube videos
* A commenting system for each article to allow for user feedback
* Responsive user interface
* Search to find any article

After compiling what looks like a lofty list of features, I set forth on *analyzing* the solutions out there that could help me accomplish this. 

When I first started, I had been developing Android apps and Google just announced Kotlin as a first class language for Android. I fell in love with Kotlin as it was a very powerful and modern language that helped developers be more productive. Kotlin has the potential of sharing code between different platforms by compiling the Kotlin code down to its respective target. So you could build out the core business logic in one commonn module for the front and backend, then you would just need to focus on building out the view layer for each respective platform you wanted to target. This sounded great, but the idea of building out three different view layers and learning a really new technology sounded like it was going to take years to build out all of the features I was looking for. 

Another solution that came out after my time working with Kotlin, was Flutter. Flutter has had a great story for Android and iOS apps being written in one codebase, but what interested me even more about it was the announcement to support the web. At the time I was assessing Flutter, I will admit from a design perspective it was absolutely beautiful. Flutter also allowed me to solve the problem Kotlin could not which was writing the code truly in one code base for the business logic and the view layer which was great since I'm a team of one. However being another new technology, there were still many libraries that needed to be built out or just didn't fully fulfill all of my requirements. So even though I learned a lot if I needed to build out a new app from scratch for a startup, this wasn't the right solution for the blog. 

My third solution was building a progressive web app using polymer web components. This started off really promising at first since there was a large number of packages already out there I could utilize for building out the blog. My only problem with this was that everything was written in Javascript which was a language I had used in college but never really enjoyed writing because of its inherent anarchy being dynamically typed. So since it was never something I didn't enjoy working on, it was hard for me to find the time to want to work on it. 

After wasting a lot of time looking at all of these different solutions, I was listening to the [Fragmented podcast](https://fragmentedpodcast.com/episodes/194/) one day which started talking about analysis paralysis and even referenced the exact use case of mine building a blog. The advice that struck a chord for me was to avoid the developer analysis paralysis, otherwise that blog post you keep trying to write will never be seen if you keep trying to analyze the different technologies out there to showcase it. One of the technologies mentioned specifically for blogs was Jekyll which seemed like a good start, which eventually led me to the final solution of [Material Mkdocs](https://github.com/squidfunk/mkdocs-material) which checked every one of my requirements for the blog. The most important thing about this was that it allowed me to focus primarily on writing the content in just pure markdown which brought back the joy in working on the blog. 

Now I still plan on exploring these different technologies I've learned as they are things I truly enjoy working with and plan on writing about. In the meantime though for the sake of releasing this blog I have settled on the solution I needed, not the solution I wanted and dreamed of. You never know, maybe some day as each of these technologies progress I could migrate the blog to one of them. But for now, I have learned a hard lesson of breaking the analysis paralysis in my own personal projects and focus on engineering the right solution for the problem at hand while enjoying it at the same time!