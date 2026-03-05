# Generated TypeScript README
This README will guide you through the process of using the generated JavaScript SDK package for the connector `example`. It will also provide examples on how to use your generated SDK to call your Data Connect queries and mutations.

**If you're looking for the `React README`, you can find it at [`dataconnect-generated/react/README.md`](./react/README.md)**

***NOTE:** This README is generated alongside the generated SDK. If you make changes to this file, they will be overwritten when the SDK is regenerated.*

# Table of Contents
- [**Overview**](#generated-javascript-readme)
- [**Accessing the connector**](#accessing-the-connector)
  - [*Connecting to the local Emulator*](#connecting-to-the-local-emulator)
- [**Queries**](#queries)
  - [*ListAllCuts*](#listallcuts)
- [**Mutations**](#mutations)
  - [*CreateNewAppointment*](#createnewappointment)
  - [*UpdateMyAvailability*](#updatemyavailability)
  - [*RegisterUser*](#registeruser)

# Accessing the connector
A connector is a collection of Queries and Mutations. One SDK is generated for each connector - this SDK is generated for the connector `example`. You can find more information about connectors in the [Data Connect documentation](https://firebase.google.com/docs/data-connect#how-does).

You can use this generated SDK by importing from the package `@dataconnect/generated` as shown below. Both CommonJS and ESM imports are supported.

You can also follow the instructions from the [Data Connect documentation](https://firebase.google.com/docs/data-connect/web-sdk#set-client).

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig } from '@dataconnect/generated';

const dataConnect = getDataConnect(connectorConfig);
```

## Connecting to the local Emulator
By default, the connector will connect to the production service.

To connect to the emulator, you can use the following code.
You can also follow the emulator instructions from the [Data Connect documentation](https://firebase.google.com/docs/data-connect/web-sdk#instrument-clients).

```typescript
import { connectDataConnectEmulator, getDataConnect } from 'firebase/data-connect';
import { connectorConfig } from '@dataconnect/generated';

const dataConnect = getDataConnect(connectorConfig);
connectDataConnectEmulator(dataConnect, 'localhost', 9399);
```

After it's initialized, you can call your Data Connect [queries](#queries) and [mutations](#mutations) from your generated SDK.

# Queries

There are two ways to execute a Data Connect Query using the generated Web SDK:
- Using a Query Reference function, which returns a `QueryRef`
  - The `QueryRef` can be used as an argument to `executeQuery()`, which will execute the Query and return a `QueryPromise`
- Using an action shortcut function, which returns a `QueryPromise`
  - Calling the action shortcut function will execute the Query and return a `QueryPromise`

The following is true for both the action shortcut function and the `QueryRef` function:
- The `QueryPromise` returned will resolve to the result of the Query once it has finished executing
- If the Query accepts arguments, both the action shortcut function and the `QueryRef` function accept a single argument: an object that contains all the required variables (and the optional variables) for the Query
- Both functions can be called with or without passing in a `DataConnect` instance as an argument. If no `DataConnect` argument is passed in, then the generated SDK will call `getDataConnect(connectorConfig)` behind the scenes for you.

Below are examples of how to use the `example` connector's generated functions to execute each query. You can also follow the examples from the [Data Connect documentation](https://firebase.google.com/docs/data-connect/web-sdk#using-queries).

## ListAllCuts
You can execute the `ListAllCuts` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
listAllCuts(): QueryPromise<ListAllCutsData, undefined>;

interface ListAllCutsRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (): QueryRef<ListAllCutsData, undefined>;
}
export const listAllCutsRef: ListAllCutsRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
listAllCuts(dc: DataConnect): QueryPromise<ListAllCutsData, undefined>;

interface ListAllCutsRef {
  ...
  (dc: DataConnect): QueryRef<ListAllCutsData, undefined>;
}
export const listAllCutsRef: ListAllCutsRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the listAllCutsRef:
```typescript
const name = listAllCutsRef.operationName;
console.log(name);
```

### Variables
The `ListAllCuts` query has no variables.
### Return Type
Recall that executing the `ListAllCuts` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `ListAllCutsData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface ListAllCutsData {
  cuts: ({
    id: UUIDString;
    name: string;
    price: number;
    description?: string | null;
    imageUrl?: string | null;
    createdAt: TimestampString;
  } & Cut_Key)[];
}
```
### Using `ListAllCuts`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, listAllCuts } from '@dataconnect/generated';


// Call the `listAllCuts()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await listAllCuts();

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await listAllCuts(dataConnect);

console.log(data.cuts);

// Or, you can use the `Promise` API.
listAllCuts().then((response) => {
  const data = response.data;
  console.log(data.cuts);
});
```

### Using `ListAllCuts`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, listAllCutsRef } from '@dataconnect/generated';


// Call the `listAllCutsRef()` function to get a reference to the query.
const ref = listAllCutsRef();

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = listAllCutsRef(dataConnect);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.cuts);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.cuts);
});
```

# Mutations

There are two ways to execute a Data Connect Mutation using the generated Web SDK:
- Using a Mutation Reference function, which returns a `MutationRef`
  - The `MutationRef` can be used as an argument to `executeMutation()`, which will execute the Mutation and return a `MutationPromise`
- Using an action shortcut function, which returns a `MutationPromise`
  - Calling the action shortcut function will execute the Mutation and return a `MutationPromise`

The following is true for both the action shortcut function and the `MutationRef` function:
- The `MutationPromise` returned will resolve to the result of the Mutation once it has finished executing
- If the Mutation accepts arguments, both the action shortcut function and the `MutationRef` function accept a single argument: an object that contains all the required variables (and the optional variables) for the Mutation
- Both functions can be called with or without passing in a `DataConnect` instance as an argument. If no `DataConnect` argument is passed in, then the generated SDK will call `getDataConnect(connectorConfig)` behind the scenes for you.

Below are examples of how to use the `example` connector's generated functions to execute each mutation. You can also follow the examples from the [Data Connect documentation](https://firebase.google.com/docs/data-connect/web-sdk#using-mutations).

## CreateNewAppointment
You can execute the `CreateNewAppointment` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
createNewAppointment(vars: CreateNewAppointmentVariables): MutationPromise<CreateNewAppointmentData, CreateNewAppointmentVariables>;

interface CreateNewAppointmentRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: CreateNewAppointmentVariables): MutationRef<CreateNewAppointmentData, CreateNewAppointmentVariables>;
}
export const createNewAppointmentRef: CreateNewAppointmentRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
createNewAppointment(dc: DataConnect, vars: CreateNewAppointmentVariables): MutationPromise<CreateNewAppointmentData, CreateNewAppointmentVariables>;

interface CreateNewAppointmentRef {
  ...
  (dc: DataConnect, vars: CreateNewAppointmentVariables): MutationRef<CreateNewAppointmentData, CreateNewAppointmentVariables>;
}
export const createNewAppointmentRef: CreateNewAppointmentRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the createNewAppointmentRef:
```typescript
const name = createNewAppointmentRef.operationName;
console.log(name);
```

### Variables
The `CreateNewAppointment` mutation requires an argument of type `CreateNewAppointmentVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface CreateNewAppointmentVariables {
  customerId: UUIDString;
  cutId: UUIDString;
  appointmentDateTime: TimestampString;
  notes?: string | null;
}
```
### Return Type
Recall that executing the `CreateNewAppointment` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `CreateNewAppointmentData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface CreateNewAppointmentData {
  appointment_insert: Appointment_Key;
}
```
### Using `CreateNewAppointment`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, createNewAppointment, CreateNewAppointmentVariables } from '@dataconnect/generated';

// The `CreateNewAppointment` mutation requires an argument of type `CreateNewAppointmentVariables`:
const createNewAppointmentVars: CreateNewAppointmentVariables = {
  customerId: ..., 
  cutId: ..., 
  appointmentDateTime: ..., 
  notes: ..., // optional
};

// Call the `createNewAppointment()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await createNewAppointment(createNewAppointmentVars);
// Variables can be defined inline as well.
const { data } = await createNewAppointment({ customerId: ..., cutId: ..., appointmentDateTime: ..., notes: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await createNewAppointment(dataConnect, createNewAppointmentVars);

console.log(data.appointment_insert);

// Or, you can use the `Promise` API.
createNewAppointment(createNewAppointmentVars).then((response) => {
  const data = response.data;
  console.log(data.appointment_insert);
});
```

### Using `CreateNewAppointment`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, createNewAppointmentRef, CreateNewAppointmentVariables } from '@dataconnect/generated';

// The `CreateNewAppointment` mutation requires an argument of type `CreateNewAppointmentVariables`:
const createNewAppointmentVars: CreateNewAppointmentVariables = {
  customerId: ..., 
  cutId: ..., 
  appointmentDateTime: ..., 
  notes: ..., // optional
};

// Call the `createNewAppointmentRef()` function to get a reference to the mutation.
const ref = createNewAppointmentRef(createNewAppointmentVars);
// Variables can be defined inline as well.
const ref = createNewAppointmentRef({ customerId: ..., cutId: ..., appointmentDateTime: ..., notes: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = createNewAppointmentRef(dataConnect, createNewAppointmentVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.appointment_insert);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.appointment_insert);
});
```

## UpdateMyAvailability
You can execute the `UpdateMyAvailability` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
updateMyAvailability(vars: UpdateMyAvailabilityVariables): MutationPromise<UpdateMyAvailabilityData, UpdateMyAvailabilityVariables>;

interface UpdateMyAvailabilityRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: UpdateMyAvailabilityVariables): MutationRef<UpdateMyAvailabilityData, UpdateMyAvailabilityVariables>;
}
export const updateMyAvailabilityRef: UpdateMyAvailabilityRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
updateMyAvailability(dc: DataConnect, vars: UpdateMyAvailabilityVariables): MutationPromise<UpdateMyAvailabilityData, UpdateMyAvailabilityVariables>;

interface UpdateMyAvailabilityRef {
  ...
  (dc: DataConnect, vars: UpdateMyAvailabilityVariables): MutationRef<UpdateMyAvailabilityData, UpdateMyAvailabilityVariables>;
}
export const updateMyAvailabilityRef: UpdateMyAvailabilityRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the updateMyAvailabilityRef:
```typescript
const name = updateMyAvailabilityRef.operationName;
console.log(name);
```

### Variables
The `UpdateMyAvailability` mutation requires an argument of type `UpdateMyAvailabilityVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface UpdateMyAvailabilityVariables {
  id: UUIDString;
  startTime?: TimestampString | null;
  endTime?: TimestampString | null;
  isBooked?: boolean | null;
  breakTime?: TimestampString | null;
}
```
### Return Type
Recall that executing the `UpdateMyAvailability` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `UpdateMyAvailabilityData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface UpdateMyAvailabilityData {
  availability_update?: Availability_Key | null;
}
```
### Using `UpdateMyAvailability`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, updateMyAvailability, UpdateMyAvailabilityVariables } from '@dataconnect/generated';

// The `UpdateMyAvailability` mutation requires an argument of type `UpdateMyAvailabilityVariables`:
const updateMyAvailabilityVars: UpdateMyAvailabilityVariables = {
  id: ..., 
  startTime: ..., // optional
  endTime: ..., // optional
  isBooked: ..., // optional
  breakTime: ..., // optional
};

// Call the `updateMyAvailability()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await updateMyAvailability(updateMyAvailabilityVars);
// Variables can be defined inline as well.
const { data } = await updateMyAvailability({ id: ..., startTime: ..., endTime: ..., isBooked: ..., breakTime: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await updateMyAvailability(dataConnect, updateMyAvailabilityVars);

console.log(data.availability_update);

// Or, you can use the `Promise` API.
updateMyAvailability(updateMyAvailabilityVars).then((response) => {
  const data = response.data;
  console.log(data.availability_update);
});
```

### Using `UpdateMyAvailability`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, updateMyAvailabilityRef, UpdateMyAvailabilityVariables } from '@dataconnect/generated';

// The `UpdateMyAvailability` mutation requires an argument of type `UpdateMyAvailabilityVariables`:
const updateMyAvailabilityVars: UpdateMyAvailabilityVariables = {
  id: ..., 
  startTime: ..., // optional
  endTime: ..., // optional
  isBooked: ..., // optional
  breakTime: ..., // optional
};

// Call the `updateMyAvailabilityRef()` function to get a reference to the mutation.
const ref = updateMyAvailabilityRef(updateMyAvailabilityVars);
// Variables can be defined inline as well.
const ref = updateMyAvailabilityRef({ id: ..., startTime: ..., endTime: ..., isBooked: ..., breakTime: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = updateMyAvailabilityRef(dataConnect, updateMyAvailabilityVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.availability_update);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.availability_update);
});
```

## RegisterUser
You can execute the `RegisterUser` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
registerUser(): MutationPromise<RegisterUserData, undefined>;

interface RegisterUserRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (): MutationRef<RegisterUserData, undefined>;
}
export const registerUserRef: RegisterUserRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
registerUser(dc: DataConnect): MutationPromise<RegisterUserData, undefined>;

interface RegisterUserRef {
  ...
  (dc: DataConnect): MutationRef<RegisterUserData, undefined>;
}
export const registerUserRef: RegisterUserRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the registerUserRef:
```typescript
const name = registerUserRef.operationName;
console.log(name);
```

### Variables
The `RegisterUser` mutation has no variables.
### Return Type
Recall that executing the `RegisterUser` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `RegisterUserData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface RegisterUserData {
  user_insert: User_Key;
}
```
### Using `RegisterUser`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, registerUser } from '@dataconnect/generated';


// Call the `registerUser()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await registerUser();

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await registerUser(dataConnect);

console.log(data.user_insert);

// Or, you can use the `Promise` API.
registerUser().then((response) => {
  const data = response.data;
  console.log(data.user_insert);
});
```

### Using `RegisterUser`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, registerUserRef } from '@dataconnect/generated';


// Call the `registerUserRef()` function to get a reference to the mutation.
const ref = registerUserRef();

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = registerUserRef(dataConnect);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.user_insert);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.user_insert);
});
```

