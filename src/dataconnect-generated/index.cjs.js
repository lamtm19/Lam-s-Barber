const { queryRef, executeQuery, mutationRef, executeMutation, validateArgs } = require('firebase/data-connect');

const connectorConfig = {
  connector: 'example',
  service: 'lamsbarber',
  location: 'us-east4'
};
exports.connectorConfig = connectorConfig;

const listAllCutsRef = (dc) => {
  const { dc: dcInstance} = validateArgs(connectorConfig, dc, undefined);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'ListAllCuts');
}
listAllCutsRef.operationName = 'ListAllCuts';
exports.listAllCutsRef = listAllCutsRef;

exports.listAllCuts = function listAllCuts(dc) {
  return executeQuery(listAllCutsRef(dc));
};

const createNewAppointmentRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'CreateNewAppointment', inputVars);
}
createNewAppointmentRef.operationName = 'CreateNewAppointment';
exports.createNewAppointmentRef = createNewAppointmentRef;

exports.createNewAppointment = function createNewAppointment(dcOrVars, vars) {
  return executeMutation(createNewAppointmentRef(dcOrVars, vars));
};

const updateMyAvailabilityRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'UpdateMyAvailability', inputVars);
}
updateMyAvailabilityRef.operationName = 'UpdateMyAvailability';
exports.updateMyAvailabilityRef = updateMyAvailabilityRef;

exports.updateMyAvailability = function updateMyAvailability(dcOrVars, vars) {
  return executeMutation(updateMyAvailabilityRef(dcOrVars, vars));
};

const registerUserRef = (dc) => {
  const { dc: dcInstance} = validateArgs(connectorConfig, dc, undefined);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'RegisterUser');
}
registerUserRef.operationName = 'RegisterUser';
exports.registerUserRef = registerUserRef;

exports.registerUser = function registerUser(dc) {
  return executeMutation(registerUserRef(dc));
};
