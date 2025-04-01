---
title: Surviving Android Process Death With SavedStateFlow

date:
  created: 2022-01-06

authors: [andrew]

categories:
  - Android
  - Coroutines
---

# Surviving Android Process Death With SavedStateFlow

I was perusing Reddit the other day when someone [asked](https://www.reddit.com/r/androiddev/comments/rlxrsr/in_stateflow_how_can_we_save_and_restore_android/) how they could use [`SavedStateHandle`](https://developer.android.com/reference/androidx/lifecycle/SavedStateHandle) with a [`StateFlow`](https://kotlin.github.io/kotlinx.coroutines/kotlinx-coroutines-core/kotlinx.coroutines.flow/-state-flow/) similar to the [`SavedStateHandle.getLiveData()`](https://developer.android.com/topic/libraries/architecture/viewmodel-savedstate) version. The most upvoted comment originally was saying that this functionality is not officially supported, but one could convert the `LiveData` to a `Flow` using the `LiveData.asFlow()` extension function. That seemed pretty simple for anyone to do, however testing that would then require using `LiveData` in your tests which might be annoying if you were using `StateFlow` to manage state. So after looking over the API, it seemed pretty simple to write a wrapper that could expose this functionality directly as a `StateFlow` and that is how the [SavedStateFlow](https://plusmobileapps.com/SavedStateFlow/) library was made!

<!-- more -->

## SavedStateFlow API 

At its core, the API for `SavedStateFlow` is very simple as it's supposed to be similar to a `MutableStateFlow`. There is a `value` property that can be mutated and a method that can expose it as a `StateFlow`. 

```kotlin
interface SavedStateFlow<T> {

    var value: T

    fun asStateFlow(): StateFlow<T>

}
```

The implementation detail of this interface will simply delegate value changes to the `SavedStateHandle` and will observe any value changes from the `SavedStateHandle.getLiveData()` function. Then the initial value for the `SavedStateFlow` will first be retrieved by the `SavedStateHandle` and if one does not exist then it will default to the one provided by yourself. 

## How to create a SavedStateFlow? 

`SavedStateFlow` is just an interface, so how does one create an instance of one? Well since `SavedStateHandle` can't create this, there is a new wrapper called `SavedStateFlowHandle`. The library includes an extension function on `SavedStateHandle` to create a reference to a `SavedStateFlowHandle`. 

```kotlin
val savedStateHandle: SavedStateHandle = TODO() 

val savedStateFlowHandle: SavedStateFlowHandle = 
    savedStateHandle.toSavedStateFlowHandle()
```

Now this new `SavedStateFlowHandle` provides two new functions on top of the original `SavedStateHandle` API. 

```kotlin
interface SavedStateFlowHandle {

    @MainThread
    fun <T> getSavedStateFlow(
        viewModelScope: CoroutineScope,
        key: String,
        defaultValue: T
    ): SavedStateFlow<T>

    @MainThread
    fun <T> getFlow(key: String): Flow<T>

}
```

The `getFlow()` function is pretty self explanatory and exposes the `SavedStateHandle.getLiveData()` as a `Flow` directly, which could help for unit testing avoiding the need to mess around with `LiveData` directly. 

The `getSavedStateFlow()` is the real meat and potatoes of this library as that is how to create an instance of a `SavedStateFlow`. Notice the first parameter to this function is `viewModelScope`, that is because the `SavedStateFlow` will use that `CoroutineScope` to collect new values from the `SavedStateHandle` whenever the value changes and will also stop collecting the values when the `ViewModel` itself is cleared. So putting everything together, one simple usage of `SavedStateFlow` might look like the following: 

```kotlin
class MainViewModel(
    savedStateFlowHandle: SavedStateFlowHandle,
    private val newsDataSource: NewsDataSource
) : ViewModel() {

    private val query: SavedStateFlow<String> =
        savedStateFlowHandle.getSavedStateFlow(
            viewModelScope = viewModelScope,
            key = "main-viewmodel-query-key", 
            defaultValue = ""
        )

    init {
        observeQuery()
    }

    fun updateQuery(query: String) {
        this.query.value = query
    }

    private fun observeQuery() {
        viewModelScope.launch {
            query.asStateFlow()
                .flatMapLatest { query ->
                    // fetch the results for the latest query
                    newsDataSource.fetchQuery(query)
                }
                .collect { results ->
                    // Update with the latest results
                }
        }
    }
}
```

Since `SavedStateFlow` is a wrapper around `SavedStateHandle`, the following note from the [documentation](https://developer.android.com/topic/libraries/architecture/viewmodel-savedstate) should be observed. "State must be simple and lightweight. For complex or large data, you should use [local persistence](https://developer.android.com/topic/libraries/architecture/saving-states#local)."
{:.warning}

## How to inject SavedStateFlowHandle?

In the sample above, there was an extension function on `SavedStateHandle` to get an instance of a `SavedStateFlowHandle`. Some of you might be wondering how one actually injects that into a `ViewModel`. Well if you're doing manual injection, this is pretty simple using the `AbstractSavedStateViewModelFactory` and there is a sample of this in the [documentation](https://plusmobileapps.com/SavedStateFlow/manual-di/). 

However, where this library really shines in the developer experience is when you are using [Hilt](https://developer.android.com/training/dependency-injection/hilt-android) because there is a separate [artifact](https://plusmobileapps.com/SavedStateFlow/setup/#savedstateflow-hilt) which can automatically scope a `SavedStateFlowHandle` to any `@HiltViewModel`. 

```kotlin
@HiltViewModel
class MainViewModel @Inject constructor(
    savedStateFlowHandle: SavedStateFlowHandle
) : ViewModel()
```

However, not every `ViewModel` can be annotated with `@HiltViewModel` when values passed through the constructor are determined at runtime which is when assisted injection can be used. In this scenario, there are a few extension methods provided which can provide a `SavedStateFlowHandle` when using assisted injection. 

```kotlin
class MyAssistedViewModel @AssistedInject constructor(
    @Assisted savedStateFlowHandle: SavedStateFlowHandle,
    @Assisted id: String
) : ViewModel() {

    @AssistedFactory
    interface Factory {
        fun create(savedStateFlowHandle: SavedStateFlowHandle, id: String): MyAssistedViewModel
    }
}

@AndroidEntryPoint
class AssistedFragment : Fragment() {
    @Inject
    lateinit var factory: MyAssistedViewModel.Factory

    private val viewModel: MyAssistedViewModel by assistedViewModel { savedStateFlowHandle ->
        factory.create(savedStateFlowHandle, arguments?.getString("some-argument-key")!!)
    }
}
```

For more information on the `SavedStateFlow` Hilt integration, please check out the [documentation](https://plusmobileapps.com/SavedStateFlow/hilt-di/).

## Testing

The main motivation for writing this library was for testing and to avoid messing around with `LiveData`, so there is a test artifact that can be used for unit tests called `TestSavedStateFlow`. The addition to this class allows you to provide a default value or a cached value which is null by default for different testing scenarios. One basic usage of this artifact with [Mockk](https://mockk.io/) is as shown below: 

```kotlin
class SomeTest {
    @Test
    fun `some test`() = runBlocking {
        val savedStateHandle: SavedStateFlowHandle = mockk()
        val savedStateFlow = TestSavedStateFlow<String>(
            defaultValue = "", 
            cachedValue = "some cached value"
        )
        every { savedStateHandle.getSavedStateFlow(any(), "some-key", "") } returns savedStateFlow

        val viewModel = MyViewModel(savedStateHandle)
        // omitted test code
    }
}
```

For more information on testing and how this could be used with [Turbine](https://github.com/cashapp/turbine), please check out the [documentation](https://plusmobileapps.com/SavedStateFlow/testing/).

## Conclusion 

In this article we went over how to create/use a `SavedStateFlow`, inject a `SavedStateFlowHandle` into a `ViewModel` and how to test with `TestSavedStateFlow`. I highly encourage you to check out the documentation which has more detailed samples and the GitHub repository if you want to take a look at the source code or even make a contribution if you see ways it could be improved. 

Hope someone else finds this library useful until Google decides to support this functionality officially sometime in the future. Enjoy!

## Resources

* [Github Repository](https://github.com/plusmobileapps/SavedStateFlow)
* [Project site](https://plusmobileapps.com/SavedStateFlow/) - documentation
* [Publishing Android libraries to MavenCentral in 2021](https://getstream.io/blog/publishing-libraries-to-mavencentral-2021/) - I have never published a library before and this article was very helpful for getting this library up on MavenCentral