---
title: Kotlin Inject Anvil Extensions
date: 2025-04-04
authors: [andrew]
categories:
  - Multiplatform
---

# Extending Kotlin Inject Anvil for Assisted Factories

<figure markdown="span">
  ![Image title](../../assets/images/extending-kotlin-inject.jpg){ width="400" }
</figure>

I recently started using [Kotlin inject anvil](https://github.com/amzn/kotlin-inject-anvil) in my kotlin multiplatform (KMP) projects for dependency injection. However when using [assisted injection](https://github.com/evant/kotlin-inject?tab=readme-ov-file#function-support--assisted-injection) I noticed myself writing boilerplate code to bind assisted factory method interfaces. In the process of trying to not write all this boiler plate code, I ended up writing a library that extends kotlin inject anvil to generate the code necessary to bind the assisted factory interface. Learn how to use this extension and how to write your own extension.

<!-- more -->

## The Problem



```kotlin
interface MoviesBloc {
  val state: StateFlow<State>
}

@Inject
@ContributesBinding(
  scope = AppScope::class,
  boundType = MoviesBloc::class
)
class RealMoviesBloc(
  @Assisted context: ComponentContext
  private val repository: MovieRepository,
): MoviesBloc, ComponentContext by context {
  override val state: StateFlow<State> = TODO()
}
```

To create a `MoviesBloc` elsewhere, a lambda could be injected that takes the assisted parameter as an argument `(ComponentContext) -> MoviesBloc`. Coming from a background using [dagger](https://github.com/google/dagger) and [anvil](https://github.com/square/anvil), I had become accustomed to a pattern of creating factory interfaces that would create assisted injected dependencies.

```kotlin
interface MoviesBloc {
  interface Factory {
    fun create(context: ComponentContext): MoviesBloc
  }
}
```

In order to bind this assisted factory in the dependency graph, a real implementation of this factory would need to be written injecting the lambda parameter. 

```kotlin
@Inject
@ContributesBinding(
  scope = AppScope::class,
  boundType = MoviesBloc.Factory::class
)
class RealMoviesBlocFactory(
  private val realFactory: (ComponentContext) -> MoviesBloc
): MoviesBloc.Factory {

  override fun create(
    context: ComponentContext
  ): MoviesBloc = realFactory(context)
}
```

Finally able to use this factory interface by injecting into other BloCs. 

```kotlin
@Inject
@ContributesBinding(
  scope = AppScope::class,
  boundType = RootBloc::class
)
class RealRootBloc(
  @Assisted context: ComponentContext,
  private val moviesBlocFactory: MoviesBloc.Factory,
): RootBloc, ComponentContext by context {

  private fun createMoviesBloc(context: ComponentContext) = 
    moviesBlocFactory.create(context)
}
```

The `RealMoviesBlocFactory` seemed like unnecessary boiler plate code just to bind an assisted factory method, so I wrote my first extension of kotlin inject anvil to help remove the need to write all this glue code. 

## Assisted Factory Extension

Kotlin inject anvil was designed to be flexible by allowing one to [extend the framework](https://ralf-wondratschek.com/presentation/extending-kotlin-inject-nyc.html) to generate components in situations just like this. Which is how the [kotlin-inject-anvil-extensions](https://github.com/plusmobileapps/kotlin-inject-anvil-extensions) library was created. 


The assisted factory extension has a very simple API with the annotation `@ContributesAssistedFactory`. This annotation requires two parameters, the anvil scope and the assisted factory interface to bind.

!!! warning 

    The `@Assisted` parameters order of the real implementation constructor must be the same order as your assisted factory interface. If two of the same type are used, these will be mixed up when generating the default factory implementation with the extension.


```kotlin
@Inject
@ContributesAssistedFactory(
  scope = AppScope::class,
  assistedFactory = MoviesBloc.Factory::class
)
class RealMoviesBloc(
  @Assisted context: ComponentContext
  private val repository: MovieRepository,
): MoviesBloc, ComponentContext by context {
  //
}
```

Then inject the assisted factory interface wherever needed. 

```kotlin
@Inject
@ContributesAssistedFactory(
  scope = AppScope::class,
  boundType = RootBloc.Factory::class
)
class RealRootBloc(
  @Assisted context: ComponentContext,
  private val moviesBlocFactory: MoviesBloc.Factory,
): RootBloc, ComponentContext by context {

  private fun createMoviesBloc(context: ComponentContext) = 
    moviesBlocFactory.create(context)
}
```

## Resources

* [kotlin-inject-anvil-extensions](https://github.com/plusmobileapps/kotlin-inject-anvil-extensions) - Github
* [kotlin-inject](https://github.com/evant/kotlin-inject) - Github
* [kotlin-inject-anvil](https://github.com/amzn/kotlin-inject-anvil) - Github
* [Extending kotlin-inject for fun & profit (Talk)](https://ralf-wondratschek.com/presentation/extending-kotlin-inject-nyc.html)