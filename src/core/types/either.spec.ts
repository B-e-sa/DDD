import { Either, left, right } from "./either"

function doSomething(shouldSuccess: boolean): Either<string, string> {
    return shouldSuccess
        ? right('success')
        : left('error')
}

test('success result', () => {
    const success = doSomething(true)

    if (success.isRight()) {
        console.log(success.value)
    }

    expect(success.isRight()).toBeTruthy()
})

test('error result', () => {
    const error = doSomething(false)

    expect(error.isLeft()).toBeTruthy()
})