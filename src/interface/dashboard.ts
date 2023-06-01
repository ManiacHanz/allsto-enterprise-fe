export enum ReceiveBy {
  "POLYGON" = "Polygon",
  "ETHEREUM" = "Ethereum",
  "ARBITRUM" = "Arbitrum",
}

export type MyOrgFormValue = {
  name?: string;
  email?: string;
  address?: string;
  receiveBy?: ReceiveBy;
};
