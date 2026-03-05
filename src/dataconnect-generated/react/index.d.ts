import { ListAllCutsData, CreateNewAppointmentData, CreateNewAppointmentVariables, UpdateMyAvailabilityData, UpdateMyAvailabilityVariables, RegisterUserData } from '../';
import { UseDataConnectQueryResult, useDataConnectQueryOptions, UseDataConnectMutationResult, useDataConnectMutationOptions} from '@tanstack-query-firebase/react/data-connect';
import { UseQueryResult, UseMutationResult} from '@tanstack/react-query';
import { DataConnect } from 'firebase/data-connect';
import { FirebaseError } from 'firebase/app';


export function useListAllCuts(options?: useDataConnectQueryOptions<ListAllCutsData>): UseDataConnectQueryResult<ListAllCutsData, undefined>;
export function useListAllCuts(dc: DataConnect, options?: useDataConnectQueryOptions<ListAllCutsData>): UseDataConnectQueryResult<ListAllCutsData, undefined>;

export function useCreateNewAppointment(options?: useDataConnectMutationOptions<CreateNewAppointmentData, FirebaseError, CreateNewAppointmentVariables>): UseDataConnectMutationResult<CreateNewAppointmentData, CreateNewAppointmentVariables>;
export function useCreateNewAppointment(dc: DataConnect, options?: useDataConnectMutationOptions<CreateNewAppointmentData, FirebaseError, CreateNewAppointmentVariables>): UseDataConnectMutationResult<CreateNewAppointmentData, CreateNewAppointmentVariables>;

export function useUpdateMyAvailability(options?: useDataConnectMutationOptions<UpdateMyAvailabilityData, FirebaseError, UpdateMyAvailabilityVariables>): UseDataConnectMutationResult<UpdateMyAvailabilityData, UpdateMyAvailabilityVariables>;
export function useUpdateMyAvailability(dc: DataConnect, options?: useDataConnectMutationOptions<UpdateMyAvailabilityData, FirebaseError, UpdateMyAvailabilityVariables>): UseDataConnectMutationResult<UpdateMyAvailabilityData, UpdateMyAvailabilityVariables>;

export function useRegisterUser(options?: useDataConnectMutationOptions<RegisterUserData, FirebaseError, void>): UseDataConnectMutationResult<RegisterUserData, undefined>;
export function useRegisterUser(dc: DataConnect, options?: useDataConnectMutationOptions<RegisterUserData, FirebaseError, void>): UseDataConnectMutationResult<RegisterUserData, undefined>;
