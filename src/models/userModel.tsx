export interface Attendee {
  name: string;
  email: string;
}

export interface User {
  _id: string;
  registrationType: string;
  attendees: Attendee[];
}
