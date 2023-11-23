export interface MenuPayload {
  name: string;
  path: string;
}

export interface Menu extends MenuPayload {
  _id: string;
}
