---
title: Should I Write an Android App in Kotlin or Java?
date:
  created: 2019-08-14

categories:
  - Opinions
---

# Should I Write an Android App in Kotlin or Java?

In the world of native Android developing, the developer has the option to write an app in either [Java](https://www.java.com/en/) or [Kotlin](https://kotlinlang.org/). If you actually clicked on those two links, you might even be able to tell a lot about each language from first glance. Java has been around since 1995 which also seems like the last year the website may have been touched. Kotlin first appeared in 2011 with aspirations to becoming a modern language beloved by many developers and has a website to show for that. Android was born in 2008, so the original way to write Android apps between the two languages was Java. Kotlin did not receive official first class support for Android until [Google IO in 2017](https://blog.jetbrains.com/kotlin/2017/05/kotlin-on-android-now-official/) and has become a very popular way to build Android apps. 

Now when it comes to writing an Android app, I would say it really depends on an individuals background, team size, and teams background to know which language to learn. 

<!-- more -->

## Java

Being that Java used to be one of the only ways to write Android apps originally, the best part about learning Java is you have a plethora of resources in the community with answers to your problems in just that language. If you ever need to dive into some of the source code of widgets, this is what all of those are written in so you won't struggle trying to understand what is going on. 

Since Java has been around for so long, there are so many other technologies you can work with on the front end or backend. Also it is such a common programming language, it can be a great language to use when interviewing for big tech companies since a lot of people learned Java when they first started programming. 

Even though Java has fallen behind some other modern programming languages when it comes to features, Oracle has done a lot of work to catch up and is not going away anytime soon. Jake Wharton gave a great talk at Kotlin Conf posing an argument that Java can potentially be just as powerful as Kotlin as time progresses. 

<iframe width="560" height="315" src="https://www.youtube.com/embed/te3OU9fxC8U" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

Java is a great language for any developer to have in their back pocket, but it does have some shortcomings that can make it a frustrating language to work with. There is no notion of null safety, so before an object can ever be accessed there is always a null check that must be made to prevent crashing the app. Java is also a very verbose language and on average will find yourself writing 30% more lines than a language like Kotlin. If you plan on watching any developer talks from Google IO, you will find almost all of them now are delivered in Kotlin so it could be hard to follow. Newer Android libraries have Kotlin in mind first, so something like [Jetpack Compose](https://developer.android.com/jetpack/compose) which is a declarative way to create Android UI would become significantly harder to ever use without writing that code in Kotlin. 



## Kotlin

After two years of Kotlin being announced as a first class language for Android, it very quickly became one of the most popular languages that year causing a lot of excitement. Kotlin is a modern programming language, that will help you write code that is more concise, safe, and interoperable between many languages (Java, Javascript, and Native code). Almost all talks at Google IO are predominantly given in Kotlin now, so it can be much easier to follow the talks if you understand Kotlin. 

Even if you don't understand Java code, the Kotlin plugin will automatically convert any Java code into Kotlin when you copy paste it into Android Studio! So when you come across an answer on Stackoverflow that is written in Java, it is dead simple to convert it into Kotlin code for you to understand. The converter is pretty good at making Kotlin code that can compile, but is very bad at converting very verbose Java code into idiomatic Kotlin. This is where a deep understanding of Kotlin will help you clean up the verbose Kotlin code into idiomatic Kotlin. 

Some other great features in Kotlin that make it a pleasant language to write are null safety, type inference, and lambdas. Null pointer exceptions are still possible in Kotlin, but they are a lot harder to write because the compiler makes you really think about whether or not an object you are trying to access is null or not. The type inference allows you to write code quickly without being so concerned about what type that object may be as the compiler will infer the type for you. Lambda's can be a bit of a complicated concept, but after learning them, you will be able to write very pretty code and pass around functions as variables since functions are first class citizens in Kotlin. 

There are some weird quirks about Kotlin and Android that you probably would never know of unless you have encountered them. Such as [not using default parameters when making custom Android views](https://medium.com/@mmlodawski/https-medium-com-mmlodawski-do-not-always-trust-jvmoverloads-5251f1ad2cfe) due to wrong constructors being called. Overall though, these quirks are few and far between which is why Kotlin has become such a popular language to develop Android apps in and Google is investing a lot of resources into making it a pleasant experience to write Android apps in. 

If you want to listen to a great talk from the lead designer of Kotlin as to why Kotlin is a better language than Java, watch the video below. 

<iframe width="560" height="315" src="https://www.youtube.com/embed/4-2oRI4OrUg" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

## What should I learn?

If you are brand new to developing Android apps and you will create a new project, I would recommend starting off learning Kotlin since you got a green field to play in. Although I wouldn't completely forget learning Java at some point, as this will help you better understand what the Kotlin compiler is targeting and this is what a lot of what AOSP is writtten in. 

Now if you plan on getting a job at an enterprise that has an established Android app, there is good chance that it could be written entirely in Java or is a mix of the two languages. Then in this scenario I would recommend learning both because you will find yourself constantly needing to interop between the two languages which will be invaluable in being more productive. 

If the team you plan on working with only knows Java, then I would recommend just learning Java. Even though Kotlin is a great language to learn, you also have to consider that the whole team will also have to learn Kotlin. So unless you plan on teaching everyone how to write Kotlin code, it would be more beneficial for you to work with what your team already knows and you could learn Kotlin in your spare time. 