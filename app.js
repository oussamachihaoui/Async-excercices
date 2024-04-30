//1
async function iterateWithAsyncAwait(arr) {
  for (const el of arr) {
    console.log(el);
    await new Promise((resolve) => setTimeout(resolve, 1000));
  }
}

console.log(iterateWithAsyncAwait([1, 2, 3, 4, 5]));

//2
async function awaitCall(username) {
  let data = await fetch(`https://api.github.com/users/${username}`);
  console.log(await data.json());
}
awaitCall("oussamachihaoui");

// 3 /1
async function awaitCall(username) {
  try {
    let data = await fetch(`https://api.github.com/users/${username}`);
    console.log(await data.json());
  } catch (error) {
    console.log(`error is: ${error}`);
  }
}
awaitCall("oussamachihaoui");

// 3 / 2

const func1 = async () => {
  await new Promise((resolve) => setTimeout(resolve, 1000));
  console.log("first function done");
};
const func2 = async () => {
  await new Promise((resolve) => setTimeout(resolve, 1000));
  console.log("second function done");
};
const func3 = async () => {
  await new Promise((resolve) => setTimeout(resolve, 1000));
  console.log("third function done");
};

const chainedAsyncFunctions = async () => {
  await func1();
  await func2();
  await func3();
};

chainedAsyncFunctions();

//4 + 5
const concurrentRequests = async (
  firstPerson = "oussamachihaoui",
  secondPerson = "oussamachihaoui"
) => {
  const firstAPI = await fetch(`https://api.github.com/users/${firstPerson}`);
  const secondApi = await fetch(`https://api.github.com/users/${secondPerson}`);

  const firstAPIObject = await firstAPI.json();
  const secondApiObject = await secondApi.json();

  const data = await Promise.all([firstAPIObject, secondApiObject]);
  console.log(data);
};

concurrentRequests();

//5
const parallelCalls = async (arr) => {
  const data = await arr.map(async (el) => {
    const resolve = await fetch(el);
    return await resolve.json();
  });
  const waitCalls = await Promise.all(data);
  console.log(waitCalls);
};

parallelCalls([
  "https://api.github.com/users/marwalamouri",
  "https://api.github.com/users/BoubakerSaif",
]);
