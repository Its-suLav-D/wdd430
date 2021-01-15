export class Contact {
  constructor(
    public id: Number,
    public name: string,
    public email: string,
    public phone: string,
    public imageUrl: string,
    public group: Contact[]
  ) {}
}