const ValidationMessages = {
  requiredWithKey(key: string, felid: string) {
    return `${key} ${felid} is required. Please enter the ${key}'s ${felid}.`;
  },
  requiredMessage() {
    return `Please enter the message`;
  },
  requiredWithFelid(felid: string) {
    return `This feild is required. Please enter the ${felid}`;
  },
  invalidPhoneNumber() {
    return "Please enter a valid phone number ex. 070xxxxxxx";
  },
  leastOneSelection(key: string) {
    return `Please select at least one ${key} from the list.`;
  },
  cannotBeNegative(key: string, felid: string) {
    return `${key} ${felid} cannot be less than zero`;
  },
};

export default ValidationMessages;
