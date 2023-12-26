import _ from "lodash";

export function camelCaseToSpaceSeparated(inputString) {
  // Convert camelCase to space-separated string
  const spaceSeparatedString = _.startCase(_.camelCase(inputString));
  return spaceSeparatedString;
}
