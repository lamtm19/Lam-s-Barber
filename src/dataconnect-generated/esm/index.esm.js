import { queryRef, executeQuery, mutationRef, executeMutation, validateArgs } from 'firebase/data-connect';

export const connectorConfig = {
  connector: 'example',
  service: 'lamsbarber',
  location: 'us-east4'
};

export const listAllCutsRef = (dc) => {
  const { dc: dcInstance} = validateArgs(connectorConfig, dc, undefined);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'ListAllCuts');
}
listAllCutsRef.operationName = 'ListAllCuts';

export function listAllCuts(dc) {
  return executeQuery(listAllCutsRef(dc));
}

export const createNewAppointmentRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'CreateNewAppointment', inputVars);
}
createNewAppointmentRef.operationName = 'CreateNewAppointment';

export function createNewAppointment(dcOrVars, vars) {
  return executeMutation(createNewAppointmentRef(dcOrVars, vars));
}

export const updateMyAvailabilityRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'UpdateMyAvailability', inputVars);
}
updateMyAvailabilityRef.operationName = 'UpdateMyAvailability';

export function updateMyAvailability(dcOrVars, vars) {
  return executeMutation(updateMyAvailabilityRef(dcOrVars, vars));
}

export const registerUserRef = (dc) => {
  const { dc: dcInstance} = validateArgs(connectorConfig, dc, undefined);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'RegisterUser');
}
registerUserRef.operationName = 'RegisterUser';

export function registerUser(dc) {
  return executeMutation(registerUserRef(dc));
}

