import { ConnectorConfig, DataConnect, QueryRef, QueryPromise, MutationRef, MutationPromise } from 'firebase/data-connect';

export const connectorConfig: ConnectorConfig;

export type TimestampString = string;
export type UUIDString = string;
export type Int64String = string;
export type DateString = string;




export interface Appointment_Key {
  id: UUIDString;
  __typename?: 'Appointment_Key';
}

export interface Availability_Key {
  id: UUIDString;
  __typename?: 'Availability_Key';
}

export interface CreateNewAppointmentData {
  appointment_insert: Appointment_Key;
}

export interface CreateNewAppointmentVariables {
  customerId: UUIDString;
  cutId: UUIDString;
  appointmentDateTime: TimestampString;
  notes?: string | null;
}

export interface Cut_Key {
  id: UUIDString;
  __typename?: 'Cut_Key';
}

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

export interface RegisterUserData {
  user_insert: User_Key;
}

export interface UpdateMyAvailabilityData {
  availability_update?: Availability_Key | null;
}

export interface UpdateMyAvailabilityVariables {
  id: UUIDString;
  startTime?: TimestampString | null;
  endTime?: TimestampString | null;
  isBooked?: boolean | null;
  breakTime?: TimestampString | null;
}

export interface User_Key {
  id: UUIDString;
  __typename?: 'User_Key';
}

interface ListAllCutsRef {
  /* Allow users to create refs without passing in DataConnect */
  (): QueryRef<ListAllCutsData, undefined>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect): QueryRef<ListAllCutsData, undefined>;
  operationName: string;
}
export const listAllCutsRef: ListAllCutsRef;

export function listAllCuts(): QueryPromise<ListAllCutsData, undefined>;
export function listAllCuts(dc: DataConnect): QueryPromise<ListAllCutsData, undefined>;

interface CreateNewAppointmentRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: CreateNewAppointmentVariables): MutationRef<CreateNewAppointmentData, CreateNewAppointmentVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: CreateNewAppointmentVariables): MutationRef<CreateNewAppointmentData, CreateNewAppointmentVariables>;
  operationName: string;
}
export const createNewAppointmentRef: CreateNewAppointmentRef;

export function createNewAppointment(vars: CreateNewAppointmentVariables): MutationPromise<CreateNewAppointmentData, CreateNewAppointmentVariables>;
export function createNewAppointment(dc: DataConnect, vars: CreateNewAppointmentVariables): MutationPromise<CreateNewAppointmentData, CreateNewAppointmentVariables>;

interface UpdateMyAvailabilityRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: UpdateMyAvailabilityVariables): MutationRef<UpdateMyAvailabilityData, UpdateMyAvailabilityVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: UpdateMyAvailabilityVariables): MutationRef<UpdateMyAvailabilityData, UpdateMyAvailabilityVariables>;
  operationName: string;
}
export const updateMyAvailabilityRef: UpdateMyAvailabilityRef;

export function updateMyAvailability(vars: UpdateMyAvailabilityVariables): MutationPromise<UpdateMyAvailabilityData, UpdateMyAvailabilityVariables>;
export function updateMyAvailability(dc: DataConnect, vars: UpdateMyAvailabilityVariables): MutationPromise<UpdateMyAvailabilityData, UpdateMyAvailabilityVariables>;

interface RegisterUserRef {
  /* Allow users to create refs without passing in DataConnect */
  (): MutationRef<RegisterUserData, undefined>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect): MutationRef<RegisterUserData, undefined>;
  operationName: string;
}
export const registerUserRef: RegisterUserRef;

export function registerUser(): MutationPromise<RegisterUserData, undefined>;
export function registerUser(dc: DataConnect): MutationPromise<RegisterUserData, undefined>;

