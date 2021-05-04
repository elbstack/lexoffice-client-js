export type PostingCategory = {
  id: string;
  name: string;
  type: 'income' | 'outgo';
  contactRequired: boolean;
  splitAllowed: boolean;
  groupName: string;
};
